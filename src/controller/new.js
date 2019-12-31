// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// Internal imports
const db = require('../model/db');
const {getCurrentList, sanitize} = require('../util/helpers');
const view = require('../view');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Fn)
// -------------------------------------------- //

module.exports = function({args: [subject, body], valid}) {
  if (valid) {
    // Get the current list
    const currentList = getCurrentList();

    // Create a new task in the current list
    db.set(currentList, [{
      subject: sanitize(subject), 
      ...(body && {body}), 
      complete: false,
    }]);

    // Alert that the task has been created
    const newTaskId = db.get(currentList).length - 1;
    view.new.taskCreated(newTaskId);
  }
};

// -------------------------------------------- //
