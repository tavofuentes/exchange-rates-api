const axios = require('axios');

var fixer = (function () {
  var getRate = async function() {
    const { data: exchangeRateData } = await axios.get(
      'http://www.mocky.io/v2/5c6ef935340000f139892fac'
    );

    const {
      base,
      date,
      rates,
    } = exchangeRateData

    return {
      provider: 'Fixer',
      rates: rates['MXN']
    };
  };

  return {
    getRate: getRate,
  }
})();

module.exports = fixer;
