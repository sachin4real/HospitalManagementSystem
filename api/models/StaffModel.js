// Import mongoose
import mongoose from 'mongoose';

// Define the schema
const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['Nurse', 'Doctor', 'Cleaner', 'Receptionist', 'Technician', 'Admin'], required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dateOfBirth: { type: Date, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  startDate: { type: Date, required: true },
  salary: { type: Number, required: true },
  shifts: { type: [String], enum: ['Morning', 'Afternoon', 'Evening', 'Night'], required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create the model
const Staff = mongoose.model('Staff', staffSchema);

// Export the model as default
export default Staff;
