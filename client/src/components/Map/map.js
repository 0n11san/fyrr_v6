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
              console.log(polygonArray);
              Data.polygonArray=polygonArray;
              console.log(Data);
            //database.ref('userInfo/polygonArray').push(polygonArray); fire base link
            //console.log(polygon.getPath().getLength())
            // axios.post('/polygon', {polygonArray:polygonArray})
            //   .then( res => console.log(res))
            //   .catch( err => console.log(err));

    },
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
    controlPosition={window.google.maps.ControlPosition.TOP_RIGHT}
    onPlacesChanged={props.onPlacesChanged}
  >
    <input
      type="text"
      placeholder="Search"
      style={{
        boxSizing: `border-box`,
        border: `1px solid transparent`,
        width: `175px`,
        height: `25px`,
        marginTop: `15px`,
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

  </GoogleMap>
)

export default Map
