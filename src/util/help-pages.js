// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// External imports
const {stripIndent, oneLine} = require('common-tags');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Object)
// -------------------------------------------- //

module.exports = {
  // Bypass nested object assignment functionality
  assignHelpPages(commands, pages) {
    for (cmd in pages) {
      if (commands[cmd]) {
        Object.assign(commands[cmd], pages[cmd]);
      }
    }
    return commands;
  },

  // Individual help pages
  helpPages: {
    new: {},
    view: {},
    edit: {},
    delete: {},
    list: {},
    toggle: {},
  }
}

// -------------------------------------------- //
