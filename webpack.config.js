const webpack = require('webpack');
const path = require('path');

// variables
const isProduction = process.argv.indexOf('-p') >= 0;
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const DEV_SERVER_IP = '0.0.0.0';
const DEV_SERVER_PORT = '8092';

module.exports = {
  context: sourcePath,
  entry: {
    bundle: './index.tsx'
  },
  output: {
    path: outPath,
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProduction ? '[id].[chunkhash].js' : '[name].[hash].js',
    publicPath: '/'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: isProduction
          ? 'ts-loader'
          : ['babel-loader?plugins=react-hot-loader/babel', 'ts-loader']
      },
      // css
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader',
              options: {
                strictMath: true,
                noIeCompat: true
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(png|svg)$/, use: 'url-loader?limit=10000' },
      { test: /\.(jpg|gif)$/, use: 'file-loader' }
    ]
  },
  // optimization: {
  //     splitChunks: {
  //         name: true,
  //         cacheGroups: {
  //             commons: {
  //                 chunks: 'initial',
  //                 minChunks: 2
  //             },
  //             vendors: {
  //                 test: /[\\/]node_modules[\\/]/,
  //                 chunks: 'all',
  //                 priority: -10
  //             }
  //         }
  //     },
  //     runtimeChunk: true
  // },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new WebpackCleanupPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: !isProduction
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    host: DEV_SERVER_IP,
    port: DEV_SERVER_PORT,
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal'
  },
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  }
};
