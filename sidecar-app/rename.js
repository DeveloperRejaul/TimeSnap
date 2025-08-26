import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ext = process.platform === 'win32' ? '.exe' : '';

const rustInfo = execSync('rustc -vV').toString();
const match = /host: (\S+)/.exec(rustInfo);
const targetTriple = match ? match[1] : null;

if (!targetTriple) {
  console.error('Failed to determine platform target triple');
  process.exit(1);
}

// adjust this path to where pkg actually puts your binary
const source = path.resolve(`./app${ext}`);
const dest = path.resolve(`../desktop/src-tauri/binaries/app-${targetTriple}${ext}`);

console.log('Renaming:', source, '->', dest);

if (!fs.existsSync(source)) {
  console.error('Source binary not found:', source);
  process.exit(1);
}

fs.renameSync(source, dest);
