import { jest } from '@jest/globals';
import { maxMinAveragesController } from '../../controllers/maxminaverages';

const requestInvalidQuotations = {
  params: {
    currency: 'GBP',
    quotation: 256,
  },
};

const requestInvalidCurrency = {
  params: {
    currency: 'polska',
    quotation: 50,
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

describe('max and min average values controller', () => {
  it('should send a status code of 400 when quotations are not in range <1;255>', async () => {
    await maxMinAveragesController(requestInvalidQuotations, response);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
  });

  it('should send a status code of 400 when currency code is passed inproperly', async () => {
    await maxMinAveragesController(requestInvalidCurrency, response);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
  });
});
