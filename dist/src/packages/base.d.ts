import { TAnswers } from "../types.js";
export interface BaseProjectI {
    run(): Promise<void>;
    createProject(): Promise<void>;
    createLinter(): Promise<void>;
    createFormatter(): Promise<void>;
    createTailwind(): Promise<void>;
    createPrecommit(): Promise<void>;
}
export declare class BaseProject implements BaseProjectI {
    protected answers: TAnswers;
    protected fileStylesPath: string;
    protected eslintConfiguration: {
        env: {
            browser: boolean;
            es2021: boolean;
            node: boolean;
        };
        parserOptions: {
            ecmaVersion: string;
            sourceType: string;
        };
        parser: string;
        extends: string[];
        ignorePatterns: string[];
        rules: {
            "@typescript-eslint/no-empty-function": string;
            "@typescript-eslint/no-explicit-any": string;
            "@typescript-eslint/no-unused-vars": string;
            "@typescript-eslint/no-inferrable-types": string;
            "@typescript-eslint/no-non-null-assertion": string;
            "@typescript-eslint/ban-types": string;
            "@typescript-eslint/adjacent-overload-signatures": string;
            "@typescript-eslint/no-empty-interface": string;
            "space-before-blocks": string;
            "no-alert": string;
            "no-empty": string;
            "no-empty-function": string;
            "no-empty-character-class": string;
            "no-multiple-empty-lines": string;
            "no-implicit-coercion": string;
            "no-unneeded-ternary": string;
            "no-cond-assign": string;
            "no-var": string;
            "prefer-const": string;
            "comma-spacing": string;
            "comma-dangle": string;
            "array-callback-return": string;
            "no-array-constructor": string;
            "no-debugger": string;
            "no-dupe-else-if": string;
            "no-duplicate-case": string;
            "no-duplicate-imports": string;
            "no-sparse-arrays": string;
            "no-console": (string | {
                allow: string[];
            })[];
            "no-unreachable": string;
            "no-unreachable-loop": string;
            "no-unsafe-negation": string;
            "space-infix-ops": string;
            quotes: string[];
            "linebreak-style": string[];
            semi: string[];
            "max-lines": (string | {
                max: number;
                skipBlankLines: boolean;
            })[];
        };
    };
    protected lintStagedConfiguration: string;
    protected commanInstallLinterLiteral: {
        npm: string;
        yarn: string;
        pnpm: string;
    };
    protected commandInstallFormatterLiteral: {
        pnpm: string;
        npm: string;
        yarn: string;
    };
    protected formatterConfiguration: {
        trailingComma: string;
        tabWidth: number;
        singleQuote: boolean;
        semi: boolean;
        bracketSameLine: boolean;
        plugins: string[];
        importOrderParserPlugins: string[];
    };
    protected tailwindConfigString: string;
    protected tailwindClassCss: string;
    protected tailwindInstallCommands: {
        pnpm: string;
        npm: string;
        yarn: string;
    };
    protected checkGit: (answers: TAnswers) => Promise<boolean>;
    protected createSaltPrecommit: (answers: TAnswers, packageJson: Record<string, any>) => Promise<void>;
    protected createPreprareScript: (packageJson: Record<string, any>) => void;
    protected createPostinstallScript: (packageJson: Record<string, any>) => void;
    protected commandsInstallPrecommitLiteral: {
        pnpm: string;
        npm: string;
        yarn: string;
    };
    protected commandConfigPrecommitLiteral: {
        pnpm: string;
        npm: string;
        yarn: string;
    };
    constructor(answers: TAnswers);
    run(): Promise<void>;
    createProject(): Promise<void>;
    createLinter(): Promise<void>;
    createFormatter(): Promise<void>;
    createTailwind(): Promise<void>;
    createPrecommit(): Promise<void>;
}
