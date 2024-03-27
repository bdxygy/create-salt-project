import { execCommand, execCommandOnProject, spinner } from "../utils.js";
const commandInstallScssLiteral = {
    pnpm: "pnpm add -D sass@latest",
    npm: "npm install -D sass@latest",
    yarn: "yarn add -D sass@latest",
};
export const createNextProject = async (answers) => {
    let commandString = `npx create-next-app@latest ${answers.projectName} --no-eslint --ts --use-${answers.packageManager} --src-dir --no-tailwind`;
    commandString += ` --import-alias "@${answers.projectName}/*"`;
    commandString += " --no-app";
    const loadingSpinner = spinner("Please wait, initializing your project...\n").start();
    await execCommand(commandString);
    loadingSpinner.stop();
    await execCommandOnProject(answers)(`mv ./src/styles/globals.css ./src/styles/globals.scss`);
    await execCommandOnProject(answers)(`rm src/styles/Home.module.css`);
    /**
     * Update index.tsx
     */
    await execCommandOnProject(answers)(`echo "export default function Home() {
      return <h1>Hello Salters!</h1>;
    }" > src/pages/index.tsx`);
    /**
     * Update App.tsx
     */
    await execCommandOnProject(answers)(`echo "import '@/styles/globals.scss';
    import type { AppProps } from 'next/app';
    
    export default function App({ Component, pageProps }: AppProps) {
      return <Component {...pageProps} />;
    }" > src/pages/_app.tsx`);
    /**
     * Install sass
     */
    await execCommandOnProject(answers)(`${commandInstallScssLiteral[answers.packageManager]}`);
};
//# sourceMappingURL=next.js.map