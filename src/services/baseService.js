class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new Error('Entity not found');
    }
    return entity;
  }

  async create(data) {
    return await this.repository.create(data);
  }

  async update(id, data) {
    const entity = await this.repository.update(id, data);
    if (!entity) {
      throw new Error('Entity not found');
    }
    return entity;
  }

  async delete(id) {
    const entity = await this.repository.delete(id);
    if (!entity) {
      throw new Error('Entity not found');
    }
    return entity;
  }
}

module.exports = BaseService;
