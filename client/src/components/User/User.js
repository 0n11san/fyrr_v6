import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import './User.css';
// import axios from 'axios';
// import moment from "moment";

// creates User component to render to the page
class User extends Component {

    render() {
      return (
                <Wrapper>
                    <Header/>
                    <Container>
                      <div id="instructions" className="jumbotron">
                        <h1>Instructions: </h1>

                        <ol>
                        ~~~Find:~~~
                          <li> Navigate to the "Assets" page</li>
                          <li> Click inside the search window on the map and type your location or allow GPS to find you</li>
                          <li> Toggle your search filters depending on what you are looking for (e.g. dog parks; tennis courts; playgrounds; etc)</li>
                          <li></li>
                        </ol>

                        <ol>
                        ~~~Share:~~~
                          <li> Select the pologyon icon from the map</li>
                          <li> Click at least 3 points on the map  to encircle the area in question</li>
                          <li> Press the "Idenitfy" Button and fill in the associated info</li>
                          <li>Your community can now search and find the asset you marked!</li>
                        </ol>

                      </div>
                    </Container>
                    <Footer/>
                </Wrapper>
        )};

  }

// exports User for external use
export default User;
