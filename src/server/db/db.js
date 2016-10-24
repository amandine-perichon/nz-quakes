const Mongo = require('mongodb')
const MongoClient = Mongo.MongoClient
const ObjectID = Mongo.ObjectID
const url = 'mongodb://localhost:27017/quakes'
let Quakes = null

module.exports = {
  connect,
  getNearbyQuakes
}

function connect () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        reject(err)
      } else {
        Quakes = db.collection('quakes')
        resolve()
      }
    })
  })
}

function getNearbyQuakes (long, lat, limit) {
  return new Promise((resolve, reject) => {
    return Quakes.find({
      "geometry": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [ long, lat ]
          }
        }
      }
    }).limit(limit).toArray((err, docs) => {
      if (err) {
        reject(err)
      } else {
        resolve(docs)
      }
    })
  })
}
