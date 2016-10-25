import React from 'react'

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"

export default withGoogleMap(props => {
  return <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: props.coordinates[1], lng: props.coordinates[0] }}>
    <Marker
      defaultPosition={{ lat: props.coordinates[1], lng: props.coordinates[0] }}
      title="Earthquake"
    />
  </GoogleMap>
}
)
