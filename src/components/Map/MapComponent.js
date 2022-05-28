import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React from 'react'
import {Grid} from '@material-ui/core'
 
export class MapContainer extends React.Component {
  render() {
    return (
      <Grid sm={12} md={12} xs={12} >
        <Map google={this.props.google}        
          zoom={14}
          initialCenter={{
            lat : this.props.latitude,
            lng : this.props.longitude,
          }}
          style={{width: '80%',height:'65vh'}}
          >
  

              <Marker lat={this.props.latitude} lng={this.props.longitude}
              name={'Current location'} />

  
          <InfoWindow>
              <div>
                <h1>{'this.state.selectedPlace.name'}</h1>
              </div>
          </InfoWindow>
        </Map>
      </Grid>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyD-S-cuUziy083ZS2a2X_Btnr-msbXJFnw")
})(MapContainer)