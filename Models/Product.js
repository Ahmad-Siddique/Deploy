const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Product = new Schema(
  {
    email: {
      type: String,

    },
    username: {
      type: String,

    },
    description: {
      type: String,

    },
    productimage: {
      type: String,

    },
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("Product", Product);

module.exports = userpr;
