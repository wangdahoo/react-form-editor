const typescript = require('rollup-plugin-typescript2')
const postcss = require('rollup-plugin-postcss')
const { terser } = require('rollup-plugin-terser')
const autoprefixer = require('autoprefixer')
const { resolve } = require('path')

module.exports = {
    input: './src/index.tsx',
    output: {
        dir: 'dist',
        format: 'umd',
        name: 'ReactFormEditor',
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'react-dnd': 'ReactDnD',
            'react-dnd-html5-backend': 'ReactDnDHTML5Backend',
            'mobx': 'mobx',
            'mobxReact': 'mobxReact',
            'shortid': 'shortid',
            'immutability-helper': 'update'
        }
    },
    plugins: [
        typescript(),
        postcss({
            extensions: ['.less'],
            minimize: true,
            extract: true,
            plugins: [
                autoprefixer()
            ]
        }),
        terser()
    ],
    external: [
        'antd',
        'classnames',
        'immutability-helper',
        'mobx',
        'mobx-react',
        'react',
        'react-dnd',
        'react-dnd-html5-backend',
        'react-dom',
        'shortid'
    ],
}
