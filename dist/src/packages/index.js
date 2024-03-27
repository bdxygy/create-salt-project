import { log, spinner } from "../utils.js";
import { createAngularProject } from "./angular.js";
import { createNextProject } from "./next.js";
import { createReactProject } from "./react.js";
export const createProjectConfiguration = async (answers) => {
    switch (answers.projectFramework) {
        case "react":
            const reactSpinner = spinner("Please wait, initializing your project...\n").start();
            await createReactProject(answers);
            reactSpinner.stop();
            break;
        case "next.js":
            await createNextProject(answers);
            break;
        case "@angular":
            const angularSpinner = spinner("Please wait, initializing your project...\n").start();
            await createAngularProject(answers);
            angularSpinner.stop();
            break;
    }
    log("✔ Project created successfully!");
};
//# sourceMappingURL=index.js.map