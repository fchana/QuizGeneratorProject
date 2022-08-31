package entity;

import io.quarkus.mongodb.panache.PanacheMongoRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class PropositionRepository implements PanacheMongoRepository<Proposition> {
    public Proposition findByName(String name) {
        return find("name", name).firstResult();
    }
    
    
}
