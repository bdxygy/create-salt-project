import chalk from "chalk";
import { TAnswers } from "../types.js";
import { exec, execSync } from "child_process";
import { execCommand, log, spinner } from "../utils.js";
import { stdout } from "process";
export const createAngularProject = async (answers: TAnswers) => {
  await execCommand(
    `npx -p @angular/cli@latest ng new ${answers.projectName} --style scss --routing true --ssr false --package-manager ${answers.packageManager}`
  );
};
