import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel'

export default {
  input: 'index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'vuex-save',
    sourcemap: false
  },
  plugins: [
    resolve(),
    commonjs({
      ignoreGlobal: false,  // Default: false
      sourceMap: false,  // Default: true
    }),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
}