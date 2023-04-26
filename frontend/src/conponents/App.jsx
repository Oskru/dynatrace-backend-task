import React, { useState } from 'react';
import ReadableResult from './ReadableResult/ReadableResult';
import './App.css';

function App() {
  const [endpoint, setEndpoint] = useState('');
  const [currency, setCurrency] = useState('');
  const [date, setDate] = useState('');
  const [quotation, setQuotation] = useState('');
  const [result, setResult] = useState(null);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const serverPort = 8888;
  let averagesURL = `http://localhost:${serverPort}/api/averages/${currency}/${date}`;
  let maxMinAveragesURL = `http://localhost:${serverPort}/api/max-min-averages/${currency}/${quotation}`;
  let majorDifferencesURL = `http://localhost:${serverPort}/api/major-differences/${currency}/${quotation}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      setError(''); // clear previous errors

      if (endpoint === 'averages') {
        response = await fetch(averagesURL);
        setUrl(averagesURL);
      } else if (endpoint === 'max-min-averages') {
        response = await fetch(maxMinAveragesURL);
        setUrl(maxMinAveragesURL);
      } else if (endpoint === 'major-differences') {
        response = await fetch(majorDifferencesURL);
        setUrl(majorDifferencesURL);
      }

      const data = await response.json();
      if (response.status >= 400) {
        setError(data.message);
      }

      setResult(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1 className="header__title">NBP data middleware</h1>
        <h3 className="header__body">
          Look and test the middleware by using options given below
        </h3>
      </header>
      <form onSubmit={handleSubmit} className="form">
        <label className="form__endpoint">
          <div className="form__endpoint-text">Endpoint</div>
          <select
            className="select"
            value={endpoint}
            onChange={(e) => {
              setEndpoint(e.target.value);
              setResult(null); // clear the result after changing endpoint
            }}
          >
            <option value="">Select an endpoint</option>
            <option value="averages">Averages</option>
            <option value="max-min-averages">Max/Min Averages</option>
            <option value="major-differences">Major Differences</option>
          </select>
        </label>
        <label className="form__currency">
          <div className="form__currency-text">
            Currency code &#40;ISO 4217&#41;
          </div>
          <input
            className="textfield"
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </label>
        {endpoint === 'averages' && (
          <label className="form__date">
            <div className="form__date-text">Date &#40;YYYY-MM-DD&#41;</div>
            <input
              className="textfield"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        )}
        {endpoint === 'max-min-averages' || endpoint === 'major-differences' ? (
          <label className="form__quotations">
            <div className="form__quotations-text">
              Quotations &#40;&#60;1;255&#62;&#41;
            </div>
            <input
              className="textfield"
              type="text"
              value={quotation}
              onChange={(e) => setQuotation(e.target.value)}
            />
          </label>
        ) : null}
        <div className="form__button">
          <button
            disabled={!endpoint}
            className={endpoint ? 'but' : 'but but--disabled'}
            type="submit"
          >
            {endpoint ? 'Submit' : 'Select an endpoint'}
          </button>
        </div>
      </form>
      {result && (
        <div className="results">
          <div className="results__endpoint">
            <div className="results__endpoint-text">Endpoint</div>
            <div className="results__url">{url}</div>
          </div>

          <div className="results__response">Response</div>
          <div className="results__result">
            <ReadableResult result={result} endpoint={endpoint} error={error} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
