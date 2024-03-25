#! /usr/bin/env node
import { questions } from "./questions.js";
import inquirer from "inquirer";
import chalk from "chalk";
import { log } from "./utils.js";
import { createLinterConfiguration } from "./packages/utilities/linter.js";
import { createPrecommitConfiguration } from "./packages/utilities/precommit.js";
import { createProjectConfiguration } from "./packages/index.js";
import { createFormatterConfiguration } from "./packages/utilities/formatter.js";
log(chalk.white.bgMagenta("\nHello Salters!\n"));
const answers = await inquirer.prompt(questions);
await createProjectConfiguration(answers);
await createPrecommitConfiguration(answers);
await createLinterConfiguration(answers);
await createFormatterConfiguration(answers);
//# sourceMappingURL=index.js.map