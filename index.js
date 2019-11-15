try {
  require = require('esm')(module);
  require('./src/cli').cli(process.argv);
} catch (error) {
  console.log(error.message)
}
