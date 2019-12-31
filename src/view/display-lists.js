// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// Internal imports
const theme = require('../util/theme.js');
const db = require('../model/db');
const {getCurrentList, displayPage} = require('../util/helpers');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Fn)
// -------------------------------------------- //

module.exports = function() {
  // Get the current list
  const currentList = getCurrentList();

  // Sort alphabetically
  const alphabetically = (a, b) => a.localeCompare(b);

  // Output Lists Title
  const title = theme.bld(`[  Available Lists  ]`);

  // Generate the output
  const output = db.databases().sort(alphabetically)
        .map((list) => list == currentList ? theme.hl(`- ${list} -`) : list )
        .filter((list) => list != 'state');

  displayPage(title, output);
}

// -------------------------------------------- //
