const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({
        target: 'https://ecommerce-node4.vercel.app',
        changeOrigin: true,
    }));
};
