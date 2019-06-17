import pkg from './package.json';
import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

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
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    vue({ compileTemplate: true, css: false })
  ]
};