class InMemoryStore {
  constructor() {
    this.data = {};
  }

  async create(key, value) {
    if (this.data[key]) throw new Error('Key already exists');
    this.data[key] = value;
  }

  async read(key) {
    if (!this.data[key]) throw new Error('Key not found');
    return this.data[key];
  }

  async update(key, value) {
    if (!this.data[key]) throw new Error('Key not found');
    this.data[key] = value;
  }

  async delete(key) {
    if (!this.data[key]) throw new Error('Key not found');
    delete this.data[key];
  }
}
