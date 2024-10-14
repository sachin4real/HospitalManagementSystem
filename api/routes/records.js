const router = require("express").Router();
let Record = require("../models/Record");
let Prescription = require("../models/Prescription");
let Test = require("../models/Test");
let Report = require("../models/Report");
let Appointment = require("../models/Appointment");

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const reason = req.body.reason;
  const patient = req.body.pid;

  let prescriptions = 0;
  let appointments = 0;
  let tests = 0;
  let reports = 0;

  const results = Prescription.find({ patient: patient }).then((prs) => {
    prescriptions = prs.length;
    const results4 = Report.find({ patient: patient }).then((rpts) => {
      reports = rpts.length;

      const results1 = Test.find({ patient: patient }).then((tsts) => {
        tests = tsts.length;

        const results2 = Appointment.find({ patient: patient }).then((apts) => {
          appointments = apts.length;

          const newRecord = new Record({
            patient,
            title,
            reason,
            prescriptions,
            appointments,
            tests,
            reports,
          });

          newRecord
            .save()
            .then(() => {
              res.json("Prescription Added");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    });
  });
});

router.route("/").get((req, res) => {
  Record.find()
    .then((records) => {
      res.json(records);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/get/:id").get(async (req, res) => {
  let rid = req.params.id;

  const tst = await Record.findById(rid)
    .then((record) => {
      res.status(200).send({ status: "Record fetched", record: record });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting record details",
        error: err.message,
      });
    });
});

router.get("/search", async (req, res) => {
  try {
    const query = req.query.query; 
    const results = await Test.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { reason: { $regex: query, $options: "i" } },
      ],
    });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  let rid = req.params.id;

  await Record.findByIdAndDelete(rid)
    .then(() => {
      res.status(200).send({ status: "Record deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(202)
        .send({ status: "Error with deleting the record", error: err.message });
    });
});

router.route("/update/:id").put(async (req, res) => {
  let rid = req.params.id;

  const title = req.body.title;
  const reason = req.body.reason;

  console.log(title);
  console.log(reason);

  const updateRecord = {
    title,
    reason,
  };

  const update = await Record.findByIdAndUpdate(rid, updateRecord)
    .then(() => {
      res.status(200).send({ status: "Record updated" });
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
