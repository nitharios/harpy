import React, { Component } from 'react';
import L from 'leaflet';

import './App.css';

const apiUrl = 'https://api2.terravion.com';
const access_token = '2e68cee0-b2fd-4ef5-97f6-8e44afb09ffa';
const user_id = '5bad4dfa-7262-4a0a-b1e5-da30793cec65';
const epochStart = '1456200627'
const epochEnd = '1456632627'
const center = [38.540580, -121.877271];
const zoom = 15;

class App extends Component {
  componentDidMount() {
    this.map = this.generateMap();
  }

  generateMap() {
    return L.map('map', {
      center: center,
      zoom: zoom,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    })
  }

  render() {
    return (
      <div id="map"></div>
    );
  }
}

export default App;
