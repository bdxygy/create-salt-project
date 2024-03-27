#! /usr/bin/env node
import { questions } from "./questions.js";
import inquirer from "inquirer";
import chalk from "chalk";
import { log } from "./utils.js";
import { createLinterConfiguration } from "./packages/utilities/linter.js";
import { createPrecommitConfiguration } from "./packages/utilities/precommit.js";
import { createProjectConfiguration } from "./packages/index.js";
import { createFormatterConfiguration } from "./packages/utilities/formatter.js";
import { createTailwindConfig } from "./packages/utilities/tailwind-config.js";
import figlet from "figlet";
import packageJson from "../package.json" with { type: "json" };
figlet("Hello Salters!", async (err, data) => {
    if (err)
        return log("Ops! Something went wrong...\nPlease get help to contributors!\n");
    log(`${chalk.bold.cyan(data)} V${packageJson.version}\n`);
    const answers = await inquirer.prompt(questions);
    await createProjectConfiguration(answers);
    await createPrecommitConfiguration(answers);
    await createTailwindConfig(answers);
    await createLinterConfiguration(answers);
    await createFormatterConfiguration(answers);
});
//# sourceMappingURL=index.js.map