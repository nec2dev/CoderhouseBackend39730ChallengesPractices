class Repository {
  constructor(dao) {
    this.dao = dao;
  }
  async createItem(newItem) {
    return await this.dao.create(newItem);
  }
  async getItems() {
    return await this.dao.get();
  }
  async getItem(id) {
    return await this.dao.getById(id);
  }
  async updateItem(id) {}
  async deleteItem(id) {}
}

module.exports = Repository;
