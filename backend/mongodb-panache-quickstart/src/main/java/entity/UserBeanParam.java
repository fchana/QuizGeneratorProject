package entity;
import javax.ws.rs.QueryParam;


public class UserBeanParam {

    @QueryParam(value = "firstName")
    private String firstName;

    @QueryParam(value = "lastName")
    private String lastName;

    @QueryParam(value = "email")
    private String email;

    @QueryParam(value = "proposition")
    private String proposition;
    
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setProposition(String proposition) {
        this.proposition = proposition;
    }

    public String getProposition() {
        return proposition;
    }

    



}