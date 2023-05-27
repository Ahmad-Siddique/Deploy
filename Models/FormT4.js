const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FormT4 = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: {
      type: String,
    },
    s01qty: {
      type: Number,
    },
    s02qty: {
      type: Number,
    },
    s04qty: {
      type: Number,
    },
    t101qty: {
      type: Number,
    },
    t101bqty: {
      type: Number,
    },
    t101wqty: {
      type: Number,
    },
    t201qty: {
      type: Number,
    },
    t201bqty: {
      type: Number,
    },
    t301qty: {
      type: Number,
    },
    t107aqty: {
      type: Number,
    },
    c101bqty: {
      type: Number,
    },
    c105qty: {
      type: Number,
    },
    c201qty: {
      type: Number,
    },
    c208qty: {
      type: Number,
    },
    c208bqty: {
      type: Number,
    },
    s07qty: {
      type: Number,
    },
    s08qty: {
      type: Number,
    },
    s09qty: {
      type: Number,
    },
    s10qty: {
      type: Number,
    },
    s11qty: {
      type: Number,
    },
    s12qty: {
      type: Number,
    },
    s1275qty: {
      type: Number,
    },
    s121qty: {
      type: Number,
    },
    d03qty: {
      type: Number,
    },
    d07qty: {
      type: Number,
    },
    m07qty: {
      type: Number,
    },
    m100qty: {
      type: Number,
    },
    m100sqty: {
      type: Number,
    },
    p01qty: {
      type: Number,
    },
    p02qty: {
      type: Number,
    },
    p03qty: {
      type: Number,
    },
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("FormT4", FormT4);

module.exports = userpr;
