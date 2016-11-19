import run from './run';
import clean from './clean';
import copy from './copy';
import bundle from './bundle';
import render from './render';
import buildResourceList from './build-resource-list';
import {findHashes} from './addHash';
import {addVersion} from './addVersion';

/**
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */
async function build() {
  await run(clean);
  await run(copy);
  await run(bundle);
  await run(buildResourceList);
  await run(addVersion);
  await run(findHashes);
  


  if (process.argv.includes('--static')) {
    await run(render);
  }
}

export default build;
