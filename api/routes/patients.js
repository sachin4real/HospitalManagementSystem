let Patient = require("../models/Patient");
const router = require("express").Router();

const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const secretKey = "hey";

router.route("/add").post((req, res) => {
  console.log("heyyy");

  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const civilStatus = req.body.civilStatus;
  const phoneNo = req.body.phone;
  const emergencyPhone = req.body.emergencyPhone;
  const gaurdianNIC = req.body.gaurdianNIC;
  const gaurdianName = req.body.gaurdianName;
  const gaurdianPhone = req.body.gaurdianPhone;
  const height = req.body.height;
  const weight = req.body.weight;
  const bloodGroup = req.body.bloodGroup;
  const allergies = req.body.allergies;
  const medicalStatus = req.body.medicalStatus;
  const insuranceNo = req.body.insuranceNo;
  const insuranceCompany = req.body.insuranceCompany;

  const newPatient = new Patient({
    email,
    firstName,
    lastName,
    dob,
    gender,
    password,
    civilStatus,
    phoneNo,
    emergencyPhone,
    gaurdianName,
    gaurdianNIC,
    gaurdianPhone,
    height,
    weight,
    bloodGroup,
    allergies,
    medicalStatus,
    insuranceCompany,
    insuranceNo,
  });

  newPatient
    .save()
    .then(() => {
      res.json("Patient Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/login").post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const patient = await Patient.findOne({ email: email });

  try {
    if (patient) {
      //check if password matches
      const result = password === patient.password;

      if (result) {
        const token = jwt.sign({ email: patient.email }, secretKey, {
          expiresIn: "1h",
        });
        res.status(200).send({ rst: "success", data: patient, tok: token });
      } else {
        res.status(200).send({ rst: "incorrect password" });
      }
    } else {
      res.status(200).send({ rst: "invalid user" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.route("/check").get(async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  let email = null;
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      console.log(error);
    } else {
      console.log("token verified");
      // const user =  User.findOne({ email :decoded.email });
      console.log(decoded.email);

      email = decoded.email;
    }
  });
  const patient = await Patient.findOne({ email: email });
  res.status(200).send({ rst: "checked", patient: patient });
});

router.route("/get/:id").get(async (req, res) => {
  let pid = req.params.id;

  const usr = await Patient.findById(pid)
    .then((patient) => {
      res.status(200).send({ status: "Patient fetched", patient: patient });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({
          status: "Error in getting patient details",
          error: err.message,
        });
    });
});

router.route("/get/:date/:doctor").get(async (req, res) => {
  let date = req.params.date;
  let doctor = req.params.doctor;

  const usr = await Patient.findById(pid)
    .then((patient) => {
      res.status(200).send({ status: "Patient fetched", patient: patient });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({
          status: "Error in getting patient details",
          error: err.message,
        });
    });
});

router.route("/update/:id").put(async (req, res) => {
  let pid = req.params.id;
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const civilStatus = req.body.civilStatus;
  const phoneNo = req.body.phone;
  const emergencyPhone = req.body.emergencyPhone;
  const gaurdianNIC = req.body.gaurdianNIC;
  const gaurdianName = req.body.gaurdianName;
  const gaurdianPhone = req.body.gaurdianPhone;
  const height = req.body.height;
  const weight = req.body.weight;
  const bloodGroup = req.body.bloodGroup;
  const allergies = req.body.allergies;
  const medicalStatus = req.body.medicalStatus;
  const insuranceNo = req.body.insuranceNo;
  const insuranceCompany = req.body.insuranceCompany;

  const updatePatient = {
    email,
    firstName,
    lastName,
    dob,
    gender,
    password,
    civilStatus,
    phoneNo,
    emergencyPhone,
    gaurdianName,
    gaurdianNIC,
    gaurdianPhone,
    height,
    weight,
    bloodGroup,
    allergies,
    medicalStatus,
    insuranceCompany,
    insuranceNo,
  };

  const update = await Patient.findByIdAndUpdate(pid, updatePatient)
    .then(() => {
      res.status(200).send({ status: "Patient updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({
          status: "Error with updating information",
          error: err.message,
        });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let pid = req.params.id;

  await Patient.findByIdAndDelete(pid)
    .then(() => {
      res.status(200).send({ status: "Patient deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(202)
        .send({
          status: "Error with deleting the Patient",
          error: err.message,
        });
    });
});

router.route("/").get((req, res) => {
  Patient.find()
    .then((patients) => {
      res.json(patients);
    })
    .catch((err) => {
      console.log(err);
    });
});




module.exports = router;
