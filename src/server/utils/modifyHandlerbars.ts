import engine from "handlebars";
import { inlineIf } from "./handlebars/helpers/inlineIf";
import { checked } from "./handlebars/helpers/checked";

engine.registerHelper("inlineIf", inlineIf);
engine.registerHelper("checked", checked);

export default engine;
