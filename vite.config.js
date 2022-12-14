import { resolve } from 'path';
import { defineConfig } from 'vite';

const root = resolve(__dirname);
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
	root,
	build: {
		outDir,
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve(root, 'index.html'),
				faq: resolve(root, 'faq.html'),
				info: resolve(root, 'info.html'),
				theme: resolve(root, 'theme.html'),
				add: resolve(root, 'add.html'),
				update: resolve(root, 'update.html'),
			},
		},
	},
});
