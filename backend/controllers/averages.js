import { validIsoCodes } from '../utils/valid-iso-codes.js';

export async function averagesController(req, res) {
  try {
    const currencyCode = req.params.currency.toUpperCase();
    const date = req.params.date;

    // Setting up Date object to compare dates
    const reqDate = date.split('-');
    const reqDateObject = new Date(reqDate[0], reqDate[1] - 1, reqDate[2]);
    const validDates = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/; // matches YYYY-MM-DD
    // Validation
    if (!validDates.test(date)) {
      res.status(404);
      res.send({ message: `404 Not found` });
      return;
    }
    if (reqDateObject > new Date()) {
      res.status(400);
      res.send({ message: `Invalid date range` });
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
    const url = `http://api.nbp.pl/api/exchangerates/rates/A/${currencyCode}/${date}`;
    const nbpResponse = await fetch(url);
    const data = await nbpResponse.json();
    const average = data.rates[0].mid;

    return res.status(200).send({
      code: currencyCode,
      date: date,
      average: average,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      res.status(404);
      res.send({
        message: `No data for given currency code / date (date can't be pointing to holidays / weekends)`,
      });
    } else {
      res.status(500);
      res.send({ message: `Internal server error: ${error.message}` });
    }
  }
}
