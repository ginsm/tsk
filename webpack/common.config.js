// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// Node imports
const path = require('path');

// External imports
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Config Settings
// -------------------------------------------- //

const CommonConfig = {
  // Set the app's entry point
  entry: {
    main: './src/app.js',
  },


  // Set target platform (node)
  target: 'node',


  // Make sure node's __dirname works
  node: {
    __dirname: false,
  },


  // Minify/optimize with terser-webpack-plugin
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          comments: false,
        },
      },
      extractComments: false,
    })],
  },

  // Exclude lesser used imports from bundle
  externals: {
    enquirer: 'enquirer',
    'external-editor': 'external-editor',
  },

  // Initialize the plugins
  plugins: [
    // Clean the destination folder for new build
    new CleanWebpackPlugin(),
    // Bundle the static assets
    new CopyPlugin([
      {from: './webpack/assets', to: './database'},
    ])],


  // Set up the loaders
  module: {
    rules: [
      // .js loaders (babel-loader, shebang-loader)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // (shebang-loader) ignores the shebang in app.js
          {
            loader: 'shebang-loader',
          },
          // (babel-loader) with preset-env
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            },
          }
        ],
      },
    ],
  },
}

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Object)
// -------------------------------------------- //

module.exports = CommonConfig;

// -------------------------------------------- //