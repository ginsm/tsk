// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// Internal modules
const view = require('../view');


// -------------------------------------------- //
// SECTION - Program Options
// -------------------------------------------- //

const Options = {
  description: 'Create and manage multiple task lists',
  defaults: {
    rules: '<number,string>',
    amount: 1,
  },
  onNoCommand: function() {
    view.displayTasks();
  },
};

// -------------------------------------------- //


// -------------------------------------------- //
// SECTION - Module Export
// -------------------------------------------- //

module.exports = Options;

// -------------------------------------------- //
