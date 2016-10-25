import React from 'react'
import 'whatwg-fetch'

import QuakeInfo from './QuakeInfo'

export default React.createClass({
  getInitialState () {
    return {
      quakes: [],
      lat: 40,
      long: 174,
      limit: 10
    }
  },
  componentDidMount () {
    fetch(`/api/nearby?lat=${this.state.lat}&long=${this.state.long}&limit=${this.state.limit}`)
    .then(function(response) {
      if(response.ok) {
        return response.json()
      } else {
        console.log('Network response was not ok.');
      }
    })
    .then((json) => this.setState({quakes: json}))
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
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
              {quakes}
            </div>
  }
})
