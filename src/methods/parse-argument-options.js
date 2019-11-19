import arg from 'arg';

export default (rawArgs) => {
  const args = arg(
    {
      '--help': Boolean,
      '-h': '--help',
      '--version': Boolean,
      '-v': '--version',
      '--controller': Boolean,
      '-c': '--controller'
    },
    {
      argv: rawArgs.slice(2)
    }
  );
  return {
    name: args._[0],
    help: args['--help'] || false,
    version: args['--version'] || false,
    controller: args['--controller'] || false
  };
 }
