/* const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: 'production',
  entry: {
    vendor: './src/vendor.ts',
    polyfills: './src/polyfills.ts',
    main: './src/main.ts'
  },
  loaders: {
    test: /\.html$/,
    loader: 'html-loader'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}; */
