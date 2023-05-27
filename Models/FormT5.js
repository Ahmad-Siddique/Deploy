const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FormT5 = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: {
      type: String,
    },
    no1qty: {
      type: Number,
    },
    no2qty: {
      type: Number,
    },
    no3qty: {
      type: Number,
    },
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("FormT5", FormT5);

module.exports = userpr;
