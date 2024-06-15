const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
  const httpProxy = process.env.WEBPAGE_URI
    ? process.env.WEBPAGE_URI
    : 'http://localhost:3001/'
  app.use(createProxyMiddleware('/api', { target: httpProxy }))
}
