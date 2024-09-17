import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, 'public');
const srcDir = join(__dirname, 'src');
const cacheFilePath = join(publicDir, 'cache-list.js');

function generateCacheList(dir, fileList = []) {
    const files = readdirSync(dir);
    files.forEach(file => {
        const filePath = join(dir, file);
        if (statSync(filePath).isDirectory())
        {
            generateCacheList(filePath, fileList);
        } else
        {
            // Replace backslashes with forward slashes for URL paths
            fileList.push(filePath.replace(__dirname, '').replace(/\\/g, '/'));
        }
    });
    return fileList;
}

const cacheList = [
    ...generateCacheList(publicDir),
    ...generateCacheList(srcDir)
];
const cacheListContent = `const urlsToCache = ${JSON.stringify(cacheList, null, 2)};\n\nconsole.log('cache-list.js has been loaded');`;

writeFileSync(cacheFilePath, cacheListContent);
console.log('Cache list generated.');