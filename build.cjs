const { execSync } = require('child_process');
try {
    execSync('npx vite build', { stdio: 'pipe' });
    console.log('Build succeeded');
} catch (e) {
    require('fs').writeFileSync('build_output.txt', e.stdout.toString() + '\n' + e.stderr.toString(), 'utf8');
}
