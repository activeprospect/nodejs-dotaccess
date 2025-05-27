module.exports.set = set;
module.exports.unset = unset;
module.exports.get = get;

function parts (key) {
  if (Array.isArray(key)) return key;
  return key.split('.');
}

function lookup (obj, key) {
  key = parts(key);
  const lastKey = key.pop();
  for (let i = 0, l = key.length; i < l; i++) {
    const part = key[i];
    if (!(part in obj)) obj[part] = {};
    obj = obj[part];
    if (!obj) throw new Error('dotaccess: incompatible value in ' + part);
  }
  return [obj, lastKey];
}

function set (obj, key, value, overwrite) {
  const objectAndKey = lookup(obj, key);
  var obj = objectAndKey[0];
  var key = objectAndKey[1];
  if (overwrite || !(key in obj)) obj[key] = value;
}

function unset (obj, key) {
  const objectAndKey = lookup(obj, key);
  var obj = objectAndKey[0];
  var key = objectAndKey[1];
  return delete obj[key];
}

function get (obj, key, def) {
  key = parts(key);
  for (let i = 0, l = key.length; i < l; i++) {
    const part = key[i];
    if (!(part in obj)) return def;
    obj = obj[part];
  }
  return obj;
}
