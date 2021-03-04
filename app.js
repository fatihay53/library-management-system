const debug = require('debug')('steve');


debug('variable value... through debug');
//console.log('variable value... through console.');
let arr = [].fill(123, 0, 10000);
let arr2 = new arr.map(item => item * 10); // needed `new` in front of Array
debug('after the loop');
console.log('asdsadasd')