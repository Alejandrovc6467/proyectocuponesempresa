import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useCallback  } from 'react';
import Cupon from '../components/Cupon/Cupon';
import Menu from "../components/Menu/Menu";
import Footer from "../components/Footer/Footer";


import '../css/Home.css';


const Home = () => {

    const { id } = useParams();


    const [cupones, setCupones] = useState([]);

    const [empresa, setEmpresa] = useState({});


    const updateCupones = useCallback(() => {
        fetch(`http://localhost/ProyectoCupones/Cupones.php?idEmpresa=${id}`)
          .then(response => response.json())
          .then(data => setCupones(data))
          .catch(error => console.error('Error:', error));
      }, [id]);
      
    
      useEffect(() => {
        updateCupones();
      }, [updateCupones]);
    
    
      useEffect(() => {
        fetch(`http://localhost/ProyectoCupones/Empresas.php?id=${id}`)
          .then(response => response.json())
          .then(data => setEmpresa(data))
          .catch(error => console.error('Error:', error));
      }, [id]);
    
     

    return (

        <div>

            <Menu id={id} />

            <div className="home container">
                <h4>{empresa.nombre}</h4>

                <p className='titleHOme'>Lista Cupones</p>


                <div className="cuponesContainer">

                    {cupones.map(cupon => (
                            <Cupon
                                key={cupon.id}
                                id={cupon.id}
                                precio={cupon.precio}
                                categoria={cupon.categoria}
                                activo={cupon.activo}
                                imagen={cupon.imagenUrl}
                                updateCupones={updateCupones}
                            />
                    ))}
                        

                    </div>
            </div>

            <Footer />

        </div>

    );


};


export default Home;