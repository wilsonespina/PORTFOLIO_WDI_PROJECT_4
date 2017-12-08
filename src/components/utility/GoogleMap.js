/* global google */

import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';
import mapStyles from '../../config/mapStyles';

class GoogleMap extends React.Component {
  state = {
    runs: {}
  }

  // componentWillMount() {
  //   Axios
  //     .get('https://www.strava.com/api/v3/athlete/activities', {
  //       headers: { Authorization: `Bearer ${Auth.getStravaToken()}`}
  //     })
  //     .then(res => this.setState({ runs: res.data }))
  //     .catch(err => console.log('this is the error', err));
  // }

  componentDidMount() {
    const map = new google.maps.Map(this.mapCanvas, {
      center: this.props.center || { lat: 51.51, lng: -0.09 },
      // center: this.props.center || {lat: this.state.runs.start_latlng[0], lng: this.state.runs.start_latlng[1]},
      zoom: 14,
      clickableIcons: false,
      disableDefaultUI: true,
      styles: mapStyles
    });

    const marker = new google.maps.Marker({
      map: map,
      position: this.props.center || { lat: 51.51, lng: -0.09 },
      animation: google.maps.Animation.DROP
    });


    const polyLine = new google.maps.Polyline({
      path: google.maps.geometry.encoding.decodePath(this.props.path),
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      zIndex: 3
    });

    polyLine.setMap(map);

  }

  componentWillUnmount() {
    this.marker.setMap(null);
    this.marker = null;
    this.polyLine.setMap(null);
    this.polyLine = null;
    this.map = null;
  }

  render() {
    // console.log(this.state.runs);

    return (
      <div className="google-map" ref={element => this.mapCanvas = element}></div>
    );
  }
}

export default GoogleMap;
