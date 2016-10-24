var express = require('express')

var db = require('./db/db')

var app = express()
var PORT = process.env.PORT || 3000

app.use(express.static(__dirname + './../public'))

db.connect()
  .then(() =>
    app.listen(PORT, function () {
      console.log('Listening on port ' + PORT)
      db.getNearbyQuakes(174.762629, -36.862719, 10)
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
    }))
  .catch((err) => console.log('Could not connect to db: ', err))
