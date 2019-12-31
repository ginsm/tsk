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
// SECTION - Production Settings
// -------------------------------------------- //

const Production = merge(commonConfig, {
  // Set the mode to development
  mode: 'production',

  // Set the output directory and filename
  output: {
    path: path.resolve(__dirname, './prod'),
    filename: 'tsk.js',
  },

  // Do not minimize the output file
  optimization: {
    minimize: true,
  }
});

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Object)
// -------------------------------------------- //

module.exports = Production;

// -------------------------------------------- //
