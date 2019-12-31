// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// External imports
const {stripIndent, oneLine} = require('common-tags');

// Internal imports
const theme = require('../util/theme.js');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Move View Methods
// -------------------------------------------- //

const MoveView = {

  // -------------------------------------------- //
  // SECTION - Rename List Alerts
  // -------------------------------------------- //

  renamedDatabase(database, newName) {
    console.log(oneLine`
      List ${theme.hl(database)} has been renamed to ${theme.hl(newName)}.
    `);
  },

  noDatabaseProvided(args) {
    console.log(oneLine`
      Error: Neither ${theme.hl(args[0])} or ${theme.hl(args[1])} is a valid
      list.
    `);
  },

  cannotOverwriteDatabase([one, two]) {
    console.log(oneLine`
      Error: You cannot rename ${theme.hl(one)} to an existing list
      (${theme.hl(two)}).
    `);
  },
  
  // -------------------------------------------- //



  // -------------------------------------------- //
  // SECTION - Move Task ID in List Alerts
  // -------------------------------------------- //
  
  movedTask(from, to) {
    console.log(oneLine`Task ${from} has been moved to Task ${to}.`);
  },

  invalidID(IDs) {
    console.log(oneLine`Error: Unable to move your task. ID ${IDs} was invalid.`);
  },
  
  // -------------------------------------------- //



  // -------------------------------------------- //
  // SECTION - Move Task to New List Alerts
  // -------------------------------------------- //
  
  taskMovedToList(destination, ID) {
    console.log(oneLine`Task ${ID} has been moved to list
        ${theme.hl(destination)}.`)
  },

  listNotFound(list) {
    console.log(oneLine`Error: The list ${theme.hl(list)} does not exist.`);
  }
  
  // -------------------------------------------- //

}

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Object)
// -------------------------------------------- //

module.exports = MoveView;

// -------------------------------------------- //
