package extremecoder.web.rest;

import extremecoder.domain.BusinessCategory;
import extremecoder.repository.BusinessCategoryRepository;
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
 * REST controller for managing {@link extremecoder.domain.BusinessCategory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BusinessCategoryResource {

    private final Logger log = LoggerFactory.getLogger(BusinessCategoryResource.class);

    private static final String ENTITY_NAME = "businessCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BusinessCategoryRepository businessCategoryRepository;

    public BusinessCategoryResource(BusinessCategoryRepository businessCategoryRepository) {
        this.businessCategoryRepository = businessCategoryRepository;
    }

    /**
     * {@code POST  /business-categories} : Create a new businessCategory.
     *
     * @param businessCategory the businessCategory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new businessCategory, or with status {@code 400 (Bad Request)} if the businessCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/business-categories")
    public ResponseEntity<BusinessCategory> createBusinessCategory(@RequestBody BusinessCategory businessCategory) throws URISyntaxException {
        log.debug("REST request to save BusinessCategory : {}", businessCategory);
        if (businessCategory.getId() != null) {
            throw new BadRequestAlertException("A new businessCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BusinessCategory result = businessCategoryRepository.save(businessCategory);
        return ResponseEntity.created(new URI("/api/business-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /business-categories} : Updates an existing businessCategory.
     *
     * @param businessCategory the businessCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated businessCategory,
     * or with status {@code 400 (Bad Request)} if the businessCategory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the businessCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/business-categories")
    public ResponseEntity<BusinessCategory> updateBusinessCategory(@RequestBody BusinessCategory businessCategory) throws URISyntaxException {
        log.debug("REST request to update BusinessCategory : {}", businessCategory);
        if (businessCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BusinessCategory result = businessCategoryRepository.save(businessCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, businessCategory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /business-categories} : get all the businessCategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of businessCategories in body.
     */
    @GetMapping("/business-categories")
    public List<BusinessCategory> getAllBusinessCategories() {
        log.debug("REST request to get all BusinessCategories");
        return businessCategoryRepository.findAll();
    }

    /**
     * {@code GET  /business-categories/:id} : get the "id" businessCategory.
     *
     * @param id the id of the businessCategory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the businessCategory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/business-categories/{id}")
    public ResponseEntity<BusinessCategory> getBusinessCategory(@PathVariable Long id) {
        log.debug("REST request to get BusinessCategory : {}", id);
        Optional<BusinessCategory> businessCategory = businessCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(businessCategory);
    }

    /**
     * {@code DELETE  /business-categories/:id} : delete the "id" businessCategory.
     *
     * @param id the id of the businessCategory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/business-categories/{id}")
    public ResponseEntity<Void> deleteBusinessCategory(@PathVariable Long id) {
        log.debug("REST request to delete BusinessCategory : {}", id);
        businessCategoryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
