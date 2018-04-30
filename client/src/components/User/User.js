import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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

        if (!this.state.moodLogged && !this.state.firstLoad) {
            return (
                <Wrapper>
                    <Header/>
                    <Container>
                    </Container>
                    <Footer/>
                </Wrapper>
            )
        }
        else if (!this.state.moodLogged && this.state.firstLoad) {
            return (
                <Wrapper>
                    <Header/>
                    <Container>
                        <div className="jumbotron text-center">
                            <h1>User</h1>
                            <hr className="hr"/>
                            <p>What did you find?</p>
                            <p className="lead">
                                <i id="good" onClick={this.checkIn} className="fa fa-smile-o fa-5x moodbtn"
                                   aria-hidden="true"/>
                                <i id="neutral" onClick={this.checkIn} className="fa fa-meh-o fa-5x moodbtn"
                                   aria-hidden="true"/>
                                <i id="bad" onClick={this.checkIn} className="fa fa-frown-o fa-5x moodbtn"
                                   aria-hidden="true"/>
                            </p>
                        </div>
                    </Container>
                    <Footer/>
                </Wrapper>
            )
        }
        else {
            return (
                <Wrapper>
                    <Header/>
                    <Container>
                        <div className="jumbotron text-center">
                            <MedOrTrend {...this.state}/>
                        </div>
                    </Container>
                    <Footer/>
                </Wrapper>
            )
        }
    }
}

// second user page
const MedOrTrend = (props) => {
    if (props.moodLogged) {
        return (
            <div className="medOrTrend">
                <div className="choice-txt">What would you like to do?</div>
                <div className="btn-choices">
                    <Link to="/find">
                        <button className="btn btn-primary btn-lg btn-button">Find</button>
                    </Link>
                    <Link to="/found">
                        <button className="btn btn-primary btn-lg btn-button">Found</button>
                    </Link>
                </div>
            </div>
        )
    }
};

// exports User for external use
export default User;
