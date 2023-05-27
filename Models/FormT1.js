const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FormT1 = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    tick: {
      type: String,
    },
    
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("FormT1", FormT1);

module.exports = userpr;
