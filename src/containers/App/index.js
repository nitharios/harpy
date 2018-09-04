import React, { Component } from 'react';
import L from 'leaflet';
import axios from 'axios';

import './App.css';
import DateList from '../../components/datelist.component';

const apiUrl = 'https://api2.terravion.com';
const access_token = process.env.REACT_APP_ACCESS_TOKEN;
const user_id = process.env.REACT_APP_USER_ID;
const epochStart = '1456200627';
const epochEnd = '1456632627';

class App extends Component {
  constructor() {
    super();

    this.center = [38.540580, -121.877271];
    this.zoom = 15;
    this.selectedEpoch = 0;
    this.selectedEpochEnd = 0;
    this.tileUrlTemplate = '';
  }

  componentDidMount() {
    // retrieve list of epoch dates from api
    axios.get('https://api2.terravion.com/layers/getLayersFromBlockId?blockId=48ed28ca-d272-4d1f-bfe0-cb95b61eecbc&access_token=2e68cee0-b2fd-4ef5-97f6-8e44afb09ffa')
      .then(res => {        
        this.setState({
          layerDates: res.data.reduce((prev, curr) => {
            prev.push(curr.layerDateEpoch);
            return prev;
          }, [])                      
        })
      });

    this.map = this.generateMap();
    this.layersControl = L.control.layers();
    this.generateURL(epochStart, epochEnd);
    this.generateLayers();
    this.generateOverlays();
  }

  generateEpochEndTime(epochStart) {    
    return Number(epochStart) + 43200;
  }  

  generateLayers() {
    this.mapbox_Layer = L.tileLayer("https://api.tiles.mapbox.com/v2/cgwright.ca5740e5/{z}/{x}/{y}.jpg", {
      drawControl: false,
      maxZoom: 22,
      maxNativeZoom: 19
    }).addTo(this.map);
    this.nc_layer = L.tileLayer(this.tileUrlTemplate + '&product=NC', {
      attribution: 'TerrAvion',
      maxZoom: 19,
      tms: true
    }).addTo(this.map);
    this.cir_layer = L.tileLayer(this.tileUrlTemplate + '&product=CIR', {
      attribution: 'TerrAvion',
      maxZoom: 19,
      tms: true
    }) 
    this.ndvi_layer = L.tileLayer(this.tileUrlTemplate + '&product=NDVI&colorMap=GRANULAR', {
      attribution: 'TerrAvion',
      maxZoom: 19,
      tms: true
    })
    this.tirs_layer = L.tileLayer(this.tileUrlTemplate + '&product=TIRS&colorMap=T', {
      attribution: 'TerrAvion',
      maxZoom: 19,
      tms: true
    }) 
    this.zone_layer = L.tileLayer(this.tileUrlTemplate + '&product=ZONE&colorMap=GRANULAR', {
      attribution: 'TerrAvion',
      maxZoom: 19,
      tms: true
    })
  }

  generateMap() {
    return L.map('map', {
      center: this.center,
      zoom: this.zoom,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    })
  }

  generateOverlays() {
    this.layersControl.addOverlay(this.mapbox_Layer, 'mapbox');
    this.layersControl.addOverlay(this.nc_layer, 'nc');
    this.layersControl.addOverlay(this.cir_layer, 'cir');
    this.layersControl.addOverlay(this.ndvi_layer, 'ndvi');
    this.layersControl.addOverlay(this.tirs_layer, 'thermal');
    this.layersControl.addOverlay(this.zone_layer, 'zone');
    this.layersControl.addTo(this.map);
  }

  generateURL(startTime, endTime) {
   this.tileUrlTemplate = apiUrl + '/users/' + user_id + '/{z}/{x}/{y}.png?epochStart=' + startTime +
      '&epochEnd=' + endTime + '&access_token=' + access_token;
  }

  onDateSelect(e) {       
    this.map.eachLayer(layer => {
      console.log(layer);
      
      this.map.removeLayer(layer);
    })
  
    this.selectedEpoch = e.target.dataset.epochdate;
    this.selectedEpochEnd = this.generateEpochEndTime(this.selectedEpoch);  
    this.generateURL(this.selectedEpoch, this.selectedEpochEnd);
    this.generateLayers();
  }

  render() {
    this.boundSelect = this.onDateSelect.bind(this);

    return (
      <div id="container">
        <div id="map"></div>
        <DateList data={ this.state } selectFunc={ this.boundSelect }/>
      </div>
    );
  }
}

export default App;
