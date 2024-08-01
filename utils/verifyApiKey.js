const axios = require('axios');

async function verifyApiKey(req) {
    try {
        const xApiKey = req.headers['x-api-key'];
        const deviceId = req.headers['device-id'];

        console.log('#2: ', xApiKey, deviceId);

        const response = await axios.get('https://api.dev.ahhaohho.com/auth/verifyApiKey', {
            headers: {
                'x-api-key': xApiKey,
                'device-id': deviceId,
            }
        });

        if (response.status === 200) {
            return { type: 'success', message: 'API key verified successfully', data: response.status };
        } else {
            return { type: 'client', message: `Unexpected status code: ${response.status}`, data: response.status };
        }
    } catch (error) {
        console.error('Error during API call from verifyApiKey:', error.message);
        return { type: 'system', message: 'Error during API call', error: error.message };
    }
}

module.exports = verifyApiKey;
