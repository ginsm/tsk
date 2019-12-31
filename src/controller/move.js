// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// Internal imports
const db = require('../model/db');
const view = require('../view');
const {getCurrentList, argumentTypesAre} = require('../util/helpers');

// Module variables
const currentList = getCurrentList();

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Move Controller Methods
// -------------------------------------------- //

const Move = {

  // -------------------------------------------- //
  // SECTION - Exposed Method
  // -------------------------------------------- //
  
  mover({args, valid}) {
    // Rename a list (database)
    if (argumentTypesAre('string', args)) {
      return Move.renameList(args);
    }

    // Move task to a different ID
    if (argumentTypesAre('number', args)) {
      return Move.changeTaskID(args);
    }

    // Move task to a different list
    if (argumentTypesAre('different', args)) {
      return Move.moveTaskToList(args);
    }
  },

  // -------------------------------------------- //



  // -------------------------------------------- //
  // SECTION - Rename a list
  // -------------------------------------------- //
  
  renameList(args) {
    // Check whether arguments are databases or not
    const isDatabase = args.map((arg) => db.exists(arg));

    // Reject if neither are a valid database
    if (isDatabase.every((val) => val == false)) {
      return view.move.noDatabaseProvided(args);
    }

    // Reject if both are valid databases
    if (isDatabase.every((val) => val == true)) {
      return view.move.cannotOverwriteDatabase(args);
    }

    // Resolve which one is the database and new name
    const [database, newName] = args.reduce((arr, value, i) => {
      return isDatabase[i] ? [].concat(value, arr) : arr.concat(value);
    }, []);
      
    // Set the state to the new name
    if (database == currentList) {
      db.set('state', {currentList: newName});
    }

    // Rename the database
    db.rename(database, newName);
      
    // Alert that the list has been renamed
    view.move.renamedDatabase(database, newName);
  },

  // -------------------------------------------- //


  
  // -------------------------------------------- //
  // SECTION - Change a Task's ID
  // -------------------------------------------- //

  changeTaskID(args) {
    // Get database and check if the indices are valid
    const database = db.get(currentList);
    const validIndex = (arg) => (arg >= 0 && arg < database.length);

    if (args.every(validIndex)) {
      // Move the element
      const [from, to] = args;
      database.splice(to, 0, database.splice(from, 1)[0]);

      // Save the database
      db.set(currentList, database, false);

      // Alert that the task has moved
      return view.move.movedTask(from, to);
    }
    
    // Alert that the indices were invalid
    const IDs = args.filter((ID) => !validIndex(ID)).join(' and ');
    return view.move.invalidID(IDs);
  },

  // -------------------------------------------- //



  // -------------------------------------------- //
  // SECTION - Move a task to a different list
  // -------------------------------------------- //

  moveTaskToList(args) {
    // Get the Task ID, destination, and task itself.
    const [ID, destination] = args.sort();
    const task = db.get(currentList)[ID];
      
    // Ensure the destination and task are valid
    if (db.exists(destination) && task) {
      // Add the task to the new destination
      db.set(destination, [task]);

      // Delete the task from the current list
      db.delete(currentList, ID);

      // Alert that the task has been moved to another list
      return view.move.taskMovedToList(destination, ID);
    }

    // Alert that the destination does not exist
    return view.move.listNotFound(destination);
  }

  // -------------------------------------------- //

}

// -------------------------------------------- //
// SECTION - Module Export (Method)
// -------------------------------------------- //

module.exports = Move.mover;

// -------------------------------------------- //
