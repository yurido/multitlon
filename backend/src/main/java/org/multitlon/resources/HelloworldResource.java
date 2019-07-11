package org.multitlon.resources;

import org.multitlon.api.Saying;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("/rest/saying")
@Produces(MediaType.APPLICATION_JSON)
public class HelloworldResource {
    @GET
    public List<Saying> sayHello() {

        List<Saying> response = new ArrayList<>();
        response.add(new Saying("yura"));
        response.add(new Saying("dasha"));
        response.add(new Saying("danjel"));
        return response;
    }
}
