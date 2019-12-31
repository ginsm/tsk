// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// Internal imports
const {getCurrentList} = require('../util/helpers.js');
const theme = require('../util/theme.js');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - New View Methods
// -------------------------------------------- //

const New = {
  // Alert that a task has been created
  taskCreated(id) {
    const currList = theme.hl(getCurrentList());
    console.log(`Task ${id} has been created in ${currList}.`);
  },
}

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Object)
// -------------------------------------------- //

module.exports = New;

// -------------------------------------------- //
