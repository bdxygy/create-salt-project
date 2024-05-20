import { exec } from "child_process";
import ora from "ora";
import { writeFileSync } from "fs";
export const log = console.log;
export const projectOptions = [
    "next.js",
    "@angular",
];
export const packageManagerOptions = ["npm", "yarn", "pnpm"];
export const commandRun = {
    pnpm: "pnpm",
    npm: "npm run",
    yarn: "yarn",
};
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
export const execCommandOnProject = (answers) => async (command) => await execCommand(`cd ./${answers.projectName} && ${command}`);
export const commandInstallPackageLiteral = {
    pnpm: "pnpm add",
    npm: "npm install",
    yarn: "yarn add",
};
export const execWriteFile = async (answer, fileName, value) => {
    await writeFileSync(`${answer.CWD}/${fileName}`, value, {
        encoding: "utf-8",
    });
};
