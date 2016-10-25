const db = require('./../db/db')

function nearby (req, res) {
  const {long, lat, limit} = req.query
  console.log(long, lat, limit)
  db.getNearbyQuakes(Number(long), Number(lat), Number(limit))
    .then((quakes) => {
      res.send(quakes)
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
}

module.exports = {
  nearby
}
