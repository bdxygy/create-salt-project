import { TAnswers } from "../types.js";
import { BaseProject } from "./base.js";
export declare class AngularProject extends BaseProject {
    protected answers: TAnswers;
    constructor(answers: TAnswers);
    createProject(): Promise<void>;
    createTesting(): Promise<void>;
}
