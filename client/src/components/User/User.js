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
                    </Container>
                    <Footer/>
                </Wrapper>
        )};

  }

// exports User for external use
export default User;
