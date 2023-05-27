const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Filing = new Schema(
  {
    
    name: {
      type: String,
      required:true
    },
    description: {
      type: String,
      required:true
    },
    taskfile: {
      type: String,
      required:true
    }
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("Filing", Filing);

module.exports = userpr;
