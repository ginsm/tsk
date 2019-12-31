#!/usr/bin/env node

// -------------------------------------------- //
// SECTION - Module Imports
// -------------------------------------------- //

// Import interface modules
const simplecmds = require('simplecmds');
const programOptions = require('./interface/options.js');
const commandOptions = require('./interface/commands.js');

// Import middleware
const {assignHelpPages, helpPages} = require('./util/help-pages.js');

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Initialization Middleware
// -------------------------------------------- //

// Add the help pages to the commands object
assignHelpPages(commandOptions, helpPages);

// -------------------------------------------- //



// -------------------------------------------- //
// SECTION - Interface Initialization
// -------------------------------------------- //

simplecmds
    .set(programOptions)
    .commands(commandOptions)
    .parse(process.argv);

// -------------------------------------------- //
