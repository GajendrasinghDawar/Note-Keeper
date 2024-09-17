import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = join(__dirname, 'dist');
const cacheFilePath = join(__dirname, 'dist', 'cache-list.js'); // Change to public directory

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
            fileList.push(filePath.replace(distDir, '').replace(/\\/g, '/'));
        }
    });
    return fileList;
}

const cacheList = generateCacheList(distDir);
const cacheListContent = `const urlsToCache = ${JSON.stringify(cacheList, null, 2)};\n\nconsole.log('cache-list.js has been loaded');`;

writeFileSync(cacheFilePath, cacheListContent);
console.log('Cache list generated.');