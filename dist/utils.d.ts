import { TAnswers } from "./types.js";
export declare const log: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
export declare const projectOptions: string[];
export declare const packageManagerOptions: string[];
export declare const spinner: (message: string) => import("ora").Ora;
export declare const execCommand: (command: string) => Promise<unknown>;
export declare const execCommandOnProject: (answers: TAnswers) => (command: string) => Promise<unknown>;
export declare const commandInstallPackageLiteral: {
    pnpm: string;
    npm: string;
    yarn: string;
};
