# nz-quakes

We acknowledge the New Zealand GeoNet project and its sponsors EQC, GNS Science and LINZ, for providing data/images used in this study.

http://quakesearch.geonet.org.nz/

Using geolocation query
// db.quakes.find({"geometry": {$near: {$geometry: {type: "Point" ,coordinates: [ 174.762123, -36.863508 ]}}}}).limit(10)
