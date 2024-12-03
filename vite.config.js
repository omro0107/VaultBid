import { defineConfig } from 'vite';

export default defineConfig({
    root: 'index.html', // Set the root directory to your source folder
    build: {
        outDir: '../dist', // Output directory for the build
        emptyOutDir: true, // Clean the output directory before each build
    },
    server: {
        port: 3000, // You can specify a port for the development server
    },
});