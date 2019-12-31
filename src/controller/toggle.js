// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// Internal imports
const db = require('../model/db');
const view = require('../view');
const {getCurrentList, generateIDs, separate} = require('../util/helpers');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Toggle Controller Methods
// -------------------------------------------- //

const Toggle = {
  
  // -------------------------------------------- //
  // SECTION - Exposed Method
  // -------------------------------------------- //
  
  toggler({args, valid}) {
    if (valid) {
      // Get the current list's database
      const currentList = getCurrentList();
      const database = db.get(currentList);

      // Generate the IDs (valid & invalid)
      const validID = (arg) => arg >= 0 && arg < database.length;
      const IDs = separate(generateIDs(args), validID, ['valid', 'invalid']);

      // Toggle the IDs and save the database
      const singleID = IDs.valid.length == 1;
      IDs.valid.forEach(Toggle.toggleID(database, singleID));
      db.set(currentList, database, false);

      // Alert that multiple tasks were changed
      if (!singleID && IDs.valid.length > 1) {
        view.toggle.toggledMultipleTasks(IDs.valid.length);
      }

      // Alert that there were invalid IDs
      if (IDs.invalid.length) {
        view.toggle.invalidIDs(IDs.invalid);
      }
    }
  },

  // -------------------------------------------- //


  
  // -------------------------------------------- //
  // SECTION - ID Toggle Method
  // -------------------------------------------- //
  
  toggleID(database, singleID = false) {
    return function(ID) {
      if (database[ID]) {
        // Toggle the ID's completion state
        const status = database[ID].complete;
        database[ID].complete = !status;

        // Output individual toggle message
        if (singleID) {
          view.toggle.toggledTask(ID, !status);
        }
      }
    };
  }

  // -------------------------------------------- //
};

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Method)
// -------------------------------------------- //

module.exports = Toggle.toggler;

// -------------------------------------------- //
