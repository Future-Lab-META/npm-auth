const axios = require('axios');

async function verifyToken(req, authUrl) {
    try {
        const response = await axios.get(authUrl + 'auth/verifyAccessToken', {
            headers: {
                'Authorization': req.headers['authorization']
            }
        });

        if (response.status === 200) {
            return { type: 'success', message: 'Token verified successfully', data: response.data };
        } else {
            return { type: 'client', message: `Unexpected status code: ${response.status}`, data: response.status };
        }
    } catch (error) {
        console.error('Error during API call from verifyToken:', error.message);
        return { type: 'system', message: 'Error during API call', error: error.message };
    }
}

module.exports = verifyToken;
