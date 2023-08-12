# Backend/app.py

from flask import Flask, request, jsonify
from textblob import TextBlob
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/sentiment', methods=['GET'])
def analyze_sentiment():
    url = request.args.get('url')
    response = requests.get(url)
    text = response.text

    try:
        blob = TextBlob(text)
        sentiment_score = blob.sentiment.polarity
        subjectivity_score = blob.sentiment.subjectivity

        if sentiment_score > 0:
            sentiment = 'Positive'
        elif sentiment_score < 0:
            sentiment = 'Negative'
        else:
            sentiment = 'Neutral'
    except Exception as e:
        print('Error analyzing sentiment:', e)
        sentiment = 'Error'

    return jsonify({
        'sentiment': sentiment,
        'sentiment_score': sentiment_score,
        'subjectivity_score': subjectivity_score,
        'text_length': len(text)
    })


if __name__ == '__main__':
    app.run(debug=True)
