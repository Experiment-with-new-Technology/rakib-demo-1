package extremecoder.web.rest;

import extremecoder.domain.AppStatus;
import extremecoder.repository.AppStatusRepository;
import extremecoder.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link extremecoder.domain.AppStatus}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AppStatusResource {

    private final Logger log = LoggerFactory.getLogger(AppStatusResource.class);

    private static final String ENTITY_NAME = "appStatus";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AppStatusRepository appStatusRepository;

    public AppStatusResource(AppStatusRepository appStatusRepository) {
        this.appStatusRepository = appStatusRepository;
    }

    /**
     * {@code POST  /app-statuses} : Create a new appStatus.
     *
     * @param appStatus the appStatus to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new appStatus, or with status {@code 400 (Bad Request)} if the appStatus has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/app-statuses")
    public ResponseEntity<AppStatus> createAppStatus(@RequestBody AppStatus appStatus) throws URISyntaxException {
        log.debug("REST request to save AppStatus : {}", appStatus);
        if (appStatus.getId() != null) {
            throw new BadRequestAlertException("A new appStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AppStatus result = appStatusRepository.save(appStatus);
        return ResponseEntity.created(new URI("/api/app-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /app-statuses} : Updates an existing appStatus.
     *
     * @param appStatus the appStatus to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated appStatus,
     * or with status {@code 400 (Bad Request)} if the appStatus is not valid,
     * or with status {@code 500 (Internal Server Error)} if the appStatus couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/app-statuses")
    public ResponseEntity<AppStatus> updateAppStatus(@RequestBody AppStatus appStatus) throws URISyntaxException {
        log.debug("REST request to update AppStatus : {}", appStatus);
        if (appStatus.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AppStatus result = appStatusRepository.save(appStatus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, appStatus.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /app-statuses} : get all the appStatuses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of appStatuses in body.
     */
    @GetMapping("/app-statuses")
    public List<AppStatus> getAllAppStatuses() {
        log.debug("REST request to get all AppStatuses");
        return appStatusRepository.findAll();
    }

    /**
     * {@code GET  /app-statuses/:id} : get the "id" appStatus.
     *
     * @param id the id of the appStatus to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the appStatus, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/app-statuses/{id}")
    public ResponseEntity<AppStatus> getAppStatus(@PathVariable Long id) {
        log.debug("REST request to get AppStatus : {}", id);
        Optional<AppStatus> appStatus = appStatusRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(appStatus);
    }

    /**
     * {@code DELETE  /app-statuses/:id} : delete the "id" appStatus.
     *
     * @param id the id of the appStatus to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/app-statuses/{id}")
    public ResponseEntity<Void> deleteAppStatus(@PathVariable Long id) {
        log.debug("REST request to delete AppStatus : {}", id);
        appStatusRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
