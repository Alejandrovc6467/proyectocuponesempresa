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


export default function Cupon({ id, precio, categoria, activo, imagen , updateCupones }) {
    return (
        <div className="cupon">
            <img src={imagen} alt="img" />
            <div className="infoCupon">

                <p>precio: {precio}</p>
                <p>categoria: {categoria}</p>
                <p>activo: {activo ? 'Sí' : 'No'}</p>
                <button className="btn btn-primary btn-sm" onClick={() => handleButtonClick(id, updateCupones)}>Actualizar Estado</button>

            </div>
           
        </div>
    );
}