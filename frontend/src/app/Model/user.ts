import { Proposition } from "./proposition";
import { Score } from "./score";

export interface User {
    id: String;

    email: String;

    firstname: String;

    lastname: String;

    username: String;

    password: String;

    account_type: boolean;

    proposition: Array<Proposition>

    score: Array<Score>

}
