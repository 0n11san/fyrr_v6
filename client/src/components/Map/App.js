import React, { Component } from 'react';
import Map from "./map";
import Data from './data.js';
import _ from "lodash";
import qs from 'qs';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      name: 'React',
      bounds: null,
      modal: false,
      polygons: [],
      polygonsCopy: [],
      markers:[],
      polygonType:"",
      Parkname : "",
      Rating: "",
      Comments: "",
      value: "",
    };


    this.toggle = this.toggle.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removePolygons =this.removePolygons.bind(this);
    this.showPolygons=this.showPolygons.bind(this);

  }

  removePolygons(event){
    event.preventDefault();
    console.log('hello22');
    this.setState({
    polygons:[]
    })
  }

  showPolygons(event){
    event.preventDefault();
    console.log('hello11');
    axios.get(`/polygon`)
      .then(res => {
       this.setState({ polygons: res.data})

      });
  }


  handleChange(event) {
    var {name, value} = event.target;
    this.setState({
      [name]: value
    });

  }

  handleSubmit(event) {
    //console.log('A name was submitted: ' + this.state.Parkname);
    event.preventDefault();
    Data.Parkname = this.state.Parkname;
    Data.polygonType = this.state.polygonType;
    Data.Rating = this.state.Rating;
    Data.Comments = this.state.Comments;

    console.log(Data)

      var polygonArray=[];
      axios.post('/polygon', Data )
        .then( res => console.log(res))
        .catch( err => console.log(err));
    }


   toggle() {
     this.setState({
       modal: !this.state.modal
     });
   }

   componentWillMount() {
     const refs = {}

     this.setState({
       bounds: null,
       center: {
         lat: 41.9, lng: -87.624
       },
       markers: [],
       onMapMounted: ref => {
         refs.map = ref;
       },
       onBoundsChanged: () => {
         this.setState({
           bounds: refs.map.getBounds(),
           center: refs.map.getCenter(),
         })
       },
       onSearchBoxMounted: ref => {
         refs.searchBox = ref;
       },
       onPlacesChanged: () => {
         const places = refs.searchBox.getPlaces();
         const bounds = new window.google.maps.LatLngBounds();

         places.forEach(place => {
           if (place.geometry.viewport) {
             bounds.union(place.geometry.viewport)
           } else {
             bounds.extend(place.geometry.location)
           }
         });
         const nextMarkers = places.map(place => ({
           position: place.geometry.location,
         }));
         const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

         this.setState({
           center: nextCenter,
           markers: nextMarkers,
         });
         // refs.map.fitBounds(bounds);
       },
     })
   }

  componentDidMount() {

    setTimeout(function(){
      console.log(window.google.maps)
    }, 3000)


     axios.get(`/polygon`)
       .then(res => {
        this.setState({ polygons: res.data})
        this.setState({
          PolygonsCopy:res.data
        })

       });




       const url = [
      // Length issue
      `https://gist.githubusercontent.com`,
      `/farrrr/dfda7dd7fccfec5474d3`,
      `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
    ].join("")

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data.photos });
      });

   }


  //  componentDidUpdate(){
  //    var myMap = document.querySelector('.myMap2');
  //    console.log(myMap)
  //  }

  render() {
    return (

      <div className="App">
      <div>
        <Button id="Identify" color="danger" onClick={this.toggle}>{this.props.buttonLabel} Identify </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader id="modal-title" toggle={this.toggle}>Attribute</ModalHeader>
                <ModalBody>
                <form onSubmit={this.handleSubmit}>
                    <label id="form-portions">

                      Parkname: <input type="text" name='Parkname' value={this.state.Parkname} onChange={this.handleChange} />

                      polygonType: <select  type="String" name='polygonType' value={this.state.polygonType} onChange={this.handleChange}>
                      <option value="Dog Park">Dog Park </option>
                      <option value="Tennis">Tennis Court</option>
                      <option value="Baseball Field">Baseball Field</option>
                      <option value="Basketball Court">Basketball Court</option>
                      <option value="Child Play Area">Child Play Area</option>
                      <option value="Other">Other</option>
                    </select>

                  {/*}<input type="text" name='polygonType'value={this.state.polygonType} onChange={this.handleChange} /> */}

                      Comments: <input type="text" name='Comments'value={this.state.Comments} onChange={this.handleChange} />

                      {/*Rating: <input type="Number" name='Rating'value={this.state.Rating} onChange={this.handleChange} /> */}

                      Rating: <select  type="String" name='Rating' value={this.state.Rating} onChange={this.handleChange}>
                                    <option value="1">It Sucks</option>
                                    <option value="2">Meh</option>
                                    <option value="3">Okay</option>
                                    <option value="4">Good</option>
                                    <option value="5">Great!</option>
                                  </select>

                    </label>
                    <input type="submit" onSubmit={this.handleSubmit} value="Submit" />
                </form>
                </ModalBody>

          </Modal>
    </div>

        <Button onClick={this.removePolygons} value="Remove DB Overlay"> Hide </Button>
        <Button onClick={this.showPolygons} value="Show DB Overlay"> Reveal </Button>
        <Map
          markers={this.state.markers}
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
