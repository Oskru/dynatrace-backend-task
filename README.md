# NBP Data Middleware

This project is an Express.js + React app that fetches data from the National Polish Bank (NBP), creates its own API for some of the endpoints, and serves the data as middleware.

## Tools used to build

- Node.js
- Express.js
- React.js
- SASS
- Jest
- Docker

## Requirements

- Docker

## Installation and starting the server

1. Clone this repository using `git clone`
2. Navigate to the project directory.

## Starting the Server

To start the server run Docker and the following command:

```
docker-compose up
```

This will start the server on `http://localhost:3000` for the front-end (React endpoint test UI) and `http://localhost:8888` for the back-end API.

## Running tests

To run the test, navigate to the `./backend` directory and run the following command:

```
npm test
```

## API Endpoints

The following endpoints are available:

<details>
<summary>
<b>Average</b>
</summary>

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

</details>

<details>
<summary>
<b>Maximum and minimum average value for the past N quotations</b>
</summary>
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

</details>
<details>
<summary>
<b>Major difference of exchange bid and ask rates for the past N quotations</b>
</summary>
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

</details>

## React.js UI

<a href="#starting-the-server">Run the app</a> and navigate in browser to `http://localhost:3000` to explore the endpoint tester UI

<details>
<summary>
<b>Screenshots of the UI</b>
</summary>

- Defaultly initialized app <br>
  <img src="https://user-images.githubusercontent.com/78699146/235326741-4a845f87-3cf9-4a64-a500-f3de2bdadaaa.png" width="600px" height="auto" />
  <br>
- Average endpoint `http://localhost:8888/api/averages/JPY/2022-10-28` response <br>
  <img src="https://user-images.githubusercontent.com/78699146/235326822-7e856c17-9ac1-456b-a958-abfcb8424ded.png" width="600px" height="auto" />
  <br>
- Maximum and mininum endpoint `http://localhost:8888/api/max-min-averages/JPY/255` response <br>
  <img src="https://user-images.githubusercontent.com/78699146/235326898-ca6208db-3f1e-431c-9da4-dc6a6ba68a18.png" width="600px" height="auto" />
  <br>
- Major difference endpoint `http://localhost:8888/api/major-differences/GBP/150` response <br>
  <img src="https://user-images.githubusercontent.com/78699146/235326919-8970c9a3-3319-4c6c-921e-795f319c48ad.png" width="600px" height="auto" />
  <br>
- Invalid request error <br>
  <img src="https://user-images.githubusercontent.com/78699146/235327132-83f47752-304e-4dad-9ed1-64a99b981bdc.png" width="600px" height="auto" />
