const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const downloadactivity = new Schema(
  {
    name: {
      type: String,
      
    },
    email: {
      type: String,
      required: true,
    },
    activity: {
      type: String,
      
    },
    time: {
      type: String,
      
    },
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("downloadactivity", downloadactivity);

module.exports = userpr;
