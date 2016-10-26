import React from 'react'

import {
  withGoogleMap,
  GoogleMap,
  SearchBox,
  Marker,
} from "react-google-maps"

const INPUT_STYLE = {
 boxSizing: `border-box`,
 MozBoxSizing: `border-box`,
 border: `1px solid transparent`,
 width: `240px`,
 height: `32px`,
 marginTop: `27px`,
 padding: `0 12px`,
 borderRadius: `1px`,
 boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
 fontSize: `14px`,
 outline: `none`,
 textOverflow: `ellipses`,
}

export default withGoogleMap(props => {
  return <GoogleMap
    key={String(props.coordinates[1]) + String(props.coordinates[0])}
    defaultZoom={15}
    defaultCenter={{ lat: props.coordinates[1], lng: props.coordinates[0] }}>
    <Marker
      defaultPosition={{ lat: props.coordinates[1], lng: props.coordinates[0] }}
      title="Earthquake"
    />
  </GoogleMap>
}
)
