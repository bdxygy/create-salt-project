#! /usr/bin/env node

import { questions } from "./questions.js";
import inquirer from "inquirer";
import { TAnswers } from "./types.js";
import chalk from "chalk";
import { log } from "./utils.js";
import { createLinterConfiguration } from "./packages/utilities/linter.js";
import { createPrecommitConfiguration } from "./packages/utilities/precommit.js";
import { createProjectConfiguration } from "./packages/index.js";

log(chalk.white.bgMagenta("\nHello Salters!\n"));

log(chalk.white.bgRed("WARNING:\n"));

log("🚧: Still under development\n✅: Ready for use\n");

const answers: TAnswers = await inquirer.prompt(questions);

await createProjectConfiguration(answers);

await createPrecommitConfiguration(answers);

await createLinterConfiguration(answers);
