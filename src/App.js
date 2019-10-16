import React, { Component } from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Navigation from './Components/Navigation/Navigation';
import WeatherStatus from './Components/WeatherStatus/WeatherStatus';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  state = {
    hasData: false,
    city: "",
    country: "",
    weather: "",
    temperature: "",
    humidity: "",
    searchTerm: ""
  }

  handleLocationRequest = () => {
    navigator.geolocation.getCurrentPosition(res => this.locationSuccess(res));
  }


  locationSuccess = (res) => {

    let coords = res.coords;

    console.log(coords.latitude);
    console.log(coords.longitude);

    fetch("http://api.openweathermap.org/data/2.5/weather?lat="
      + coords.latitude + "&lon="
      + coords.longitude
      + "&APPID=905d22986d9177d5a70d0c09523348d2")
      .then(res => res.json())
      .then((data) => {
        this.setState({
          hasData: true,
          city: data.name,
          country: data.sys.country,
          weather: data.weather[0].main,
          temperature: data.main.temp_max - 273.15,
          humidity: data.main.humidity
        })
        console.log(data);
      });

  }

  handleSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }


  doThatGeocode = () => {
    console.log(this.state.searchTerm)
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ 'address': this.state.searchTerm }, (result) => console.log(result));
  }

  render() {

    let weatherStatus = "";

    if (this.state.hasData) {
      weatherStatus = <WeatherStatus
        city={this.state.city}
        country={this.state.country}
        weather={this.state.weather}
        temperature={this.state.temperature} />
    }

    return (
      <>
        <Navigation />
        <Container className="App">
          <Row>
            <Col>
              <p>Find my location</p>
              <Button onClick={() => this.handleLocationRequest()}>Find my location</Button>
            </Col>
            <Col>
              <p>Search for location</p>

              <Form>
                <Form.Group>
                  <Form.Control onChange={(e) => this.handleSearchChange(e)} type="text" placeholder="Enter your city" />
                </Form.Group>
                <Button onClick={() => this.doThatGeocode()} variant="primary">
                  Submit
  </Button>
              </Form>
            </Col>
          </Row>
          {weatherStatus}
        </Container>
      </>
    );
  }
}

export default App;
