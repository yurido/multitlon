package org.multitlon.health;

import com.codahale.metrics.health.HealthCheck;

public class MultitlonHealthCheck extends HealthCheck {

    @Override
    protected Result check() throws Exception {
        return Result.healthy();
    }
}
