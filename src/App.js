import React, { useState } from 'react';
import 'js-circle-progress'
import 'reactjs-popup/dist/index.css';

import './App.css'


const BACKEND_URL = 'http://localhost:5000'; // Replace with your actual backend URL



const App = () => {
  const [url, setUrl] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [sentiment_score, setSentiment_score] = useState('');
  const [subjectivity_score, setSubjectivity_score] = useState('');
  const [text_length, setText_length] = useState('');


  const analyzeSentiment = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/sentiment?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      setSentiment(data.sentiment);
      setSentiment_score(data.sentiment_score);
      setSubjectivity_score(data.subjectivity_score);
      setText_length(data.text_length)
      setUrl('');
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }

  };



  return (
    <div className="main-container">
      <h1>Website Analysis</h1>


      <div className='input-container'>
        <input
          className='input'
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className='submit-btn' onClick={analyzeSentiment}>Analyze</button>
      </div>
      <div className='contain'>
        <div className="result">
          <pre>
            <p>Sentiment         : {sentiment}</p>
            <p>Sentiment Score   : {Math.ceil(sentiment_score * 100)}</p>
            <p>Subjectivity      : {Math.ceil(subjectivity_score * 100)}</p>
            <p>Words             : {text_length}</p>
          </pre>
        </div>

        <div className='progress'>
          {
            sentiment_score * 100 < 0 ?
              <>
                <div className='red'><circle-progress anticlockwise="true" value={-Math.ceil(sentiment_score * 100)} max="100" ></circle-progress></div></>
              :
              <><div className='normal'><circle-progress value={Math.abs(Math.ceil(sentiment_score * 100))} max="100" ></circle-progress></div></>
          }
        </div>
        <div className='normal'>
          <circle-progress value={Math.ceil(subjectivity_score * 100)} max="100"></circle-progress>
        </div>

      </div>

    </div >
  );
};

export default App;
