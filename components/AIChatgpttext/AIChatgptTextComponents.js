
import axios from 'axios';
import config from './config'; // Adjust the path as needed
import {useRoute} from '@react-navigation/native';

const sendChatRequest = async (message, chatRole) => {
  const apikey = config.apiKey;
  const maxRetries = 1;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log("Message sent to chat: ",message)
      console.log("chat: ",chatRole)
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: chatRole },
            { role: 'user', content: message },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apikey}`,
          },
        }
      );
      // Response... 
      console.log("Message received from chat: ", response.data.choices[0].message.content);
      return response.data.choices[0].message.content; // Exit the function if the request is successful
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'] || 2 ** attempt;
        console.warn(`Rate limit exceeded. Retrying after ${retryAfter} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      } else {
        console.error('Error sending chat request:', error);
        return; // Exit the function if the error is not related to rate limiting
      }
    }
  }
  console.error('Max retries reached. Failed to send chat request.');
};

export default sendChatRequest;
