const BaseService = require('./baseService');
const PatientRepository = require('../repositories/patientRepository');

class PatientService extends BaseService {
  constructor(repository) {
    super(repository);
  }
  
  // Add patient-specific methods here if needed
}

module.exports = PatientService;