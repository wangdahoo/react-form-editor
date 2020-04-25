const typescript = require('rollup-plugin-typescript2')
const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')
const { resolve } = require('path')

module.exports = {
    input: './src/index.tsx',
    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'ReactFormEditor'
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
        })
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
