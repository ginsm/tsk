// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// Internal Imports
const db = require('../model/db.js');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - State Methods
// -------------------------------------------- //

const State = {
  getState() {
    const {currentList, confirm} = db.get('state');
    process.env.current__ = currentList;
    process.env.confirm__ = confirm;
  },

  setState() {
    db.set('state', {
      currentList: process.env.current__,
      confirm: process.env.confirm__,
    });
  },
}

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Object)
// -------------------------------------------- //

module.exports = State;

// -------------------------------------------- //
