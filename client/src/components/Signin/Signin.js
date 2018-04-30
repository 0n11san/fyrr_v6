import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Signin.css';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';


class Signin extends Component {
    
    // stores signin state
    constructor() {
        super();
        this.state = {};
    }
    
    // gets input values from signin page
    getValues = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
    
    // sends login data
    sendData = (event) => {
        event.preventDefault();
        
        this.setState({loginerror: false});
        
        const ck_username = /^[A-Za-z0-9_]{3,20}$/.test(this.state.username);
        const ck_password = /^[A-Za-z0-9!@#$%^&*_]{6,20}$/.test(this.state.password);
        
        if (ck_username && ck_password) {
            axios.post('/api/signin', this.state)
                .then((data) => {
                    sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
                    sessionStorage.setItem('UN', JSON.stringify(this.state.username));
                    this.setState({loginerror: false});
                    window.location.reload();
                })
                .catch((err) => {
                    // Not signed in
                    console.log("Error Happened");
                    console.log(err);
                    this.setState({loginerror: true});
                });
        }
        if (!ck_username) {
            this.setState({loginerror: true});
        }
        if (!ck_password) {
            this.setState({loginerror: true});
        }
    };
    
    render() {
        
        // renders page with error if error
        return (
            <Wrapper>
                <Container>
                    <div className="jumbotron text-center">
                        
                        <h1>Sign In</h1>
                        <hr className="hr"/>
                        {(this.state.loginerror) ?
                            <p className="error">Incorrect username or password.</p>
                            : null}
                        
                        <form>
                            <input
                                type="text"
                                name="username"
                                className="input"
                                placeholder="username"
                                onChange={this.getValues}/> <br/>
                            
                            
                            <input
                                type="password"
                                name="password"
                                className="input"
                                placeholder="password"
                                onChange={this.getValues}/> <br/>
                            
                            <button className="btn btn-primary btn-button" onClick={this.sendData}>Sign In</button><Link to='/signup'>
                            <button className="btn btn-primary btn-button">Go to Sign up</button>
                        </Link>
                        
                        </form>
                    
                    </div>
                </Container>
            </Wrapper>
        );
        // else returns no error render
    }
    
}

export default Signin;