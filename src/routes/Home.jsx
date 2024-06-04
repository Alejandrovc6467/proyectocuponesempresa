import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useCallback  } from 'react';
import Cupon from '../components/Cupon/Cupon';
import Menu from "../components/Menu/Menu";
import Footer from "../components/Footer/Footer";


import Modal from 'react-bootstrap/Modal';
import '../css/Home.css';


const Home = () => {

    const { id } = useParams();


    const [cupones, setCupones] = useState([]);

    const [empresa, setEmpresa] = useState({});
    
    const [modalAgregarShow, setmodalAgregarShow] = useState(false);


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
    

      //agregar Cupon
      const handleSubmitAgregarCupon = (nuevoCupon) => {
        console.log(nuevoCupon);
    
        const data =
        {
          action:"register",
          imagenUrl:nuevoCupon.imagenURL,
          precio: parseFloat(nuevoCupon.precio),
          categoria: nuevoCupon.categoria,
          idEmpresa:id,
          fechaHabilitado: nuevoCupon.fechaCreacion,
          fechaCaducado:nuevoCupon.fechaExpiracion
    
        };
      
    
    
         
        fetch(`http://localhost/ProyectoCupones/Cupones.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            console.log('cupón added:', data);
           
            updateCupones();
          })
        .catch(error => console.error('Error:', error));
    
    
        setmodalAgregarShow(false);
      };




      
     

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
                                fechaExpiracion={cupon.fechaCaducado}
                                imagen={cupon.imagenUrl}
                                updateCupones={updateCupones}
                                addPromocion={updateCupones}
                                updateInfo={updateCupones}
                            />
                    ))}
                        

                    </div>
            </div>

            <Footer />
            <MyVerticallyCenteredModal
            show={modalAgregarShow}
            onHide={() => setmodalAgregarShow(false)}
            onSubmit={handleSubmitAgregarCupon}
            />

        </div>

    );


};


export default Home;


// Componente MyVerticallyCenteredModal
function MyVerticallyCenteredModal(props) {
  const { onSubmit, onHide, ...restProps } = props;

  /*datos de formulario agregarEmpresa */
  const [imagenURL, setImagenURL] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fechaCreacion, setfechaCreacion] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      imagenURL,
      precio,
      categoria,
      fechaCreacion,
      fechaExpiracion
    });
    onHide();
  };
  //validaciones
  const handlePrecioChange = (e) => {
    const value = e.target.value;
    // Validar que solo se puedan introducir números y un punto decimal
    if (/^\d*\.?\d*$/.test(value)) {
      setPrecio(value);
    }
  };

  return (
    <Modal className='modalAgregaEmpresa' {...restProps} onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Agregar Cupon
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bodyModalAgregarEmpresa'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Precio</label>
            <input type="text" className="form-control" id="nombre" value={precio} onChange={handlePrecioChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">URL Imagen</label>
            <textarea className="form-control" id="descripcion" rows="3" value={imagenURL} onChange={(e) => setImagenURL(e.target.value)}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Categoria</label>
            <input type="tel" className="form-control" id="telefono" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaCreacion" className="form-label">Fecha Creación</label>
            <input type="date" className="form-control" id="fechaCreacion" value={fechaCreacion} onChange={(e) => setfechaCreacion(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaCreacion" className="form-label">Fecha expiración</label>
            <input type="date" className="form-control" id="fechaCreacion" value={fechaExpiracion} onChange={(e) => setFechaExpiracion(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}