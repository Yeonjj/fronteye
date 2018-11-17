var DS = require('ds/ds.js')


// export default DS;
const assert = require('assert');

const ds = new DS();


assert.equal(typeof(ds), 'object')
assert.equal(ds.prototype.prototype, DS)
console.log('success');
