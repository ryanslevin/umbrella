import React from 'react';

import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';

import WeatherIcon from '../WeatherIcon/WeatherIcon';

const WeatherStatus = ({city, country, weather, temperature, code}) => {

    return (
        <Container>
                <h2>{city}, {country}</h2>
                <h2>{temperature.toFixed(0)}°C</h2>
                <WeatherIcon code={code} />
        </Container>
    );
}

export default WeatherStatus;