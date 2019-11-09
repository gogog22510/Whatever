package whatever.core;

import akka.actor.ActorRef;
import akka.actor.ActorSystem;
import akka.actor.Props;
import org.glassfish.hk2.api.Injectee;
import org.glassfish.hk2.api.InjectionResolver;
import org.glassfish.hk2.api.ServiceHandle;
import org.glassfish.hk2.api.ServiceLocator;
import org.jvnet.hk2.annotations.Service;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;

@Service
@Singleton
public class InjectActorResolver implements InjectionResolver<InjectActor> {

    @Inject
    private ActorSystem system;

    @Inject
    private ServiceLocator locator;

    @Inject @Named(InjectionResolver.SYSTEM_RESOLVER_NAME)
    private InjectionResolver<Inject> systemResolver;

    @Override
    public Object resolve(Injectee injectee, ServiceHandle<?> root) {
        InjectActor annotation = injectee.getParent().getAnnotation(InjectActor.class);
        ActorRef actorRef = system.actorOf(Props.create(annotation.value()));
        actorRef.tell(locator, actorRef);
        return actorRef;
    }

    @Override
    public boolean isConstructorParameterIndicator() {
        return false;
    }

    @Override
    public boolean isMethodParameterIndicator() {
        return false;
    }
}
