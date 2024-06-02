import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';


const Login = () =>{


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aquí puedes validar las credenciales
      if (email === 'admin@gmail.com' && password === '123456789') {



        const id = 1;
        //aqui tnecesito un traer el id de la empresa por medio del correo

        // Redirigir a la página "Home"
        navigate(`/home/${id}`);
      } else {
        // Manejar el error de inicio de sesión 
        alert('Credenciales incorrectas');
      }
    };
  


    return(

        <div class="container login-container">
              
                   
          <div class="col-md-6 login-form-1 container">
            <h3>Login Administrador</h3>
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