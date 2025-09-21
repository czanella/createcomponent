import { argsSchema } from './args-schema';
import { questionaire } from './input-questionaire';

async function main() {
  const args = await argsSchema.validate(require('args-parser')(process.argv));
  
  const options = await questionaire();
  console.log(JSON.stringify(options, null, 2));
}

main().catch(e => {
  console.error(e.message);
  process.exit(1);
});
