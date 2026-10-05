import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';
export default defineConfig({server:{host:'0.0.0.0'},css:{postcss:{plugins:[tailwindcss()]}},plugins:[vinext()]});
