import React, { useState, useEffect } from 'react';
import DebtTracker from '../components/DebtTracker';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="container mt-4">
      {user ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Gestor de Deudas</h1>
            <button className="btn btn-outline-danger" onClick={handleLogout}>Cerrar sesión</button>
          </div>
          <DebtTracker userEmail={user.email} />
        </>
      ) : (
        <Login onLogin={setUser} />
      )}
    </div>
  );
}

export default App;