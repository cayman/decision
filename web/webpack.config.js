'use strict';

let path = require('path');
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

const restHost = process.env.REST_HOST || 'localhost';
const restPort = process.env.REST_PORT || '5000';

module.exports = {
    context: path.resolve(process.cwd(), 'src'),
    entry:{
        vue: ['vue', 'vue-router','vue-notification','vuex'],
        rx: [ 'rxjs'],
        polyfill: [ 'babel-polyfill'],
        main: './main.js',
    },
    output: {
        publicPath: '',
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
             styles: 'assets/styles',
             assets: path.resolve(process.cwd(),'src/assets'),
             actions: path.resolve(process.cwd(),'src/actions'),
             components: path.resolve(process.cwd(),'src/components')
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:['css-loader','sass-loader']
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        sass: ExtractTextPlugin.extract({
                            fallback: "vue-style-loader",
                            use: 'css-loader!sass-loader',
                        }),
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['rx','vue','polyfill'],
            filename:'[name].bundle.js'
        }),
        new ExtractTextPlugin('style.bundle.css'),
        new webpack.ProgressPlugin(),
        new CopyWebpackPlugin([
            { from: 'assets' }
        ])
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        proxy: [{
            context: ['/api/**'],
            target:'http://' + restHost + ':' + restPort,
            secure: false
        }]
    },
    performance: {
        hints: 'warning'
    },
    devtool: '#eval-source-map'
};