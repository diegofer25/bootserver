import fs from 'fs';

export default async ({ name, description, keys, author, license }) => {
  const pkg = require('./../../templates/project/package.json')
  return await new Promise(resolve => {
    fs.writeFile(__dirname + "/../../templates/project/package.json",
    `{
      "name": "${name}",
      "description": "${description}",
      "version": "${pkg.version}",
      "main": "${pkg.main}",
      "scripts": ${JSON.stringify(pkg.scripts, null, 1)},
      "keywords": [
        ${keys.split(',').map(key => {
          return `"${key}"`
        })}
      ],
      "author": "${author}",
      "license": "${license}",
      "dependencies": ${JSON.stringify(pkg.dependencies, null, 1)},
      "devDependencies": ${JSON.stringify(pkg.devDependencies, null, 1)}
    }`
    , function(err) {
      if (err) console.log(err)
      resolve(true)
    })
  });
}
