const path = require('path');
const fs = require('fs');

const componentsPath = path.resolve(__dirname, '../src/components');
exports.componentsPath = componentsPath;

function ReadEachComponent(callback) {
  return ReadEachFile(componentsPath, callback);
}
exports.ReadEachComponent = ReadEachComponent;

function resolveIndexForComponent(componentName) {
  return path.resolve(__dirname, `../src/components/${componentName}/index.js`);
}
exports.resolveIndexForComponent = resolveIndexForComponent;

function ReadEachFile(folder, callback) {
  console.log('Scanning: ', folder);
  const files = fs.readdirSync(folder);
  files
    .filter(name => !name.includes('.DS_Store'))
    .forEach(file => {
      callback(file);
    });
}
exports.ReadEachFile = ReadEachFile;
