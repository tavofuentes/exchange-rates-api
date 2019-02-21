const { Router } = require('express');
const axios = require('axios');
module.exports = (router = new Router()) => {
  router.get('/rates', async (req, res) => {
    const { data: exchangeRateData } = await axios.get(
      'http://www.mocky.io/v2/5c6ef935340000f139892fac'
    );

    const {
      base,
      date,
      rates,
    } = exchangeRateData
    return res.json({
      base,
      date,
      rates: {
        MXM: rates['MXN']
      }
    });
  });
  return router;
};
