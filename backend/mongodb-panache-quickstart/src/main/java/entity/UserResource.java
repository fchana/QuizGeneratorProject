package entity;

import java.util.List;

import javax.inject.Inject;
import javax.management.Query;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;

@Path("api/user")
@Consumes("application/json")
@Produces("application/json")
public class UserResource {
    @Inject
    UserRepository userRepository;

    @GET
    public List<User> list() {
        return userRepository.listAll();
    }

    @GET
    @Path("/{email}")
    public User user(String email) {
        return userRepository.findByEmail(email);
    }

    @GET
    @Path("/getAllStd")
    public List<User> getAllStd() {
        return userRepository.findByAccountType();
    }

    @POST
    public Response create(User user) {
        userRepository.persist(user);
        return Response.status(201).build();
    }

    // @PUT
    // @Path("/{id}/prop")
    // public Response createProp(User user) {
    // userRepository.persist(user);
    // return Response.status(201).build();
    // }

    @PUT
    @Path("/{id}")
    public void update(String id, User user) {
        user.setId(new ObjectId(id));
        userRepository.update(user);
    }

    @DELETE
    @Path("/{id}")
    public void delete(String id) {
        User user = userRepository.findById(new ObjectId(id));
        userRepository.delete(user);
    }

}
