import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import InputMask from 'react-input-mask';

import Menu from "../components/Menu/Menu";
import Footer from "../components/Footer/Footer";


import Modal from 'react-bootstrap/Modal';

import '../css/Perfil.css';






const Perfil = () => {

    const { id } = useParams();
    const [data, setData] = useState({});
   

    useEffect(() => {
        loadData(id);
      }, [id]);
    
    const loadData = (id) => {
        fetch(`http://localhost/ProyectoCupones/Empresas.php?id=${id}`)
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error:', error));
    };


    
    //modal actualizar
    function MyVerticallyCenteredModalUpdate(props) {
        const { onSubmit, onHide, empresa, ...restProps } = props;
    
        const [nombre, setNombre] = useState(empresa.nombre);
        const [descripcion, setDescripcion] = useState(empresa.descripcion);
        const [telefono, setTelefono] = useState(empresa.telefono);
        const [correo, setCorreo] = useState(empresa.correo);
        const [contrasenia, setContrasenia] = useState(empresa.contrasenia);
        const [ubicacion, setUbicacion] = useState(empresa.ubicacion);
        const [cedula, setCedula] = useState(empresa.cedula);
        const [fechaCreacion, setfechaCreacion] = useState(empresa.fechaCreacion);
    
        const handleSubmit = (e) => {
        e.preventDefault();


        if (nombre.length > 10) {
            setErrorNombre('El nombre no puede tener más de 10 caracteres');
            return; // Salir de la función si hay un error
          }
        
          // Validar contraseña
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (!passwordRegex.test(contrasenia)) {
            setErrorContrasenia('La contraseña no cumple con los requerimientos');
            return; // Salir de la función si hay un error
          }
        
          // Validar cédula jurídica
          const cedulaRegex = /^\d{2}-\d{3}-\d{6}$/;
          if (!cedulaRegex.test(cedula)) {
            setErrorCedula('La cédula jurídica debe tener el formato 00-000-000000');
            return;
          }
        
          // Validar teléfono
          const telefonoRegex = /^\d{4}-\d{4}$/;
          if (!telefonoRegex.test(telefono)) {
            setErrorTelefono('El teléfono debe tener el formato 0000-0000');
            return;
          }




        onSubmit({
            id: empresa.id,
            nombre,
            descripcion,
            telefono,
            correo,
            contrasenia,
            ubicacion,
            cedula,
            fechaCreacion
        });
        onHide();
        };



        const [errorTelefono, setErrorTelefono] = useState('');
        const [errorCedula, setErrorCedula] = useState('');
        const [errorNombre, setErrorNombre] = useState('');
        const [errorContrasenia, setErrorContrasenia] = useState('');


    
        return (
        <Modal className='modalAgregaEmpresa' {...restProps} onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Actualizar Empresa
            </Modal.Title>
            </Modal.Header>
            <Modal.Body className='bodyModalAgregarEmpresa'>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <textarea className="form-control" id="descripcion" rows="3" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <InputMask mask="9999-9999" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="form-control" id="telefono" required/>
                {errorTelefono && <div className="text-danger">{errorTelefono}</div>}
               
                </div>
                <div className="mb-3">
                <label htmlFor="correo" className="form-label">Correo</label>
                <input type="email" className="form-control" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                </div>
                <div className="mb-3">
                <input type="password" className="form-control" id="contrasenia" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} required />
                {errorContrasenia && <div className="text-danger">{errorContrasenia}</div>}
                </div>
                <div className="mb-3">
                <label htmlFor="ubicacion" className="form-label">Ubicación</label>
                <input type="text" className="form-control" id="ubicacion" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
                </div>
                <div className="mb-3">
                <label htmlFor="cedula" className="form-label">Cedula Juridica</label>
                <InputMask mask="99-999-999999" value={cedula} onChange={(e) => setCedula(e.target.value)} className="form-control" id="cedula" required/>
                {errorCedula && <div className="text-danger">{errorCedula}</div>}
                </div>
                <div className="mb-3">
                <label htmlFor="fechaCreacion" className="form-label">Fecha Creacion</label>
                <input type="date" className="form-control" id="fechaCreacion" value={fechaCreacion} onChange={(e) => setfechaCreacion(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
    
    
    
            </Modal.Body>
        </Modal>
        );
    }


    const [modalActualizarShow, setModalActualizarShow] = useState(false);
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState({});

    const handleUpdate = (data) => {
        const empresa = data;
        setEmpresaSeleccionada(empresa);
        setModalActualizarShow(true);
        
    };


    
    const handleSubmitActualizarEmpresa = (empresaActualizada) => {
        console.log(empresaActualizada);
    
        const dataBody = {
        action: "update",
        id: empresaActualizada.id,
        nombre: empresaActualizada.nombre,
        descripcion: empresaActualizada.descripcion,
        telefono: empresaActualizada.telefono,
        correo: empresaActualizada.correo,
        contrasenia: empresaActualizada.contrasenia,
        ubicacion: empresaActualizada.ubicacion,
        cedula: empresaActualizada.cedula,
        fechaCreacion: empresaActualizada.fechaCreacion
        };
    
        
    
        fetch(`http://localhost/ProyectoCupones/Empresas.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Empresa updated:', data);
            loadData(dataBody.id);
        })
        .catch(error => console.error('Error:', error));
    
        setModalActualizarShow(false);
    };




    return (

        <div>

            <Menu id={id} />

            <div className="container">
              <br /><br />

                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Contraseña</th>
                        <th>Ubicación</th>
                        <th>Cedula</th>
                        <th>Fecha creacion</th>
                        <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr>
                            <td>{data.id}</td>
                            <td>{data.nombre}</td>
                            <td>{data.descripcion}</td>
                            <td>{data.telefono}</td>
                            <td>{data.correo}</td>
                            <td>{data.contrasenia}</td>
                            <td>{data.ubicacion}</td>
                            <td>{data.cedula}</td>
                            <td>{data.fechaCreacion}</td>
                            <td>
                            
                            <div className="containerButons">

                                <button
                                type="button"
                                className="btn btn-warning btn-sm btnAcciones"
                                onClick={() => handleUpdate(data)}
                                >
                                Actualizar
                                </button>
                                

                            </div>
                            
                            </td>
                        </tr>
                        
                    </tbody>
                </table>

            </div>

            <Footer/>




            <MyVerticallyCenteredModalUpdate
                show={modalActualizarShow}
                onHide={() => setModalActualizarShow(false)}
                onSubmit={handleSubmitActualizarEmpresa}
                empresa={empresaSeleccionada}
            />



        </div>

    );



};



export default Perfil;