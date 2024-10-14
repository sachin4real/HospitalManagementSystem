let Doctor = require("../models/Doctor");
const router = require("express").Router();

const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");
const secretKey = "hey";

router.route("/add").post((req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "hospitalitp@zohomail.com",
      pass: "Sliit@321",
    },
  });

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const specialization = req.body.specialization;
  const qualifications = req.body.qualifications;

  const newDoctor = new Doctor({
    email,
    name,
    password,
    specialization,
    qualifications,
  });

  newDoctor
    .save()
    .then(() => {
      const mailOptions = {
        from: "hospitalitp@zohomail.com",
        to: `${email}`,
        subject: "Doctor Profile Created",
        text: `Hello \nYour Doctor has been created.\n
                \nEmail : ${email} \nPassword : ${password}\n\nThank You.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.json("Doctor Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/login").post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const doctor = await Doctor.findOne({ email: email });

  try {
    if (doctor) {
      //check if password matches
      const result = password === doctor.password;

      if (result) {
        const token = jwt.sign({ email: doctor.email }, secretKey, {
          expiresIn: "1h",
        });
        res.status(200).send({ rst: "success", data: doctor, tok: token });
      } else {
        res.status(200).send({ rst: "incorrect password" });
      }
    } else {
      res.status(200).send({ rst: "invalid doctor" });
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
  const doctor = await Doctor.findOne({ email: email });
  res.status(200).send({ rst: "checked", doctor: doctor });
});

router.route("/").get((req, res) => {
  Doctor.find()
    .then((doctors) => {
      res.json(doctors);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/get/:id").get(async (req, res) => {
  let cid = req.params.id;

  const dct = await Doctor.findById(cid)
    .then((doctor) => {
      res.status(200).send({ status: "Doctor fetched", doctor });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting doctor details",
        error: err.message,
      });
    });
});

router.route("/update/:id").put(async (req, res) => {
  let did = req.params.id;

  const name = req.body.name;
  const email = req.body.email;
  const specialization = req.body.specialization;
  const qualifications = req.body.qualifications;
  const password = req.body.password;

  const updateDoctor = {
    name,
    email,
    password,
    specialization,
    qualifications,
  };

  const update = await Doctor.findByIdAndUpdate(did, updateDoctor)
    .then(() => {
      res.status(200).send({ status: "Doctor updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "Error with updating information",
        error: err.message,
      });
    });
});

module.exports = router;
