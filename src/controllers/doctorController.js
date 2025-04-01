const BaseController = require('./baseController');
class DoctorController extends BaseController {
  constructor(service) {
    super(service);
  }
  
  // Add doctor-specific controller methods here if needed
}

module.exports = DoctorController;