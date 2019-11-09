package whatever;

import akka.actor.ActorRef;
import akka.actor.ActorSystem;
import akka.actor.Props;
import akka.stream.ActorMaterializer;
import org.apache.log4j.BasicConfigurator;
import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.hk2.utilities.ServiceLocatorUtilities;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import whatever.actors.SampleActor;
import whatever.core.InjectedSupportActor;
import whatever.message.SampleMessage;

import java.util.Scanner;

public class TestPlayground {
    private static final Logger LOG = LoggerFactory.getLogger(TestPlayground.class);

    private final ActorSystem system = ActorSystem.create("JavaServer");
    private final ActorMaterializer materializer = ActorMaterializer.create(system);
    private final Binder binder = new Binder(system, materializer);
    private final ServiceLocator locator = ServiceLocatorUtilities.bind(binder);

    public <T extends InjectedSupportActor> ActorRef createActorRef(Class<T> actor) {
        ActorRef actorRef = system.actorOf(Props.create(actor));
        actorRef.tell(locator, actorRef);
        return actorRef;
    }

    public void shutdown() {
        this.system.terminate();
    }

    public static void main(String[] args) {
        BasicConfigurator.configure();
        TestPlayground test = new TestPlayground();

        LOG.info("Initialize actor system");
        final ActorRef testActorRef = test.createActorRef(SampleActor.class);

        // Create actor by this method
        testActorRef.tell(new SampleMessage.ShowSettings(), ActorRef.noSender());

        LOG.warn("Since the actor is run in async mode.");
        LOG.warn("Need to stop the application with some timeout.");
        LOG.warn("Press enter to stop the Test.");
        new Scanner(System.in).nextLine();
        LOG.warn("Test will shutdown.");
        test.shutdown();
        System.exit(0);
    }
}
