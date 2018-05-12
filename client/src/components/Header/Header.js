import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';
import logo from "../Images/logo.png";

// creates Header component to render to the page
class Header extends Component {

    constructor() {
        super();
        this.state = {
            show: false
        };
    }

    // Signout function
    signOut = (event) => {
        event.preventDefault();
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('UN');
        window.location.reload();
    };

    // toggles location for showing dropdown
    showLinks = (event) => {
        event.preventDefault();
        if (!this.state.show) {
            this.setState({show: true});
        } else {
            this.setState({show: false});
        }
    };

    render() {
        return (

            <nav className="navbar">

                <span className="navbar-brand">
                    <img src={logo} alt="fyrr logo" className="littlelogo"/>
                    <div className="brand-name navbar-link">FYRR</div>
                </span>
                {/*dropdown menu*/}
                <div className="navbar-nav">
                    <div className="dropdown-icon navbar-link" onClick={this.showLinks}>&#9776;
                        <div className="dropdown-content" style={{display: (this.state.show) ? 'inline-block' : 'none'}}>
                            <Link to="/HowTo" className="navbar-link navbar-item dropdown-item">How To</Link>
                            {/*<Link to="/find" className="navbar-link navbar-item dropdown-item">Find</Link>*/}
                            <Link to="/Assets" className="navbar-link navbar-item dropdown-item">Assets</Link>
                            <button className="btn btn-primary " id="logoutBtn" onClick={this.signOut}>Log Out</button>
                        </div>
                    </div>


                    {/*full view navigation*/}
                    <ul className="navbar-group">
                        <li className="navbar-item">
                            <button className="btn btn-primary " id="logoutBtn" onClick={this.signOut}>Log Out</button>
                        </li>
                        <li className="navbar-item">
                            <Link className="navbar-link" to="/HowTo">How To</Link>
                        </li>
                        {/*<li className="navbar-item">
                            <Link className="navbar-link" to="/find">Find</Link>
                        </li>*/}
                        <li className="navbar-item">
                            <Link className="navbar-link" to="/Assets">Assets</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

};

// exports Header for external use
export default withRouter(Header);
