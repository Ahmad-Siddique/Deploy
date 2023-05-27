const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FormT6 = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: {
      type: String,
    },
    led32qty: {
      type: Number,
    },
    led42qty: {
      type: Number,
    },
    led55qty: {
      type: Number,
    },
    led65qty: {
      type: Number,
    },
    uhd70qty: {
      type: Number,
    },
    uhd79qty: {
      type: Number,
    },
    uhd84qty: {
      type: Number,
    },
    tvfloorqty: {
      type: Number,
    },
    touch32qty: {
      type: Number,
    },
    touch42qty: {
      type: Number,
    },
    touch55qty: {
      type: Number,
    },
    touch65qty: {
      type: Number,
    },
    videowall47qty: {
      type: Number,
    },
    videowall55qty: {
      type: Number,
    },
    p3ledqty: {
      type: Number,
    },
    videocontrolqty: {
      type: Number,
    },
    projectorqty: {
      type: Number,
    },
    tripod6ftqty: {
      type: Number,
    },
    evzxqty: {
      type: Number,
    },
    otherqty: {
      type: Number,
    },
    
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("FormT6", FormT6);

module.exports = userpr;
