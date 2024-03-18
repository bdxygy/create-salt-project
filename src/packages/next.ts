import inquirer from "inquirer";
import { TAnswers } from "../types.js";
import { execCommand, spinner } from "../utils.js";

const nextProjectQuestions = [
  {
    type: "input",
    name: "importAlias",
    message: "What is your import alias?",
    default: "@/*",
  },
  {
    type: "confirm",
    name: "appDirectory",
    message: "Do you want an app directory?",
    default: false,
  },
];

export const createNextProject = async (answers: TAnswers) => {
  const nextProjectAnswer: { importAlias: string; appDirectory: boolean } =
    await inquirer.prompt(nextProjectQuestions);

  const loadingSpinner = spinner(
    "Please wait, initializing your project...\n"
  ).start();

  let commandString = `npx create-next-app@latest ${answers.projectName} --ts --tailwind --eslint --use-${answers.packageManager} --src-dir`;

  if (nextProjectAnswer.importAlias) {
    commandString += ` --import-alias ${nextProjectAnswer.importAlias}`;
  }

  if (nextProjectAnswer.appDirectory) {
    commandString += " --app";
  }

  await execCommand(commandString).then(() => loadingSpinner.stop());
};
