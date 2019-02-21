const rates = require('./rates');
const express = require('express');
const moxios = require('moxios');
const request = require('supertest');

const fixerURL = /mocky.io\/v2\/5c6ef935340000f139892fac/ //Using mock endpoint to avoid running out of calls with the free Fixer access_key
const exampleFixerIOResponse = {
  success: true,
  timestamp: 1550774646,
  base: 'EUR',
  date: '2019-02-21',
  rates: {
    MXN: 21.839307,
  }
}

const initRates = () => {
  const app = express();
  app.use(rates());
  return app;
}

describe('GET /rates', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('It should fetch rates from Fixer', async () => {
    moxios.stubRequest(fixerURL, {
      status: 200,
      response: exampleFixerIOResponse
    });
    const app = initRates();
    await request(app).get('/rates');
    expect(moxios.requests.mostRecent().url).toBe('http://www.mocky.io/v2/5c6ef935340000f139892fac');
  });
  test('It should 200 and return a transformed version of Fixer response', async () => {
    moxios.stubRequest(fixerURL, {
      status: 200,
      response: exampleFixerIOResponse
    });
    const app = initRates();
    const res = await request(app).get('/rates');
    expect(res.body).toEqual({
      base: 'EUR',
      date: '2019-02-21',
      rates: {
        MXM: 21.839307
      }
    });
  });
});
