import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';


class Signup extends Component {
    
    // stores signup data
    constructor() {
        super();
        this.state = {};
    }
    
    // gets input values from signup page
    getValues = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
    
    // sends new user data
    sendData = (event) => {
        event.preventDefault();
        
        this.setState({signinerror: false, usernameError: false, passwordError: false});
        
        const ck_username = /^[A-Za-z0-9_]{3,20}$/.test(this.state.username);
        const ck_password = /^[A-Za-z0-9!@#$%^&*_]{6,20}$/.test(this.state.password);
        
        if (ck_username && ck_password) {
            axios.post('/api/signup', this.state)
                .then((data) => {
                    sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
                    sessionStorage.setItem('UN', JSON.stringify(this.state.username));
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({signinerror: true});
                });
        }
        if (!ck_username) {
            this.setState({usernameError: true});
        }
        if (!ck_password) {
            this.setState({passwordError: true});
        }
    };
    
    render() {
        // renders if error
        return (
            <Wrapper>
                <Container>
                    <div className="jumbotron text-center">
                        
                        <h1>Sign Up</h1>
                        <hr className="hr"/>
                        {(this.state.signinerror) ?
                            <p className="error">This username is already taken.</p>
                            : null}
                        
                        {(this.state.usernameError) ?
                            <p className="error">Username cannot contain special characters and must be 3-20 characters
                                long.</p>
                            : null}
                        
                        {(this.state.passwordError) ?
                            <p className="error">Password cannot contain () [] or {} and must be 6-20 characters
                                long.</p>
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
                            
                            <button className="btn btn-primary btn-button" onClick={this.sendData}>Sign Up</button><Link to='/signin'>
                            <button className="btn btn-primary btn-button">Go to Sign In</button>
                        </Link>
                        </form>
                        
                        

                    
                    </div>
                </Container>
            </Wrapper>
        );
    }
    
}

export default Signup;