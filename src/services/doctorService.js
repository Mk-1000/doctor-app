const BaseService = require('./baseService');
const DoctorRepository = require('../repositories/doctorRepository');

class DoctorService extends BaseService {
  constructor(repository) {
    super(repository);
  }
  
  // Add doctor-specific methods here if needed
}

module.exports = DoctorService;