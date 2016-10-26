import React from 'react'
import 'whatwg-fetch'
import Geosuggest from 'react-geosuggest'

import QuakeInfo from './QuakeInfo'
import Map from './Map'
import Scatterplot from './Scatterplot'

export default React.createClass({
  getInitialState () {
    return {
      quakes: [],
      address: "Auckland Central, Auckland, New Zealand",
      lat: -36.8484597,
      long: 174.76333150000005,
      limit: 10,
      error: ""
    }
  },
  componentDidMount () {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
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
  onPlaceSelect (suggestion) {
    this.setState({lat: suggestion.location.lat,
                  long: suggestion.location.lng,
                  address: suggestion.label}, () => this.fetchNearbyQuakes())
  },
  render () {
    const quakes = this.state.quakes.map((elem) => {
      return <QuakeInfo
                    key={elem._id}
                    publicid={elem.properties.publicid}
                    date={elem.properties.origintime}
                    coordinates={elem.geometry.coordinates}
                    depth={elem.properties.depth}
                    magnitude={elem.properties.magnitude} />
    })
    const scatterplotKey = this.state.quakes.reduce((sum, elem) => {
      return sum + elem.geometry.coordinates[0]}, 0)

    return  <div className="container">
              <h1>Quakes</h1>
              <div className="current-location row">
                <div className="six columns">
                  <Geosuggest
                    placeholder="Search earthquakes around..."
                    country="nz"
                    onSuggestSelect={this.onPlaceSelect} />
                  <div>Near {this.state.address} ({this.state.lat}, {this.state.long})</div>
                  <Map
                    containerElement={
                      <div style={{width: 400, height: 400}} />
                    }
                    mapElement={
                      <div style={{width: 400, height: 400}} />
                    }
                    coordinates={[this.state.long, this.state.lat]} />
                </div>
                <div className="six columns">
                  <Scatterplot key={scatterplotKey} quakes={this.state.quakes}/>
                </div>
              </div>
              <div className="error">{this.state.error}</div>
              <div className="quake-list">{quakes[0]?quakes: <div className="loader">Loading...</div>}</div>
            </div>
  }
})
