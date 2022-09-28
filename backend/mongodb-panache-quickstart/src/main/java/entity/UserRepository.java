package entity;

import java.lang.reflect.Array;
import java.util.List;

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

    public List<User> findByAccountType()  {
        return find("account_type",false).list();
    }
    
}
