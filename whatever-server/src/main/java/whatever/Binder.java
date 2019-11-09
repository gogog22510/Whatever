package whatever;

import akka.actor.ActorSystem;
import akka.stream.ActorMaterializer;
import akka.stream.Materializer;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import whatever.core.InjectActorResolver;
import whatever.core.JavaServer;
import whatever.core.Settings;
import whatever.route.ServerRoutes;

public class Binder extends AbstractBinder {
    private final ActorSystem system;
    private final ActorMaterializer materializer;

    Binder() {
        this.system = ActorSystem.create("JavaServer");
        this.materializer = ActorMaterializer.create(system);
    }

    // CONSTRUCTOR FOR TEST ONLY
    Binder(ActorSystem system, ActorMaterializer materializer) {
        this.system = system;
        this.materializer = materializer;
    }

    @Override
    protected void configure() {
        bindActorSystem();
        addActiveDescriptor(Settings.class);
        addActiveDescriptor(JavaServer.class);
        addActiveDescriptor(ServerRoutes.class);
    }

    private void bindActorSystem() {
        bind(system).to(ActorSystem.class);
        bind(materializer).to(Materializer.class);
        addActiveDescriptor(InjectActorResolver.class);
    }
}
