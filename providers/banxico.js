const axios = require('axios');
const ID_SERIES = 'SF43718';

var banxico = (function () {
  var getRate = async function() {
    const { data: exchangeRateData } = await axios.get(
      `https://www.banxico.org.mx/SieAPIRest/service/v1/series/${ID_SERIES}/datos/oportuno`,
      {
        headers: {
          'Bmx-Token': '3402b6a99bd276f3100e302466c54046ccf36e26354bf6395385f3b6f3e876f0'
        }
      }
    );

    const {
      bmx
    } = exchangeRateData;

    const rate = bmx.series[0].datos[0].dato;

    return {
      provider: 'Banxico',
      rate: 20.12
    };
  };

  return {
    getRate: getRate,
  }
})();

module.exports = banxico;
