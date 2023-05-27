const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FormT9 = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: {
      type: String,
    },
    companyname: {
      type: String,
    },
    picname: {
      type: String,
    },
    mobile: {
      type: String,
    },
    vehiclepermit: {
      type: String,
    },
    date: {
      type: String,
    },
    useremail: {
      type: String,
    },
    vehiclepermit2: {
      type: String,
    },
    date2: {
      type: String,
    },
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("FormT9", FormT9);

module.exports = userpr;
