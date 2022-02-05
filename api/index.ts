import express from 'express'
const app = express()

app.get('/:type/:category.rss', (_req, res): void => {
  console.log('get')
  res.send('get')
})

module.exports = {
  path: '/api',
  handler: app
}
