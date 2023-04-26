import { validIsoCodes } from '../utils/valid-iso-codes.js';

export async function maxMinAveragesController(req, res) {
  try {
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
    const url = `http://api.nbp.pl/api/exchangerates/rates/A/${currencyCode}/last/${quotation}`;
    const nbpResponse = await fetch(url);
    const data = await nbpResponse.json();
    const dataRates = data.rates;

    let dataAverages = [];
    dataRates.forEach((rate) => {
      dataAverages.push(rate.mid);
    });

    const max = Math.max(...dataAverages);
    const min = Math.min(...dataAverages);

    res.status(200);
    res.send({
      code: currencyCode,
      quotations: quotation,
      max: max,
      min: min,
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
