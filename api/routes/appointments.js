const router = require("express").Router();
let Appointment = require("../models/Appointment");
let Channel = require("../models/Channel");
let Patient = require("../models/Patient");

const nodemailer = require("nodemailer");

router.route("/channelAppointments/:id").get(async (req, res) => {
  let cid = req.params.id;

  const apt = await Appointment.find({ channel: cid })
    .then((appointments) => {
      res.status(200).json({ data: appointments });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting appointment details",
        error: err.message,
      });
    });
});

router.route("/patientAppointments/:id").get(async (req, res) => {
  let pid = req.params.id;

  const apt = await Appointment.find({ patient: pid })
    .then((appointments) => {
      res.status(200).json({ data: appointments });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting appointment details",
        error: err.message,
      });
    });
});

router.route("/makeapt").post(async (req, res) => {
  const patient = req.body.patient;
  const notes = req.body.notes;
  const channel = req.body.channel;
  const name = req.body.name;
  const age = req.body.age;
  const gender = req.body.gender;
  const contact = req.body.contact;

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "hospitalitp@zohomail.com",
      pass: "Sliit@321",
    },
  });

  console.log(channel);
  const cid = channel._id;
  const doctor = channel.doctor;
  const startDateTime = channel.startDateTime;
  const maxPatients = channel.maxPatients;
  const drName = channel.drName;
  const completed = channel.completed;
  var patients = channel.patients;

  console.log(drName);

  patients = parseInt(patients);
  patients++;

  const appointmentNo = patients;

  let arrivalTime = new Date(startDateTime);
  arrivalTime.setMinutes(
    arrivalTime.getMinutes() + 15 * (parseInt(appointmentNo) - 1)
  );
  console.log(arrivalTime.toLocaleString());

  const newAppointment = new Appointment({
    channel,
    patient,
    // name,
    appointmentNo,
    notes,
    arrivalTime,
    name,
    age,
    gender,
    contact,
  });

  const updateChannel = {
    doctor,
    drName,
    startDateTime,
    maxPatients,
    patients,
    completed,
  };

  newAppointment
    .save()
    .then(() => {
      const update = Channel.findByIdAndUpdate(cid, updateChannel)
        .then(() => {
          const usr = Patient.findById(patient)
            .then((pt) => {
              const mailOptions = {
                from: "hospitalitp@zohomail.com",
                to: `${pt.email}`,
                subject: "Appointment Made",
                text: `Hello \nYour Appointment has been made for Dr.${drName}.\n Appointment No :${appointmentNo} 
                    \nDate Time ${new Date(
                      startDateTime
                    ).toString()} \n\n\ Be there at approximately  ${arrivalTime.toLocaleString()} to avoid waiting.`,
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });

              res.json("New appointment Added ");
            })
            .catch((err) => {
              console.log(err.message);
              res.status(500).send({
                status: "Error in getting patient details",
                error: err.message,
              });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let aid = req.params.id;
  let cid = "";

  const apt = await Appointment.findById(aid)
    .then((apt) => {
      cid = apt.channel;
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting appointment details",
        error: err.message,
      });
    });

  let patients = 0;

  const chn = await Channel.findById(cid)
    .then((channel) => {
      patients = parseInt(channel.patients) - 1;
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting appointment details",
        error: err.message,
      });
    });

  const updChannel = {
    patients,
  };

  await Appointment.findByIdAndDelete(aid)
    .then(() => {
      const chn1 = Channel.findByIdAndUpdate(cid, updChannel)
        .then((channel) => {
          res.status(200).send({ status: "Appointment Deleted" });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).send({
            status: "Error in getting appointment details",
            error: err.message,
          });
        });

      // res.status(200).send({ status: "Appointment deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(202).send({
        status: "Error with deleting the appointment",
        error: err.message,
      });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let aid = req.params.id;

  const apt = await Appointment.findById(aid)
    .then((apt) => {
      res.status(200).send({ status: "Appointment fetched", apt });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting appointment details",
        error: err.message,
      });
    });
});

router.route("/update/:id").put(async (req, res) => {
  let aid = req.params.id;

  const notes = req.body.notes;

  const updatedApt = {
    notes,
  };

  const update = await Appointment.findByIdAndUpdate(aid, updatedApt)
    .then(() => {
      res.status(200).send({ status: "Appointment updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "Error with updating information",
        error: err.message,
      });
    });
});

router.route("/markConsulted/:id").put(async (req, res) => {
  let aid = req.params.id;

  const consulted = true;

  const updatedApt = {
    consulted,
  };

  const update = await Appointment.findByIdAndUpdate(aid, updatedApt)
    .then(() => {
      res.status(200).send({ status: "Appointment updated" });
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
