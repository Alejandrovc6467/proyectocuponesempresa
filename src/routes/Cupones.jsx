import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useCallback  } from 'react';
import Menu from "../components/Menu/Menu";
import Footer from "../components/Footer/Footer";
import '../css/Cupones.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//sweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);





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
        nombre: nuevoCupon.nombre,
        imagenUrl:nuevoCupon.imagenURL,
        precio: parseFloat(nuevoCupon.precio),
        idCategoria: nuevoCupon.categoria,
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
        nombre: cuponActualizado.nombre,
        imagenURL: cuponActualizado.imagenURL,
        precio: parseFloat( cuponActualizado.precio),
        idCategoria: cuponActualizado.categoria,
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
      


  // agregar promociones

  
  const [modalAgregarPromocionShow, setModalAgregarPromocionShow] = useState(false);
  const [cuponSeleccionadoId, setCuponSeleccionadoId] = useState(null);

  const handleAgregarPromocion = (cuponId) => {


    fetch(`http://localhost/ProyectoCupones/Promociones.php?idCupon=${cuponId}`)
      .then(response => response.json())
      .then(data => {
      
        if(data.length > 0){
          console.log("con datos");

          MySwal.fire({
            icon: 'error',
            title: 'Espera',
            text: 'Ya hay una promocion registrada para este cupon.',
            confirmButtonColor: '#088cff'
          });

        }else{
          setCuponSeleccionadoId(cuponId);
          setModalAgregarPromocionShow(true);
        }

      })
    .catch(error => console.error('Error:', error));

   
  };

  
  const handleSubmitAgregarPromocion = (nuevaPromocion) => {

    
    
    const dataPromocion = {
      action: "register",
      descuento: parseFloat(nuevaPromocion.descuento),
      fechaHabilitado: nuevaPromocion.fechaHabilitado,
      fechaCaducado: nuevaPromocion.fechaCaducado,
      idCupon: nuevaPromocion.idCupon
    };


    //buscar el cupon por el id
    const cupon = cupones.find(item => item.id === nuevaPromocion.idCupon);

    console.log(cupon);

    console.log(dataPromocion);


     // Convertir fechas a objetos Date para facilitar la comparación
     const fechaHabilitadoPromocion = new Date(nuevaPromocion.fechaHabilitado);
     const fechaCaducadoPromocion = new Date(nuevaPromocion.fechaCaducado);
     const fechaHabilitadoCupon = new Date(cupon.fechaHabilitado);
     const fechaCaducadoCupon = new Date(cupon.fechaCaducado);
 
     // Validar que las fechas de la promoción estén dentro del rango del cupon
     const isFechaHabilitadoValida = fechaHabilitadoPromocion >= fechaHabilitadoCupon;
     const isFechaCaducadoValida = fechaCaducadoPromocion <= fechaCaducadoCupon;
 
     if (!isFechaHabilitadoValida || !isFechaCaducadoValida) {
         console.log('Las fechas de la promoción no están dentro del rango del cupon');
         MySwal.fire({
          icon: 'error',
          title: 'Fechas inválidas',
          text: 'Las fechas de la promoción deben estar dentro del rango del cupon.',
          confirmButtonColor: '#088cff'
      });
         
     }else{
     
      console.log("Las fechas si estan dentro de los rangos del cupon");
      
      fetch(`http://localhost/ProyectoCupones/Promociones.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataPromocion)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Promoción added:', data);

         console.log("bien");

          // Actualizar la lista de promociones si es necesario
        })
        .catch(error => console.error('Error:', error));
        
    
      setModalAgregarPromocionShow(false);

        
     }
  
    

  };
  

  // actualizar Promocion

  
  const [modalActualizarPromocionShow, setModalActualizarPromocionShow] = useState(false);

  const handleActualizarPromocion = (cuponId) => {



    fetch(`http://localhost/ProyectoCupones/Promociones.php?idCupon=${cuponId}`)
    .then(response => response.json())
    .then(data => {
    
      if(data.length > 0){
        
        setCuponSeleccionadoId(cuponId);
        setModalActualizarPromocionShow(true);

      }else{

        MySwal.fire({
          icon: 'error',
          title: 'Espera',
          text: 'Agrega una promocion al cupon antes.',
          confirmButtonColor: '#088cff'
        });
      
      }

    })
  .catch(error => console.error('Error:', error));

   
  };

  const handleSubmitActualizarPromocion = (nuevaPromocion) => {

    console.log(nuevaPromocion);
    
    const dataPromocion = {
      action: "update",
      id:nuevaPromocion.id,
      descuento: parseFloat(nuevaPromocion.descuento),
      fechaCaducado: nuevaPromocion.fechaCaducado,
      fechaHabilitado: nuevaPromocion.fechaHabilitado
    };

    console.log(dataPromocion);

    //buscar el cupon por el id
    const cupon = cupones.find(item => item.id === nuevaPromocion.idCupon);

    


     // Convertir fechas a objetos Date para facilitar la comparación
     const fechaHabilitadoPromocion = new Date(nuevaPromocion.fechaHabilitado);
     const fechaCaducadoPromocion = new Date(nuevaPromocion.fechaCaducado);
     const fechaHabilitadoCupon = new Date(cupon.fechaHabilitado);
     const fechaCaducadoCupon = new Date(cupon.fechaCaducado);
 
     // Validar que las fechas de la promoción estén dentro del rango del cupon
     const isFechaHabilitadoValida = fechaHabilitadoPromocion >= fechaHabilitadoCupon;
     const isFechaCaducadoValida = fechaCaducadoPromocion <= fechaCaducadoCupon;
 
     if (!isFechaHabilitadoValida || !isFechaCaducadoValida) {
         console.log('Las fechas de la promoción no están dentro del rango del cupon');
         MySwal.fire({
          icon: 'error',
          title: 'Fechas inválidas',
          text: 'Las fechas de la promoción deben estar dentro del rango del cupon.',
          confirmButtonColor: '#088cff'
      });
         
     }else{
     
      console.log("Las fechas si estan dentro de los rangos del cupon");
        
      fetch(`http://localhost/ProyectoCupones/Promociones.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataPromocion)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Promoción update:', data);

         

          // Actualizar la lista de promociones si es necesario
        })
        .catch(error => console.error('Error:', error));
        
    
      setModalAgregarPromocionShow(false);

        
     }
  
    

  };
  


  
     
    //retunr componente principal
    return (

        <div>

          <Menu id={id} />

            <div className="container">

             

              <Button className='btnAgregar' variant="primary" onClick={() => setmodalAgregarShow(true)}>Agregar Cupón</Button><br /> <br />

              <table className="table table-striped table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Categoria</th>
                    <th>Estado</th>
                    <th>Fecha Habilitado</th>
                    <th>Fecha Caducado</th>
                    <th>Acciones</th>
                    <th>Promociones</th>
                    
                  </tr>
                </thead>
                <tbody>
                    {cupones.map(item => (
                      <tr key={item.id}>

                        <td>{item.id}</td>
                        <td className="imgUrl-column">  <img src={item.imagenUrl} alt="Imagen descriptiva" className='imgOnTable' /> </td>
                        <td>{item.nombre}</td>
                        <td>{item.precio}</td>
                        <td>{item.nombreCategoria}</td>
                        <td>
                          {item.activo === 1 ? (
                            <i className="fa-solid fa-circle-check" style={{ color: "#00b33e" }}></i>
                          ) : (
                            <i className="fa-regular fa-circle-check" style={{ color: "#c2c4c7" }}></i>
                          )}
                        </td>
                        <td>{item.fechaHabilitado}</td>
                        <td>{item.fechaCaducado}</td>

                        <td>
                          
                          <div className="containerButons">

                            <button type="button" className="btn btn-warning btn-sm btnAcciones" onClick={() => handleUpdate(item.id)}> Actualizar </button>

                          </div>
                        
                        </td>

                        <td>
                          <button type="button" className="btn btn-primary btn-sm btnAcciones" onClick={() => handleAgregarPromocion(item.id)}> <i class="fa-solid fa-circle-plus"></i> </button>
                          <span> </span>
                          <button type="button" className="btn btn-success btn-sm btnAcciones" onClick={() => handleActualizarPromocion(item.id)} >   <i class="fa-solid fa-pen-to-square" style={{color: "#028af2;"}}></i></button>  
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>

            </div>

          <Footer/>

          <MyVerticallyCenteredModal show={modalAgregarShow} onHide={() => setmodalAgregarShow(false)} onSubmit={handleSubmitAgregarCupon} />

          <MyVerticallyCenteredModalUpdate show={modalActualizarShow} onHide={() => setModalActualizarShow(false)} onSubmit={handleSubmitActualizarCupon} cupon={cuponSeleccionado} />

          <ModalAgregarPromocion show={modalAgregarPromocionShow} onHide={() => setModalAgregarPromocionShow(false)} onSubmit={handleSubmitAgregarPromocion} cuponId={cuponSeleccionadoId} />

          <ModalActualizarPromocion show={modalActualizarPromocionShow} onHide={() => setModalActualizarPromocionShow(false)} onSubmit={handleSubmitActualizarPromocion} cuponId={cuponSeleccionadoId} />

        </div>

    );


};


export default Cupones;



//Modal AgregarCupon
function MyVerticallyCenteredModal(props) {
  const { onSubmit, onHide, ...restProps } = props;


  const [categorias, setCategorias] = useState([]);// este es para cargar las categorias al select
  useEffect(() => {
    // Función para obtener las categorías
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost/ProyectoCupones/Categorias.php'); // Reemplaza '/api/categorias' con la URL correcta
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  /*datos de formulario agregarEmpresa */
  const [imagenURL, setImagenURL] = useState('');
  const [precio, setPrecio] = useState('');
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState(0);
  const [fechaCreacion, setfechaCreacion] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(categoria);
    onSubmit({
      imagenURL,
      nombre,
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
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="nombre" value={nombre}  onChange={(e) => setNombre(e.target.value)}/>
          </div>

          <div className="mb-3">
            <label htmlFor="precio" className="form-label">Precio</label>
            <input type="text" className="form-control" id="precio" value={precio} onChange={handlePrecioChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="imagenURL" className="form-label">URL Imagen</label>
            <textarea className="form-control" id="imagenURL" rows="3" value={imagenURL} onChange={(e) => setImagenURL(e.target.value)}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="fechaCreacion" className="form-label">Fecha Creación</label>
            <input type="date" className="form-control" id="fechaCreacion" value={fechaCreacion} onChange={(e) => setfechaCreacion(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaCreacion" className="form-label">Fecha expiración</label>
            <input type="date" className="form-control" id="fechaCreacion" value={fechaExpiracion} onChange={(e) => setFechaExpiracion(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="activo" className="form-label">Categoria</label>
            <select className="form-control" id="activo" value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
            </select>
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


  const [categorias, setCategorias] = useState([]);// este es para cargar las categorias al select
  useEffect(() => {
  // Función para obtener las categorías
  const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost/ProyectoCupones/Categorias.php'); // Reemplaza '/api/categorias' con la URL correcta
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
  };

    fetchCategorias();
  }, []);

  console.log(cupon);

  const [precio, setPrecio] = useState('');
  const [nombre, setNombre] = useState('');
  const [imagenURL, setImagenURL] = useState('');
  const [categoria, setCategoria] = useState(0);
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  const [activo, setActivo] = useState('');

  useEffect(() => {
    setPrecio(cupon.precio);
    setNombre(cupon.nombre);
    setImagenURL(cupon.imagenUrl);
    setCategoria(cupon.idCategoria);
    setFechaCreacion(cupon.fechaHabilitado);
    setFechaExpiracion(cupon.fechaCaducado);
    setActivo(cupon.activo);
  }, [cupon]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: cupon.id,
      precio,
      nombre,
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
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="nombre" value={nombre}onChange={(e) => setNombre(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="imagenURL" className="form-label">URL Imagen</label>
            <textarea className="form-control" id="imagenURL" rows="3" value={imagenURL} onChange={(e) => setImagenURL(e.target.value)}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="activo" className="form-label">Categoria</label>
            <select className="form-control" id="activo" value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
            
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id} selected={cat.id === categoria}>
                {cat.nombre}
              </option>
            ))}
            </select>
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
            <label htmlFor="activo" className="form-label">Estado</label>
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



//modal agregar promociones
function ModalAgregarPromocion(props) {
  const { onSubmit, onHide, cuponId, ...restProps } = props;

  const [descuento, setDescuento] = useState('');
  const [fechaHabilitado, setFechaHabilitado] = useState('');
  const [fechaCaducado, setFechaCaducado] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      descuento,
      fechaHabilitado,
      fechaCaducado,
      idCupon: cuponId
    });
    onHide();
  };

  return (
    <Modal {...restProps} onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Agregar Promoción
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="descuento" className="form-label">Descuento</label>
            <input
              type="number"
              className="form-control"
              id="descuento"
              value={descuento}
              min="1"
              max="100"
              step="1"
              onChange={(e) => setDescuento(e.target.value)}
            />
           
          </div>
          <div className="mb-3">
            <label htmlFor="fechaHabilitado" className="form-label">Fecha Habilitado</label>
            <input type="date" className="form-control" id="fechaHabilitado" value={fechaHabilitado} onChange={(e) => setFechaHabilitado(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaCaducado" className="form-label">Fecha Caducado</label>
            <input type="date" className="form-control" id="fechaCaducado" value={fechaCaducado} onChange={(e) => setFechaCaducado(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}



//modal actualizar promocion
function ModalActualizarPromocion(props) {
  const { onSubmit, onHide, cuponId, ...restProps } = props;

  console.log(cuponId);

  const [descuento, setDescuento] = useState('');
  const [fechaHabilitado, setFechaHabilitado] = useState('');
  const [fechaCaducado, setFechaCaducado] = useState('');
  const [activo, setActivo] = useState('');


 //setDescuento("hola"); // esto no lo puedo hacer

//aqui tengo que llamar al fetch y traerme los datos de la promocion para setear los inputs
//const promocion = resultadoFetch;

  const [promocion, setPromocion] = useState([]);


    const obtenerPromocion = useCallback(() => {
        fetch(`http://localhost/ProyectoCupones/Promociones.php?idCupon=${cuponId}`)
          .then(response => response.json())
          .then(data => setPromocion(data))
          .catch(error => console.error('Error:', error));
    }, [cuponId]);

    console.log(promocion);
      

    useEffect(() => {
      obtenerPromocion();
    }, [obtenerPromocion]);
    
    

  
    useEffect(() => {
      setDescuento(promocion[0]?.descuento);
      setFechaHabilitado(promocion[0]?.fechaHabilitado);
      setFechaCaducado(promocion[0]?.fechaCaducado);
      setActivo(promocion[0]?.activo);
    }, [promocion]);


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: promocion[0]?.id,
      descuento,
      fechaHabilitado,
      fechaCaducado,
      idCupon: cuponId, 
      activo
    });
    onHide();
  };

  return (
    <Modal {...restProps} onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Actualizar Promoción
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="descuento" className="form-label">Descuento</label>
            <input type="text" className="form-control" id="descuento" value={descuento} onChange={(e) => setDescuento(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaHabilitado" className="form-label">Fecha Habilitado</label>
            <input type="date" className="form-control" id="fechaHabilitado" value={fechaHabilitado} onChange={(e) => setFechaHabilitado(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaCaducado" className="form-label">Fecha Caducado</label>
            <input type="date" className="form-control" id="fechaCaducado" value={fechaCaducado} onChange={(e) => setFechaCaducado(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="activo" className="form-label">Estado</label>
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