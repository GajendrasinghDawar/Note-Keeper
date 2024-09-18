import { execSync } from 'child_process';

export default function generateCacheListPlugin() {
    return {
        name: 'generate-cache-list',
        apply: 'build', // Apply the plugin during the build process
        closeBundle() {
            execSync('node generate-cache-list.js', { stdio: 'inherit' });
        }
    };
}