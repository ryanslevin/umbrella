import React, { Component } from 'react';

import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

import Form from 'react-bootstrap/Form';


class LocationSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: "",
            cityNotFound: ""
        }
    }

    //Updates state when the value in the search field updates
    handleChange = address => {

        this.setState({
            cityNotFound: false,
            address: address
        })
    };

    //Called when an autocompleted address is selected, parses the result
    //and assigns values to City and countryCode
    handleSelect = address => {
        geocodeByAddress(address)
            .then(result => {

                let addressComponents = result[0].address_components;
                let city;
                let countryCode;

                //Iterate through the address components and assign the city and countryCode
                //to vars for use in the handleTermSearch function
                for (let i = 0; i < addressComponents.length; i++) {
                    if (addressComponents[i].types[0] === "locality") {
                        city = addressComponents[i].long_name
                    } else if (addressComponents[i].types[0] === "country") {
                        countryCode = addressComponents[i].short_name
                    }
                }

                //Pass the city name and country code so that weatyher data can be pulled
                this.handleTermSearch(city, countryCode)

                //Return address state to default empty state, ready for new input
                this.setState({ address: "" });
            })
            .catch(console.error());


    }

    //Takes a city and countryCode param, calls OWM and assigns result to state
    handleTermSearch = (city, countryCode) => {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + ","
            + countryCode
            + "&APPID=" + process.env.REACT_APP_OWM_API_KEY)
            .catch(console.error())
            .then(res => res.json())
            .then((data) => this.props.handleWeatherData(data));

    }

    //Sets cityNotFound state to true, and clears any suggestions
    handleGooglePlacesError = (status, clearSuggestions) => {

        this.setState({
            cityNotFound: true
        })

        clearSuggestions();
    }

    render() {

        let searchError = "";


        //Check to see if the cityNotFound state is true, if true sets the search error text
        if (this.state.cityNotFound === true) {
            searchError = <p className='error-text'>We couldn't find that city, please try another one.</p>
        }

        //Sets the suggestions for Google Places to be restricted to citites
        let searchOptions = {
            types: ['(cities)']
        }


        return (
            <>
                <p>Search for city</p>
                <PlacesAutocomplete
                    id='autocomplete'
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                    searchOptions={searchOptions}
                    onError={this.handleGooglePlacesError}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps }) => (
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
                {searchError}


            </>
        )

    }

}

export default LocationSearch;