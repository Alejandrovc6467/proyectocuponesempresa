import { useParams } from 'react-router-dom';
//import React, { useState, useEffect, useCallback  } from 'react';

import React from 'react';

import Menu from "../components/Menu/Menu";
import Footer from "../components/Footer/Footer";




const Cupones = () => {

    const { id } = useParams();

    return (

        <div>

            <Menu id={id} />

            <div className="div">
                <p>Soy cupones  {id}</p>
            </div>

            <Footer/>

        </div>

    );


};


export default Cupones;