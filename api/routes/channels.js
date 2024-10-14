const router = require("express").Router();
const Appointment = require("../models/Appointment");
let Channel = require("../models/Channel");
// let Appointment = require("../models/Appointment") ;
const Patient = require("../models/Patient");
const nodemailer = require("nodemailer");

router.route("/add").post((req, res) => {
  const doctor = req.body.doctor;
  const startDateTime = req.body.startDateTime;
  const maxPatients = req.body.maxPatients;
  const drName = req.body.drName;
  const specialization = req.body.specialization;

  const newChannel = new Channel({
    doctor,
    drName,
    specialization,
    startDateTime,
    maxPatients,
  });

  newChannel
    .save()
    .then(() => {
      res.json("Channel Added");
      console.log("channel added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Channel.find()
    .then((channels) => {
      res.json(channels);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let cid = req.params.id;

  await Channel.findByIdAndDelete(cid)
    .then(() => {
      res.status(200).send({ status: "Channel deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(202)
        .send({ status: "Error with deleting the doctor", error: err.message });
    });
});

router.route("/search/:date/:doctor").get(async (req, res) => {
  let date = new Date(req.params.date);
  const start = date.setHours(0, 0, 0, 0);
  const end = date.setHours(23, 59, 59, 999);

  let doctor = req.params.doctor || "";

  console.log(date);

  const channels = await Channel.find({
    $or: [
      { startDateTime: { $gte: start, $lte: end } },
      { drName: { $regex: doctor, $options: "i" } },
      { specialization: { $regex: doctor, $options: "i" } },
    ],
  })
    .then((channels) => {
      res.status(200).send({ status: "Cahnnels fetched", channels: channels });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting Channel details",
        error: err.message,
      });
    });
});

router.route("/doctorchannels/:id").get(async (req, res) => {
  let did = req.params.id;

  const chn = await Channel.find({ doctor: did })
    .sort({ startDateTime: 1 })
    .then((channels) => {
      console.log("Aaaaaaaaaaaa");
      res.status(200).json(channels);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting channel details",
        error: err.message,
      });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let cid = req.params.id;

  const usr = await Channel.findById(cid)
    .then((Channel) => {
      res.status(200).send({ status: "Channel fetched", Channel });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting channel details",
        error: err.message,
      });
    });
});

router.route("/NoOfAppointments/:id").get(async (req, res) => {
  let cid = req.params.id;

  const usr = await Appointment.find({ channel: cid })
    .then((Channels) => {
      const count = Channels.length;
      res.status(200).send({ status: "Channel fetched", count });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting channel details",
        error: err.message,
      });
    });
});

router.route("/update/:id").put(async (req, res) => {
  let cid = req.params.id;

  const maxPatients = req.body.maxPatients;
  const startDateTime = req.body.startDateTime;
  console.log(startDateTime);

  const updateChannel = {
    maxPatients,
    startDateTime,
  };

  const update = await Channel.findByIdAndUpdate(cid, updateChannel)
    .then(() => {
      res.status(200).send({ status: "Channel updated" });
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
