// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// External imports
const {stripIndent, oneLine} = require('common-tags');

// Internal imports
const theme = require('../util/theme.js');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - List View Methods
// -------------------------------------------- //

const List = {
  // Alert that a new list is being used
  switchedList(nameOfList, allowed = true) {
    // Print the confirmation message
    if (allowed) {
      return console.log(`You are now using list ${theme.hl(nameOfList)}.`);
    }

    // Print the error message
    console.log(`Error: You cannot use the list ${theme.hl(nameOfList)}.`);
  },


  // Alert that invalid characters were found
  invalidCharacters(nameOfList) {
    // Initialize the allowed characters
    const allowed = oneLine`
      ${theme.hl2('A-z')},
      ${theme.hl2('0-9')},
      ${theme.hl2('-')},
      and ${theme.hl2('_')}
      `;

    // Print the error message
    console.log(stripIndent`
        Error: Invalid characters found in ${theme.hl(nameOfList)}. 
        Allowed: ${allowed}.`
    );
  },
};

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Object)
// -------------------------------------------- //

module.exports = List;

// -------------------------------------------- //
