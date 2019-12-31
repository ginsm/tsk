// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// External imports
const Enquirer = require('enquirer');
const enquirer = new Enquirer().register(
  'editor', require('enquirer-editor')
);

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Prompter Methods
// -------------------------------------------- //

const Prompter = {
  // Initialize questions array
  questions: [],


  // Editor prompt
  editor({message = '', name = 'editor', value, validate}) {
    // Create the new editor prompt
    Prompter.questions = Prompter.questions.concat({
      type: 'editor', name, message,
      ...(value ? {initial: value} : {}),
      ...(validate ? {validate} : {validate: undefined}),
    });

    // Return 'this' for chaining
    return this;
  },


  // Confirm prompt
  confirm({message = '', name = 'confirm'}) {
    if (process.env.confirm__ == 'true') {
      // Create the new confirm prompt
      Prompter.questions = Prompter.questions.concat({
        type: 'confirm', name, message,
      });
    }

    // Return 'his for chaining
    return this;
  },


  // Runs the prompt
  run(callback) {
    enquirer.prompt(Prompter.questions)
      .then(callback)
      .catch(console.error);
  },
};

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Module Export (Object)
// -------------------------------------------- //

module.exports = Prompter;

// -------------------------------------------- //
