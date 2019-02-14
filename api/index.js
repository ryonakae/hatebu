import express from 'express'
const app = express()

app.get('/:type/:category.rss', (req, res) => {
  console.log('getttttttttttttt')
  res.send('getttttttttttttt')
})

module.exports = {
  path: '/api',
  handler: app
}
