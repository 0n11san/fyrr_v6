import React from 'react';
import './Wrapper.css';

// sits around all other page components
const Wrapper = props => <div className="wrapper">{props.children}</div>;

export default Wrapper;