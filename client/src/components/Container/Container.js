import React from 'react';
import './Container.css';

// sits around all center components on the page (i.e. jumbotron/trendotron)
const Container = props => <div className="container">{props.children}</div>;

export default Container;