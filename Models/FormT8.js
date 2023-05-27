const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FormT8 = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: {
      type: String,
    },
    contractorscompanyname: {
      type: String,
    },
    nameofPersoninCharge: {
      type: String,
    },
    useremail: {
      type: String,
    },
    mobileno: {
      type:String
    },
    rows: { type: Array, default: [] },
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("FormT8", FormT8);

module.exports = userpr;
