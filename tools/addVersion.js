#!/usr/bin/env node

const fs = require('fs');
const pkg = require('../package.json');
const path = require('path');

const rewriteFile = (fileName, from, to) => {
  try {
    let text = fs.readFileSync(fileName, 'utf-8');
    text = text.replace(from, to);
    fs.writeFileSync(fileName, text);
  } catch (e) {
    console.log(e);
  }
}

export const addVersion = _ => new Promise(resolve => {
  const version = pkg.version;
  const fileName = path.join(process.cwd(), './build/public', 'sw.js');
  console.log(fileName);
  rewriteFile(fileName, '{{__version}}', version);
  resolve();
});