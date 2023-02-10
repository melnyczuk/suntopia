/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const template = './src/index.html';
const title = 'sun is the new currency';

module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  entry: path.join(__dirname, '/src/styles.css'),
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg|tga|glb|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg|webm)$/i,
        use: 'file-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.mp4$/,
        use: 'file-loader?name=[name].[ext]',
        exclude: /node_modules/,
      },
      {
        test: /\.c$/i,
        use: 'raw-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
  },
  plugins: [new HtmlWebpackPlugin({ template, title })],
  resolve: { extensions: ['.ts', '.tsx', '.js', '.css'] },
  target: 'web',
};
