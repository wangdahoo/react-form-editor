import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import autoprefixer from 'autoprefixer'

const input = './src/index.tsx'

const external = [
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
]

const extensions = [ '.js', '.jsx', '.ts', '.tsx' ]

const plugins = [
    nodeResolve({
        customResolveOptions: {
            moduleDirectory: 'src',
        },
        extensions,
    }),
    babel({
        exclude: 'node_modules/**',
        extensions,
    }),
]

export default [
    {
        input,
        output: [
            {
                dir: 'dist/umd',
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
            }
        ],
        plugins: [
            ...plugins,
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
        external
    },
    {
        input,
        output: [
            {
                dir: 'dist',
                format: 'es'
            }
        ],
        plugins: [
            ...plugins,
            postcss({
                extensions: ['.less'],
                minimize: false,
                extract: false,
                plugins: [
                    autoprefixer()
                ]
            }),
        ],
        external
    }
]
