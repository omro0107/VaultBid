import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    root: '.', // Set the root directory to the project root
    build: {
        outDir: 'dist', // Output directory for the build
        emptyOutDir: true, // Clean the output directory before each build
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about/index.html'),
                auctions: resolve(__dirname, 'auctions/listing/index.html'),
                create: resolve(__dirname, 'auctions/create/index.html'),
                login: resolve(__dirname, 'auth/login/index.html'),
                register: resolve(__dirname, 'auth/register/index.html'),
                contact: resolve(__dirname, 'contact/index.html'),
                privacy: resolve(__dirname, 'legal/privacy/index.html'),
                terms: resolve(__dirname, 'legal/terms/index.html'),
                profile: resolve(__dirname, 'profile/index.html')
            }
        }
    },
    server: {
        port: 3000, // You can specify a port for the development server
        open: true, // Automatically open the browser
    },
    envPrefix: 'VITE_', // Only expose variables prefixed with VITE_
    publicDir: 'public', // Serve files from the public directory at /
});
