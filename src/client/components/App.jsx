import React from 'react'
import 'whatwg-fetch'

import QuakeInfo from './QuakeInfo'
import Map from './Map'

export default React.createClass({
  getInitialState () {
    return {
      quakes: [],
      lat: -36.863230,
      long: 174.762689,
      limit: 10,
      error: ""
    }
  },
  componentDidMount () {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude)
        this.setState({lat: position.coords.latitude, long: position.coords.longitude}, () => {
          this.fetchNearbyQuakes()
        })
      })
    }
  },
  fetchNearbyQuakes () {
    fetch(`/api/nearby?lat=${this.state.lat}&long=${this.state.long}&limit=${this.state.limit}`)
    .then((response) => {
      if(response.ok) {
        return response.json()
      } else {
        this.setState({error: 'Sorry, there was a problem retrieving the quakes'})
      }
    })
    .then((json) => this.setState({quakes: json}))
    .catch((error) => {
      this.setState({error: 'Sorry, there was a problem retrieving the quakes'})
    })
  },
  render () {
    const quakes = this.state.quakes.map((elem) => {
      return <QuakeInfo key={elem._id}
                    date={elem.properties.origintime}
                    coordinates={elem.geometry.coordinates}
                    depth={elem.properties.depth}
                    magnitude={elem.properties.magnitude} />
    })
    return  <div className="container">
              <h1>Quakes</h1>
              <div className="current-location">
                <h3>Near {this.state.lat}, {this.state.long}</h3>
                <Map
                  containerElement={
                    <div style={{width: 400, height: 400}} />
                  }
                  mapElement={
                    <div style={{width: 400, height: 400}} />
                  }
                  coordinates={[this.state.long, this.state.lat]} />
              </div>
              <div className="error">{this.state.error}</div>
              <div className="quake-list">{quakes}</div>
            </div>
  }
})
