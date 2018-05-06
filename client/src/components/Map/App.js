import React, { Component } from 'react';
import Map from "./map"
// import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      name: 'React',
      polygons: [],
      markers:[],
    };
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
