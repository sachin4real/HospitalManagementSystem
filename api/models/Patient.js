const mongoose = require("mongoose");

const schema = mongoose.Schema;

const patientSchema = new schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  civilStatus: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  medicalStatus: {
    type: String,
    required: true,
  },
  allergies: {
    type: String,
    required: true,
  },
  emergencyPhone: {
    type: String,
    required: true,
  },
  gaurdianName: {
    type: String,
    required: false,
  },
  gaurdianPhone: {
    type: String,
    required: false,
  },
  gaurdianNIC: {
    type: String,
    required: false,
  },
  insuranceNo: {
    type: String,
    required: false,
  },
  insuranceCompany: {
    type: String,
    required: false,
  },
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
