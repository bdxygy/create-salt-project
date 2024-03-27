import { TAnswers } from "../../types.js";
import { execCommandOnProject, log, spinner } from "../../utils.js";
import { commandRun } from "./command-run.js";

const commandInstallFormatterLiteral = {
  pnpm: "pnpm add --save-dev --save-exact prettier && pnpm add -D @ianvs/prettier-plugin-sort-imports && pnpm add -g prettier",
  npm: "npm install --save-dev --save-exact prettier && npm install -D @ianvs/prettier-plugin-sort-imports &&  npm install -g prettier",
  yarn: "yarn add --dev --exact prettier && yarn add -D @ianvs/prettier-plugin-sort-imports && yarn add -g prettier",
};

const formatterConfiguration = {
  trailingComma: "es5",
  tabWidth: 2,
  singleQuote: true,
  semi: true,
  bracketSameLine: true,
  // Since prettier 3.0, manually specifying plugins is required
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  // This plugin's options
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};

export const createFormatterConfiguration = async (answers: TAnswers) => {
  const loadingSpinner = spinner(
    "Creating formatter configuration...\n"
  ).start();

  await execCommandOnProject(answers)(
    `${commandInstallFormatterLiteral[answers.packageManager]}`
  );

  await execCommandOnProject(answers)(
    `echo "${JSON.stringify(
      JSON.stringify(formatterConfiguration)
    )}" > .prettierrc.json`
  );

  const packageJson = JSON.parse(
    (await execCommandOnProject(answers)(
      "cat package.json"
    )) as unknown as string
  );

  packageJson.scripts.format =
    'prettier --write "./**/*.{js,jsx,ts,tsx,css,scss,md,json}" .';

  await execCommandOnProject(answers)(
    `echo "${JSON.stringify(JSON.stringify(packageJson))}" > package.json`
  );

  await execCommandOnProject(answers)(
    `${commandRun[answers.packageManager]} format`
  );

  loadingSpinner.stop();

  log("✔ Formatter configuration created successfully!");
};
