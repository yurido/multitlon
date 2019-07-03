package org.multitlon.resources;

import com.codahale.metrics.annotation.Timed;
import org.multitlon.api.Saying;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.Optional;

@Path("/rest/saying")
@Produces(MediaType.APPLICATION_JSON)
public class HelloworldResource {
    @GET
    @Timed
    public Saying sayHello(@QueryParam("content") Optional<String> name) {
        final String value = String.format(name.orElse("yura"));
        System.out.print( String.format("/rest/saying request received: %s", value));

        return new Saying(value);
    }
}
