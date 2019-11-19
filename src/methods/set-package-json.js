import fs from 'fs';

export default async ({ name, description, keys, author, license }) => {
  return await new Promise(resolve => {
    fs.writeFile(__dirname + "/../../templates/project/package.json", `{
      "name": "${name}",
      "description": "${description}",
      "version": "1.0.0",
      "main": "src/index.js",
      "scripts": {
        "dev": "npm run kill-port && nodemon --inspect -w ./src -w index.js --exec 'babel-node index.js'",
        "kill-port": "kill-port --port 4000",
        "start": "babel-node ./index.js"
      },
      "keywords": [
        ${keys.split(',').map(key => {
          return `"${key}"`
        })}
      ],
      "author": "${author}",
      "license": "${license}",
      "dependencies": {
        "restify": "^8.4.0"
      },
      "devDependencies": {
        "@babel/core": "^7.5.5",
        "@babel/node": "^7.5.5",
        "@babel/plugin-proposal-class-properties": "^7.5.5",
        "@babel/plugin-proposal-object-rest-spread": "^7.5.5",
        "@babel/plugin-syntax-dynamic-import": "^7.2.0",
        "@babel/preset-env": "^7.5.5",
        "babel-eslint": "^10.0.3",
        "babel-plugin-module-resolver": "^3.2.0",
        "eslint": "^6.2.2",
        "kill-port": "^1.5.1",
        "nodemon": "^1.19.1"
      }
    }`, function(err) {
      if (err) console.log(err)
      resolve(true)
    })
  });
}
