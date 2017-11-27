const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// card types
const PLASTIC_PERSONIFIED = 'PLASTIC_PERSONIFIED';
const PLASTIC_NON_PERSONIFIED = 'PLASTIC_NON_PERSONIFIED';
const VIRTUAL_PERSONIFIED = 'VIRTUAL_PERSONIFIED';
const VIRTUAL_NON_PERSONIFIED = 'VIRTUAL_NON_PERSONIFIED';
const enumCardTypes = [
  PLASTIC_PERSONIFIED,
  PLASTIC_NON_PERSONIFIED,
  VIRTUAL_PERSONIFIED,
  VIRTUAL_NON_PERSONIFIED
];

const EUR = 'EUR';
const USD = 'USD';
const GBP = 'GBP'
const enumCurrencies = [
  EUR, USD, GBP
];

const cardSchema = new Schema({
  card: {
    cardType: {
      type: String,
      enum: enumCardTypes,
      required: true
    },
    currency: {
      type: String,
      enum: enumCurrencies,
      required: true
    }
  },
  cardholder: {
    email: {
      type: String
    }
  }
});

module.exports = cardSchema;
