import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Token from '../model/token.js';

dotenv.config();

// Middleware to validate and authenticate tokens
export const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user; // Attach the user details to the request object
        next();
    });
};

// Function to handle generating a new access token
export const generateAccessToken = async (req, res) => {
    const authToken = req.body.token ? req.body.token.split(' ')[1] : null;

    if (!authToken) {
        return res.status(401).json({ message: 'Refresh token is missing' });
    }

    try {
        const storedToken = await Token.findOne({ token: authToken });

        if (!storedToken) {
            return res.status(404).json({ message: 'Refresh token is invalid' });
        }

        jwt.verify(storedToken.token, process.env.REFRESH_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Invalid refresh token' });
            }

            const newAccessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            return res.status(200).json({ accessToken: newAccessToken });
        });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while processing the token' });
    }
};
