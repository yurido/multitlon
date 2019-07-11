package org.multitlon;

import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.eclipse.jetty.server.Server;
import org.multitlon.health.MultitlonHealthCheck;
import org.multitlon.resources.HelloworldResource;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class MultitlonApplication extends Application<MultitlonConfiguration> implements ServletContextListener {
    private static ServletContext servletContext;

    public static void main(final String[] args) throws Exception {
        new MultitlonApplication().run(args);
    }

    @Override
    public String getName() {
        return "Sport diary and competition app";
    }

    @Override
    public void initialize(final Bootstrap<MultitlonConfiguration> bootstrap) {
        // TODO: application initialization
        bootstrap.addBundle(new AssetsBundle("/assets", "/", "index.html"));
    }

    @Override
    public void run(final MultitlonConfiguration configuration,
                    final Environment environment) {
        // TODO: implement application
        final HelloworldResource helloworldResource = new HelloworldResource();
        final MultitlonHealthCheck multitlonHealthCheck = new MultitlonHealthCheck();

        environment.healthChecks().register("app", multitlonHealthCheck);
        environment.jersey().register(helloworldResource);
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

}
