import React, { Component } from 'react';
import Map from "./map";
import Data from './data.js';
import _ from "lodash";
import qs from 'qs';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class App extends Component {
// set the inital state of the map properties...????
  constructor() {
    super();
    this.state = {
      name: 'React',
      modal: false,
      polygons: [],
      polygonsCopy: [],
      markers:[],
      polygonType:"",
      Parkname : "",
      Rating: "",
      Comments: "",
      polygonType:"",

    };

//????????
    this.toggle = this.toggle.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removePolygons =this.removePolygons.bind(this);
    this.showPolygons=this.showPolygons.bind(this);
    // this.BasketballPolygons=this.BasketballPolygons.bind(this);

  }
//this removes the polygon on path from the db  to not render on the map
  removePolygons(event){
    this.setState({
    polygons:[]
    })
    event.preventDefault();
    console.log('hello22');
  }
//this shows the polygon on path from the db  to be renderded on the map
  showPolygons(event){
    axios.get(`/polygon`)
      .then(res => {
       this.setState({ polygons: res.data})
      });
      event.preventDefault();
      console.log('hello11');
  }


//?????????????
  handleChange(event) {
    var {name, value} = event.target;
    this.setState({
      [name]: value
    });

  }
//this posts the information the users types into the modal form
  handleSubmit(event) {
    event.preventDefault();
    Data.Parkname = this.state.Parkname;
    Data.polygonType = this.state.polygonType;
    Data.Rating = this.state.Rating;
    Data.Comments = this.state.Comments;
    console.log(Data)
//This combines the polyggon coordinates portioin of the data, to post into the db with the form data
      var polygonArray=[];
      axios.post('/polygon', Data )
        .then( res => console.log(res))
        .catch( err => console.log(err));
    }

// this toggles the modal to show or not show
       toggle() {
         this.setState({
           modal: !this.state.modal
         });

       }

      //  var DogParkPolygons = [],
      //  const DogPark = DogParkPolygons.filter(DogParkPolygons => DogParkPolygons.polygonType = Dog Park);
       //
      //  console.log(DogPark);




  //  componentWillMount() {
  //    const refs = {}
   //
  //    this.setState({
  //      bounds: null,
  //      center: {
  //        lat: 41.9, lng: -87.624
  //      },
  //      markers: [],
  //      onMapMounted: ref => {
  //        refs.map = ref;
  //      },
  //      onBoundsChanged: () => {
  //        this.setState({
  //          bounds: refs.map.getBounds(),
  //          center: refs.map.getCenter(),
  //        })
  //      },
  //      onSearchBoxMounted: ref => {
  //        refs.searchBox = ref;
  //      },
  //      onPlacesChanged: () => {
  //        const places = refs.searchBox.getPlaces();
  //        const bounds = new window.google.maps.LatLngBounds();
   //
  //        places.forEach(place => {
  //          if (place.geometry.viewport) {
  //            bounds.union(place.geometry.viewport)
  //          } else {
  //            bounds.extend(place.geometry.location)
  //          }
  //        });
  //        const nextMarkers = places.map(place => ({
  //          position: place.geometry.location,
  //        }));
  //        const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
   //
  //        this.setState({
  //          center: nextCenter,
  //          markers: nextMarkers,
  //        });
  //        refs.map.fitBounds(bounds);
  //      },
  //    })
  //  }

  componentDidMount() {

    // setTimeout(function(){
    //   console.log(window.google.maps)
    // }, 3000)

    //this stores a backup copy of the api response, so when toggled its there
     axios.get(`/polygon`)
       .then(res => {
        this.setState({ polygons: res.data})
        this.setState({
          PolygonsCopy:res.data
        })

       });

   }

  render() {
    return (

      <div className="App">
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel} ATTRIBUTE   </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Tell Us About this Park</ModalHeader>
                <ModalBody>
                <form onSubmit={this.handleSubmit}>
                  <label>

Parkname: <input type="String" name='Parkname' value={this.state.Parkname} onChange={this.handleChange} />

polygonType: <select  type="String" name='polygonType' value={this.state.polygonType} onChange={this.handleChange}>
              <option value="Dog Park">Dog Park </option>
              <option value="Tennis">Tennis Court</option>
              <option value="Baseball Field">Baseball Field</option>
              <option value="Basketball Court">Basketball Court</option>
              <option value="Child Play Area">Child Play Area</option>
              <option value="Other">Other</option>
            </select>

Comments: <input type="String" name='Comments'value={this.state.Comments} onChange={this.handleChange} />

{/*Rating: <input type="Number" name='Rating'value={this.state.Rating} onChange={this.handleChange} /> */}

Rating: <select  type="String" name='Rating' value={this.state.Rating} onChange={this.handleChange}>
              <option value="1">It sucks</option>
              <option value="2">Meh</option>
              <option value="3">OK</option>
              <option value="4">Good</option>
              <option value="5">Great!</option>
            </select>

                  </label>
                    <input type="submit" onSubmit={this.handleSubmit} value="Submit" />
                </form>
                </ModalBody>

          </Modal>
    </div>

        <Button onClick={this.removePolygons} value="Remove DB Overlay"> remove </Button>
        <Button onClick={this.showPolygons} value="Show DB Overlay"> Show </Button>
          <Button onClick={this.showPolygons} value="Show Basketball Overlay"> Show Basketball </Button>
        <Map
          polygons={this.state.polygons}

          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB1SJ3HV5ZGZkOfwO96Hku1mK2rl3sT_5I&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div className='myMap' style={{ height: `100%` }} />}
        />

      </div>

    );
  }
}

export default App;
