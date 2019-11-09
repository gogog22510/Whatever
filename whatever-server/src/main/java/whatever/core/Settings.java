package whatever.core;

import lombok.Data;
import org.jvnet.hk2.annotations.Service;

import javax.inject.Singleton;
import java.time.Duration;

@Service @Singleton @Data
public class Settings {
    private final Duration askTimeout = Duration.ofSeconds(5L);
}
