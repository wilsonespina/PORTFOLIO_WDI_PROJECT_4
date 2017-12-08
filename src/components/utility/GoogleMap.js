/* global google */

import React from 'react';
import mapStyles from '../../config/mapStyles';

class GoogleMap extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      center: this.props.center || { lat: 51.51, lng: -0.09 },
      zoom: 14,
      clickableIcons: false,
      disableDefaultUI: true,
      styles: mapStyles
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position: this.props.center || { lat: 51.51, lng: -0.09 },
      animation: google.maps.Animation.DROP
    });


    this.polyLine = new google.maps.Polyline({
      path: google.maps.geometry.encoding.decodePath(this.props.path),
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      zIndex: 3
    });

    this.polyLine.setMap(this.map);

  }

  componentWillUnmount() {
    this.marker.setMap(null);
    this.marker = null;
    this.polyLine.setMap(null);
    this.polyLine = null;
    this.map = null;
  }

  render() {
    return (
      <div className="google-map" ref={element => this.mapCanvas = element}></div>
    );
  }
}

export default GoogleMap;
