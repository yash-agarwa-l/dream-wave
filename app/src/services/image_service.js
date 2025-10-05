import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANT: Replace this with your actual server's address.
// If testing locally on an Android emulator, use 'http://10.0.2.2:PORT'.
// If testing on a physical device, use your computer's local network IP address.
const API_BASE_URL = 'http://localhost:8000/api/v1';

export const generateImageFromApi = async (prompt) => {
  try {
    const response = await fetch('/image/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add your API key here
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error('Failed to generate image');
    }

    const data = await response.json();
    return { imageUrl: data.url };
  } catch (error) {
    throw new Error('Image generation failed: ' + error.message);
  }
};