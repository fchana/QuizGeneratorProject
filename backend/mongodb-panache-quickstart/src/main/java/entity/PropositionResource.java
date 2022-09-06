package entity;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.acme.mongodb.panache.repository.Person;
import org.acme.mongodb.panache.repository.PersonRepository;
import org.bson.types.ObjectId;

@Path("/proposition")
@Consumes("application/json")
@Produces("application/json")
public class PropositionResource {
    @Inject
    PropositionRepository propositionRepository;

    @GET
    public List<Proposition> list() {
        return propositionRepository.listAll();
    }
    
    @POST
    public Response create(Proposition prop) {
    		propositionRepository.persist(prop);
        return Response.status(201).build();
    }
    
    @PUT
    @Path("/{id}")
    public void update(String id, Proposition prop) {
    	prop.setId(new ObjectId(id));
    	propositionRepository.update(prop);
    }

    @DELETE
    @Path("/{id}")
    public void delete(String id) {
    	Proposition prop = propositionRepository.findById(new ObjectId(id));
        propositionRepository.delete(prop);
    }

}
