#! /usr/bin/env node
import { questions } from "./questions.js";
import inquirer from "inquirer";
import chalk from "chalk";
import { log } from "./utils.js";
import figlet from "figlet";
import packageJson from "../package.json" assert { type: "json" };
import { NextProject } from "./packages/next.js";
import { AngularProject } from "./packages/angular.js";
figlet("Hello Salters!", async (err, data) => {
    if (err)
        return log("Ops! Something went wrong...\nPlease get help to contributors!\n");
    log(`${chalk.bold.cyan(data)} V${packageJson.version}\n`);
    let project;
    const answers = await inquirer.prompt(questions);
    answers.CWD = process.cwd();
    if (answers.projectFramework === "next.js") {
        project = new NextProject(answers);
    }
    if (answers.projectFramework === "@angular") {
        project = new AngularProject(answers);
    }
    await project.run();
});
