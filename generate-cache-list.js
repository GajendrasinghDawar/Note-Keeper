import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = join(__dirname, 'dist'); // Change to your build directory
const cacheFilePath = join(distDir, 'cache-list.js'); // Change to your desired output directory

function generateCacheList(dir, fileList = []) {
    const files = readdirSync(dir);
    files.forEach(file => {
        const filePath = join(dir, file);
        if (statSync(filePath).isDirectory())
        {
            generateCacheList(filePath, fileList);
        } else
        {
            // Exclude sw.js and replace backslashes with forward slashes for URL paths
            if (!filePath.endsWith('sw.js'))
            {
                fileList.push(filePath.replace(distDir, '').replace(/\\/g, '/'));
            }
        }
    });
    return fileList;
}

const cacheList = generateCacheList(distDir);
const cacheListContent = `const urlsToCache = ${JSON.stringify(cacheList, null, 2)};\n\nconsole.log('cache-list.js has been loaded');\n`;

writeFileSync(cacheFilePath, cacheListContent);
console.log('Cache list generated.');