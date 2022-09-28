import { Quiz } from "./quiz";

export interface Proposition {
    quiz: Array<Quiz>;

    allowed: Array<Object>;

    prop_name: String;

    prop_time: String;

    quiz_amount: number;

    max_score: String;

    start_date: Date;

}
