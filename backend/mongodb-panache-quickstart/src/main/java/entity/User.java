package entity;

import java.util.List;

import org.bson.types.ObjectId;

import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(collection = "users")
public class User {
    public ObjectId id;

	public String email;

	public String username;
	
	public String password;
	
	public String firstname;
	
	public String lastname;
	
	public boolean account_type;
	
	public List<Score> score;
	
	public List<Proposition> proposition;
	
	public ObjectId getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public boolean isAccount_type() {
		return account_type;
	}

	public void setAccount_type(boolean account_type) {
		this.account_type = account_type;
	}

	public List<Score> getScore() {
		return score;
	}

	public void setScore(List<Score> score) {
		this.score = score;
	}

	public List<Proposition> getProposition() {
		return proposition;
	}

	public void setProposition(List<Proposition> proposition) {
		this.proposition = proposition;
	}

	public void setId(ObjectId objectId) {
		this.id = objectId;
		
	}
	
	
	
}
