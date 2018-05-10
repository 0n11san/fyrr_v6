import React from "react";
import axios from "axios";
import { compose, withProps, lifecycle, withHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, Polygon, Marker } from "react-google-maps";
import Data from './data.js';
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");
const _ = require("lodash");
const fetch = require("isomorphic-fetch");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const Map = compose(
  withScriptjs,
  withGoogleMap,

  withProps({
    handlePolygonComplete: (polygon) => {

        var polygonArray=[];
            var polyLength = polygon.getPath().getLength();
            for (var i = 0; i < polyLength; i++) {
                var poly = polygon.getPath().getAt(i).toUrlValue(6);
                polygonArray.push(poly);
                }
            // database.ref('userInfo/polygonArray').push(polygonArray);
              console.log(polygonArray);

              Data.polygonArray=polygonArray;
              console.log(Data);

            //console.log(polygon.getPath().getLength())

            // axios.post('/polygon', {polygonArray:polygonArray})
            //   .then( res => console.log(res))
            //   .catch( err => console.log(err));

    },

    handleMarkerComplete: (marker) => {
      var markerArray=[];
      var locations = [];
      var markers = locations.map(function(location, i) {
        return new window.google.maps.Marker({

        });
      });
      function addMarker(location) {
        var marker = new window.google.maps.Marker({
          position: location,
          //map: map
        });
        //markerCluster.addMarker(marker);
        //database.ref('userInfo/clustermarkers').push(markers);
      }

      console.log(marker)
    }
  })
)

(props =>

  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    defaultCenter={{ lat: 38.889931, lng:-77.009003	  }}
    onDblClick={(e) => {console.log(e.latLng.lat(), e.latLng.lng())}}
    onBoundsChanged={props.onBoundsChanged}
  >
  <SearchBox
    ref={props.onSearchBoxMounted}
    bounds={props.bounds}
    controlPosition={window.google.maps.ControlPosition.BOTTOM_LEFT}
    onPlacesChanged={props.onPlacesChanged}
  >
    <input
      type="text"
      placeholder="Customized your placeholder"
      style={{
        boxSizing: `border-box`,
        border: `1px solid transparent`,
        width: `240px`,
        height: `32px`,
        marginTop: `27px`,
        padding: `0 12px`,
        borderRadius: `3px`,
        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        fontSize: `14px`,
        outline: `none`,
        textOverflow: `ellipses`,
      }}
    />
  </SearchBox>

    <DrawingManager
      defaultDrawingMode={null}
          defaultOptions={{
            drawingControl: true,
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [
                window.google.maps.drawing.OverlayType.POLYGON
              ],
            }
      }}
      onPolygonComplete={props.handlePolygonComplete}
      onMarkerComplete={props.handleMarkerComplete}
      onPolylineComplete={props.handlePolylineComplete}
    />

    {props.polygons.map((polygon, index) => {
        if (polygon.polygonArray.length < 3) {
          return null
        }
        const paths = polygon.polygonArray.map((coordinate) => {
          const coordinateArray = coordinate.split(",")
          const coordinateObject = {
            lat: parseFloat(coordinateArray[0]),
            lng: parseFloat(coordinateArray[1])
          }
          return coordinateObject
        })
        return <Polygon paths={paths} />
      })
    }


    <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {props.markers.map(marker => (
          <Marker
            key={marker.photo_id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          />
        ))}
      </MarkerClusterer>
  </GoogleMap>
)

export default Map
