import { log } from "console";
import { TAnswers } from "../../types.js";
import { execCommandOnProject, spinner } from "../../utils.js";

const eslintConfiguration = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: [
    "node_modules/**",
    "dist/**",
    "coverage/**",
    "test/**",
    ".next/**",
    "**/*.json",
  ],
  rules: {
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/adjacent-overload-signatures": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "space-before-blocks": "error",
    "no-alert": "error",
    "no-empty": "error",
    "no-empty-function": "off",
    "no-empty-character-class": "error",
    "no-multiple-empty-lines": "error",
    "no-implicit-coercion": "error",
    "no-unneeded-ternary": "error",
    "no-cond-assign": "error",
    "no-var": "error",
    "prefer-const": "error",
    "comma-spacing": "error",
    "comma-dangle": "error",
    "array-callback-return": "off",
    "no-array-constructor": "error",

    "no-debugger": "off",
    "no-dupe-else-if": "error",
    "no-duplicate-case": "error",
    "no-duplicate-imports": "error",
    "no-sparse-arrays": "error",
    "no-console": [
      "error",
      {
        allow: ["error"],
      },
    ],
    "no-unreachable": "off",
    "no-unreachable-loop": "error",
    "no-unsafe-negation": "error",
    "space-infix-ops": "error",
    quotes: ["off", "single"],
    "linebreak-style": ["off", "unix"],
    semi: ["error", "always"],
    "max-lines": [
      "error",
      {
        max: 500,
        skipBlankLines: true,
      },
    ],
  },
};

const lintStagedConfiguration = (answers: TAnswers) => `module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
  '**/*.{html,css,scss,json}': ['prettier --write'],
}`;

const commanInstallLinterLiteral = {
  npm: "npm install -D eslint@latest @typescript-eslint/eslint-plugin @typescript-eslint/parser && npm i -g eslint",
  yarn: "yarn add -D eslint@latest @typescript-eslint/eslint-plugin @typescript-eslint/parser && yarn add -g eslint",
  pnpm: "pnpm add -D eslint@latest @typescript-eslint/eslint-plugin @typescript-eslint/parser && pnpm add -g eslint",
};

export const createLinterConfiguration = async (answers: TAnswers) => {
  const loadingSpinner = spinner("Creating linter configuration...\n").start();

  await execCommandOnProject(answers)(
    `${commanInstallLinterLiteral[answers.packageManager]}`
  );

  if (answers.projectFramework === "next.js") {
    eslintConfiguration.extends.push("next/core-web-vitals");
  }

  await execCommandOnProject(answers)(
    `echo "${JSON.stringify(
      JSON.stringify(eslintConfiguration)
    )}" > .eslintrc.json`
  );

  const response = await execCommandOnProject(answers)(
    `echo "${lintStagedConfiguration(answers)}" > .lintstagedrc.js`
  );

  const packageJson = JSON.parse(
    (await execCommandOnProject(answers)(
      "cat package.json"
    )) as unknown as string
  );

  packageJson.scripts.lint = "eslint .";

  await execCommandOnProject(answers)(
    `echo "${JSON.stringify(JSON.stringify(packageJson))}" > package.json`
  );

  loadingSpinner.stop();
  log("✔ Linter configuration created successfully!");
};
