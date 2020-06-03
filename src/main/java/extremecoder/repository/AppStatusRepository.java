package extremecoder.repository;

import extremecoder.domain.AppStatus;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AppStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppStatusRepository extends JpaRepository<AppStatus, Long> {
}
