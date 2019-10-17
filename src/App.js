import React, { Component } from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Navigation from './Components/Navigation/Navigation';
import WeatherStatus from './Components/WeatherStatus/WeatherStatus';

import { faSearchLocation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

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
    address: ""
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
      + "&APPID=" + process.env.REACT_APP_OWM_API_KEY)
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

  /*Called if the location search is successful. Makes a call to the OWM API
  and then populates state with the data and logs the data it to console*/
  locationSearchSuccess = (res) => {

    console.log(res);

    //Adds the two bounds of each coordinate together, and then divides by 2 to get the middle location
    let coords = {
      latitude: (res[0].geometry.bounds.oa.g + res[0].geometry.bounds.oa.h) / 2,
      longitude: (res[0].geometry.bounds.ka.g + res[0].geometry.bounds.ka.h) / 2
    }
    //Fetches weather data from OWM and populates state with the result
    fetch("http://api.openweathermap.org/data/2.5/weather?lat="
      + coords.latitude + "&lon="
      + coords.longitude
      + "&APPID=" + process.env.REACT_APP_OWM_API_KEY)
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

  //Updates state when the value in the search field updates
  handleChange = address => {
    this.setState({ address: address });
  };

  //Called when an autocompleted address is selected, parses the result
  //and assigns values to City and countryCode
  handleSelect = address => {
    geocodeByAddress(address)
      .then(result => {

        console.log(result);

        let addressComponents = result[0].address_components;

        let city;
        let countryCode;

        //Iterate through the address components and assign the city and countryCode
        //to vars for use in the handleTermSearch function
        for (let i = 0; i < addressComponents.length; i++) {
          if (addressComponents[i].types[0] === "locality") {
            city = addressComponents[i].long_name
            console.log("City: " + addressComponents[i].long_name);
          } else if (addressComponents[i].types[0] === "country") {
            countryCode = addressComponents[i].short_name
            console.log("Country Short Code: " + addressComponents[i].short_name);
          }
        }

        this.handleTermSearch(city, countryCode);

        //Return address state to default empty state, ready for new input
        this.setState({ address: "" });
      })

  }

  //Takes a city and countryCode param, calls OWM and assigns result to state
  handleTermSearch = (city, countryCode) => {
    fetch("http://api.openweathermap.org/data/2.5/weather?q="
      + city
      + ","
      + countryCode
      + "&APPID=" + process.env.REACT_APP_OWM_API_KEY)
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


    let searchOptions = {
      types: ['(cities)']
    }

    return (
      <div className='App'>
        <Navigation />
        <Container className='Content'>
          <h2>Welcome to Umbrella Advice</h2>
          <br></br>
          <p>Our journey as an organization began with a single question, a question that has driven us to develop this website as a resource and guide for you.</p>
          <br></br>
          <p>With the use of location-based services and real-time atmospheric condition reporting we are able to help you make one of life's most challening decisions.</p>
          <br></br>
          <br></br>
          <Row>
            <Col>
              <p>Find my location</p>
              <FontAwesomeIcon className="search-location-icon" icon={faSearchLocation} onClick={() => this.handleLocationRequest()}/>
            </Col>
            <Col>
              <p>Search for location</p>

              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                searchOptions={searchOptions}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <Form.Control
                      {...getInputProps({
                        placeholder: 'Enter a city...',
                        className: 'location-search-input',
                      })}
                    />
                    <div>
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        const style = suggestion.active
                          ? { backgroundColor: 'rgba(255, 255, 255, .1 ', cursor: 'pointer', textDecoration: "underline" }
                          : { backgroundColor: 'rgba(255, 255, 255, .1 ', cursor: 'pointer' };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
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
