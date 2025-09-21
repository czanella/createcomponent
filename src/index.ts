import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { argsSchema } from './args-schema';
import { AppOptions, questionaire } from './input-questionaire';

const CONFIG_PATH = path.join(process.cwd(), 'ccSettings.json');

async function main() {
  // Parse command line arguments
  const args = await argsSchema.validate(require('args-parser')(process.argv));

  // Try laoding config file
  let defaults: Partial<AppOptions> = {};
  try {
    defaults = JSON.parse(readFileSync(CONFIG_PATH).toString());
  } catch {
    console.log('No default config found');
  }

  // Ask user questions
  const options = await questionaire({ defaults });

  // If user chose to use defaults, then we write what has been chosen
  if (!args.d) {
    defaults = { ...options };
    delete defaults.componentName;
    writeFileSync(CONFIG_PATH, JSON.stringify(defaults, null, 2));
  }

  console.log(JSON.stringify(options, null, 2));
}

main().catch(e => {
  console.error(e.message);
  process.exit(1);
});
