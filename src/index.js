const { server_config, Logger } = require('./config');
const express = require('express');
const apiGateWayRoutes = require('./routes');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
    '/safar/public',
    createProxyMiddleware({
        target: 'http://localhost:3002/api/public',
        changeOrigin: true,
        pathRewrite:{'^/safar/public':'/'}
    }),
);

app.use(
    '/safar/private',
    createProxyMiddleware({
        target: 'http://localhost:3002/api/private',
        changeOrigin: true,
        pathRewrite:{'^/safar/private':'/'}
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiGateWayRoutes);

app.listen(server_config.PORT, () => {
    console.log(`Server Started at ${server_config.PORT}`);
    Logger.log({
        level: 'info',
        message: 'Server Up and Running!',
        label: __filename,
        errors: { msg: 'something' }
    });
});