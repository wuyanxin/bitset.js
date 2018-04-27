
const assert = require('assert');
const Bitset = require('../bitset');

describe('Bitset', () => {


  it('constructor', () => {
    const bitset = new Bitset(8);
    console.log(bitset.toString());
  });

  it('add', () => {
    const bitset = new Bitset(8);
    bitset.add(0);
    assert(bitset._data[0] & 1); // 1 & 1
    assert(!(bitset._data[0] & 2)); // 1 & 2
    bitset.add(1);
    assert(bitset._data[0] & 1); // 3 & 1
    assert(bitset._data[0] & 2); // 3 & 2
    assert(bitset._data[0] & 3); // 3 & 3
    assert(!(bitset._data[0] & 4)); // 3 & 4

    bitset.add(8);
    assert(bitset._data[1] & 1);
    assert(!(bitset._data[1] & 2));
  });

  it('get', () => {
    const bitset = new Bitset(8);
    bitset.add(0);
    assert(bitset.get(0) === 1);
    bitset.add(0);
    assert(bitset.get(0) === 1);

    bitset.add(8);
    assert(bitset.get(8) === 1);
  });

  it('del', () => {
    const bitset = new Bitset(8);
    bitset.add(0);
    assert(bitset.get(0) === 1);
    bitset.del(0);
    assert(bitset.get(0) === 0);
  });
});