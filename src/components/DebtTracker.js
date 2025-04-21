import React, { useState, useEffect } from 'react';
import { exportToExcel } from '../utils/export';

const DebtTracker = ({ userEmail }) => {
  const storageKey = `debt_entries_${userEmail}`;
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ banco: '', producto: '', tipo: '', saldo: '', pago: '' });

  useEffect(() => {
    const savedEntries = localStorage.getItem(storageKey);
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(entries));
  }, [entries, storageKey]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEntry = () => {
    const newEntry = {
      ...form,
      saldo: parseFloat(form.saldo),
      pago: parseFloat(form.pago)
    };
    setEntries([...entries, newEntry]);
    setForm({ banco: '', producto: '', tipo: '', saldo: '', pago: '' });
  };

  const exportData = () => {
    exportToExcel(entries, 'deudas');
  };

  return (
    <div>
      <div className="row g-2">
        {['banco', 'producto', 'tipo', 'saldo', 'pago'].map((field, idx) => (
          <div className="col" key={idx}>
            <input
              className="form-control"
              placeholder={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              type={field === 'saldo' || field === 'pago' ? 'number' : 'text'}
            />
          </div>
        ))}
        <div className="col-auto">
          <button className="btn btn-primary" onClick={addEntry}>Agregar</button>
        </div>
        <div className="col-auto">
          <button className="btn btn-success" onClick={exportData}>Exportar Excel</button>
        </div>
      </div>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Banco</th>
            <th>Producto</th>
            <th>Tipo</th>
            <th>Saldo Deudor</th>
            <th>Pago Realizado</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.banco}</td>
              <td>{entry.producto}</td>
              <td>{entry.tipo}</td>
              <td>{entry.saldo}</td>
              <td>{entry.pago}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DebtTracker;