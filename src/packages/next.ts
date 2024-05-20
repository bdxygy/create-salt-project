import { TAnswers } from "../types.js";
import {
  execCommand,
  execCommandOnProject,
  execWriteFile,
  log,
  spinner,
} from "../utils.js";
import { BaseProject } from "./base.js";

export class NextProject extends BaseProject {
  private commandInstallScssLiteral = {
    pnpm: "pnpm add -D sass@latest",
    npm: "npm install -D sass@latest",
    yarn: "yarn add -D sass@latest",
  };

  private commandInstalTestingLiteral = {
    pnpm: "pnpm add -D jest @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/jest jest-environment-jsdom",
    npm: "npm install -D jest @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/jest jest-environment-jsdom",
    yarn: "yarn add -D jest @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/jest jest-environment-jsdom",
  };

  private jestConfigFnString = (
    answers: TAnswers
  ) => `import type { Config } from 'jest';
  import NextJest from 'next/jest';
  
  const createJestConfiguration = NextJest({
    dir: './',
  });
  
  const config: Config = {
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,
  
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
  
    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',
  
    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: ['/node_modules/'],
  
    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',
  
    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: ['json', 'text', 'lcov', 'clover'],
  
    // The test environment that will be used for testing
    testEnvironment: 'jsdom',
  
    // The glob patterns Jest uses to detect test files
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['/node_modules/'],
  
    moduleNameMapper: {
      '^@${answers.projectName}/(.*)$': '<rootDir>/src/$1',
    },
  
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  };
  
  export default createJestConfiguration(config);`;

  private jestSetupString = `import '@testing-library/jest-dom';`;

  constructor(protected answers: TAnswers) {
    super(answers);

    this.eslintConfiguration.extends = [
      ...this.eslintConfiguration.extends,
      "next/core-web-vitals",
    ];

    this.fileStylesPath = "./src/styles/globals.scss";

    this.commanInstallLinterLiteral.npm +=
      " && npm i --save-dev eslint-config-next";
    this.commanInstallLinterLiteral.yarn +=
      " && yarn add --dev eslint-config-next";
    this.commanInstallLinterLiteral.pnpm +=
      " && pnpm add -D eslint-config-next";
  }

  async createProject(): Promise<void> {
    await this.createPagesRouterProject();
  }

  async createPagesRouterProject() {
    const loadingSpinner = spinner(
      "Please wait, initializing your project...\n"
    ).start();
    let commandString = `npx create-next-app@latest ${this.answers.projectName} --no-eslint --ts --use-${this.answers.packageManager} --src-dir --no-tailwind`;

    commandString += ` --import-alias "@${this.answers.projectName}/*"`;

    commandString += " --no-app";

    await execCommand(commandString);

    await execCommandOnProject(this.answers)(
      `mv ./src/styles/globals.css ./src/styles/globals.scss`
    );

    await execCommandOnProject(this.answers)(`rm src/styles/Home.module.css`);

    /**
     * Update index.tsx
     */

    // await execCommandOnProject(this.answers)(
    // `echo "export default function Home() {
    //   return (
    //     <div className='flex w-screen h-screen items-center justify-center'>
    //       <h1 className='text-3xl font-bold text-center'>Hello Salters!</h1>
    //     </div>
    //   );
    // }" > src/pages/index.tsx`
    // );

    await execWriteFile(
      this.answers,
      "src/pages/index.tsx",
      `export default function Home() {
      return (
        <div className='flex w-screen h-screen items-center justify-center'>
          <h1 className='text-3xl font-bold text-center'>Hello Salters!</h1>
        </div>
      );
    }`
    );

    /**
     * Update App.tsx
     */

    // await execCommandOnProject(this.answers)(
    //   `echo "import '@${this.answers.projectName}/styles/globals.scss';
    //   import type { AppProps } from 'next/app';

    //   export default function App({ Component, pageProps }: AppProps) {
    //     return <Component {...pageProps} />;
    //   }" > src/pages/_app.tsx`
    // );

    await execWriteFile(
      this.answers,
      "src/pages/_app.tsx",
      `import '@${this.answers.projectName}/styles/globals.scss';
    import type { AppProps } from 'next/app';
    
    export default function App({ Component, pageProps }: AppProps) {
      return <Component {...pageProps} />;
    }`
    );

    /**
     * Install sass
     */

    await execCommandOnProject(this.answers)(
      `${this.commandInstallScssLiteral[this.answers.packageManager]}`
    );

    loadingSpinner.stop();
    log("✔ Project created successfully!");
  }

  async createTesting() {
    const loadingSpinner = spinner(
      "Creating testing configuration...\n"
    ).start();

    await execCommandOnProject(this.answers)(
      `${this.commandInstalTestingLiteral[this.answers.packageManager]}`
    );

    // await execCommandOnProject(this.answers)(
    //   `echo "${this.jestConfigFnString(this.answers)}" > jest.config.ts`
    // );

    await execWriteFile(
      this.answers,
      "jest.config.ts",
      this.jestConfigFnString(this.answers)
    );

    // await execCommandOnProject(this.answers)(
    //   `echo "${this.jestSetupString}" > jest.setup.ts`
    // );

    await execWriteFile(this.answers, "jest.setup.ts", this.jestSetupString);

    // const packageJson = JSON.parse(
    //   (await execCommandOnProject(this.answers)(
    //     "cat package.json"
    //   )) as unknown as string
    // );

    const packageJson = require(this.answers.CWD +
      this.answers.projectName +
      "/package.json");

    packageJson.scripts = {
      ...packageJson.scripts,
      test: "jest --watch",
      testonpipeline: "jest",
    };

    // await execCommandOnProject(this.answers)(
    //   `echo "${JSON.stringify(JSON.stringify(packageJson))}" > package.json`
    // );

    await execWriteFile(
      this.answers,
      "package.json",
      JSON.stringify(packageJson)
    );

    loadingSpinner.stop();
    log("✔ Testing configuration created successfully!");
  }
}
