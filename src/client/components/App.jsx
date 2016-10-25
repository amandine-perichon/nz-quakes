import React from 'react'
import 'whatwg-fetch'

import QuakeInfo from './QuakeInfo'

export default React.createClass({
  getInitialState () {
    return {
      quakes: [],
      lat: 40,
      long: 174,
      limit: 10,
      error: ""
    }
  },
  componentDidMount () {
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
                    coordinates={elem.geometry.coordinates}
                    depth={elem.properties.depth}
                    magnitude={elem.properties.magnitude} />
    })
    return  <div className="quake-list">
              <h1>Quakes</h1>
              <div className="error">{this.state.error}</div>
              {quakes}
            </div>
  }
})
