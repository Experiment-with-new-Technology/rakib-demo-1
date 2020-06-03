package extremecoder.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Application.
 */
@Entity
@Table(name = "application")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Application implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "version")
    private String version;

    @ManyToOne
    @JsonIgnoreProperties(value = "applications", allowSetters = true)
    private AppStatus status;

    @ManyToOne
    @JsonIgnoreProperties(value = "applications", allowSetters = true)
    private BusinessCategory businessCategory;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Application name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public Application version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public AppStatus getStatus() {
        return status;
    }

    public Application status(AppStatus appStatus) {
        this.status = appStatus;
        return this;
    }

    public void setStatus(AppStatus appStatus) {
        this.status = appStatus;
    }

    public BusinessCategory getBusinessCategory() {
        return businessCategory;
    }

    public Application businessCategory(BusinessCategory businessCategory) {
        this.businessCategory = businessCategory;
        return this;
    }

    public void setBusinessCategory(BusinessCategory businessCategory) {
        this.businessCategory = businessCategory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Application)) {
            return false;
        }
        return id != null && id.equals(((Application) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Application{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", version='" + getVersion() + "'" +
            "}";
    }
}
