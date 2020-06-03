package extremecoder.domain;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

import extremecoder.web.rest.TestUtil;

public class AppStatusTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AppStatus.class);
        AppStatus appStatus1 = new AppStatus();
        appStatus1.setId(1L);
        AppStatus appStatus2 = new AppStatus();
        appStatus2.setId(appStatus1.getId());
        assertThat(appStatus1).isEqualTo(appStatus2);
        appStatus2.setId(2L);
        assertThat(appStatus1).isNotEqualTo(appStatus2);
        appStatus1.setId(null);
        assertThat(appStatus1).isNotEqualTo(appStatus2);
    }
}
