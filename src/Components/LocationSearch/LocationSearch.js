import React, { useState } from 'react';

import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

import Form from 'react-bootstrap/Form';


const LocationSearch = ({ handleWeatherData }) => {

    const [address, setAddress] = useState("");
    const [cityFound, setCityFound] = useState(false);
    const [searchError, setSearchError] = useState(false);

    //Updates state when the value in the search field updates
    const handleChange = foundAddress => {

        setCityFound(true);
        setAddress(foundAddress)
    };

    //Called when an autocompleted address is selected, parses the result
    //and assigns values to City and countryCode
    const handleSelect = address => {
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
                handleTermSearch(city, countryCode)

                //Return address state to default empty state, ready for new input
                setAddress("")
            })
            .catch(console.error());


    }

    //Takes a city and countryCode param, calls OWM and assigns result to state
    const handleTermSearch = (city, countryCode) => {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + ","
            + countryCode
            + "&APPID=" + process.env.REACT_APP_OWM_API_KEY)
            .catch(console.error())
            .then(res => res.json())
            .then((data) => handleWeatherData(data));

    }

    //Sets cityNotFound state to true, and clears any suggestions
    const handleGooglePlacesError = () => {

        setCityFound(false)
        //clearSuggestions();
    }

    const searchErrorElement = searchError ? <p className='error-text'>We couldn't find that city, please try another one.</p> :<p></p>

    //Sets the suggestions for Google Places to be restricted to citites
    let searchOptions = {
        types: ['(cities)']
    }

    return (
        <>
            <p>Search for city</p>
            <PlacesAutocomplete
                id='autocomplete'
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
                searchOptions={searchOptions}
                onError={handleGooglePlacesError}
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
            {searchErrorElement}
        </>
    );
}



export default LocationSearch;