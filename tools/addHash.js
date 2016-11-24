#!/usr/bin/env node

const walk = require('walk');
const crypto = require('crypto');
const fs = require('fs');
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

const replaceHashMatches = (matches, renameTable) => new Promise((resolve, reject) => {
  for (let match of matches) {
    const renameRecord = renameTable.find(i=>i.fileName === match.filePath);
    let fileName = (renameRecord && renameRecord.newFileName) || match.filePath;
    let renameRecordForMatch = renameTable.find(i=>i.fileName === match.matchFullFileName && i.name === match.matchFileName)
    rewriteFile(fileName, match.match, renameRecordForMatch.hashedName);
    if (fileName !== match.filePath) {
      renameRecordForMatch = renameTable.find(i=>i.name === match.matchFileName)
      rewriteFile(match.filePath, match.match, renameRecordForMatch.hashedName);
    }
  }
  return resolve();
});

const renameFiles = (matches) => new Promise((resolve, reject) => {
  let renameTable = [];
  try {
    let cwd = path.join(process.cwd(), './build/public');
    for (let match of matches) {
      const regexp = /^(.*)\?/g;
      const name = regexp.exec(match.match)[1].trim();
      const fileName = path.join(cwd, name);
      match.matchFileName = name;
      match.matchFullFileName = fileName;
      let record =renameTable.find(i=>i.fileName ===fileName); 
      if (!record) {
        let text = fs.readFileSync(fileName, 'utf-8');

        const hash = crypto
          .createHash('sha256')
          .update(text)
          .digest('hex');

        const hashedName = name.replace(/\.(.*)$/, `.${hash}.$1`);
        const newFileName = fileName.replace(name, hashedName);
        renameTable.push({ fileName, newFileName, hashedName, name });
        fs.writeFileSync(newFileName, text);
      } else {
        let fileNameRegex = /^.*\/(.*$)/g;
        let clearFileName = fileNameRegex.exec(record.fileName);
        renameTable.push(Object.assign({}, record, {name, hashedName:name.replace(clearFileName[1], record.hashedName)}));
        renameTable = renameTable.filter((i,index, self)=>{
          const record = self.find(ii=>ii.fileName === i.fileName && ii.name === i.name)
          return self.indexOf(record) === index;
        });
      }
    }
    return resolve(renameTable);
  } catch (e) {
    return reject(e);
  };
});

export const findHashes = _ => {
  return new Promise((resolve, reject) => {
    const walker = walk.walk('./build');
    let matches = [];
    walker.on('file', (root, fileStats, next) => {
      const name = fileStats.name;

      if (name.endsWith('.map')) {
        return next();
      }
      let fileName = path.join(process.cwd(),root, name);
      console.log(process.cwd(), root, name);
      let text = fs.readFileSync(fileName);
      const regexp = /['"]+([^'"]*\?__addHash)/g;
      let match = null;
      do {
        match = regexp.exec(text);
        matches = [...matches, { match: match && match[1], filePath: fileName, fileName: name }].filter(i => i.match)
      } while (match);

      next();
    });

    walker.on('end', _ => {
      renameFiles(matches)
        .then(renameTable => {
          return replaceHashMatches(matches, renameTable);
        })

    });
  });
};