package whatever.core;

import akka.actor.AbstractActor;
import org.glassfish.hk2.api.ServiceLocator;

/**
 * Injected support actor which will receive ServiceLocator instance
 * to perform dependency injection and then change itself behaviour
 */
public abstract class InjectedSupportActor extends AbstractActor {
    protected abstract Receive createActualReceive();

    @Override
    public Receive createReceive() {
        return receiveBuilder()
            .match(ServiceLocator.class, locator -> {
                locator.inject(this);
                locator.postConstruct(this);
                getContext().become(createActualReceive());
            })
            .build();
    }
}
