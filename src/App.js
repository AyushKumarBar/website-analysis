import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [sentimentScore, setSentimentScore] = useState(0);

  const analyzeSentiment = async () => {
    try {
      const encodedUrl = encodeURIComponent(url);
      const response = await axios.get(`/api/analyze?url=${encodedUrl}`);
      setSentimentScore(response.data.analysis.score);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }
  };

  return (
    <div>
      <h1>Website Sentiment Analyzer</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter website URL"
      />
      <button onClick={analyzeSentiment}>Analyze Sentiment</button>
      <div>
        <p>Sentiment Score: {sentimentScore}</p>
      </div>
    </div>
  );
}

export default App;
