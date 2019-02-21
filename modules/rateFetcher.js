const axios = require('axios');

// Exchange rate providers
const fixer = require('../providers/fixer.js')
const banxico = require('../providers/banxico.js')

var rateFetcher = (function () {
  var providerPromises = [
    fixer.getRate(),
    banxico.getRate(),
  ];

  var getRates = async function() {
    let rates = [];

    await Promise.all(providerPromises)
      .then((providerRates) => {
        rates = providerRates;
      })

    return rates;
  }

  return {
    getRates
  }
})();

module.exports = rateFetcher;
