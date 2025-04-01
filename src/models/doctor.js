const mongoose = require('mongoose'); 

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: null }
}, { timestamps: true });

// Add a custom validation method
doctorSchema.methods.isValid = function() {
  return this.name && this.specialty && this.email;
};

// Pre-save middleware
doctorSchema.pre('save', function(next) {
  if (!this.isValid()) {
    return next(new Error('Invalid Doctor details'));
  }
  next();
});

const Doctor = mongoose.model('Doctor', doctorSchema);

// Export explicit schema definitions for Swagger
Doctor.modelSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    name: { type: "string" },
    specialty: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  },
  required: ["name", "specialty", "email"]
};

Doctor.inputSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    specialty: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" }
  },
  required: ["name", "specialty", "email"]
};

module.exports = Doctor;