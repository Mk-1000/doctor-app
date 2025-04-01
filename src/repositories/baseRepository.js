
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    return await this.model.find();
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async create(data) {
    const entity = new this.model(data);
    return await entity.save();
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;