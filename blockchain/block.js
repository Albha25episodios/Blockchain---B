const { SHA256 } = require("crypto-js");

class block {
  constructor(timestamp, lasthash, hash, data) {
    this.timestamp = timestamp;
    this.lasthash = lasthash;
    this.hash = hash;
    this.data = data;
  }

  toString() {
    return `Blok--------------------
    Timestamp : ${this.timestamp}
    Lasthash : ${this.lasthash}
    Hash : ${this.hash}
    Data : ${this.data}`;
  }

  static genesis() {
    return new this("gen", "0".repeat(64), "0".repeat(64), "gen");
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();
    const lasthash = lastBlock.hash;
    const hash = this.hash(timestamp, lasthash, data);
    return new this(timestamp, lasthash, hash, data);
  }

  static hash(timestamp, lasthash, data) {
    return SHA256(`${timestamp}${lasthash}${data}`).toString();
  }
  static blockHash(block) {
    const { timestamp, lasthash, data } = block;
    return this.hash(timestamp, lasthash, data);
  }
}

module.exports = block;
