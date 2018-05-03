
class Bitset {
  /**
   * Bitset
   * @param {Number} length how many bits to store
   * @param {Object} opts
   */
  constructor(length = 0, opts = {}) {
    this.length = length;
    this._data = new Buffer(Math.ceil(length / 8));
    this.currentIndex = 0; // for this.next()
  }

  _indexOf(num) {
    if (num > this.length) throw new Error('Out of range');
    const indexOfBuffers = Math.floor(num / 8); // index of buffer
    const bitIndexOfByte = num % 8; // index of buffer[i]
    return [indexOfBuffers, bitIndexOfByte];
  }

  set(num) {
    const [indexOfBuffers, bitIndexOfByte] = this._indexOf(num);
    this._data[indexOfBuffers] |= (1 << bitIndexOfByte);
    return 1;
  }

  get(num) {
    const [indexOfBuffers, bitIndexOfByte] = this._indexOf(num);
    return this._data[indexOfBuffers] & (1 << bitIndexOfByte);
  }

  del(num) {
    const [indexOfBuffers, bitIndexOfByte] = this._indexOf(num);

    if (this._data[indexOfBuffers] & (1 << bitIndexOfByte)) {
      this._data[indexOfBuffers] ^= (1 << bitIndexOfByte);
      return 1;
    }
    return 0;
  }

  flip(num) {
    const [indexOfBuffers, bitIndexOfByte] = this._indexOf(num);

    if (this._data[indexOfBuffers] & (1 << bitIndexOfByte)) {
      this._data[indexOfBuffers] ^= (1 << bitIndexOfByte);
      return 0;
    }
    this._data[indexOfBuffers] |= (1 << bitIndexOfByte);
    return 1;
  }

  // TODO
  next() {}

  // TODO
  reset() {}

  // TODO
  any() {}

  has(num) {
    return !!this.get(num);
  }

  add(num) {
    return this.set(num);
  }

  toString(encoding) {
    if (encoding == 2) {
      return this.toBinString();
    }
    return this._data.toString();
  }

  toBinString() {
    const bufLen = this._data.length;
    let i = 0;
    let str = '';

    const zeroTmpl = '00000000';
    function _fix0(numstr) {
      const len = numstr.length;
      if (len === 8) {
        return numstr;
      }
      return zeroTmpl.slice(0, 8 - len) + numstr;
    }

    while (i < bufLen) {
      const num = this._data.readUInt8(i);
      str += _fix0(num.toString(2));
      ++i;
    }
    return str;
  }

}

module.exports = Bitset;
