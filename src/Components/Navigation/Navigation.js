import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from 'react-bootstrap/Navbar';

import { faUmbrella } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navigation = () => {

    return(

        <Navbar variant="dark">
        <Navbar.Brand><FontAwesomeIcon icon={faUmbrella} /></Navbar.Brand>
        </Navbar>

    );
}



export default Navigation;