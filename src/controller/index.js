// -------------------------------------------- //
// SECTION - Module Export (Object)
// -------------------------------------------- //

module.exports = {
  list: (...args) => require('./list')(...args),
  new: (...args) => require('./new')(...args),
  edit: (...args) => require('./edit')(...args),
  delete: (...args) => require('./delete')(...args),
  move: (...args) => require('./move')(...args),
  toggle: (...args) => require('./toggle')(...args),
};

// -------------------------------------------- //
