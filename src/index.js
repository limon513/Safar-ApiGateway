const { server_config, Logger } = require('./config');
const express = require('express');
const apiGateWayRoutes = require('./routes');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
const {AuthMiddlewares} = require('./middlewares');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
    '/safar/public',
    createProxyMiddleware({
        target: 'http://localhost:3002/api/public',
        changeOrigin: true,
        pathRewrite:{'^/safar/public':'/'},
        on: {
            proxyReq: fixRequestBody,
        },
    }),
);

app.use(
    '/safar/private',
    AuthMiddlewares.authenticate,
    AuthMiddlewares.authorizeAgency,
    createProxyMiddleware({
        target: 'http://localhost:3002/api/private',
        changeOrigin: true,
        pathRewrite:{'^/safar/private':'/'},
        on: {
            proxyReq: fixRequestBody,
        },
    }),
);

app.use(
    '/safar_booking/public',
    createProxyMiddleware({
        target:'http://localhost:3004/api/public',
        changeOrigin:true,
        pathRewrite:{'^/safar_booking/public':'/'},
        on:{
            proxyReq: fixRequestBody,
        },
    }),
);

app.use(express.json());

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