// EXPRESS APP CONFIGURATION

// IMPORTS
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// APP SETTINGS
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet({
    crossOriginRessourcePolicy: {
        policy: "cross-origin"
    }
}))

// APP CALLS LIMIT
const apiCallLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false
})

app.use('/api/', apiCallLimiter);

// ROUTERS

const messageRoutes = require('./routes/message');
app.use('/api/messages', messageRoutes);

// APP EXPORT
module.exports = app;