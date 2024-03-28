import { log } from "console";
import { commandInstallPackageLiteral, commandRun, execCommandOnProject, spinner, } from "../utils.js";
export class BaseProject {
    answers;
    fileStylesPath = "./src/styles.scss";
    eslintConfiguration = {
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
    lintStagedConfiguration = `module.exports = {
    '**/*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
    '**/*.{html,css,scss,json}': ['prettier --write'],
  }`;
    commanInstallLinterLiteral = {
        npm: "npm install -D eslint@latest @typescript-eslint/eslint-plugin @typescript-eslint/parser && npm i -g eslint",
        yarn: "yarn add -D eslint@latest @typescript-eslint/eslint-plugin @typescript-eslint/parser && yarn add -g eslint",
        pnpm: "pnpm add -D eslint@latest @typescript-eslint/eslint-plugin @typescript-eslint/parser && pnpm add -g eslint",
    };
    commandInstallFormatterLiteral = {
        pnpm: "pnpm add --save-dev --save-exact prettier && pnpm add -D @ianvs/prettier-plugin-sort-imports && pnpm add -g prettier",
        npm: "npm install --save-dev --save-exact prettier && npm install -D @ianvs/prettier-plugin-sort-imports &&  npm install -g prettier",
        yarn: "yarn add --dev --exact prettier && yarn add -D @ianvs/prettier-plugin-sort-imports && yarn add -g prettier",
    };
    formatterConfiguration = {
        trailingComma: "es5",
        tabWidth: 2,
        singleQuote: true,
        semi: true,
        bracketSameLine: true,
        plugins: ["@ianvs/prettier-plugin-sort-imports"],
        importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
    };
    tailwindConfigString = `module.exports = {
    prefix: '',
    content: [
      'src/**/*.{html,ts,tsx,js,jsx}'
    ],
    darkMode: 'class', // 'media' or 'class'
    theme: {
      extend: {
        outline: {
          tselBlue: '#0050AE',
          tselRed: '#FF0025'
        },
        height: {
          fc: 'fit-content'
        },
        maxHeight: {
          320: '320px',
          fc: 'fit-content'
        },
        minHeight: {
          fc: 'fit-content'
        },
        zIndex: {
          '-10': '-10'
        },
        transitionProperty: {
          height: 'height',
          spacing: 'margin, padding'
        },
        borderRadius: {
          20: '20px'
        },
        lineHeight: {
          12: '3rem'
        }
      },
      colors: {
        primary: {
          darkBlue: '#001A41',
          tselRed: '#FF0025',
          tselBlack: '#000000',
          tselWhite: '#ffffff',
          tselGrey10: '#FAFAFB',
          tselGrey20: '#EDECF0',
          tselGrey40: '#CCCFD3',
          tselGrey50: '#79838D',
          tselGrey60: '#99A0A7',
          tselGrey80: '#66707A',
          tselGrey90: '#5F6368',
          tselGrey100: '#4E5764'
        },
        secondary: {
          tselRed: '#ED0226',
          tselDarkRed: '#B90024',
          tselErrorRed: '#BC1D42',
          tselLightDarkRed: '#F2E2E2',
          tselLightRed: '#FCF4F4',
          tselSemanticRead: '#FEEFEB',
          tselMustard: '#FDA22B',
          tselLightMustard: '#FFEED8',
          tselBlue: '#0050AE',
          tselOtherLightBlue: '#1A73E8',
          tselLightBlue: '#EDF5FC',
          tselSoftBlue: '#CDD6E7',
          tselOtherSoftBlue: '#E9F6FF',
          tselDarkBlue100: '#F9F9FA',
          tselGreen: '#008E53',
          tselCard: '#F6F3F3',
          tselDivider: '#C4C4C4',
          tselGoldenYellow100: '#F6AB2F',
          tselShadesBlue: '#344960',
          tselShades600: '#334867',
          tselPink: '#FCF4F4',
          tselShadeInkBlade: '#001122',
          tselShadeGray50: '#79838D',
          tselTagBackgound: '#E9E4E4',
          tselSunsetOrange: '#FE6E00',
          tselSecondaryGreyBg: '#F5F6FA',
          tselSpearminGreen: '#EEF9F4',
          tselForestGreen100: '#1D9940',
          tselWarningOrange: '#D44000',
          tselSemanticBlue: '#E9F6FF',
          tselCultured: '#F7F7F7',
          tselCoolGrey: '#8C99AC',
          tselLightGrey: '#CCD1D9',
          tselAliceBlue: '#E9F6FF',
          tselVenetianRed: '#BC1D42',
          tselCadetBlue: '#B3BAC6',
          tselPapayaWhip: '#FEF3D4',
          tselTopaz: '#FED27F',
          tselWarningYellow: '#D9801F',
          tselTealDeer: '#9AEEAB',
          tselHoneyDew: '#EDFCF0',
          tselCornFlower: '#CF2E01',
          tselBrightGray: '#EBEEEF',
          tselShadowGray: '#7A7A7A',
          disabled: '#f1f1f4',
          disabled02: '#E9E8ED'
        },
        shade: {
          grey: {
            100: '#353941'
          }
        }
      },
      fontSize: {
        'f-8': '8px',
        'f-10': '10px',
        'f-11': '11px',
        'f-12': '12px',
        'f-13': '13px',
        'f-14': '14px',
        'f-15': '15px',
        'f-16': '16px',
        'f-17': '17px',
        'f-18': '18px',
        'f-19': '19px',
        'f-20': '20px',
        'f-24': '24px',
        'f-28': '28px',
        'f-32': '32px',
        'f-40': '40px',
        'f-56': '56px',
        'f-72': '72px'
      },
      boxShadow: {
        hover: '-16px -16px #ff0025'
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1366px'
      }
    },
    variants: {
      extend: {
        borderWidth: ['first']
      }
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
  };
  `;
    tailwindClassCss = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  `;
    tailwindInstallCommands = {
        pnpm: "pnpm add -g tailwindcss && pnpm add -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography",
        npm: "npm install -g tailwindcss && npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography",
        yarn: "yarn add -g tailwindcss && yarn add -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography",
    };
    checkGit = async (answers) => {
        let result = (await execCommandOnProject(answers)("ls -a"));
        result = result.replace(".gitignore", "");
        return result.includes(".git");
    };
    createSaltPrecommit = async (answers, packageJson) => {
        packageJson.scripts = {
            ...packageJson.scripts,
            commit: "git-cz",
        };
        packageJson.config = {
            commitizen: {
                path: "./node_modules/cz-salt",
                jiraPrefix: `${answers.projectJiraKey}`,
                jiraPrepend: "[",
                jiraAppend: "]",
            },
        };
    };
    createPreprareScript = (packageJson) => {
        if (packageJson.scripts) {
            packageJson.scripts.prepare = "husky";
        }
    };
    createPostinstallScript = (packageJson) => {
        if (packageJson.scripts) {
            packageJson.scripts.postinstall = "husky";
            packageJson.scripts.prepack = "pinst --disable";
            packageJson.scripts.postpack = "pinst --enable";
        }
    };
    commandsInstallPrecommitLiteral = {
        pnpm: "pnpm add --save-dev husky",
        npm: "npm install --save-dev husky",
        yarn: "yarn add --dev husky",
    };
    commandConfigPrecommitLiteral = {
        pnpm: "pnpm prepare",
        npm: "npm run prepare",
        yarn: "yarn run postinstall",
    };
    constructor(answers) {
        this.answers = answers;
    }
    async createTesting() {
        throw new Error("Method not implemented.");
    }
    async run() {
        await this.createProject();
        await this.createPrecommit();
        await this.createTailwind();
        await this.createTesting();
        await this.createLinter();
        await this.createFormatter();
        await this.finishing();
    }
    async finishing() {
        const loadingSpinner = spinner("Finishing setup project...\n").start();
        await execCommandOnProject(this.answers)(`${commandRun[this.answers.packageManager]} format && ${commandRun[this.answers.packageManager]} lintfix`);
        loadingSpinner.stop();
        log("✔ Project setup created successfully!");
    }
    async createProject() {
        throw new Error("Method not implemented.");
    }
    async createLinter() {
        const loadingSpinner = spinner("Creating linter configuration...\n").start();
        await execCommandOnProject(this.answers)(`${this.commanInstallLinterLiteral[this.answers.packageManager]}`);
        await execCommandOnProject(this.answers)(`echo "${JSON.stringify(JSON.stringify(this.eslintConfiguration))}" > .eslintrc.json`);
        await execCommandOnProject(this.answers)(`echo "${this.lintStagedConfiguration}" > .lintstagedrc.js`);
        const packageJson = JSON.parse((await execCommandOnProject(this.answers)("cat package.json")));
        packageJson.scripts.lint = "eslint .";
        packageJson.scripts.lintfix = "eslint . --fix";
        await execCommandOnProject(this.answers)(`echo "${JSON.stringify(JSON.stringify(packageJson))}" > package.json`);
        loadingSpinner.stop();
        log("✔ Linter configuration created successfully!");
    }
    async createFormatter() {
        const loadingSpinner = spinner("Creating formatter configuration...\n").start();
        await execCommandOnProject(this.answers)(`${this.commandInstallFormatterLiteral[this.answers.packageManager]}`);
        await execCommandOnProject(this.answers)(`echo "${JSON.stringify(JSON.stringify(this.formatterConfiguration))}" > .prettierrc.json`);
        const packageJson = JSON.parse((await execCommandOnProject(this.answers)("cat package.json")));
        packageJson.scripts.format =
            'prettier --write "./**/*.{js,jsx,ts,tsx,css,scss,md,json}" .';
        await execCommandOnProject(this.answers)(`echo "${JSON.stringify(JSON.stringify(packageJson))}" > package.json`);
        loadingSpinner.stop();
        log("✔ Formatter configuration created successfully!");
    }
    async createTailwind() {
        const loadingSpinner = spinner("Creating tailwind configuration...\n").start();
        await execCommandOnProject(this.answers)(`${this.tailwindInstallCommands[this.answers.packageManager]} && npx tailwindcss init -p`);
        await execCommandOnProject(this.answers)(`echo "${this.tailwindConfigString}" > tailwind.config.js`);
        await execCommandOnProject(this.answers)(`echo "${this.tailwindClassCss}" > ${this.fileStylesPath}`);
        loadingSpinner.stop();
        log("✔ Tailwind configuration created successfully!");
    }
    async createPrecommit() {
        await execCommandOnProject(this.answers)(`${commandInstallPackageLiteral[this.answers.packageManager]} -D cz-salt commitizen`);
        const gitExist = await this.checkGit(this.answers);
        if (!gitExist) {
            log("Git not found! Initializing git...");
            await execCommandOnProject(this.answers)("git init");
        }
        const loadingSpinner = spinner("Creating pre-commit configuration\n").start();
        await execCommandOnProject(this.answers)(this.commandsInstallPrecommitLiteral[this.answers.packageManager]);
        let packageJsonString = (await execCommandOnProject(this.answers)("cat package.json"));
        let packageJsonObject = JSON.parse(packageJsonString);
        if (this.answers.packageManager === "yarn") {
            this.createPostinstallScript(packageJsonObject);
        }
        else {
            this.createPreprareScript(packageJsonObject);
        }
        await execCommandOnProject(this.answers)(`echo ${JSON.stringify(JSON.stringify(packageJsonObject))} > package.json`);
        await execCommandOnProject(this.answers)(this.commandConfigPrecommitLiteral[this.answers.packageManager]);
        const commitMessage = `echo "\n🛠️ Precommit Running! Please wait..."\nnpx lint-staged`;
        await execCommandOnProject(this.answers)(`echo ${JSON.stringify(commitMessage)} > .husky/pre-commit`);
        packageJsonString = (await execCommandOnProject(this.answers)("cat package.json"));
        packageJsonObject = JSON.parse(packageJsonString);
        await this.createSaltPrecommit(this.answers, packageJsonObject);
        await execCommandOnProject(this.answers)(`echo ${JSON.stringify(JSON.stringify(packageJsonObject))} > package.json`);
        loadingSpinner.stop();
        log("✔ Pre-commit configuration created successfully!");
    }
}
