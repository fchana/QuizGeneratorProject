import { Proposition } from "./proposition";
import { Select } from "./select";

export interface Score {
    score: number;
    proposition: Proposition;
    selects: Array<Select>;
}
