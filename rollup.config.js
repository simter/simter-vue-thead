import pkg from './package.json';
import vue from 'rollup-plugin-vue';

let banner = `/*!
* ${pkg.name} v${pkg.version}
* @author RJ.Hwang <rongjihuang@gmail.com>
* @license MIT
*/`

// see http://vuejs.github.io/rollup-plugin-vue/#/en/2.3/?id=configuration
export default {
  input: 'src/thead.vue',
  output: [
    { file: pkg.main, format: 'umd', name: pkg.name, banner: banner },
    { file: pkg.module, format: 'es', banner: banner }
  ],
  plugins: [
    vue({ compileTemplate: true, css: false })
  ]
};