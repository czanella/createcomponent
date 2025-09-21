import { argsSchema } from './args-schema';

async function main() {
  const args = await argsSchema.validate(require('args-parser')(process.argv));
  
  console.log(args);
}

main().catch(e => {
  console.error(e.message);
  process.exit(1);
});
