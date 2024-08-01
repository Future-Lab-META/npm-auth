const verifyApiKey = require('./utils/verifyApiKey'); // API키 검증로직
const verifyToken = require('./utils/verifyToken'); // 토큰 검증로직
const axios = require('axios');

async function apiKeyAuthenticator(req, res, next) {
    if (req.headers['x-api-key']) {
        try {
            const verifiedKey = await verifyApiKey(req);

            if (verifiedKey.type === 'success') {
                req.skipAuthorization = true; // Authorization 미들웨어 건너뛰기 플래그 설정
                console.log('API Key verified');
                return next();
            } else {
                return res.status(401).json({ type: 'client', message: "Unauthorized: Invalid API Key" });
            }
        } catch (error) {
            console.error('Error during API key verification:', error.message);
            return res.status(500).json({ type: 'system', message: "Internal server error" });
        }
    }
    return next();
}

async function jwtAuthenticator(req, res, next) {
    if (req.headers['authorization']) {
        try {
            const verifiedToken = await verifyToken(req);

            if (verifiedToken.type === 'success') {
                req.userId = verifiedToken.data.userId;
                req.userRole = verifiedToken.data.role; // 사용자 역할 추가
                return next();
            } else {
                return res.status(401).json({ type: 'client', message: "Unauthorized: Invalid Token" });
            }
        } catch (error) {
            console.error('Error during token verification:', error.message);
            return res.status(500).json({ type: 'system', message: "Internal server error" });
        }
    }
    return next();
}

async function authenticate(req, res, next) {
    await apiKeyAuthenticator(req, res, async () => {
        if (req.skipAuthorization) {
            return next();
        } else {
            await jwtAuthenticator(req, res, next);
        }
    });
}

async function authorize(req, res, next) {
    const { userId, userRole } = req;


    if (req.headers['authorization']) {
        try {
            const { data } = await axios.get(`https://api.dev.ahhaohho.com/member/searchForServers?userId=${userId}`);

            if (data.role === userRole) {
                next();
            } else {
                res.status(403).json({ type: 'client', message: "Access Denied: You do not have the necessary permissions" });
            }
        } catch (error) {
            console.error('Error during authorization:', error.message);
            res.status(500).json({ type: 'system', message: "Internal server error" });
        }
    }else{
        next();
    }
}

    module.exports = { authorize, authenticate };
