import inquirer from "inquirer";
import { TAnswers } from "../types.js";
import { execCommand, execCommandOnProject, spinner } from "../utils.js";
import { log } from "console";

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

const commandInstallScssLiteral = {
  pnpm: "pnpm add -D sass@latest",
  npm: "npm install -D sass@latest",
  yarn: "yarn add -D sass@latest",
};

export const createNextProject = async (answers: TAnswers) => {
  const nextProjectAnswer: { importAlias: string; appDirectory: boolean } =
    await inquirer.prompt(nextProjectQuestions);

  let commandString = `npx create-next-app@latest ${answers.projectName} --no-eslint --ts --use-${answers.packageManager} --src-dir --no-tailwind`;

  if (nextProjectAnswer.importAlias) {
    commandString += ` --import-alias "${nextProjectAnswer.importAlias}"`;
  }

  if (nextProjectAnswer.appDirectory) {
    commandString += " --app";
  } else {
    commandString += " --no-app";
  }

  const loadingSpinner = spinner(
    "Please wait, initializing your project...\n"
  ).start();

  await execCommand(commandString);

  loadingSpinner.stop();

  await execCommandOnProject(answers)(
    `mv ./src/styles/globals.css ./src/styles/globals.scss`
  );

  await execCommandOnProject(answers)(`rm src/styles/Home.module.css`);

  /**
   * Update index.tsx
   */

  const res = await execCommandOnProject(answers)(
    `echo "export default function Home() {
      return <h1>Hello Salters!</h1>;
    }" > src/pages/index.tsx`
  );

  /**
   * Update App.tsx
   */

  await execCommandOnProject(answers)(
    `echo "import '@/styles/globals.scss';
    import type { AppProps } from 'next/app';
    
    export default function App({ Component, pageProps }: AppProps) {
      return <Component {...pageProps} />;
    }" > src/pages/_app.tsx`
  );

  /**
   * Install sass
   */

  await execCommandOnProject(answers)(
    `${commandInstallScssLiteral[answers.packageManager]}`
  );
};
