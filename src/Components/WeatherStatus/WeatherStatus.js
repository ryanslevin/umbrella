import React from 'react';

import '../../App.css';

import Container from 'react-bootstrap/Container';

import WeatherIcon from '../WeatherIcon/WeatherIcon';

function WeatherStatus(props) {


    return (
        <Container>
                <h2>{props.city}, {props.country}</h2>
                <p>{props.temperature.toFixed(0)}°C</p>
                <WeatherIcon code={props.code} />

        </Container>
    )
}

export default WeatherStatus;