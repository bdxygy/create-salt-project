import { commandInstallPackageLiteral, execCommandOnProject, log, spinner, } from "../../utils.js";
const checkGit = async (answers) => {
    let result = (await execCommandOnProject(answers)("ls -a"));
    result = result.replace(".gitignore", "");
    return result.includes(".git");
};
const createSaltPrecommit = async (answers, packageJson) => {
    packageJson.scripts = {
        ...packageJson.scripts,
        commit: "git-cz",
    };
    packageJson.config = {
        commitizen: {
            path: "./node_modules/cz-salt",
            jiraPrefix: `${answers.projectJiraKey}`,
            jiraPrepend: "[",
            jiraAppend: "]",
        },
    };
};
const createPreprareScript = (packageJson) => {
    if (packageJson.scripts) {
        packageJson.scripts.prepare = "husky";
    }
};
const createPostinstallScript = (packageJson) => {
    if (packageJson.scripts) {
        packageJson.scripts.postinstall = "husky";
        packageJson.scripts.prepack = "pinst --disable";
        packageJson.scripts.postpack = "pinst --enable";
    }
};
const commandsInstallLiteral = {
    pnpm: "pnpm add --save-dev husky",
    npm: "npm install --save-dev husky",
    yarn: "yarn add --dev husky",
};
const commandConfigLiteral = {
    pnpm: "pnpm prepare",
    npm: "npm run prepare",
    yarn: "yarn run postinstall",
};
export const createPrecommitConfiguration = async (answers) => {
    await execCommandOnProject(answers)(`${commandInstallPackageLiteral[answers.packageManager]} -D cz-salt commitizen`);
    const gitExist = await checkGit(answers);
    if (!gitExist) {
        log("Git not found! Initializing git...");
        await execCommandOnProject(answers)("git init");
    }
    const loadingSpinner = spinner("Creating pre-commit configuration\n").start();
    await execCommandOnProject(answers)(commandsInstallLiteral[answers.packageManager]);
    let packageJsonString = (await execCommandOnProject(answers)("cat package.json"));
    let packageJsonObject = JSON.parse(packageJsonString);
    if (answers.packageManager === "yarn") {
        createPostinstallScript(packageJsonObject);
    }
    else {
        createPreprareScript(packageJsonObject);
    }
    await execCommandOnProject(answers)(`echo ${JSON.stringify(JSON.stringify(packageJsonObject))} > package.json`);
    await execCommandOnProject(answers)(commandConfigLiteral[answers.packageManager]);
    const commitMessage = `echo "Precommit Running!"`;
    await execCommandOnProject(answers)(`echo ${JSON.stringify(commitMessage)} > .husky/pre-commit`);
    packageJsonString = (await execCommandOnProject(answers)("cat package.json"));
    packageJsonObject = JSON.parse(packageJsonString);
    await createSaltPrecommit(answers, packageJsonObject);
    await execCommandOnProject(answers)(`echo ${JSON.stringify(JSON.stringify(packageJsonObject))} > package.json`);
    loadingSpinner.stop();
    log("Pre-commit configuration created successfully!");
};
//# sourceMappingURL=precommit.js.map