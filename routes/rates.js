const { Router } = require('express');
const axios = require('axios');
const rateFetcher = require('../modules/rateFetcher');

module.exports = (router = new Router()) => {
  router.get('/rates', async (req, res) => {
    const rates = await rateFetcher.getRates();

    return res.json(rates);
  });

  return router;
};
