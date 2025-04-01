const BaseRepository = require('./baseRepository');
const Patient = require('../models/patient');

class PatientRepository extends BaseRepository {
  constructor() {
    super(Patient);
  }
  
  // Add patient-specific methods here if needed
}

module.exports = new PatientRepository();