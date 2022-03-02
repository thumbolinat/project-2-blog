const Filter = require('bad-words');

const filter = new Filter()

const badword = require ('./bad-words.json');

filter.addWords(...badword);

console.log(filter.clean("Filtered shit!"))

module.exports = filter