import { averagesController } from '../../controllers/averages.js';
import { jest } from '@jest/globals';

// request for checking
const requestDateGreaterThanToday = {
  params: {
    date: '2099-04-18',
    currency: 'GBP',
  },
};

const requestInvalidDate = {
  params: {
    date: '2032-13-32',
    currency: 'HUN',
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

describe('average values', () => {
  it("should send a status code of 400 when date is later than today's date", async () => {
    await averagesController(requestDateGreaterThanToday, response);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
  });

  it('should send a status code of 404 when parameter date is passed inproperly', async () => {
    await averagesController(requestInvalidDate, response);
    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
  });
});
