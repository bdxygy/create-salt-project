import { TAnswers } from "../types.js";
import { execCommand, log, spinner } from "../utils.js";
import { BaseProject } from "./base.js";
// export const createAngularProject = async (answers: TAnswers) => {
//   await execCommand(
//     `npx -p @angular/cli@latest ng new ${answers.projectName} --style scss --routing true --ssr false --package-manager ${answers.packageManager}`
//   );
// };

export class AngularProject extends BaseProject {
  constructor(protected answers: TAnswers) {
    super(answers);
    this.fileStylesPath = "./src/styles.scss";
  }

  async createProject() {
    const angularSpinner = spinner(
      "Please wait, initializing your project...\n"
    ).start();
    await execCommand(
      `npx -p @angular/cli@latest ng new ${this.answers.projectName} --style scss --routing true --ssr false --package-manager ${this.answers.packageManager}`
    );
    angularSpinner.stop();

    log("✔ Project created successfully!");
  }
}
