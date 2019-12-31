// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// External modules
const {stripIndent, oneLine} = require('common-tags');

// Internal modules
const theme = require('../util/theme.js');
const db = require('../model/db');
const {getCurrentList, capitalize, argumentTypesAre, displayPage} = 
      require('../util/helpers');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Fn)
// -------------------------------------------- //

module.exports = function({args: [ID]}) {
  // Check if the ID is a string and if the database exists
  const idIsString = argumentTypesAre('string', [ID]);

  if (idIsString && !db.exists(ID)) {
    return console.log(oneLine`The list ${theme.hl(ID)} does not exist.`)
  }

  // Get the database and generate the title
  const list = idIsString ? ID : getCurrentList();
  const database = db.get(list);
  const title = theme.bld(oneLine`[ 
      ${theme.hl(capitalize(list))} List 
      ]`);



  // -------------------------------------------- //
  // SECTION - Display Individual Task
  // -------------------------------------------- //
  
  if (argumentTypesAre('number', [ID]) && database[ID]) {
    const task = database[ID];
    const complete = task.complete ? theme.cmp('Complete') : theme.wip('In Progress');

    // Print the requested tasks subject & body
    console.log('\n' + stripIndent`
      ${title}


      ${theme.bld(`Task #${ID}`)} (${complete})

      ${task.subject}


      ${theme.bld('Additional information')}
    ` + `\n\n${task.body || 'None avilable.'}\n`);
    return;
  }
  
  // -------------------------------------------- //



  // -------------------------------------------- //
  // SECTION - Display All Tasks
  // -------------------------------------------- //
  
  // Helper Variables
  const amountOfDigits = `${database.length}`.length;
  const addSpace = (length) => Array(length).join(' ');

  // Begin printing
  const output = (database || [false]).map((task, id) => {
    // Handle the case of no tasks
    if (id == 0 && task == false) {
      return 'There are no tasks in this list.';
    }

    // Generate each task's output
    const complete = task.complete ? theme.bld.cmp : theme.bld.wip;
    const space = addSpace((amountOfDigits + 1) - `${id}`.length);
    return `${space}${theme.dim(id)}  ${complete('■')}  ${task.subject}`;
  });

  // Output the page
  displayPage(title, output);

  // -------------------------------------------- //

}

// -------------------------------------------- //
