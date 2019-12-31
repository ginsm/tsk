// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// External modules
const {oneLine, stripIndent} = require('common-tags');

// Internal modules
const {getCurrentList, capitalize} = require('../util/helpers');
const prompt = require('../util/prompter.js');
const theme = require('../util/theme.js');
const db = require('../model/db');
const view = require('../view');

// Module variables
const currentList = getCurrentList();

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Edit Controller Methods
// -------------------------------------------- //

const Editor = {

  // -------------------------------------------- //
  // SECTION - Exposed Method
  // -------------------------------------------- //
  
  edit({args: [ID], valid}) {
    if (valid) {
      // Get the database
      const database = (db.get(currentList) || []);
      
      // Begin editing
      if (database[ID]) {
        Editor.editTask(ID, database);
      }

    }
  },



  // -------------------------------------------- //
  // SECTION - Edit Task by ID
  // -------------------------------------------- //

  editTask(ID, database) {
    // Get the task by ID
    const task = database[ID];

    // Start the prompt
    prompt
      .editor({
        message: oneLine`
          Editing Task ${ID} in list ${theme.hl(
            capitalize(currentList)
            )}`,
        value: stripIndent`
          Editing Rules
          ———————————––
          1. Please only edit below the dividers (———————). 
          2. The subject can only be one line. The body can be multilined.
          3. Any spaces, newlines, etc will be preserved in your task.
            
          Subject
          ———————
          ${task.subject}
            
          Body
          ————
        ` + '\n' + (task.body ? task.body : ''),
      })
      .confirm({
        message: `Are you sure you want to edit task ${ID}? This cannot be undone.`
      })
      .run(Editor.processAnswer(task, ID, database));
  },



  // -------------------------------------------- //
  // SECTION - Prompt callback (editTask)
  // -------------------------------------------- //  

  processAnswer(task, ID, database) {
    return function(res) {
      if (res.confirm || process.env.confirm__ == 'false') {
        // Get the response as an array of strings
        const response = res.editor.split('\n');

        // Find the index of any header (adds 2 to it)
        const indexOfHeader = (text) => response.indexOf(text) + 2;

        // Get the subject and body from the response
        const subject = response[indexOfHeader('Subject')];
        let body = response.slice(indexOfHeader('Body')).join('\n');

        // Remove end of body newlines
        if (body.slice(-1) == "\n") {
          body = body.slice(0, -1);
        }

        // Build the task
        const ans = {
          subject, 
          ...(body != '' ? {body} : {}),
          complete: task.complete
        };

        // Save the changes.
        database[ID] = ans;
        db.set(currentList, database, false);
        return view.edit.updated(ID);
      }
      return view.edit.backedOut(ID);
    }
  }
}

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Fn)
// -------------------------------------------- //

module.exports = Editor.edit;

// -------------------------------------------- //
