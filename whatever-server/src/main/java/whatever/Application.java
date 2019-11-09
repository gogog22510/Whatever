package whatever;

import org.apache.log4j.BasicConfigurator;
import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.hk2.utilities.ServiceLocatorUtilities;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import whatever.core.ServerExecutor;

import java.util.Scanner;

public class Application {
    private static final Logger LOG = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        BasicConfigurator.configure();
        ServiceLocator locator = ServiceLocatorUtilities.bind(new Binder());
        ServerExecutor server = locator.getService(ServerExecutor.class);
        server.run();

        LOG.warn("Press enter to stop the server.");
        Scanner scanner = new Scanner(System.in);
        scanner.nextLine();
        LOG.warn("Server will shutdown.");
        System.exit(0);
    }
}
