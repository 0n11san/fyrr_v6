import React from "react"
import axios from "axios"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, Polygon, Marker } from "react-google-maps"
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");

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
            // database.ref('userInfo/coordinates').push(polygonArray);
              console.log(polygonArray);
            //console.log(polygon.getPath().getLength())

            axios.post('/polygon', {coordinates:polygonArray})
              .then( res => console.log(res))
              .catch( err => console.log(err));



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
  }))(props =>

  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 38.889931, lng:-77.009003	  }}
    onDblClick={(e) => {console.log(e.latLng.lat(), e.latLng.lng())}}
  >

    <DrawingManager
  defaultDrawingMode={null}
      defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            window.google.maps.drawing.OverlayType.MARKER,
            window.google.maps.drawing.OverlayType.POLYGON,
            window.google.maps.drawing.OverlayType.POLYLINE,

          ],
        }

      }}
      onPolygonComplete={props.handlePolygonComplete}
      onMarkerComplete={props.handleMarkerComplete}
      onPolylineComplete={props.handlePolylineComplete}

    />
  </GoogleMap>
)

export default Map
