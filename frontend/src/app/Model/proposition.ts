import { Quiz } from "./quiz";

export interface Proposition {
    quiz: Array<Quiz>;

    allowed: Array<String>;

    prop_name: String;

    prop_time: number;

    quiz_amount: number;

    max_score: number;

    start_date: Date;

}
