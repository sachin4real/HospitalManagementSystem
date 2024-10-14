const mongoose = require("mongoose");

const schema = mongoose.Schema;

const channelSchema = new schema({
  doctor: {
    type: schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  drName: {
    type: String,
    required: true,
  },
  specialization:{
    type: String,
    required : true
  },
  startDateTime: {
    type: Date,
    required: true,
  },

  maxPatients: {
    type: Number,
    required: true,
  },
  patients: {
    type: Number,
    required: true,
    default: 0,
  },
  completed: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
