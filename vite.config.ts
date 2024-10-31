/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import macrosPlugin from 'vite-plugin-babel-macros'
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
	plugins: [react(), tsconfigPaths(), macrosPlugin(),  inject({
		Buffer: ['buffer', 'Buffer'],     // Fornisce Buffer globalmente
	}),],
	resolve: {
		alias: {
			buffer: 'buffer',                 // Alias per buffer
		},
	},
	define: {
		'process.env': {}, // Definisce process.env come un oggetto vuoto
	},
	optimizeDeps: {
		include: ['buffer', 'process'], // Include buffer e process per l'ottimizzazione
	},
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: '.vitest/setup',
		include: ['**/test.{ts,tsx}']
	},
	build: {
		lib: {
			entry: './src/index.tsx', // Punto di entrata del tuo bundle
			name: 'MyBundle',                               // Nome globale per IIFE
			fileName: () => 'bundle.js',                    // Nome del file di output
			formats: ['iife'],                               // Formato immediatamente invocato (IIFE)
		},
		rollupOptions: {
			// Configurazioni Rollup aggiuntive (se necessarie)
			output: {
				// Non includere altri formati o asset separati
			},
		},
		cssCodeSplit: false, // Include il CSS nel bundle JS
		sourcemap: true,    // Disabilita i sourcemap in produzione
		minify: 'esbuild',   // Utilizza esbuild per la minificazione (puoi cambiarlo a 'terser' se preferisci)
	},
})
