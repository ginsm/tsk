// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// External imports
const colors = require('ansi-colors');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Ansi Color Theme
// -------------------------------------------- //

const Theme = colors.theme({
  // Header
  bld: colors.bold,

  // Highlight list
  hl: colors.magenta,

  // Extra highlight
  hl2: colors.yellow,
  
  // Work in Progress
  wip: colors.red,

  // Completed
  cmp: colors.green,

  // Dim
  dim: colors.dim,
});

// -------------------------------------------- //


// -------------------------------------------- //
// SECTION - Module Export (Object)
// -------------------------------------------- //

module.exports = Theme;
