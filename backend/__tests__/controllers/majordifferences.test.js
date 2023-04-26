import { jest } from '@jest/globals';
import { majorDifferencesController } from '../../controllers/majordifferences.js';

const requestInvalidQuotations = {
  params: {
    currency: 'GBP',
    quotation: 256,
  },
};

const requestInvalidCurrency = {
  params: {
    currency: 'Eurogabki',
    quotation: 90,
  },
};

const response = {
  status: jest.fn((x) => {
    x;
  }),
  send: jest.fn((x) => {
    x;
  }),
};

describe('major value difference controller', () => {
  it('should send a status code of 400 when quotations are not in range <1;255>', async () => {
    await majorDifferencesController(requestInvalidQuotations, response);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
  });

  it('should send a status code of 400 when currency code is passed inproperly', async () => {
    await majorDifferencesController(requestInvalidCurrency, response);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
  });
});
