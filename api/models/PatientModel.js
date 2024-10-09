// Import mongoose
import mongoose from 'mongoose';

// Define the schema
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dateOfBirth: { type: Date, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  medicalHistory: { type: [String], default: [] },
  currentMedications: { type: [String], default: [] },
  allergies: { type: [String], default: [] },
  emergencyContact: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    relationship: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

// Create the model
const Patient = mongoose.model('Patient', patientSchema);

// Export the model as default
export default Patient;
