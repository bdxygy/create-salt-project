import { TAnswers } from "../types.js";
import { execCommand, log, spinner } from "../utils.js";
export const createAngularProject = async (answers: TAnswers) => {
  await execCommand(
    `npx -p @angular/cli@latest ng new ${answers.projectName} --style scss --routing true --ssr false --package-manager ${answers.packageManager}`
  );
};
