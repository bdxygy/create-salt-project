import { TAnswers } from "../types.js";
import { BaseProject } from "./base.js";
export declare class NextProject extends BaseProject {
    protected answers: TAnswers;
    private commandInstallScssLiteral;
    constructor(answers: TAnswers);
    createProject(): Promise<void>;
}
