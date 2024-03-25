import { execCommand } from "../utils.js";
export const createAngularProject = async (answers) => {
    await execCommand(`npx -p @angular/cli@latest ng new ${answers.projectName} --style scss --routing true --ssr false --package-manager ${answers.packageManager}`);
};
//# sourceMappingURL=angular.js.map