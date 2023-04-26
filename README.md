# NBP Data Middleware

This project is an Express.js + React app that fetches data from the National Polish Bank (NBP), creates its own API for some of the endpoints, and serves the data as middleware.

## Tools used to build

- Node.js
- Express.js
- React.js
- Jest
- Docker

## Requirements

- Docker
- docker-compose

## Installation

1. Clone this repository using `git clone`
2. Navigate to the project directory.

## Starting the Server

To start the server, navigate to the project directory and run the following command:

```
docker-compose up
```

This will start the server on `http://localhost:3000` for the front-end (React endpoint test UI) and `http://localhost:8888` for the back-end API.

## Running tests

To run the test, navigate to the `/backend` directory and run the following command:

```
npm test
```

## API Endpoints

The following endpoints are available:

### Average

- Endpoint: `/api/averages/:currency/:date`
- Method: `GET`
- Description: Retrieves the average exchange rate for a specific currency on a specific date from the NBP API.
- Query Parameters:
  - `currency`: The three-letter code of the currency (e.g. `GBP`, `USD`, `EUR`, note: currency code is not case-sensitive).
  - `date`: The date in the `YYYY-MM-DD` format.
- Example Request: `http://localhost:8888/api/averages/GBP/2023-01-02`
- Example Response:

```
{
  "code": "GBP",
  "date": "2023-01-02",
  "average": 5.2768
}
```

### Maximum and minimum average value for the past N quotations

- Endpoint: `/api/max-min-differences/:currency/:quotation`
- Method: `GET`
- Description: Retrieves the maximum and minimum average exchange rate for a specific currency for the specific number of the last quotations from the NBP API.
- Query Parameters:
  - `currency`: The three-letter code of the currency (e.g. `GBP`, `USD`, `EUR`, note: currency code is not case-sensitive).
  - `quotation`: The number of the last quotations (note: number has to be in range of <1;255>).
- Example Request: `http://localhost:8888/api/max-min-averages/EUR/185`
- Example Response (`max` and `min` in response can vary):

```
{
  "code": "EUR",
  "quotations": "185",
  "max": 4.8711,
  "min": 4.5887
}
```

### Major difference of exchange bid and ask rates for the past N quotations

- Endpoint: `/api/major-differences/:currency/:quotation`
- Method: `GET`
- Description: Retrieves the one-day major difference in exchange bid and ask rates for a specific currency for the specific number of the last quotations from the NBP API.
- Query Parameters:
  - `currency`: The three-letter code of the currency (e.g. `GBP`, `USD`, `EUR`, note: currency code is not case-sensitive).
  - `quotation`: The number of the last quotations (note: number has to be in range of <1;255>).
- Example Request: `http://localhost:8888/api/major-differences/JPY/140`
- Example Response (`majorDifference` in response can vary):

```
{
  "code": "JPY",
  "quotations": "140",
  "majorDifference": 0.00069
}
```
