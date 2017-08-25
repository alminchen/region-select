const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        app: path.resolve(__dirname, 'index.js'),
        vendor: [
            'react',
            'react-dom'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/dist/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: "css-loader"
            })
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            _: 'lodash'
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: '0.0.0.0',
        port: 8081,
        inline: true,
        hot: true,
        /*proxy: {
            '*.do': {
                bypass: function (req, res, proxyOptions) {
                    console.log(req.url);
                    if (req.url.indexOf('.do') !== -1) {
                        req.method = 'GET';
                        return '/mock' + req.url.replace('.do', '.json');
                    }
                }
            }
        }*/
    },
    devtool: '#source-map'
};
