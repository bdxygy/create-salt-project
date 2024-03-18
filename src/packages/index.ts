import { TAnswers } from "../types.js";
import { execCommand } from "../utils.js";
import { createAngularProject } from "./angular.js";
import { createNextProject } from "./next.js";
import { createReactProject } from "./react.js";

export const createProjectConfiguration = async (answers: TAnswers) => {
  switch (answers.projectFramework) {
    case "react":
      await createReactProject(answers);
      break;
    case "next.js":
      await createNextProject(answers);
      break;
    case "@angular":
      await createAngularProject(answers);
      break;
  }
};
