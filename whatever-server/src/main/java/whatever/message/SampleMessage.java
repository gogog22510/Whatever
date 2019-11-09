package whatever.message;

import lombok.Data;

/**
 * Sample Message wrapper for testing only
 */
public final class SampleMessage {

    public static class Test {}

    public static class ShowSettings {}

    @Data
    public static class AskDatabase {
        private final String sql;
    }
}
