import { Choice } from "./choice";

export interface Quiz {
    
    choice: Array<Choice>;

    content: String;

    choice_type: number;

    time_limit: number;

    choice_amount: number;

    score: number
}
