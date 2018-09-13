var webpack = require('webpack');
var path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');


module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: {
        'app': './app/main'
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        publicPath: "dist/"
    },
    resolve: {
        extensions: ['.ts', '.js', '.jpg', '.jpeg', '.gif', '.png', '.css'],
        plugins: [
            new TsConfigPathsPlugin({
                tsconfig: path.resolve(__dirname, 'tsconfig.json'),
             })
        ]
    },
    module: {
        rules: [
            { test: /\.(jpg|jpeg|gif|png)$/, loader:'file-loader?name=img/[path][name].[ext]' },
            { test: /\.css$/, loader:'raw-loader' },
            { test: /\.html$/,  loaders: ['html-loader'] },
            { test: /\.ts$/, loaders: ['awesome-typescript-loader'], exclude: /node_modules/}
        ]
    },
    node: {
        __filename: true
    },
    devServer: {
        inline:true,
        port: 8080,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
  
};
