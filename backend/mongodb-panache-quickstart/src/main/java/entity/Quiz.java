package entity;

import java.util.List;

import com.arjuna.ats.internal.jdbc.drivers.modifiers.list;

import org.bson.types.ObjectId;

import io.quarkus.mongodb.panache.common.MongoEntity;

public class Quiz {
	
	public List<Choice> choice;
	
    public String content;
    
    public int choice_type;
    
    public int time_limit;
    
    public int choice_amount;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getChoice_type() {
		return choice_type;
	}

	public void setChoice_type(int choice_type) {
		this.choice_type = choice_type;
	}

	public int getTime_limit() {
		return time_limit;
	}

	public void setTime_limit(int time_limit) {
		this.time_limit = time_limit;
	}

	public int getChoice_amount() {
		return choice_amount;
	}

	public void setChoice_amount(int choice_amount) {
		this.choice_amount = choice_amount;
	}
    
    

}
