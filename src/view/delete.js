// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// External imports
const {oneLine} = require('common-tags');

// Internal imports
const {getCurrentList} = require('../util/helpers');
const theme = require('../util/theme.js');

// Module variables
const currentList = getCurrentList();

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Delete View Methods
// -------------------------------------------- //

const DeleteView = {
  deletedIDs(database, IDs) {
    if (IDs.length) {
      // If there is more than one deleted
      if (IDs.length > 1) {
        return console.log(oneLine`
          Deleted ${IDs.length} tasks from ${theme.hl(currentList)}.
        `);
      }
      
      // Resolve the task's ID
      const ID = database.indexOf(IDs[0]);

      // Output the deleted task ID
      return console.log(oneLine`
        Deleted Task ${ID} from ${theme.hl(currentList)}.
      `);
    }

    // Otherwise output that the ID does not exist
    console.log(oneLine`
      Error: There is no task with that ID.
    `);
  },

  // Alert that a list has been deleted
  deletedList(nameOfList, allowed = true) {
    // Print the confirmation message
    if (allowed) {
      return console.log(oneLine`
        The list ${theme.hl(nameOfList)} has been deleted.
      `);
    }

    // Print the error message
    console.log(oneLine`
      Error: You cannot delete list ${theme.hl(nameOfList)}. It is necessary.
    `);
  },


  // Alert that you cannot delete the current list
  cannotDeleteCurrentList() {
    console.log(oneLine`
      Error: You cannot delete the list that you are currently using.
    `);
  },
};

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Object)
// -------------------------------------------- //

module.exports = DeleteView;

// -------------------------------------------- //
