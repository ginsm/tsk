// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// External imports
const {stripIndent, oneLine} = require('common-tags');

// Internal imports
const theme = require('../util/theme.js');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Edit View Methods
// -------------------------------------------- //

const EditView = {
  // The task has been updated
  updated(ID) {
    console.log(oneLine`
      Task #${ID} has been updated.
    `);
  },

  // The user backed out of editing the task
  backedOut(ID) {
    console.log(oneLine`
      Task #${ID} could not be edited.
    `);
  },
}

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Exports (Object)
// -------------------------------------------- //

module.exports = EditView;

// -------------------------------------------- //