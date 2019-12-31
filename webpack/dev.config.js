// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// Node imports
const path = require('path');

// External imports
const merge = require('webpack-merge');

// Internal imports
const commonConfig = require('./common.config.js');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Dev Settings
// -------------------------------------------- //

const Dev = merge(commonConfig, {
  // Set the mode to development
  mode: 'development',

  // Set the output directory and filename
  output: {
    path: path.resolve(__dirname, './dev'),
    filename: 'tsk.js',
  },

  // Do not minimize the output file
  optimization: {
    minimize: false,
  }
});

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Object)
// -------------------------------------------- //

module.exports = Dev;

// -------------------------------------------- //
