const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true }
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);

// Export explicit schema definitions for Swagger
Patient.modelSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    name: { type: "string" },
    dateOfBirth: { type: "string", format: "date-time" },
    gender: { type: "string", enum: ['male', 'female', 'other'] },
    email: { type: "string" },
    phone: { type: "string" },
    address: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  },
  required: ["name", "dateOfBirth", "gender", "email", "phone", "address"]
};

Patient.inputSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    dateOfBirth: { type: "string", format: "date-time" },
    gender: { type: "string", enum: ['male', 'female', 'other'] },
    email: { type: "string" },
    phone: { type: "string" },
    address: { type: "string" }
  },
  required: ["name", "dateOfBirth", "gender", "email", "phone", "address"]
};

module.exports = Patient;