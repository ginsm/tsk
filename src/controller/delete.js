// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// Internal modules
const {getCurrentList, generateIDs, separate} = require('../util/helpers');
const prompt = require('../util/prompter.js');
const theme = require('../util/theme.js');
const db = require('../model/db');
const view = require('../view');

// Module variables
const currentList = getCurrentList();

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Delete Controller Methods
// -------------------------------------------- //

const Delete = {
  
  // -------------------------------------------- //
  // SECTION - Exposed Method
  // -------------------------------------------- //
  
  deleter({args, valid}) {
    if (valid) {
      // Get the database names
      const databases = db.databases();

      // Separate the IDs and lists
      const separateLists = (value) => databases.includes(value);
      const {lists, IDs} = separate(args, separateLists, ['lists', 'IDs']);

      prompt.confirm({
        message: 'Are you sure? This action cannot be undone.',
      }).run(function (answer) {
        if (answer.confirm || process.env.confirm__ == 'false') {
          // Delete tasks by ID
          if (IDs.length) {
            Delete.deleteIDs(IDs);
          }

          // Delete the lists by name
          if (lists.length) {
            Delete.deleteLists(lists);
          }
        }
      });
    }
  },

  // -------------------------------------------- //



  // -------------------------------------------- //
  // SECTION - Delete Tasks by ID
  // -------------------------------------------- //
  
  deleteIDs(IDs) {
    // Generate the IDs
    IDs = generateIDs(IDs);
    
    // Get the database
    const database = (db.get(currentList) || []);

    // Get an object containing the deleted/kept tasks
    const deletedID = (_, id) => IDs.includes(id);
    const purged = separate(database, deletedID, ['deleted', 'kept']);
      
    // Set the current list to purged.kept without preserving data
    db.set(currentList, purged.kept, false);

    // Alert the deleted ID(s) (purged.deleted)
    view.delete.deletedIDs(database, purged.deleted);
  },

  // -------------------------------------------- //



  // -------------------------------------------- //
  // SECTION - Delete lists by name
  // -------------------------------------------- //
  
  deleteLists(lists) {
    lists.forEach((list) => {
      // Reject deleting the state list
      if (list == 'state') {
        return view.delete.deletedList(list, false);
      }

      if (list == currentList) {
        return view.delete.cannotDeleteCurrentList();
      }

      // Destroy the database
      db.destroy(list);
      view.delete.deletedList(list);
    });
  }

  // -------------------------------------------- //

}

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Exports (Method)
// -------------------------------------------- //

module.exports = Delete.deleter;

// -------------------------------------------- //
