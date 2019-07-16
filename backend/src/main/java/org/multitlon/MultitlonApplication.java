package org.multitlon;

import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.eclipse.jetty.server.Server;
import org.multitlon.health.MultitlonHealthCheck;
import org.multitlon.resources.HelloworldResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class MultitlonApplication extends Application<MultitlonConfiguration> implements ServletContextListener {
    private static ServletContext servletContext;
    private static final Logger LOG = LoggerFactory.getLogger(MultitlonApplication.class);


    public static void main(final String[] args) throws Exception {
        new MultitlonApplication().run(args);
    }

    @Override
    public String getName() {
        return String.format("Sport diary and competition app %", getName());
    }

    @Override
    public void initialize(final Bootstrap<MultitlonConfiguration> bootstrap) {
        // TODO: application initialization
        bootstrap.addBundle(new AssetsBundle("/assets", "/", "index.html"));
        LOG.info("App initialized");
    }

    @Override
    public void run(final MultitlonConfiguration configuration,
                    final Environment environment) {
        // TODO: implement application
        final HelloworldResource helloworldResource = new HelloworldResource();
        final MultitlonHealthCheck multitlonHealthCheck = new MultitlonHealthCheck();

        environment.healthChecks().register("app", multitlonHealthCheck);
        environment.jersey().register(helloworldResource);
        LOG.info("App is beeng run");
    }

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        if (servletContext != null) {
            throw new IllegalStateException("Multple WebListeners extending WebApplication detected. Only one is allowed!");
        }
        servletContext = sce.getServletContext();
        try {
            run();
        } catch (Exception e) {
            throw new RuntimeException("Initialization of Dropwizard failed ...", e);
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        Server server = (Server) servletContext.getAttribute("fakeJettyServer");
        if (server != null) {
            try {
                server.stop();
            } catch (Exception e) {
                throw new RuntimeException("Shutdown of Dropwizard failed ...", e);
            }
        }
        servletContext = null;
    }

    public static ServletContext servletContext() {
        return servletContext;
    }

}
