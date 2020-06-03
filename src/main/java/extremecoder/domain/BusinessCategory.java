package extremecoder.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A BusinessCategory.
 */
@Entity
@Table(name = "business_category")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BusinessCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToOne
    @JoinColumn(unique = true)
    private BusinessCategory parentCategory;

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

    public BusinessCategory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BusinessCategory getParentCategory() {
        return parentCategory;
    }

    public BusinessCategory parentCategory(BusinessCategory businessCategory) {
        this.parentCategory = businessCategory;
        return this;
    }

    public void setParentCategory(BusinessCategory businessCategory) {
        this.parentCategory = businessCategory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BusinessCategory)) {
            return false;
        }
        return id != null && id.equals(((BusinessCategory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BusinessCategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
