package entity;

import javax.enterprise.context.ApplicationScoped;

import io.quarkus.mongodb.panache.PanacheMongoRepository;

@ApplicationScoped
public class UserRepository implements PanacheMongoRepository<User> { 
    public User findByName(String name)  {
        return find("name", name).firstResult();
    }

    public User findByEmail(String email)  {
        return find("email", email).firstResult();
    }
    
}
