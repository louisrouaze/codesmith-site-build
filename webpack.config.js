const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

const isProd = process.env.NODE_ENV === 'production'; // true or false
const cssDev = [
  'style-loader',
  'css-loader?sourceMap',
  'sass-loader',
  {
    loader: 'sass-resources-loader',
    options: {
      // Provide path to the file with resources
      resources: ['./src/resources.scss'],
    },
  },
];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    'css-loader',
    'sass-loader',
    {
      loader: 'sass-resources-loader',
      options: {
        // Provide path to the file with resources
        resources: ['./src/resources.scss'],
      },
    },
  ],
  publicPath: '',
});
const cssConfig = isProd ? cssProd : cssDev;

const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
  entry: {
    app: './src/app.js',
    bootstrap: bootstrapConfig,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['file-loader?name=/images/main/[name].[ext]', 'image-webpack-loader?bypassOnDebug'],
      },
      { test: /\.(woff2?)$/, use: 'url-loader?limit=10000&name=/fonts/[name].[ext]' },
      { test: /\.(ttf|eot)$/, use: 'file-loader?name=/fonts/[name].[ext]' },
      // Bootstrap 3
      { test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, use: 'imports-loader?jQuery=jquery' },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true, // gzip
    hot: true, // hot module replacement
    open: true, // open window
    stats: 'errors-only', // less info in terminal log
  },
  plugins: [
    // Additional html/ejs templates must each have their own instance
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/faq.html',
      filename: 'faq.html',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/events.html',
      filename: 'events.html',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/blog.html',
      filename: 'blog.html',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/cs-style-guide.html',
      filename: 'cs-style-guide.html',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/csx.html',
      filename: 'csx.html',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/learn.html',
      filename: 'learn.html',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/program.html',
      filename: 'program.html',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
    }),
    new ExtractTextPlugin({
      filename: './css/[name].css',
      disable: !isProd,
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // Make sure this is after ExtractTextPlugin!
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
      purifyOptions: {
        whitelist: ['on-scroll', 'nav-pad', 'collapsing'],
      },
    }),
  ],
};
