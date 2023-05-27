const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Organization = new Schema(
  {
    email: {
      type: String,

    },
    username: {
      type: String,

    },
    organizationname: {
      type: String,

    },
    writeup: {
      type: String,

    },
    organizationimage: {
      type: String,

    },
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("Organization", Organization);

module.exports = userpr;
