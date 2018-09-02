const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common.config.js');
// let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const publicConfig = {
    devtool: 'cheap-module-source-map',
    // module: {
    //     rules: [{
    //         test: /\.css$/,
    //         use: ExtractTextPlugin.extract({
    //             fallback: "style-loader",
    //             use: ["css-loader?modules&localIdentName=[local]-[hash:base64:5]", "postcss-loader"]
    //         })
    //     }]
    // },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            template: '!!raw-loader!./src/index.ejs',
            filename: 'index.ejs',
            // favicon: 'favicon.ico'
        }),
        new CleanWebpackPlugin(['dist/*.*']),
        // new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]

};

module.exports = merge(commonConfig, publicConfig);
