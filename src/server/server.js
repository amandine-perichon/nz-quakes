const express = require('express')

const db = require('./db/db')
const routes = require('./routes/routes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + './../public'))

app.get('/api/nearby', routes.nearby)

db.connect()
  .then(() =>
    app.listen(PORT, function () {
      console.log('Listening on port ' + PORT)
    }))
  .catch((err) => console.log('Could not connect to db: ', err))
