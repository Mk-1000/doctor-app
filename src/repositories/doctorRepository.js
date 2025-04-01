const BaseRepository = require('./baseRepository');
const Doctor = require('../models/doctor');

class DoctorRepository extends BaseRepository {
  constructor() {
    super(Doctor);
  }
  
  // Add doctor-specific methods here if needed
}

module.exports = new DoctorRepository();