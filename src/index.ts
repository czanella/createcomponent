import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { argsSchema } from './args-schema';
import { AppOptions, questionaire } from './input-questionaire';
import { processTemplates } from './process-templates';

const CONFIG_PATH = path.join(process.cwd(), 'ccSettings.json');

async function main() {
  // Parse command line arguments
  const args = await argsSchema.validate(require('args-parser')(process.argv));

  // Try laoding config file
  let defaults: AppOptions | undefined = undefined;
  try {
    defaults = JSON.parse(readFileSync(CONFIG_PATH).toString());
  } catch {
    console.log('No default config found');
  }

  // Ask user questions
  const [componentName, options] = await questionaire({
    defaults,
    forceDefaults: args.y,
    name: args.name,
  });

  // If user chose to use defaults, then we write what has been chosen
  if (!args.y) {
    writeFileSync(CONFIG_PATH, JSON.stringify(options, null, 2));
  }

  // Process the output files
  processTemplates({ componentName, options });

  console.log(`Done! Component ${componentName} created successfully.`);
}

main().catch(e => {
  console.error(e.message);
  process.exit(1);
});
