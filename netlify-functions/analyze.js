import { get } from 'axios';
import Sentiment from 'sentiment';

export async function handler (event, context) {
  try {
    const { url } = event.queryStringParameters;
    const response = await get(url);

    // Set CORS headers to allow requests from any domain (*)
    const headers = {
      'Access-Control-Allow-Origin': 'https://website-sentiment-analyser.netlify.app',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    console.log("hiiid")
    const sentiment = new Sentiment();
    const analysis = sentiment.analyze(response.data);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ analysis }),
    };
  } catch (error) {
    console.error('Error fetching website content:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Error fetching website content' }),
    };
  }
}
