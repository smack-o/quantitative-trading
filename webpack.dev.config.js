const merge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./webpack.common.config.js');

const devConfig = {
    devtool: 'inline-source-map',
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ]
    },
    output: {
        filename: '[name].[hash].js'
    },
    // module: {
    //     rules: [{
    //         test: /\.css$/,
    //         use: ["style-loader", "css-loader?modules&localIdentName=[local]-[hash:base64:5]", "postcss-loader"]
    //     }]
    // },
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://128.199.93.191:3000',
                changeOrigin: true
            },
        }
    }
};

module.exports = merge({
    customizeArray(a, b, key) {
        // entry.app不合并，全替换
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);
