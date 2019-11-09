package whatever.route;

import akka.actor.ActorRef;
import akka.actor.ActorSystem;
import akka.http.javadsl.marshallers.jackson.Jackson;
import akka.http.javadsl.model.StatusCodes;
import akka.http.javadsl.server.AllDirectives;
import akka.http.javadsl.server.PathMatchers;
import akka.http.javadsl.server.Route;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import org.glassfish.hk2.api.ServiceLocator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import whatever.core.Settings;
import whatever.utils.ActorDSL;

import javax.inject.Inject;
import java.util.Optional;
import java.util.concurrent.TimeoutException;

public class ServerRoutes extends AllDirectives {
    private static final Logger LOG = LoggerFactory.getLogger(ServerRoutes.class);

    private final ActorSystem system;
    private final ServiceLocator locator;
    private final Settings settings;

    private final ObjectMapper objectMapper;

    @Inject
    public ServerRoutes(ActorSystem system, ServiceLocator locator,
                        Settings settings) {
        this.system = system;
        this.locator = locator;
        this.settings = settings;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new Jdk8Module());
    }

    /**
     * This method creates one route (of possibly many more that will be part of your Web App)
     */
    //#all-routes
    public Route routes() {
        return concat(
            pathPrefix("hello", () ->
                concat(
                    getHello(),
                    path(PathMatchers.segment(), message -> concat(
                        getAck(message)
                      )
                    )
                ))
        );
    }
    //#all-routes

    private Route getHello() {
        return pathEnd(() -> concat(
            get(() -> complete("Hello World"))
        ));
    }

    private Route getAck(String message) {
        return concat(
            get(() -> complete("Hello "+ message))
        );
    }

    @SuppressWarnings("all")
    private Route askActorAndReturnJson(ActorRef actorRef, Object message) {
        try {
            Optional<Object> maybeResult = ActorDSL.ask(actorRef, message, settings.getAskTimeout());
            if (maybeResult.isPresent()) {
                return complete(StatusCodes.OK, maybeResult.get(), Jackson.marshaller());
            }
            else {
                return complete(StatusCodes.NOT_FOUND);
            }
        } catch (TimeoutException e) {
            return complete(StatusCodes.NOT_FOUND);
        } catch (InterruptedException e) {
            return complete(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    private Route tellActor(ActorRef actorRef, Object message) {
        actorRef.tell(message, actorRef);
        return complete(StatusCodes.OK);
    }
}
