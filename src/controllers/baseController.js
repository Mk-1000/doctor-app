class BaseController {
  constructor(service) {
    this.service = service;
  }

  async getAll(req, res) {
    try {
      const entities = await this.service.getAll();
      res.status(200).json(entities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const entity = await this.service.getById(req.params.id);
      res.status(200).json(entity);
    } catch (error) {
      if (error.message === 'Entity not found') {
        res.status(404).json({ error: 'Entity not found' });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async create(req, res) {
    try {
      const entity = await this.service.create(req.body);
      res.status(201).json(entity);
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async update(req, res) {
    try {
      const entity = await this.service.update(req.params.id, req.body);
      res.status(200).json(entity);
    } catch (error) {
      if (error.message === 'Entity not found') {
        res.status(404).json({ error: 'Entity not found' });
      } else if (error.name === 'ValidationError') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async delete(req, res) {
    try {
      await this.service.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Entity not found') {
        res.status(404).json({ error: 'Entity not found' });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

module.exports = BaseController;
