import React from 'react';

import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';

import WeatherIcon from '../WeatherIcon/WeatherIcon';

function WeatherStatus(props) {


    return (
        <Container>
                <h2>{props.city}, {props.country}</h2>
                <h2>{props.temperature.toFixed(0)}°C</h2>
                <WeatherIcon code={props.code} />

        </Container>
    )
}

export default WeatherStatus;