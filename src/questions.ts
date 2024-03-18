import { packageManagerOptions, projectOptions } from "./utils.js";

export const questions = [
  {
    type: "input",
    name: "projectName",
    message: "What is your project name?",
    default: "my-project",
  },

  {
    type: "list",
    name: "projectFramework",
    message: "What is your project framework you want to use?",
    choices: projectOptions,
  },

  {
    type: "list",
    name: "packageManager",
    message: "What is your project package manager you want to use?",
    choices: packageManagerOptions,
  },

  {
    type: "input",
    name: "projectJiraKey",
    message: "What is your project key (Jira)?",
    default: "SALT",
  },
];
