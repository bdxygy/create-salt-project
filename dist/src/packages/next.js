import { execCommand, execCommandOnProject, spinner } from "../utils.js";
import { BaseProject } from "./base.js";
// const commandInstallScssLiteral = {
//   pnpm: "pnpm add -D sass@latest",
//   npm: "npm install -D sass@latest",
//   yarn: "yarn add -D sass@latest",
// };
// export const createNextProject = async (answers: TAnswers) => {
//   let commandString = `npx create-next-app@latest ${answers.projectName} --no-eslint --ts --use-${answers.packageManager} --src-dir --no-tailwind`;
//   commandString += ` --import-alias "@${answers.projectName}/*"`;
//   commandString += " --no-app";
//   const loadingSpinner = spinner(
//     "Please wait, initializing your project...\n"
//   ).start();
//   await execCommand(commandString);
//   loadingSpinner.stop();
//   await execCommandOnProject(answers)(
//     `mv ./src/styles/globals.css ./src/styles/globals.scss`
//   );
//   await execCommandOnProject(answers)(`rm src/styles/Home.module.css`);
//   /**
//    * Update index.tsx
//    */
//   await execCommandOnProject(answers)(
//     `echo "export default function Home() {
//       return <h1>Hello Salters!</h1>;
//     }" > src/pages/index.tsx`
//   );
//   /**
//    * Update App.tsx
//    */
//   await execCommandOnProject(answers)(
//     `echo "import '@/styles/globals.scss';
//     import type { AppProps } from 'next/app';
//     export default function App({ Component, pageProps }: AppProps) {
//       return <Component {...pageProps} />;
//     }" > src/pages/_app.tsx`
//   );
//   /**
//    * Install sass
//    */
//   await execCommandOnProject(answers)(
//     `${commandInstallScssLiteral[answers.packageManager]}`
//   );
// };
export class NextProject extends BaseProject {
    answers;
    commandInstallScssLiteral = {
        pnpm: "pnpm add -D sass@latest",
        npm: "npm install -D sass@latest",
        yarn: "yarn add -D sass@latest",
    };
    constructor(answers) {
        super(answers);
        this.answers = answers;
        this.eslintConfiguration.extends.push("next/core-web-vitals");
        this.fileStylesPath = "./src/styles/globals.scss";
        this.commanInstallLinterLiteral.npm +=
            "npm i --save-dev eslint-config-next";
        this.commanInstallLinterLiteral.yarn += "yarn add --dev eslint-config-next";
        this.commanInstallLinterLiteral.pnpm += "pnpm add -D eslint-config-next";
    }
    async createProject() {
        let commandString = `npx create-next-app@latest ${this.answers.projectName} --no-eslint --ts --use-${this.answers.packageManager} --src-dir --no-tailwind`;
        commandString += ` --import-alias "@${this.answers.projectName}/*"`;
        commandString += " --no-app";
        const loadingSpinner = spinner("Please wait, initializing your project...\n").start();
        await execCommand(commandString);
        loadingSpinner.stop();
        await execCommandOnProject(this.answers)(`mv ./src/styles/globals.css ./src/styles/globals.scss`);
        await execCommandOnProject(this.answers)(`rm src/styles/Home.module.css`);
        /**
         * Update index.tsx
         */
        await execCommandOnProject(this.answers)(`echo "export default function Home() {
        return <h1>Hello Salters!</h1>;
      }" > src/pages/index.tsx`);
        /**
         * Update App.tsx
         */
        await execCommandOnProject(this.answers)(`echo "import '@${this.answers.projectName}/styles/globals.scss';
      import type { AppProps } from 'next/app';
      
      export default function App({ Component, pageProps }: AppProps) {
        return <Component {...pageProps} />;
      }" > src/pages/_app.tsx`);
        /**
         * Install sass
         */
        await execCommandOnProject(this.answers)(`${this.commandInstallScssLiteral[this.answers.packageManager]}`);
    }
}
//# sourceMappingURL=next.js.map