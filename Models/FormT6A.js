const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FormT6A = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: {
      type: String,
    },
    
    singletouch32qty: {
      type: Number,
    },
    multitouch43qty: {
      type: Number,
    },
    multitouch55qty: {
      type: Number,
    },
    seamless55qty: {
      type: Number,
    },
    notebookqty: {
      type: Number,
    },
    ethernet8qty: {
      type: Number,
    },
    ethernet16qty: {
      type: Number,
    },
    ruckusqty: {
      type: Number,
    },
    cat10mqty: {
      type: Number,
    },
    cat20mqty: {
      type: Number,
    },
    provisionqty: {
      type: Number,
    },
    othersqty: {
      type: Number,
    },
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("FormT6A", FormT6A);

module.exports = userpr;
