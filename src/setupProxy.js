const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){

    app.use(
        '/upload',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
    app.use(
        '/get',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      );
}