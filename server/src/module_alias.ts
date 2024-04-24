import "module-alias/register";
import moduleAlias from "module-alias";

function setupModuleAliases(): void {
  moduleAlias.addAliases({
    "@configs": __dirname + "/configs",
    "@controllers": __dirname + "/controllers",
    "@models": __dirname + "/models",
    "@routes": __dirname + "/routes",
    "@services": __dirname + "/services",
    "@utils": __dirname + "/utils",
  });
}

export default setupModuleAliases;
