import arg from 'arg';

export default (rawArgs) => {
  const args = arg(
    {
      '--help': Boolean,
      '-h': '--help',
      '--version': Boolean,
      '-v': '--version',
      '--router': Boolean,
      '-r': '--router'
    },
    {
      argv: rawArgs.slice(2)
    }
  );
  return {
    name: args._[0],
    help: args['--help'] || false,
    version: args['--version'] || false,
    router: args['--router'] || false
  };
 }
