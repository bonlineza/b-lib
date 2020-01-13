const path = require('path');
const fs = require('fs');
const reactDocgen = require('react-docgen');
const docsToMarkdown = require('react-docs-markdown');
const functions = require('./functions');

const outputPath = path.resolve(__dirname, '../docs');

function processIndexFile(folderName) {
  console.log('Processing: ', folderName);
  const componentPath = functions.resolveIndexForComponent(folderName);

  fs.readFile(componentPath, (fileError, content) => {
    if (fileError) {
      console.log('File Error: ', fileError);
      return;
    }
    const documentationPath = `${outputPath}/${folderName}.md`;
    const doc = reactDocgen.parse(content);
    const md = docsToMarkdown(doc, folderName);
    console.log('Writing: ', documentationPath);
    fs.writeFile(documentationPath, md, err => {
      if (err) throw err;
    });
  });
}

// Original sript
functions.ReadEachComponent(subFolderName => processIndexFile(subFolderName));
