const router = require("express").Router();
const { default: mongoose } = require("mongoose");
let Report = require("../models/Report");
const Test = require("../models/Test");
const Patient = require("../models/Patient");
const nodemailer = require("nodemailer");

router.route("/add").post(async (req, res) => {
  const details = req.body.details;
  const patient = req.body.pid;
  const result = req.body.result;
  const test = req.body.tid;

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "hospitalitp@zohomail.com",
      pass: "Sliit@321",
    },
  });

  const newReport = new Report({
    details,
    result,
    patient,
    test,
  });

  const status = "Report Created";
  const updatedTest = {
    status,
  };

  newReport
    .save()
    .then(() => {
      const update = Test.findByIdAndUpdate(test, updatedTest)
        .then(() => {
          const usr = Patient.findById(patient)
            .then((patient) => {
              const mailOptions = {
                from: "hospitalitp@zohomail.com",
                to: `${patient.email}`,
                subject: "Appointment Made",
                text: `Hello \nYour report results have been updated check your profile.\n Thank you !`,
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
            })
            .catch((err) => {
              console.log(err.message);
    
            });

          res.json("Prescription Added");
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({
            status: "Error with updating information",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/getByTest/:id").get(async (req, res) => {
  let tid = req.params.id;

  const rpt = await Report.findOne({ test: tid })
    .then((report) => {
      res.status(200).send({ status: "Reprt fetched", report: report });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting report details",
        error: err.message,
      });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let pid = req.params.id;

  const rpt = await Report.findById(pid)
    .then((report) => {
      res.status(200).send({ status: "Patient fetched", report: report });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting report details",
        error: err.message,
      });
    });
});

router.route("/update/:id").put(async (req, res) => {
  let rid = req.params.id;

  const details = req.body.details;
  const patient = req.body.pid;
  const result = req.body.result;
  const test = req.body.tid;
  const date = mongoose.now();

  const updateReport = {
    details,
    patient,
    result,
    test,
    date,
  };

  const update = await Report.findByIdAndUpdate(rid, updateReport)
    .then(() => {
      res.status(200).send({ status: "Report updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "Error with updating information",
        error: err.message,
      });
    });
});

router.get("/patient/search/:id", async (req, res) => {
  let pid = req.params.id;
  try {
    const query = req.query.query;
    const results = await Report.find({
      patient: pid,
      $or: [{ details: { $regex: query, $options: "i" } }],
    });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
