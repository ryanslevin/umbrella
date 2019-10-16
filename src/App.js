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
    code: "",
    searchTerm: ""
  }


  // Requests that the user give access to location
  handleLocationRequest = () => {
    navigator.geolocation.getCurrentPosition(res => this.locationRequestSuccess(res));
  }



  //Called if the location request is successful. Makes a call to the OWM API
  //and then populates state with the data and logs the data it to console
  locationRequestSuccess = (res) => {

    let coords = res.coords;

    console.log(coords.latitude);
    console.log(coords.longitude);

    //Fetches weather data from OWM and populates state with the result
    fetch("http://api.openweathermap.org/data/2.5/weather?lat="
      + coords.latitude + "&lon="
      + coords.longitude
      + "&APPID="+process.env.REACT_APP_OWM_API_KEY)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          hasData: true,
          city: data.name,
          country: data.sys.country,
          weather: data.weather[0].main,
          temperature: data.main.temp_max - 273.15,
          humidity: data.main.humidity,
          code: data.weather[0].id
        });
        console.log("Data from request");
        console.log(data);
      });

  }

  //Updates state when the value in the search box changes
  handleSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  //Performs a call to the Geocode API and requests data on the city, 
  //calls the locationSearchSuccess function if successful
  handleGeocodeSearch = () => {
    console.log(this.state.searchTerm)
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ 'address': this.state.searchTerm }, (result) => this.locationSearchSuccess(result));
  }


  /*Called if the location search is successful. Makes a call to the OWM API
  and then populates state with the data and logs the data it to console*/
  locationSearchSuccess = (res) => {

    console.log(res);

    //Adds the two bounds of each coordinate together, and then divides by 2 to get the middle location
    let coords = {
      latitude: (res[0].geometry.bounds.oa.g + res[0].geometry.bounds.oa.h)/2,
      longitude: (res[0].geometry.bounds.ka.g + res[0].geometry.bounds.ka.h)/2
    }


    //Fetches weather data from OWM and populates state with the result
    fetch("http://api.openweathermap.org/data/2.5/weather?lat="
      + coords.latitude + "&lon="
      + coords.longitude
      + "&APPID="+process.env.REACT_APP_OWM_API_KEY)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          hasData: true,
          city: data.name,
          country: data.sys.country,
          weather: data.weather[0].main,
          temperature: data.main.temp_max - 273.15,
          humidity: data.main.humidity,
          code: data.weather[0].id
        });
        console.log("Data from search");
        console.log(data);
      });
  }

  render() {

    let weatherStatus = "";

    if (this.state.hasData) {
      weatherStatus = <WeatherStatus
        city={this.state.city}
        country={this.state.country}
        weather={this.state.weather}
        temperature={this.state.temperature}
        code={this.state.code} />
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

                <Form.Control onChange={(e) => this.handleSearchChange(e)} type="text" placeholder="Enter your city" />
                <Button onClick={() => this.handleGeocodeSearch()} variant="primary">
                  Submit
                </Button>
            </Col>
          </Row>
          {weatherStatus}
        </Container>
      </>
    );
  }
}

export default App;
