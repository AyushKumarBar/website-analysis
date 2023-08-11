import { get } from 'axios';
import Sentiment from 'sentiment';

export async function handler(event, context) {
    try {
        const { url } = event.queryStringParameters;
        const response = await get(url);

        const sentiment = new Sentiment();
        const analysis = sentiment.analyze(response.data);
        console.log(analysis)
        return {
            statusCode: 200,
            body: JSON.stringify({ analysis }),
        };
    } catch (error) {
        console.error('Error fetching website content:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error fetching website content' }),
        };
    }
}
