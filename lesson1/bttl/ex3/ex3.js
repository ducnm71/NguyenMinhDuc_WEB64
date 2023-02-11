const queryString = require('node:querystring')

const str = queryString.parse('name=tuananh&children=com&children=ngo&age=31')

console.log(str);