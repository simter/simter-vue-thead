import pkg from './package.json';
import vue from 'rollup-plugin-vue';

// see http://vuejs.github.io/rollup-plugin-vue/#/en/2.3/?id=configuration
export default {
  input: 'src/thead.vue',
  output: [
    { file: pkg.main, format: 'umd', name: pkg.name },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    vue({ compileTemplate: true, css: false })
  ]
};