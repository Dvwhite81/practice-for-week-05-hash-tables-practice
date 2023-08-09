const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let eight = sha256(key).slice(0, 8);
    return parseInt(eight, 16);
  }

  hashMod(key) {
    return this.hash(key) % this.data.length;
  }

  insertNoCollisions(key, value) {
    let pair = new KeyValuePair(key, value);
    let bucket = this.hashMod(key);

    if (this.data[bucket] !== null) {
      throw new Error('hash collision or same key/value pair already exists!');
    } else {
      this.data[bucket] = pair;
      this.count++;
    }
  }

  insertWithHashCollisions(key, value) {
    let pair = new KeyValuePair(key, value);
    let bucket = this.hashMod(key);

    pair.next = this.data[bucket];
    this.data[bucket] = pair;
    this.count++;
  }

  insert(key, value) {
    let bucket = this.hashMod(key);
    let current = this.data[bucket];

    while (current) {
      if (current.key === key) {
        return current.value = value;
      }
      current = current.next;
    }
    this.insertWithHashCollisions(key, value);
  }

}


module.exports = HashTable;
