package extremecoder.web.rest;

import extremecoder.BlogApp;
import extremecoder.domain.BusinessCategory;
import extremecoder.repository.BusinessCategoryRepository;

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
 * Integration tests for the {@link BusinessCategoryResource} REST controller.
 */
@SpringBootTest(classes = BlogApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BusinessCategoryResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private BusinessCategoryRepository businessCategoryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBusinessCategoryMockMvc;

    private BusinessCategory businessCategory;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BusinessCategory createEntity(EntityManager em) {
        BusinessCategory businessCategory = new BusinessCategory()
            .name(DEFAULT_NAME);
        return businessCategory;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BusinessCategory createUpdatedEntity(EntityManager em) {
        BusinessCategory businessCategory = new BusinessCategory()
            .name(UPDATED_NAME);
        return businessCategory;
    }

    @BeforeEach
    public void initTest() {
        businessCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createBusinessCategory() throws Exception {
        int databaseSizeBeforeCreate = businessCategoryRepository.findAll().size();
        // Create the BusinessCategory
        restBusinessCategoryMockMvc.perform(post("/api/business-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessCategory)))
            .andExpect(status().isCreated());

        // Validate the BusinessCategory in the database
        List<BusinessCategory> businessCategoryList = businessCategoryRepository.findAll();
        assertThat(businessCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        BusinessCategory testBusinessCategory = businessCategoryList.get(businessCategoryList.size() - 1);
        assertThat(testBusinessCategory.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createBusinessCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = businessCategoryRepository.findAll().size();

        // Create the BusinessCategory with an existing ID
        businessCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBusinessCategoryMockMvc.perform(post("/api/business-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessCategory)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessCategory in the database
        List<BusinessCategory> businessCategoryList = businessCategoryRepository.findAll();
        assertThat(businessCategoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBusinessCategories() throws Exception {
        // Initialize the database
        businessCategoryRepository.saveAndFlush(businessCategory);

        // Get all the businessCategoryList
        restBusinessCategoryMockMvc.perform(get("/api/business-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(businessCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    public void getBusinessCategory() throws Exception {
        // Initialize the database
        businessCategoryRepository.saveAndFlush(businessCategory);

        // Get the businessCategory
        restBusinessCategoryMockMvc.perform(get("/api/business-categories/{id}", businessCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(businessCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingBusinessCategory() throws Exception {
        // Get the businessCategory
        restBusinessCategoryMockMvc.perform(get("/api/business-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBusinessCategory() throws Exception {
        // Initialize the database
        businessCategoryRepository.saveAndFlush(businessCategory);

        int databaseSizeBeforeUpdate = businessCategoryRepository.findAll().size();

        // Update the businessCategory
        BusinessCategory updatedBusinessCategory = businessCategoryRepository.findById(businessCategory.getId()).get();
        // Disconnect from session so that the updates on updatedBusinessCategory are not directly saved in db
        em.detach(updatedBusinessCategory);
        updatedBusinessCategory
            .name(UPDATED_NAME);

        restBusinessCategoryMockMvc.perform(put("/api/business-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBusinessCategory)))
            .andExpect(status().isOk());

        // Validate the BusinessCategory in the database
        List<BusinessCategory> businessCategoryList = businessCategoryRepository.findAll();
        assertThat(businessCategoryList).hasSize(databaseSizeBeforeUpdate);
        BusinessCategory testBusinessCategory = businessCategoryList.get(businessCategoryList.size() - 1);
        assertThat(testBusinessCategory.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingBusinessCategory() throws Exception {
        int databaseSizeBeforeUpdate = businessCategoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBusinessCategoryMockMvc.perform(put("/api/business-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessCategory)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessCategory in the database
        List<BusinessCategory> businessCategoryList = businessCategoryRepository.findAll();
        assertThat(businessCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBusinessCategory() throws Exception {
        // Initialize the database
        businessCategoryRepository.saveAndFlush(businessCategory);

        int databaseSizeBeforeDelete = businessCategoryRepository.findAll().size();

        // Delete the businessCategory
        restBusinessCategoryMockMvc.perform(delete("/api/business-categories/{id}", businessCategory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BusinessCategory> businessCategoryList = businessCategoryRepository.findAll();
        assertThat(businessCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
