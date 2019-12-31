const fs = require('fs');

const Database = {
  get(database = '') {
    if (this.exists(database)) {
      const data = fs.readFileSync(dir(database), 'utf8');
      return data ? JSON.parse(data) : '';
    }
    return false;
  },
  
  find(database = '', query) {
    const data = this.get(database);
    return deepSearch(data, query);
  },

  set(database = '', data = {}, preserve = true) {
    const resolvedData = preserve ? preserver(database, data) : data;
    fs.writeFileSync(dir(database), parse(resolvedData), errorHandler);
  },

  delete(database = '', omitter = []) {
    if (!this.exists(database) || isObject(omitter) || empty(omitter)) { 
      return false; 
    }
    return this.set(database, remove(this.get(database), omitter), false);
  },

  rename(database = '', newName = '') {
    fs.renameSync(dir(database), dir(newName));
  },

  destroy(database = '') {
      fs.unlink(dir(database), errorHandler);
  },

  exists(database = '') {
    return fs.existsSync(dir(database));
  },

  databases() {
    return fs.readdirSync(dir(), errorHandler).map((file) =>
      file.replace(/\.[\w]+/g, '')) || false;
  }
}

module.exports = Database;


//? SECTION - Helper Functions

//? Generic Helpers

function dir(database = false) {
  const location = database ? `${database}.json` : '';
  return `${__dirname}/database/${location}`;
}

function empty(obj) {
  if (typeof obj == 'number') {
    return false;
  }
  for (let x in obj) { 
    return false; 
  }
  return true;
}

function isObject(obj) {
  if (typeof obj == 'number') {
    return false;
  }
  return Array.isArray(obj) ? false : obj === Object(obj);
}

function errorHandler(err) {
  return err && console.error(err);
}

function isString(input) {
  return typeof input === 'string';
}


//? Find Helpers

function deepSearch(data, query, lastProperty = false) {
  const lowerQuery = query.toLowerCase();
  return (isObject(data) ? Object.keys(data) : data).reduce((obj, key) => {
    const value = (isObject(data) && data[key] || key);
    const keyString = (isString(key) && key || false);
    const match = (isString(key) && key.toLowerCase().includes(lowerQuery));
    return match ? {...obj, [lastProperty || keyString]: value } :
      (isObject(value) || Array.isArray(value)) ? 
      {...obj, ...deepSearch(value, query, keyString)} : obj;
  }, {});
}


//? Write Helpers

function preserver(database, data) {
  if (Database.exists(database)) {
    return Array.isArray(data) ? [...Database.get(database), ...data] 
      : {...Database.get(database), ...data};
  }
  return data;
}

function parse(data) {
  return empty(data) ? '' : JSON.stringify(data, null, '\t');
}

//? Delete Helpers

function remove(data, omitter) {
  return Array.isArray(data) ? omitFromArray(data, omitter) 
    : omitFromObject(data, omitter) 
}

function omitFromArray(data, omitter) {
  return data.filter((_, id) => Array.isArray(omitter) ? 
      !omitter.includes(id) : !(omitter === id))
}

function omitFromObject(data, omitter) {
  return Object.keys(data).reduce((prev, curr) =>
      (Array.isArray(omitter) ? omitter.includes(curr) : omitter === curr) ? 
        prev : {...prev, [curr]: data[curr]}
    , {});
}
