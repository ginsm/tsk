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

  // Work in Progress
  wip: colors.red,

  // Completed
  cmp: colors.green,

  // Dim
  dim: colors.dim,

  // Extra highlight
  hl2: colors.yellow,
});

// -------------------------------------------- //


// -------------------------------------------- //
// SECTION - Module Export (Object)
// -------------------------------------------- //

module.exports = Theme;
