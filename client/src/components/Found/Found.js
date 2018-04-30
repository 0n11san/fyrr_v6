import React, {Component} from 'react';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';
// import {Link} from "react-router-dom";
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import './Found.css';

// creates Meditation component to render to the page
class Found extends Component {

    render() {

        return (
            <Wrapper>
                <Header/>
                <Container>
                    <div className="jumbotron">
                        <h1>Share a Rec Resource You Found</h1>
                        <hr className="hr"/>
                        {/* <div className="map-space">
                        </div> */}
                    </div>
                </Container>
                <Footer/>
            </Wrapper>
        )
    }
}


// exports Found for external use
export default Found;
