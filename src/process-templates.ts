// @ts-ignore
import swig from "free-swig";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { AppOptions } from "./input-questionaire";
import { toDashed } from "./to-dashed";

type ProcessTemplatesProps = {
  componentName: string;
  options: AppOptions;
};

export async function processTemplates({ componentName, options }:ProcessTemplatesProps) {
  // Generate alternate spellings of componentName
  const componentDashed = toDashed(componentName);
  const componentLowercase = componentName[0].toLowerCase() + componentName.substring(1);
  const componentFolder = path.join(process.cwd(), options.outputFolder, componentDashed);

  // Process options and populate the paths array
  const templatePaths: string[] = [
    `index.${options.language}`,
    `{component}.${options.language}x`,
  ];

  // Check if the folder exists. If so, halts everything
  if (existsSync(componentFolder)) {
    throw new Error(`Folder "${componentFolder}" already exists`);
  }
  mkdirSync(componentFolder, { recursive: true });

  // Generate the output files
  for (const templatePath of templatePaths) {
    writeFileSync(
      path.join(
        componentFolder,
        templatePath.replace('{component}', componentDashed),
      ),
      swig.compileFile(path.join(__dirname, 'templates', templatePath))({
        componentName,
        componentDashed,
        componentLowercase,
        layoutSystem: options.layoutSystem,
        layoutModule: options.layoutModule,
      }),
    );
  }
}
