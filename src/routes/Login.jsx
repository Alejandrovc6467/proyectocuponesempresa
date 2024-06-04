import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';


const Login = () =>{


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    
    const navigate = useNavigate();
  
  
    const handleSubmit = (e) => {
      e.preventDefault();

      const data={
        action:"login",
        correo: email,
        contrasenia: password
      }
      // Aquí puedes validar las credenciales
      fetch(`http://localhost/ProyectoCupones/Empresas.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => validarLogin(data.existe, email))
      .catch(error => console.error('Error:', error));

    };

    
    const validarLogin = (hecho, email) => {
      if (hecho) {
   
        fetch(`http://localhost/ProyectoCupones/Empresas.php?email=${email}`)
          .then(response => response.json())
          .then(data =>validarInicioPorPrimeraVez(data))
          .catch(error => console.error('Error:', error));
      } else {
  
        alert('Credenciales incorrectas');
      }
    }

    const validarInicioPorPrimeraVez=(data)=>{
      if (data.ha_iniciado_sesion){
        navigate(`/home/${data.id}`);
      }else{
        navigate(`/RestablecerContrasenia/${data.id}`);
      }
    }
  


    return(

        <div class="container login-container">
              
                   
          <div class="col-md-6 login-form-1 container">
            <h3>Login Empresa</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input className='form-control' type="email" placeholder="Usuario" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
    
                <div className="form-group">
                  <input className='form-control' type="password"  placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
    
                <div className="form-group">
                  <input type="submit" class="btnSubmit" value="Login" />
                </div>
    
                <div className="form-group">
                 <p className="ForgetPwd">Forget Password?</p>
                </div>
                
              </form>
          </div>
    
        </div>
    
      );
    
    };
    
    export default Login;