#!/usr/bin/env node

const walk = require('walk');
const ignore = [
  'sw.js',
  'cache-manifest.js',
  '.DS_Store',
  'browserconfig.xml',
  'robots.txt'
];
const crypto = require('crypto');
const fs = require('fs');
const resourceList = [];


const walkStaticFiles = _ => {
  return new Promise((resolve, reject) => {
    const walker = walk.walk('./build/public');
    const staticFiles = [];
    walker.on('file', (root, fileStats, next) => {
      const name = fileStats.name;
      const path = `${root}/${name}`;

      if (ignore.indexOf(name) !== -1 || name.endsWith('.map')) {
        return next();
      }

      root = root.replace(/^\.\/build\/public/, '');

      if (name.endsWith('.json')) {
        staticFiles.push(`{{${root}/${name}|__addHash}}`);
      } else {
        staticFiles.push(`${root}/${name}`);
      }

      next();
    });

    walker.on('end', _ => resolve(staticFiles));
  });
};


function buildResourceList() {
  return walkStaticFiles()
    .then(resources => {
      const manifest = `const cacheManifest = ${JSON.stringify(resources, null, 2)}`;
      fs.writeFile('./build/public/cache-manifest.js', manifest);
    });

}

export default buildResourceList;