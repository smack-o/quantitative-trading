const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://128.199.93.191:3000',
        changeOrigin: true,
      },
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('src', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('services', resolve('src/services'));
  },
};
