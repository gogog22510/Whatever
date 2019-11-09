package whatever.core;

import akka.NotUsed;
import akka.actor.ActorSystem;
import akka.http.javadsl.ConnectHttp;
import akka.http.javadsl.Http;
import akka.http.javadsl.model.HttpRequest;
import akka.http.javadsl.model.HttpResponse;
import akka.stream.Materializer;
import akka.stream.javadsl.Flow;
import org.jvnet.hk2.annotations.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import whatever.route.ServerRoutes;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
@Service
public class JavaServer implements ServerExecutor {
    private static final Logger LOG = LoggerFactory.getLogger(JavaServer.class);

    private final ActorSystem system;
    private final Materializer materializer;

    private final ServerRoutes routes;

    @Inject
    public JavaServer(ActorSystem system, Materializer materializer,
                      ServerRoutes routes) {
        this.system = system;
        this.materializer = materializer;
        this.routes = routes;
    }

    @Override
    public void run() {
        final Http http = Http.get(system);
        final Flow<HttpRequest, HttpResponse, NotUsed> routeFlow = routes.routes().flow(system, materializer);
        http.bindAndHandle(routeFlow, ConnectHttp.toHost("localhost", 8080), materializer);

        Runtime.getRuntime().addShutdownHook(new Thread(system::terminate));

        LOG.info("Server online at http://localhost:8080/");
    }
}
