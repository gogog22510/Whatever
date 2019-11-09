package whatever.actors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import whatever.core.InjectedSupportActor;
import whatever.core.Settings;
import whatever.message.SampleMessage;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

/**
 * Sample actor for testing only
 */
public class SampleActor extends InjectedSupportActor {
    private static final Logger LOG = LoggerFactory.getLogger(SampleActor.class);

    @Inject
    private Settings settings;

    @PostConstruct
    private void initialize() {
        LOG.info("Post construction is invoked.");
    }

    @Override
    protected Receive createActualReceive() {
        return receiveBuilder()
            .match(SampleMessage.Test.class, msg -> {
                LOG.info("This is a test.");
            })
            .match(SampleMessage.ShowSettings.class, msg -> {
                LOG.info("{}", settings);
            })
            .build();
    }
}
