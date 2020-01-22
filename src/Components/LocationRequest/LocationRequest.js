import React from 'react';

import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../App.css';

const LocationRequest = ({ handleWeatherData }) => {

    // Requests that the user give access to location
    const handleLocationRequest = () => {

        navigator.geolocation.getCurrentPosition(res => locationRequestSuccess(res));
    }

    //Called if the location request is successful. Makes a call to the OWM API
    //and then populates state with the data and logs the data it to console
    const locationRequestSuccess = (res) => {

        let coords = res.coords;

        //Fetches weather data from OWM and populates state with the result
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="
            + coords.latitude + "&lon="
            + coords.longitude
            + "&APPID=" + process.env.REACT_APP_OWM_API_KEY)
            .then(result => result.json())
            .then(data => handleWeatherData(data));
    }

    return (
        <>
            <p>Find my location</p>
            <FontAwesomeIcon className="search-location-icon" icon={faSearchLocation} onClick={() => handleLocationRequest()} />
        </>
    );
}

export default LocationRequest;