import engine from "handlebars";
import { inlineIf } from "./handlebars/helpers/inlineIf";
import { checkFormAttribute } from "./handlebars/helpers/checkFormAttribute";
import { greaterThan } from "./handlebars/helpers/greaterThan";
import { math } from "./handlebars/helpers/math";
import { lessThan } from "./handlebars/helpers/lessThan";

engine.registerHelper("inlineIf", inlineIf);
engine.registerHelper("checkFormAttribute", checkFormAttribute);
engine.registerHelper("greaterThan", greaterThan);
engine.registerHelper("lessThan", lessThan);
engine.registerHelper("math", math);

export default engine;
