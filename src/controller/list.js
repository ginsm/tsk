// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// Internal imports
const db = require('../model/db');
const view = require('../view');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Fn)
// -------------------------------------------- //

module.exports = function({args: [nameOfList]}) {
  // Display all of the lists if no name was given
  if (!nameOfList) {
    return view.displayLists();
  }

  // Handle invalid names
  const validName = /^[a-zA-Z\-_0-9]+$/.test(nameOfList);
  if (!validName) {
    return view.list.invalidCharacters(nameOfList);
  }

  // Ensure the requested list is not 'state' and switch to the list
  // Create it if it does not exist
  if (nameOfList !== 'state') {
    db.set(nameOfList, []);
    process.env.current__ = nameOfList;
    return view.list.switchedList(nameOfList);
  }

  // Handle edgecases where they are not allowed to switch to the list
  view.list.switchedList(nameOfList, false);
};

// -------------------------------------------- //
