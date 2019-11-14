const path = require('path');
const fs = require('fs');
const reactDocgen = require('react-docgen');
const docsToMarkdown = require('react-docs-markdown');

const componentsPath = path.resolve(__dirname, '../src/components');
const outputPath = path.resolve(__dirname, '../Documentation');

console.log(componentsPath);

fs.readdir(componentsPath, (dirError, files) => {
  console.log(dirError);
  if (dirError) return;
  files
    .filter(name => !name.includes('.DS_Store'))
    .forEach(file => {
      console.log(`Processing ${file}`);
      const componentPath = path.resolve(
        __dirname,
        `../src/components/${file}/index.js`,
      );

      fs.readFile(componentPath, (fileError, content) => {
        if (fileError) return;

        const documentationPath = `${outputPath}/${file}.md`;
        console.log(documentationPath);
        // console.log(content);
        const doc = reactDocgen.parse(content);
        const md = docsToMarkdown(doc, file);

        console.log(`Parsing ${file}`);
        fs.writeFile(documentationPath, md, err => {
          if (err) throw err;
          console.log(`done writing: ${documentationPath}`);
        });
      });
    });
});
