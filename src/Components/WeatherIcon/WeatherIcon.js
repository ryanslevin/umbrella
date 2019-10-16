import React from 'react';

import { faCloudRain } from '@fortawesome/free-solid-svg-icons'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function WeatherIcon(props) {

    let weatherIcon = "";

    if (props.code >= 200 && props.code < 300) {
        weatherIcon =  <FontAwesomeIcon icon={faBolt} />
    } else if (props.code >= 300 && props.code < 400) {
        weatherIcon = <FontAwesomeIcon icon={faCloudRain} />
    } else if (props.code >= 500 && props.code < 600) {
        weatherIcon = <FontAwesomeIcon icon={faCloudRain} />
    } else if (props.code >= 600 && props.code < 700) {
        weatherIcon = <FontAwesomeIcon icon={faSnowflake} />
    } else if (props.code >= 700 && props.code < 800) {
        weatherIcon = "Something...atmospheric"
    } else if (props.code === 800) {
        weatherIcon = <FontAwesomeIcon icon={faSun} />
    } else if (props.code > 800 && props.code < 900) {
        weatherIcon = <FontAwesomeIcon icon={faCloud} />
    } else {
        weatherIcon = "TBD"
    }

    return(
        <div>
        {weatherIcon}
        </div>
    )
}

export default WeatherIcon;