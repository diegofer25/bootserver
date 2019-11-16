import arg from 'arg';

export default (rawArgs) => {
  const args = arg(
    {},
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    name: args._[0]
  };
 }
