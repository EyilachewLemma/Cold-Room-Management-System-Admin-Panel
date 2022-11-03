
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
const containerStyle = {
    width: '100%',
    height: '300px'
  };
  
  const center = {
    lat: 9.036000,
    lng:  38.752300
  };

function MapBox(props) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBuMJ86uj9D-3vqFDgrD0vcdj39LZ-G1og"
  })

  if(!isLoaded){
    return <div> loading ...</div>
  }
  console.log('map box running...')
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }
    const setCoordinates = (e) =>{
      props.onMapClick({lat:e.latLng.lat(),lng:e.latLng.lng()})
      // setLatLng({lat:e.latLng.lat(),lng:e.latLng.lng()})
    }
   return <GoogleMap
  center={center}
  zoom={10}
  mapContainerStyle={containerStyle}
  onClick={setCoordinates} 
  >
  
</GoogleMap>
}
export default React.memo(MapBox)