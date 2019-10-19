import React, { Component } from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Navigation from './Components/Navigation/Navigation';
import WeatherStatus from './Components/WeatherStatus/WeatherStatus';
import LocationRequest from './Components/LocationRequest/LocationRequest';
import LocationSearch from './Components/LocationSearch/LocationSearch';

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
  }

  // Parses weather data and assigngs the results to state
  handleWeatherData = (weatherData) => {

    this.setState({
      hasData: true,
      city: weatherData.name,
      country: weatherData.sys.country,
      weather: weatherData.weather[0].main,
      temperature: weatherData.main.temp_max - 273.15,
      humidity: weatherData.main.humidity,
      code: weatherData.weather[0].id
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
      <div className='App'>
        <Navigation />
        <Container className='Content'>
          <h1>Do I need an umbrella?</h1>
          <br></br>
          <p>Our journey as an organization began with a single question, a question that has driven us to develop this website as a resource and guide for you.</p>
          <br></br>
          <p>With the use of location-based services and real-time atmospheric condition reporting we are able to help you make one of life's most challening decisions.</p>
          <br></br>
          <br></br>
          <Row>
            <Col className='search-col' sm={6}>
              <LocationRequest handleWeatherData={this.handleWeatherData} />
            </Col>
            <Col className='search-col' sm={6}>
              <LocationSearch handleWeatherData={this.handleWeatherData} />
            </Col>
          </Row>
          <Row className='weather-status-container'>
            {weatherStatus}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
