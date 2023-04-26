import { validIsoCodes } from '../utils/valid-iso-codes.js';

export async function majorDifferencesController(req, res) {
  try {
    res.header('Access-Control-Allow-Origin', '*'); // Fix CORS

    const currencyCode = req.params.currency.toUpperCase();
    const quotation = req.params.quotation;

    // Validation
    if (quotation <= 0 || quotation > 255) {
      res.status(400);
      res.send({
        message: 'Number of last quotations must be in a <1;255> range',
      });
      return;
    }
    if (!validIsoCodes.includes(currencyCode)) {
      res.status(400);
      res.send({ message: 'Invalid currency code' });
      return;
    }
    if (currencyCode === 'PLN') {
      res.status(400);
      res.send({ message: "Can't tell PLN rate for PLN" });
      return;
    }

    // Fetching and sending viable response
    const url = `http://api.nbp.pl/api/exchangerates/rates/C/${currencyCode}/last/${quotation}`;
    const nbpResponse = await fetch(url);
    const data = await nbpResponse.json();
    const dataRates = data.rates;

    let rateDifferences = []; // Array for differences in ask/bid of each quotation
    dataRates.forEach((rate) => {
      rateDifferences.push(rate.ask - rate.bid);
    });

    // Calc the max difference
    const majorDifference = Math.max(...rateDifferences);

    res.status(200);
    res.send({
      code: currencyCode,
      quotations: quotation,
      majorDifference: majorDifference,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      res.status(404);
      res.send({
        message: `No data for given currency code / quotations`,
      });
    } else {
      res.status(500);
      res.send({ message: `Internal server error: ${error.message}` });
    }
  }
}
