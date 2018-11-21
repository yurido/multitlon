package org.multitlon;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.multitlon.health.MultitlonHealthCheck;
import org.multitlon.resources.HelloworldResource;

public class MultitlonApplication extends Application<MultitlonConfiguration> {

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
        // bootstrap.addBundle(new AssetsBundle("/", "/", null));
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

}
