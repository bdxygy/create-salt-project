import { execCommand, execCommandOnProject, execWriteFile, log, spinner, } from "../utils.js";
import { BaseProject } from "./base.js";
export class AngularProject extends BaseProject {
    answers;
    constructor(answers) {
        super(answers);
        this.answers = answers;
        this.fileStylesPath = "./src/styles.scss";
    }
    async createProject() {
        const angularSpinner = spinner("Please wait, initializing your project...\n").start();
        const commandInstall = `npx -p @angular/cli@latest ng new ${this.answers.projectName} --style scss --routing true --ssr false --package-manager ${this.answers.packageManager}`;
        await execCommand(commandInstall);
        await execWriteFile(this.answers, "src/app/app.component.html", `<div className='flex w-screen h-screen items-center justify-center'>
          <h1 className='text-3xl font-bold text-center'>Hello Salters!</h1>
        </div>`);
        angularSpinner.stop();
        log("✔ Project created successfully!");
    }
    async createTesting() {
        const loadingSpinner = spinner("Creating testing configuration...\n").start();
        await execCommandOnProject(this.answers)(`ng generate config karma`);
        const packageJson = require(this.answers.CWD + "/package.json");
        packageJson.scripts = {
            ...packageJson.scripts,
            test: "ng test --code-coverage --watch",
            testonpipeline: "ng test --no-watch --code-coverage --browsers=ChromeHeadless",
        };
        await execWriteFile(this.answers, "package.json", JSON.stringify(packageJson));
        loadingSpinner.stop();
        log("✔ Testing configuration created successfully!");
    }
}
