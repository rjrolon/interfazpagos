import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Login simulado
    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ email }));
      onLogin({ email });
    } else {
      alert('Ingresá tu email y contraseña');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default Login;