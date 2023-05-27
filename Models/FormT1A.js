const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FormT1A = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
    },
    
    companyname: {
      type: String,
    },
    installationfile: {
      type: String,
    },
    exhibitor: {
      type: String,
    },
    boothno: {
      type: String,
    },
    citystatecountry: {
      type: String,
    },
    personincharge: {
      type: String,
    },
    companyname1: {
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
    mobile: {
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

const userpr = mongoose.model("FormT1A", FormT1A);

module.exports = userpr;
