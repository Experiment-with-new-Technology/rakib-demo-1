package extremecoder.web.rest;

import extremecoder.BlogApp;
import extremecoder.domain.AppStatus;
import extremecoder.repository.AppStatusRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AppStatusResource} REST controller.
 */
@SpringBootTest(classes = BlogApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AppStatusResourceIT {

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    @Autowired
    private AppStatusRepository appStatusRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAppStatusMockMvc;

    private AppStatus appStatus;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AppStatus createEntity(EntityManager em) {
        AppStatus appStatus = new AppStatus()
            .status(DEFAULT_STATUS);
        return appStatus;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AppStatus createUpdatedEntity(EntityManager em) {
        AppStatus appStatus = new AppStatus()
            .status(UPDATED_STATUS);
        return appStatus;
    }

    @BeforeEach
    public void initTest() {
        appStatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createAppStatus() throws Exception {
        int databaseSizeBeforeCreate = appStatusRepository.findAll().size();
        // Create the AppStatus
        restAppStatusMockMvc.perform(post("/api/app-statuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appStatus)))
            .andExpect(status().isCreated());

        // Validate the AppStatus in the database
        List<AppStatus> appStatusList = appStatusRepository.findAll();
        assertThat(appStatusList).hasSize(databaseSizeBeforeCreate + 1);
        AppStatus testAppStatus = appStatusList.get(appStatusList.size() - 1);
        assertThat(testAppStatus.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createAppStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = appStatusRepository.findAll().size();

        // Create the AppStatus with an existing ID
        appStatus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAppStatusMockMvc.perform(post("/api/app-statuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appStatus)))
            .andExpect(status().isBadRequest());

        // Validate the AppStatus in the database
        List<AppStatus> appStatusList = appStatusRepository.findAll();
        assertThat(appStatusList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAppStatuses() throws Exception {
        // Initialize the database
        appStatusRepository.saveAndFlush(appStatus);

        // Get all the appStatusList
        restAppStatusMockMvc.perform(get("/api/app-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(appStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }

    @Test
    @Transactional
    public void getAppStatus() throws Exception {
        // Initialize the database
        appStatusRepository.saveAndFlush(appStatus);

        // Get the appStatus
        restAppStatusMockMvc.perform(get("/api/app-statuses/{id}", appStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(appStatus.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    public void getNonExistingAppStatus() throws Exception {
        // Get the appStatus
        restAppStatusMockMvc.perform(get("/api/app-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAppStatus() throws Exception {
        // Initialize the database
        appStatusRepository.saveAndFlush(appStatus);

        int databaseSizeBeforeUpdate = appStatusRepository.findAll().size();

        // Update the appStatus
        AppStatus updatedAppStatus = appStatusRepository.findById(appStatus.getId()).get();
        // Disconnect from session so that the updates on updatedAppStatus are not directly saved in db
        em.detach(updatedAppStatus);
        updatedAppStatus
            .status(UPDATED_STATUS);

        restAppStatusMockMvc.perform(put("/api/app-statuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAppStatus)))
            .andExpect(status().isOk());

        // Validate the AppStatus in the database
        List<AppStatus> appStatusList = appStatusRepository.findAll();
        assertThat(appStatusList).hasSize(databaseSizeBeforeUpdate);
        AppStatus testAppStatus = appStatusList.get(appStatusList.size() - 1);
        assertThat(testAppStatus.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingAppStatus() throws Exception {
        int databaseSizeBeforeUpdate = appStatusRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAppStatusMockMvc.perform(put("/api/app-statuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(appStatus)))
            .andExpect(status().isBadRequest());

        // Validate the AppStatus in the database
        List<AppStatus> appStatusList = appStatusRepository.findAll();
        assertThat(appStatusList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAppStatus() throws Exception {
        // Initialize the database
        appStatusRepository.saveAndFlush(appStatus);

        int databaseSizeBeforeDelete = appStatusRepository.findAll().size();

        // Delete the appStatus
        restAppStatusMockMvc.perform(delete("/api/app-statuses/{id}", appStatus.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AppStatus> appStatusList = appStatusRepository.findAll();
        assertThat(appStatusList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
