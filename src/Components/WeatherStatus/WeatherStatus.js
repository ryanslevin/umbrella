import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function WeatherStatus(props) {


    return (
        <Container>
            <Row>
                <h2>{props.city}, {props.country}</h2>
            </Row>
            <Row>
                <p>It's currently {props.weather} and {props.temperature}</p>
            </Row>
        </Container>
    )
}

export default WeatherStatus;