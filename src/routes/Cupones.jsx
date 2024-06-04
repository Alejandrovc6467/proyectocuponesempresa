import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useCallback  } from 'react';
import Menu from "../components/Menu/Menu";
import Footer from "../components/Footer/Footer";
import '../css/Cupones.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';





const Cupones = () => {
    const { id } = useParams();
    const [cupones, setCupones] = useState([]);

    
    const updateCupones = useCallback(() => {
        fetch(`http://localhost/ProyectoCupones/Cupones.php?idEmpresa=${id}`)
          .then(response => response.json())
          .then(data => setCupones(data))
          .catch(error => console.error('Error:', error));
    }, [id]);
      

    useEffect(() => {
      updateCupones();
    }, [updateCupones]);
    
    


    const [modalAgregarShow, setmodalAgregarShow] = useState(false);

    //agregar cupon
    const handleSubmitAgregarCupon = (nuevoCupon) => {
      console.log(nuevoCupon);
      console.log("si llega");
  
      const dataCupon =
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
        body: JSON.stringify(dataCupon)
      })
        .then(response => response.json())
        .then(data => {
          console.log('cupón added:', data);
          updateCupones();
        })
      .catch(error => console.error('Error:', error));
  
  
      setmodalAgregarShow(false);
    };
   



    //actualizar Cupon
    const handleSubmitActualizarCupon = (cuponActualizado) => {
      console.log(cuponActualizado);


      const dataCupoActualizado = {
        action: "update",
        id: cuponActualizado.id,
        precio: parseFloat( cuponActualizado.precio),
        imagenURL: cuponActualizado.imagenURL,
        categoria: cuponActualizado.categoria,
        fechaCreacion: cuponActualizado.fechaCreacion,
        fechaExpiracion: cuponActualizado.fechaExpiracion,
        activo: parseInt(cuponActualizado.activo) 
      };
    
      
    
      fetch(`http://localhost/ProyectoCupones/Cupones.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataCupoActualizado)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Empresa updated:', data);
          updateCupones();
        })
        .catch(error => console.error('Error:', error));
    
      setModalActualizarShow(false);
    };

    const [modalActualizarShow, setModalActualizarShow] = useState(false);
    const [cuponSeleccionado, setCuponSeleccionado] = useState({});


    const handleUpdate = (id) => {
      const cupon = cupones.find(item => item.id === id);
      setCuponSeleccionado(cupon);
      setModalActualizarShow(true);
    };
      


  //promociones

  
  
     

    return (

        <div>

          <Menu id={id} />

            <div className="container">

              <p>Soy cupones  {id}</p>

              <Button className='btnAgregar' variant="primary" onClick={() => setmodalAgregarShow(true)}>Agregar Cupón</Button><br /> <br />

              <table className="table table-striped table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>ID</th>
                    <th>Img url</th>
                    <th>Precio</th>
                    <th>Categoria</th>
                    <th>Activo</th>
                    <th>Fecha Habilitado</th>
                    <th>Fecha Caducado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                    {cupones.map(item => (
                      <tr key={item.id}>

                        <td>{item.id}</td>
                        <td className="imgUrl-column">{item.imagenUrl}</td>
                        <td>{item.precio}</td>
                        <td>{item.categoria}</td>
                        <td>{item.activo}</td>
                        <td>{item.fechaHabilitado}</td>
                        <td>{item.fechaCaducado}</td>

                        <td>
                          
                          <div className="containerButons">

                            <button type="button" className="btn btn-warning btn-sm btnAcciones" onClick={() => handleUpdate(item.id)}> Actualizar </button>

                            <span> </span>

                            <button type="button" className="btn btn-danger btn-sm btnAcciones" > Promocion </button>

                          </div>
                        
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

            </div>

          <Footer/>

          <MyVerticallyCenteredModal show={modalAgregarShow} onHide={() => setmodalAgregarShow(false)} onSubmit={handleSubmitAgregarCupon} />

          <MyVerticallyCenteredModalUpdate show={modalActualizarShow} onHide={() => setModalActualizarShow(false)} onSubmit={handleSubmitActualizarCupon} cupon={cuponSeleccionado} />

       

        </div>

    );


};


export default Cupones;



//Modal AgregarCupon
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
            <label htmlFor="precio" className="form-label">Precio</label>
            <input type="text" className="form-control" id="precio" value={precio} onChange={handlePrecioChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="imagenURL" className="form-label">URL Imagen</label>
            <textarea className="form-control" id="imagenURL" rows="3" value={imagenURL} onChange={(e) => setImagenURL(e.target.value)}></textarea>
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


 
//Modal ActualizarCupon
function MyVerticallyCenteredModalUpdate(props) {
  const { onSubmit, onHide, cupon, ...restProps } = props;

  console.log(cupon);

  console.log(cupon);
  const [precio, setPrecio] = useState('');
  const [imagenURL, setImagenURL] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  const [activo, setActivo] = useState('');

  useEffect(() => {
    setPrecio(cupon.precio);
    setImagenURL(cupon.imagenUrl);
    setCategoria(cupon.categoria);
    setFechaCreacion(cupon.fechaHabilitado);
    setFechaExpiracion(cupon.fechaCaducado);
    setActivo(cupon.activo);
  }, [cupon]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: cupon.id,
      precio,
      imagenURL,
      categoria,
      fechaCreacion,
      fechaExpiracion,
      activo
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
          Actualizar Cupon
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bodyModalAgregarEmpresa'>
       
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Precio</label>
            <input type="text" className="form-control" id="nombre" value={precio} onChange={handlePrecioChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="imagenURL" className="form-label">URL Imagen</label>
            <textarea className="form-control" id="imagenURL" rows="3" value={imagenURL} onChange={(e) => setImagenURL(e.target.value)}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Categoria</label>
            <input type="tel" className="form-control" id="telefono" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaCreacion" className="form-label">Fecha Creación</label>
            <input type="date" className="form-control" id="fechaCreacion" value={fechaCreacion} onChange={(e) => setFechaCreacion(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaCreacion" className="form-label">Fecha expiración</label>
            <input type="date" className="form-control" id="fechaCreacion" value={fechaExpiracion} onChange={(e) => setFechaExpiracion(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="activo" className="form-label">Activo</label>
            <select className="form-control" id="activo" value={activo} onChange={(e) => setActivo(e.target.value)}>
              <option value="0">Inactivo</option>
              <option value="1">Activo</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>



      </Modal.Body>
    </Modal>
  );
}

//modal promociones

