import React from 'react'

export default React.createClass({
  props: {
    coordinates: React.PropTypes.array.isRequired,
    depth: React.PropTypes.string.isRequired,
    magnitude: React.PropTypes.string.isRequired
  },
  render () {
    return (
      <div className="quake-info">
        <div>
          Lat: {this.props.coordinates[1]}, Long: {this.props.coordinates[0]}
        </div>
        <div>
          Depth: {this.props.depth}, Magnitude: {this.props.magnitude}
        </div>
      </div>
    )
  }
})
