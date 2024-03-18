import { execCommand, log, spinner } from "../utils.js";
export const createAngularProject = (answers) => {
    const loadingSpinner = spinner("Please wait, initializing your project...\n").start();
    execCommand(`npx -p @angular/cli@latest ng new ${answers.projectName} --style scss --routing true --ssr false --package-manager ${answers.packageManager}`).then((response) => {
        log(response);
        loadingSpinner.stop();
    });
};
//# sourceMappingURL=angular.js.map