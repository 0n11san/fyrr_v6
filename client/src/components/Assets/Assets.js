import React, {Component} from 'react';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';
// import {Link} from "react-router-dom";
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import './Assets.css';
import Map from '../Map'
// import Search from '../Search'

// creates Meditation component to render to the page
class Assets extends Component {

    render() {

        return (
          <div class="content">
            <Wrapper id="modal-container">
                <Header/>
                <Container>
                    <div className="jumbotron">
                        <h1>Find & Share Rec Resources</h1>
                        <hr className="hr"/>
                        {/* <Search/> */}

                        <div class="modalButton">
                            <div id="two" class="buttonReveal">
                            </div>
                        </div>

                        <Map/>
                    </div>
                </Container>
                <Footer/>
            </Wrapper>
          </div>
        )
    }
}


// exports Assets for external use
export default Assets;
