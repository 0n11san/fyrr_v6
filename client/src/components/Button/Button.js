import React from 'react';
import './Button.css';

// button used in the creating of audio buttons
const Button = props => {
    return (
            <button className="btn btn-primary btn-lg btn-button"
                    onClick={() => props.clickHandler(props.id, props.name)} id={props.id}>{props.name}</button>
    )
};

export default Button;