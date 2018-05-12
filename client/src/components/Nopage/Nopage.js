import React from 'react';
import {Link} from 'react-router-dom';
import logo from "../Images/logo.png";
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';


// creates jumbotron component to render to the Landing page
const Nopage = () => {
    return (

        <Wrapper>
            <Container>
                <div className="jumbotron text-center">
                    <img src={logo} alt="fyrr logo" id="biglogo"/>
                    <h1>404 Page not Assets</h1>
                    <hr className="hr"/>
                    <p>Lets get you back on track.</p>
                    <p className="lead">
                        <Link className="btn btn-primary btn-lg btn-button" to="/">FYRR</Link>
                    </p>
                </div>
            </Container>
        </Wrapper>
    )
};

// exports Landing for external use
export default Nopage;
