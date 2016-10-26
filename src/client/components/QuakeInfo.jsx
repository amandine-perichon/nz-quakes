import React from 'react'

import Map from './Map'

export default React.createClass({
  props: {
    date: React.PropTypes.string.isRequired,
    publicid: React.PropTypes.string.isRequired,
    coordinates: React.PropTypes.array.isRequired,
    depth: React.PropTypes.string.isRequired,
    magnitude: React.PropTypes.string.isRequired
  },
  render () {
    const long = this.props.coordinates[0]
    const lat = this.props.coordinates[1]
    return (
      <div className="quake-info row">
        <div>
          Earthquake on {this.props.date.substr(0, 10)} at {this.props.date.substr(11, 5)}
        </div>
        <div>
          Lat: {this.props.coordinates[1]}, Long: {this.props.coordinates[0]}
          <Map
            containerElement={
              <div style={{width: 400, height: 400}} />
            }
            mapElement={
              <div style={{width: 400, height: 400}} />
            }
            coordinates={this.props.coordinates} />
        </div>
        <div>
          Depth: {this.props.depth}, Magnitude: {this.props.magnitude}, publicid: {this.props.publicid}
        </div>
      </div>
    )
  }
})
