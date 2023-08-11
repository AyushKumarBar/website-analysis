import React, { useState } from 'react';

const BACKEND_URL = 'http://alexapps.pythonanywhere.com/'; // Replace with your actual backend URL

const SentimentAnalysis = () => { 
  const [url, setUrl] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [sentiment_score, setSentimentScore] = useState('');
  const [subjectivity_score, setSubjectivity_score] = useState('');
  const [text_length, setText_length] = useState('');

  const analyzeSentiment = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/sentiment?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      setSentiment(data.sentiment);
      setSentimentScore(data.sentiment_score);
      setSubjectivity_score(data.subjectivity_score);
      setText_length(data.text_length);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={analyzeSentiment}>Analyze Sentiment</button>
      <p>Sentiment: {sentiment}</p>
      <p>sentiment Score: {sentiment_score}</p>
      <p>Subjectivity Score: {subjectivity_score}</p>
      <p>Text Length: {text_length}</p>
    </div>
  );
};

export default SentimentAnalysis;
