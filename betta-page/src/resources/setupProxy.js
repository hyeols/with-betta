import { createProxyMiddleware } from 'http-proxy';

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:38100',
      changeOrigin: true,
    })
  )
}