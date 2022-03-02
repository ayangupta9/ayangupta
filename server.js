const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 8080
const useragent = require('express-useragent')

app.use(express.static(__dirname + '/public'))
app.use(useragent.express())

app.set('views', path.join(__dirname, '/public/views'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/simpleindex.html'))
})

app.get('/alt', (req, res) => {
  if (req.useragent.isMobile) {
    res.redirect('/')
  } else {
    res.sendFile(path.join(__dirname, '/public/views/index.html'))
  }
})

app.listen(PORT, () => {})
