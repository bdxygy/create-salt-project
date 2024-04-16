import { execCommand, execCommandOnProject, log, spinner } from "../utils.js";
import { BaseProject } from "./base.js";
export class AngularProject extends BaseProject {
    answers;
    constructor(answers) {
        super(answers);
        this.answers = answers;
        this.fileStylesPath = "./src/styles.scss";
    }
    async createProject() {
        const angularSpinner = spinner("Please wait, initializing your project...\n")
            .start()
            .stop();
        const commandInstall = `npx -p @angular/cli@latest ng new ${this.answers.projectName} --style scss --routing true --ssr false --package-manager ${this.answers.packageManager}`;
        await execCommand(commandInstall);
        await execCommandOnProject(this.answers)(`echo "<div className='flex w-screen h-screen items-center justify-center'>
            <h1 className='text-3xl font-bold text-center'>Hello Salters!</h1>
          </div>" > src/app/app.component.html`);
        angularSpinner.stop();
        log("✔ Project created successfully!");
    }
    async createTesting() {
        const loadingSpinner = spinner("Creating testing configuration...\n").start();
        await execCommandOnProject(this.answers)(`ng generate config karma`);
        const packageJson = JSON.parse((await execCommandOnProject(this.answers)("cat package.json")));
        packageJson.scripts = {
            ...packageJson.scripts,
            test: "ng test --code-coverage --watch",
            testonpipeline: "ng test --no-watch --code-coverage --browsers=ChromeHeadless",
        };
        await execCommandOnProject(this.answers)(`echo "${JSON.stringify(JSON.stringify(packageJson))}" > package.json`);
        loadingSpinner.stop();
        log("✔ Testing configuration created successfully!");
    }
}
