const webpack = require('webpack');
const path = require('path');

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: (module) => module.context && /node_modules/.test(module.context)
  })
];


module.exports = {
    devServer: {
        contentBase: __dirname,
        historyApiFallback: true,
        stats: {
            chunks: false,
            chunkModules: false,
            chunkOrigins: false,
            errors: true,
            errorDetails: false,
            hash: false,
            timings: false,
            modules: false,
            warnings: false
        },
        publicPath: '/build/',
        port: 8080
    },
    devtool: 'sourcemap',
    entry: [
        './src/index.js'
    ],
    output: {
        filename: '[name].js',
        chunkFilename: '[name]-chunk.js',
        publicPath: '/build/',
        path: path.resolve(__dirname, 'build')
    },
    node: {
        console: false,
        global: true,
        process: true,
        Buffer: false
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        modules: [
            'src',
            'node_modules'
        ]
    },
    plugins
}