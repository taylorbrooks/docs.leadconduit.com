var fs     = require('fs');
var fields = require('leadconduit-fields');

fs.writeFile('fields.json', JSON.stringify(fields), function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});