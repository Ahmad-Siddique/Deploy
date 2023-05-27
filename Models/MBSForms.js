const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const MBSForm = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    MBSfile: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("MBSForm", MBSForm);

module.exports = userpr;
