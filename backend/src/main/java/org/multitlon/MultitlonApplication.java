package org.multitlon;

import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.multitlon.health.MultitlonHealthCheck;
import org.multitlon.resources.SayingResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MultitlonApplication extends Application<MultitlonConfiguration> {
    private static final Logger LOG = LoggerFactory.getLogger(MultitlonApplication.class);


    public static void main(final String[] args) throws Exception {
        new MultitlonApplication().run(args);
    }

    @Override
    public String getName() {
        return "Multitlon";
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
        environment.healthChecks().register("app", new MultitlonHealthCheck());
        environment.jersey().register(new SayingResource());
        LOG.info("App is being run");
    }

}
