const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const isProd = env === 'production';

module.exports = {
    entry: {
        bundle: './web/src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'web/dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
        }),
        new HtmlWebPackPlugin({
            template: "./web/src/index.html",
            inject: true,
            filename: "./index.html",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackInlineSourcePlugin(),
    ],
    module: {
        rules: [{
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            }, {
                loader: 'expose-loader',
                options: '$'
            }]
        }, {
            test: require.resolve('lodash'),
            use: [{
                loader: 'expose-loader',
                options: '_'
            }]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /(?:\.min)?\.(sa|sc|c)ss$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true,
                    },
                },
                'css-loader'
            ]
        }, {
            test: /\.html$/,
            use: [{
                loader: "html-loader",
                options: {
                    minimize: isProd
                }
            }]
        }, {
            test: /\.(png|jpe?g|gif|svg)$/i,
            loader: 'base64-inline-loader'
        }, {
            test: /\.(woff|woff2|eot|ttf|svg)$/i,
            loader: 'base64-inline-loader'
        }]
    }
};