import React from 'react';
import './ReadableResult.css';

function ReadableResult(props) {
  let endpoint = props.endpoint;

  if (props.error) {
    return (
      <div className="container">
        <div className="response">
          <div className="response__title">ERROR</div>
          <div className="response__body">{props.error}</div>
        </div>
      </div>
    );
  }

  if (endpoint === 'averages')
    return (
      <div className="container">
        <div className="response">
          <div className="response__title">Currency code</div>
          <div className="response__body">{props.result.code}</div>
        </div>
        <div className="response">
          <div className="response__title">Date</div>
          <div className="response__body">{props.result.date}</div>
        </div>
        <div className="response">
          <div className="response__title">Average</div>
          <div className="response__body">{props.result.average}</div>
        </div>
      </div>
    );
  if (endpoint === 'max-min-averages')
    return (
      <div className="container">
        <div className="response">
          <div className="response__title">Currency code</div>
          <div className="response__body">{props.result.code}</div>
        </div>
        <div className="response">
          <div className="response__title">Quotations</div>
          <div className="response__body">{props.result.quotations}</div>
        </div>
        <div className="response">
          <div className="response__title">Max</div>
          <div className="response__body">{props.result.max}</div>
        </div>
        <div className="response">
          <div className="response__title">Min</div>
          <div className="response__body">{props.result.min}</div>
        </div>
      </div>
    );
  if (endpoint === 'major-differences')
    return (
      <div className="container">
        <div className="response">
          <div className="response__title">Currency code</div>
          <div className="response__body">{props.result.code}</div>
        </div>
        <div className="response">
          <div className="response__title">Quotations</div>
          <div className="response__body">{props.result.quotations}</div>
        </div>
        <div className="response">
          <div className="response__title">Major difference</div>
          <div className="response__body">
            {props.result.majorDifference.toFixed(5)}
          </div>
        </div>
      </div>
    );
}

export default ReadableResult;
