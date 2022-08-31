package entity;

import io.quarkus.mongodb.panache.common.MongoEntity;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

//@MongoEntity(collection = "proposition")
public class Proposition {
	public List<Quiz> quiz;
	
    public ObjectId id;
    
//    public String id;
    
    public List<ObjectId> allowed;
    
    public String prop_name;
    
    public int prop_time;
    
    public int quiz_amount;
    
    public double max_score;
    
    @BsonProperty("start_date")
    public LocalDateTime start_date;

	
	public String getProp_name() {
		return prop_name;
	}

	public void setProp_name(String prop_name) {
		this.prop_name = prop_name;
	}


	public int getProp_time() {
		return prop_time;
	}

	public void setProp_time(int prop_time) {
		this.prop_time = prop_time;
	}

	public int getQuiz_amount() {
		return quiz_amount;
	}

	public void setQuiz_amount(int quiz_amount) {
		this.quiz_amount = quiz_amount;
	}

	public double getMax_score() {
		return max_score;
	}

	public void setMax_score(double max_score) {
		this.max_score = max_score;
	}

	public ObjectId getId() {
		return id;
	}

	public void setId(ObjectId id) {
		this.id = id;
	}

	public LocalDateTime getStart_date() {
		return start_date;
	}

	public void setStart_date(LocalDateTime start_date) {
		this.start_date = start_date;
	}



    
    
    }
