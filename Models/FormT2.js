const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FormT2 = new Schema(
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

    contractoraddress: {
      type: String,
    },
    boothno: {
      type: String,
    },
    address: {
      type: String,
    },
    citystatecountry: {
      type: String,
    },
    personincharge: {
      type: String,
    },
    phone: {
      type: String,
    },
    emailuser: {
      type: String,
    },
    countryareanumber: {
      type: String,
    },
    countrynumber: {
      type: String,
    },
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("FormT2", FormT2);

module.exports = userpr;
