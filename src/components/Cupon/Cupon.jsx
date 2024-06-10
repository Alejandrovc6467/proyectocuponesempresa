import "./Cupon.css";


const handleButtonClick = (id, updateCupones) => {
    console.log(id);

    const bodyData = {
      id: id
    };
  
    fetch(`http://localhost/ProyectoCupones/Cupones.php`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Cupón actualizado:', data);
        updateCupones();
      })
    .catch(error => console.error('Error:', error));
};




export default function Cupon({ id, precio, precioConDescuento, descuento, nombre, nombreCategoria, fechaExpiracion, fechaCaducidadPromocion, activo, imagen , updateCupones}) {
    return (
        <div className="cupon">
            <img src={imagen} alt="img" />
            <div className="infoCupon">


             

               <h5><b>{nombre}</b> </h5>

                <p>{nombreCategoria}</p>

                <div className="precioCupon">
                  <h5>₡{descuento === "0.00" ? precio : precioConDescuento}</h5>
                  <h5>{descuento}%</h5>
                </div>

                <div className="precioCupon">
                  <p className="textoSecCupon"><strike>₡{precio}</strike></p>
                  <p className="textoSecCupon"><strike>Desc.</strike></p>
                </div>

                <div className="expEstadoInfo">

                  <p>Estado: <span> </span>
                      {activo === 1 ? (
                          <i className="fa-solid fa-circle-check" style={{ color: "#00b33e" }}></i>
                      ) : (
                          <i className="fa-regular fa-circle-check" style={{ color: "#c2c4c7" }}></i>
                      )}  
                  </p>

                  <p className="fechasExpCupon">Exp Cupon: {fechaExpiracion}  <span></span> {descuento === "0.00" ? "" : "Exp Promoción: "+fechaCaducidadPromocion} </p>

                </div>

             

            
              <button className="btnAcuatlizarEstado container" onClick={() => handleButtonClick(id, updateCupones)}>Actualizar Estado</button>
             
             
            </div>
           
        </div>
    );
}