#! /usr/bin/env node

import { questions } from "./questions.js";
import inquirer from "inquirer";
import { TAnswers } from "./types.js";
import chalk from "chalk";
import { log } from "./utils.js";
import figlet from "figlet";
import packageJson from "../package.json" assert { type: "json" };
import { BaseProjectI } from "./packages/base.js";
import { NextProject } from "./packages/next.js";
import { AngularProject } from "./packages/angular.js";

figlet("Hello Salters!", async (err, data) => {
  if (err)
    return log(
      "Ops! Something went wrong...\nPlease get help to contributors!\n"
    );

  log(`${chalk.bold.cyan(data)} V${packageJson.version}\n`);

  let project: BaseProjectI;

  const answers: TAnswers = await inquirer.prompt(questions);

  if (answers.projectFramework === "next.js") {
    project = new NextProject(answers);
  }

  if (answers.projectFramework === "@angular") {
    project = new AngularProject(answers);
  }

  await project.run();
});
