// Angular's i18n build with subPath locales produces dist/browser/en and
// dist/browser/ar, but nothing at dist/browser itself -- Cloudflare Pages
// needs *something* at "/" to serve. Copies the tiny language-detect
// redirect page into place after every build.
import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const browserDir = join(root, 'dist', 'karaz-dev-site', 'browser');

for (const file of ['index.html', '_headers']) {
  copyFileSync(join(root, 'public-root', file), join(browserDir, file));
}
console.log('postbuild: copied root redirect + _headers into', browserDir);
