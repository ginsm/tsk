// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// Import callback modules
const controller = require('../controller');
const view = require('../view');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Command Options
// -------------------------------------------- //

const Commands = {
  list: {
    usage: '-l --list [name]',
    rules: false,
    callback: controller.list,
  },
  view: {
    usage: '-v --view [id|list]',
    rules: false,
    callback: view.displayTasks,
  },
  new: {
    usage: '-n --new <text>',
    amount: 2,
    callback: controller.new,
  },
  edit: {
    usage: '-e --edit <id>',
    rules: '<number>',
    callback: controller.edit,
  },
  delete: {
    usage: '-d --delete <ids/lists>',
    amount: 0,
    callback: controller.delete,
  },
  move: {
    usage: '-m --move <id/list> <id/list>',
    rules: '<number,string> <number,string>',
    amount: 2,
    callback: controller.move,
  },
  toggle: {
    usage: '-t --toggle <ids>',
    rules: '<number,string>',
    amount: 0,
    callback: controller.toggle,
  },
};

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export
// -------------------------------------------- //

module.exports = Commands;

// -------------------------------------------- //
