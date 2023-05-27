const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FormT3 = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: {
      type: String,
    },
    led12qty: {
      type: Number,
    },

    long12qty: {
      type: Number,
    },
    flourescent40qty: {
      type: Number,
    },
    ledmetal50qty: {
      type: Number,
    },
    ledarm50qty: {
      type: Number,
    },
    lightingsotherqty: {
      type: Number,
    },
    singlemaxaqty: {
      type: Number,
    },
    single24maxbqty: {
      type: Number,
    },
    singlesqauremaxqty: {
      type: Number,
    },
    singleroundmaxqty: {
      type: Number,
    },
    single24squaremaxqty: {
      type: Number,
    },
    single24roundmaxqty: {
      type: Number,
    },
    singleisolateqty: {
      type: Number,
    },
    powerotherqty: {
      type: Number,
    },
    lighting100qty: {
      type: Number,
    },
    lighting300qty: {
      type: Number,
    },
    lightboxqty: {
      type: Number,
    },
    ledstripqty: {
      type: Number,
    },
    connectionotherqty: {
      type: Number,
    },
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("FormT3", FormT3);

module.exports = userpr;
