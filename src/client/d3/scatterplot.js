import * as d3 from "d3"

export default function createNode (quakes) {
  // x: timeline
  // y: distance
  // z: magnitude

  var origin = {
    lat: -36.863006,
    long: 174.762709
  }

  var data = quakes.map((elem, i) => {
    // console.log((new Date(elem.properties.origintime)), distanceFromOrigin(origin, elem.geometry.coordinates), elem.properties.magnitude)
    return [(new Date(elem.properties.origintime)).getTime(),
            distanceFromOrigin(origin, elem.geometry.coordinates),
            elem.properties.magnitude]
  })

  function distanceFromOrigin(origin, location) {
    var origin = new google.maps.LatLng(origin.lat, origin.long)
    var latlng = new google.maps.LatLng(location[0], location[1])
    return google.maps.geometry.spherical.computeDistanceBetween (origin, latlng)
  }

  var w = 900
  var h = 300

  var minRaduis = 3
  var maxRadius = 20

  var node = document.createElement('div')

  var svg = d3.select(node)
              .append("svg")
              .attr("width", w)
              .attr("height", h)

  var timeline = d3.scaleLinear()
      .domain([d3.min(data.map(elem => elem[0])), d3.max(data.map(elem => elem[0]))])
      .range([maxRadius, w-maxRadius])

  var distance = d3.scaleLinear()
      .domain([d3.min(data.map(elem => elem[1])), d3.max(data.map(elem => elem[1]))])
      .range([maxRadius, h-maxRadius])

  var magnitude = d3.scaleLinear()
      .domain([d3.min(data.map(elem => elem[2])), d3.max(data.map(elem => elem[2]))])
      .range([minRaduis, maxRadius])

  // Create circles
  svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", function(d) {
      return timeline(d[0]);
      })
     .attr("cy", function(d) {
      return distance(d[1])
      })
     .attr("r", function(d) {
       return magnitude(d[2])
     });

  // Create Labels
   svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text(function(d) {
           return d[2]
      })
      .attr("x", function(d) {
          return timeline(d[0])
     })
     .attr("y", function(d) {
          return distance(d[1])
     })
     .attr("font-family", "sans-serif")
     .attr("font-size", "11px")
     .attr("fill", "red");

  // Create Timeline
  var axisBot = d3.axisBottom(timeline)
  svg.append("g")
     .call(axisBot)

  return node
}
