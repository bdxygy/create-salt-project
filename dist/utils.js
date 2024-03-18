import { exec } from "child_process";
import ora from "ora";
export const log = console.log;
export const projectOptions = ["🚧 react", "✅ next.js", "✅ @angular"];
export const packageManagerOptions = ["npm", "yarn", "pnpm"];
export const spinner = (message) => ora(message);
export const execCommand = async (command) => new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            resolve(error);
        }
        else if (stderr) {
            resolve(stderr);
        }
        else {
            resolve(stdout);
        }
    });
});
export const execCommandOnProject = (answers) => async (command) => await execCommand(`cd ${answers.projectName} && ${command}`);
export const commandInstallPackageLiteral = {
    pnpm: "pnpm add",
    npm: "npm install",
    yarn: "yarn add",
};
//# sourceMappingURL=utils.js.map