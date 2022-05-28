/*global google*/
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import React from 'react'
import { Grid } from '@material-ui/core'
import RiderIcon from '../../assets/img/rider.svg'
import StoreIcon from '../../assets/img/store.svg'
import CustomerIcon from '../../assets/img/customer.svg'

const google = window.google

export class PurchaseMapComponent extends React.Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {
      info: {
        name: "",
        phone: ""
      }
    },
  };
  constructor(props) {
    super(props);
    this.handleMapReady = this.handleMapReady.bind(this);
  }

  handleMapReady(mapProps, map) {
    this.calculateAndDisplayRoute(map);
  }
  google = window.google

  calculateAndDisplayRoute(map) {
    const google = window.google
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    const waypoints = [{
      lat: this.props.order.store_detail.latitude,
      lng: this.props.order.store_detail.longitude,
    }]
    const origin = { lat: this.props.order.customer_detail.user.latitude, lng: this.props.order.customer_detail.user.longitude }
    const destination = { lat: this.props.order.delivery_boy_detail.user.latitude, lng: this.props.order.delivery_boy_detail.user.longitude }


    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK") {
          console.log(response)
          directionsDisplay.setDirections(response);
        } else {
          console.log("Directions request failed due to " + status);
        }
      }
    )
  }

  onMarkerClick = (props, marker, e) => {
    console.log(props)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    let order = this.props.order
    const google = window.google

    var points = [
      { lat: order.customer_detail.user.latitude, lng: order.customer_detail.user.longitude },
      { lat: order.delivery_boy_detail.user.latitude, lng: order.delivery_boy_detail.user.longitude },
      { lat: order.store_detail.user.latitude, lng: order.store_detail.user.longitude },
    ]
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    return (
      <Grid sm={12} md={12} xs={12} >

        <Map google={this.props.google}
          initialCenter={{
            lat: order.customer_detail.user.latitude,
            lng: order.customer_detail.user.longitude
          }}
          // zoom={12}
          style={{ width: '80%', height: '65vh' }}
          onClick={this.onMapClicked}
          bounds={bounds}
          className="map"
          onReady={this.handleMapReady}
        >

          <Polyline
            paths={this.state.directions}
            geodesic={false}
            options={{
              strokeColor: '#38B44F',
              strokeOpacity: 1,
              strokeWeight: 7,
            }}
          />

          <Marker
            onClick={this.onMarkerClick}
            position={{ lat: order.customer_detail.user.latitude, lng: order.customer_detail.user.longitude }}
            type={'Customer Info'}
            info={{
              name: order.delivery_boy_detail.user.username,
              phone: order.delivery_boy_detail.user.phone,
            }}
            icon={{
              url: CustomerIcon,
              anchor: new google.maps.Point(32, 32),
              scaledSize: new google.maps.Size(32, 32)
            }}
          />

          <Marker
            onClick={this.onMarkerClick}
            position={{ lat: order.delivery_boy_detail.user.latitude, lng: order.delivery_boy_detail.user.longitude }}
            type={'Delivery Boy Info'}
            info={{
              name: order.delivery_boy_detail.user.username,
              phone: order.delivery_boy_detail.user.phone,
            }}
            icon={{
              url: RiderIcon,
              anchor: new google.maps.Point(32, 32),
              scaledSize: new google.maps.Size(32, 32)
            }}
          />

          <Marker
            onClick={this.onMarkerClick}
            position={{ lat: order.store_detail.user.latitude, lng: order.store_detail.user.longitude }}
            type={'Store Info'}
            info={{
              name: order.delivery_boy_detail.user.username,
              phone: order.delivery_boy_detail.user.phone,
            }}
            icon={{
              url: StoreIcon,
              anchor: new google.maps.Point(32, 32),
              scaledSize: new google.maps.Size(32, 32)
            }}
          />




          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h4>{this.state.selectedPlace.type}</h4>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h6>Name : </h6>
                <h6>{this.state.selectedPlace.info.name}</h6>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h6>Phone : </h6>
                <h6>{this.state.selectedPlace.info.phone}</h6>
              </div>
            </div>
          </InfoWindow>

        </Map>
      </Grid>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyD-S-cuUziy083ZS2a2X_Btnr-msbXJFnw")
})(PurchaseMapComponent)