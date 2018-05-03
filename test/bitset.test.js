
const assert = require('assert');
const Bitset = require('../bitset');

describe('Bitset', () => {


  it('constructor', () => {
    const bitset = new Bitset(8);
    console.log(bitset.toString());
  });

  it('add', () => {
    const bitset = new Bitset(16);
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
    const bitset = new Bitset(16);
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

  it('flop', () => {
    const bitset = new Bitset(8);
    assert(bitset.toString(2) === '00000000');
    bitset.flip(0);
    assert(bitset.toString(2) === '00000001');
    bitset.flip(2);
    assert(bitset.toString(2) === '00000101');
    bitset.flip(4);
    assert(bitset.toString(2) === '00010101');
    bitset.flip(6);
    assert(bitset.toString(2) === '01010101');
    bitset.flip(0);
    assert(bitset.toString(2) === '01010100');
    bitset.flip(2);
    assert(bitset.toString(2) === '01010000');
    bitset.flip(4);
    assert(bitset.toString(2) === '01000000');
    bitset.flip(6);
    assert(bitset.toString(2) === '00000000');
  });
});