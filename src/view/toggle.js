// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// External imports
const {oneLine} = require('common-tags');

// Internal Imports
const {getCurrentList} = require('../util/helpers');
const theme = require('../util/theme.js');

// Module variables
const currentList = getCurrentList();

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Object)
// -------------------------------------------- //

module.exports = {
  // Alert that a task completion state has been toggled
  toggledTask(id, complete) {
    const status = complete ? theme.cmp('complete') : theme.wip('in progress');
    console.log(oneLine`
      Task ${id} in ${theme.hl(currentList)} has been set to ${status}.
    `);
  },

  
  // Alert that multiple tasks have been toggled
  toggledMultipleTasks(amount) {
    console.log(oneLine`
        Toggled the completion status of ${amount} tasks in
        ${theme.hl(currentList)}.
    `);
  },

  invalidIDs(ID) {
    // Handle multiple invalid IDs
    if (ID.length > 1) {
      return console.log(oneLine`
        Error: There were ${ID.length} invalid IDs that couldn't be toggled.
      `);
    }

    // Handle a single invalid ID
    console.log(oneLine`
      Error: Task ${ID} doesn't exist and couldn't be toggled.
    `);
  }
}

// -------------------------------------------- //
