
class Bitset {
  /**
   * Bitset
   * @param {Number} length how many bits to store
   * @param {Object} opts
   */
  constructor(length = 0, opts = {}) {
    this.length = length;
    this._data = new Buffer(length);
  }

  _indexOf(num) {
    if (num > this.length) throw new Error('Out of range');
    const indexOfBuffers = Math.floor(num / 8); // index of buffer
    const bitIndexOfByte = num % 8; // index of buffer[i]
    return [indexOfBuffers, bitIndexOfByte];
  }

  add(num) {
    if (num > this.length) throw new Error('Out of range');
    const indexOfBuffers = Math.floor(num / 8); // index of buffer
    const bitIndexOfByte = num % 8; // index of buffer[i]
    this._data[indexOfBuffers] |= (1 << bitIndexOfByte);
    return 1;
  }

  get(num) {
    if (num > this.length) throw new Error('Out of range');
    const indexOfBuffers = Math.floor(num / 8);
    const bitIndexOfByte = num % 8;
    return this._data[indexOfBuffers] & (1 << bitIndexOfByte);
  }

  del(num) {
    if (num > this.length) throw new Error('Out of range');
    const indexOfBuffers = Math.floor(num / 8);
    const bitIndexOfByte = num % 8;
    if (this._data[indexOfBuffers] & (1 << bitIndexOfByte)) {
      this._data[indexOfBuffers] ^= (1 << bitIndexOfByte);
      return 1;
    }
    return 0;
  }

  flip() {}

  next() {}

  reset() {}

  any() {}

  has(num) {
    return !!this.get(num);
  }

}

module.exports = Bitset;
