import React, { Component } from 'react';
import Map from "./map";
import Data from './data.js';
import qs from 'qs';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class App extends Component {

  constructor() {
    super();
    this.state = {
      name: 'React',
      modal: false,
      polygons: [],
      markers:[],
      polygonType:"",
      Parkname : "",
      Rating: "",
      Comments: "",

    };


    this.toggle = this.toggle.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    // {"coordinates":polygonArray}


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

  componentDidMount() {
     axios.get(`/polygon`)
       .then(res => {
        this.setState({ polygons: res.data})
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

  render() {
    return (

      <div className="App">
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel} Use   </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                <form onSubmit={this.handleSubmit}>
                    <label>

                      Parkname: <input type="text" name='Parkname' value={this.state.Parkname} onChange={this.handleChange} />
                      polygonType: <input type="text" name='polygonType'value={this.state.polygonType} onChange={this.handleChange} />
                      Comments: <input type="text" name='Comments'value={this.state.Comments} onChange={this.handleChange} />
                      Rating: <input type="text" name='Rating'value={this.state.Rating} onChange={this.handleChange} />

                    </label>
                    <input type="submit" onSubmit={this.handleSubmit} value="Submit" />
                </form>
                </ModalBody>

          </Modal>
    </div>
        <Map
          markers={this.state.markers}
          polygons={this.state.polygons}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB1SJ3HV5ZGZkOfwO96Hku1mK2rl3sT_5I&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}

        />

      </div>



    );
  }
}

export default App;
