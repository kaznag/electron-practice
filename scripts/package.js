const fs = require('fs');
const path = require('path');

const rootPath = path.resolve(__dirname, './../');
const srcPath = path.resolve(rootPath, './package.json');
const dstPath = path.resolve(rootPath, './src/package.json');

const srcObj = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
const dstObj = {};

Object.keys(srcObj).forEach((key) => {
  switch (key) {
    case 'main':
    case 'name':
    case 'version':
      dstObj[key] = srcObj[key];
      break;
    case 'dependencies':
      if (Object.keys(srcObj[key]).length > 0) {
        dstObj[key] = srcObj[key];
      }

      break;
  }
});

fs.writeFileSync(dstPath, JSON.stringify(dstObj, null, '  '));
