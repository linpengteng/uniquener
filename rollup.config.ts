import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'


/**
 * Rollup Configuration
 */
export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        name: 'Uniquener',
        format: 'umd',
        exports: 'auto',
        sourcemap: false,
        entryFileNames: '[name].browser.js',
        chunkFileNames: '[name]-[hash].browser.js',
        globals: {
          crypto: 'crypto'
        }
      },
      {
        dir: 'dist',
        format: 'cjs',
        exports: 'auto',
        sourcemap: false,
        entryFileNames: '[name].cjs',
        chunkFileNames: '[name]-[hash].cjs'
      },
      {
        dir: 'dist',
        format: 'es',
        exports: 'auto',
        sourcemap: false,
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name]-[hash].mjs'
      }
    ],
    plugins: [
      typescript({ sourceMap: false }),
      terser()
    ],
    external: [
      'crypto'
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
      sourcemap: false
    },
    plugins: [dts()]
  }
])
