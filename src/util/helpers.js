// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

const db = require('../model/db');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Helper Module
// -------------------------------------------- //

const Helpers = {
  // Output via one console.log
  displayPage(title, output) {
    title = `\n${title}\n\n`;
    output = output.join('\n') + '\n';
    console.log(title + output);
  },


  // Generates IDs (number and ranges)
  generateIDs(args) {
    return args.reduce((arr, value) => {
      const isRange = /\d+?-\d+$/.test(value);
      return arr.concat(isRange ? Helpers.generateRange(value) : +value);
    }, []);
  },

  
  // Get the current list
  getCurrentList() {
    return db.get('state').currentList;
  },


  // Separate an arr conditionally into an object (pass/fail props)
  separate(arr = [], condition = false, [pass, fail] = ['pass', 'fail']) {
    return condition ? arr.reduce((obj, item, id) => {
      const key = condition(item, id) ? pass : fail;
      const value = obj[key].concat(item);
      return ({...obj, [key]: value});
    }, {[pass]: [], [fail]: []}) : arr;
  },


  // Used to determine the type of arguments
  argumentTypesAre(type, args) {
    const types = new Set(args.map((arg) => typeof arg));
    return (type == 'different') ? (types.size > 1) : 
        (types.size == 1 && types.has(type));
  },


  // Capitalize a word (word -> Word)
  capitalize(word) {
    return word[0].toUpperCase() + word.substr(1);
  },


  // Remove any carriage returns
  sanitize(string) {
    return typeof string == 'string' ? string.replace(/\r?\n|\r/g, '') : string;
  },


  // Generate a range of numbers (1-3 -> [1, 2, 3])
  generateRange(range) {
    const [start, end] = range.split('-')
        .map((v) => +v)
        .sort((a, b) => a - b);
    const tmp = [];
    for (let i = start; i <= end; i++) {
      tmp.push(i);
    }
    return tmp;
  },
}

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export
// -------------------------------------------- //

module.exports = Helpers;

// -------------------------------------------- //
