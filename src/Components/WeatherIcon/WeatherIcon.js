import React from 'react';

import { faCloudRain } from '@fortawesome/free-solid-svg-icons'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function WeatherIcon(props) {

    let weatherIcon = "";
    let advice = "";

    if (props.code >= 200 && props.code < 300) {
        weatherIcon =  <FontAwesomeIcon className="weather-icon" icon={faBolt} />
        advice = "Don't take an umbrella, wear a coat. Probably best to stay inside, it's a thunderstorm yo."
    } else if (props.code >= 300 && props.code < 400) {
        weatherIcon = <FontAwesomeIcon className="weather-icon" icon={faCloudRain} />
        advice = "It's kind of raining, you should probably take an umbrella."
    } else if (props.code >= 500 && props.code < 600) {
        weatherIcon = <FontAwesomeIcon className="weather-icon" icon={faCloudRain} />
        advice = "It's pouring out, you should definitely take an umbrella. And a canoe."
    } else if (props.code >= 600 && props.code < 700) {
        weatherIcon = <FontAwesomeIcon className="weather-icon" icon={faSnowflake} />
        advice = "You could take an umbrella, but maybe snowshoes would be a better choice."
    } else if (props.code >= 700 && props.code < 800) {
        weatherIcon = "Something...atmospheric"
        advice = "Air isn't looking too good. Forget the umbrella, just stay inside and watch Netflix."
    } else if (props.code === 800) {
        weatherIcon = <FontAwesomeIcon className="weather-icon" icon={faSun} />
        advice = "Grab some sunglasses, the future is bright."
    } else if (props.code > 800 && props.code < 900) {
        weatherIcon = <FontAwesomeIcon className="weather-icon" icon={faCloud} />
        advice = "Eh, it's cloudy. You could bring an umbrella, like just in case it rains."
    } else {
        weatherIcon = "TBD"
    }

    return(
        <div>
        <div>
        {weatherIcon}
        </div>
        <div>
        {advice}
        </div>
        </div>
    )
}

export default WeatherIcon;