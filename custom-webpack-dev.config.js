const ExtensionReloader = require('webpack-extension-reloader')
const config = require('./custom-webpack.config');

module.exports = {
  ...config,
  mode: 'development',
  plugins: [new ExtensionReloader({
    reloadPage: true,
    entries: {
      'background': 'background',
      'content-script-js': 'content-script.ts',
      // 'content-script-css': 'content-script.scss'
    }
  })]
}
