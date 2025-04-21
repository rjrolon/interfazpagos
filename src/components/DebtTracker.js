import React, { useState, useEffect } from 'react';
import { exportToExcel } from '../utils/export';
import ChartSection from './ChartSection';

const DebtTracker = ({ userEmail }) => {
  const storageKey = `debt_entries_${userEmail}`;
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ banco: '', producto: '', tipo: '', saldo: '' });
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [pago, setPago] = useState('');

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
      pagos: []
    };
    setEntries([...entries, newEntry]);
    setForm({ banco: '', producto: '', tipo: '', saldo: '' });
  };

  const addPago = () => {
    if (selectedIndex === null || pago === '') return;
    const newEntries = [...entries];
    const pagoValue = parseFloat(pago);
    newEntries[selectedIndex].pagos.push(pagoValue);
    newEntries[selectedIndex].saldo -= pagoValue;
    setEntries(newEntries);
    setPago('');
    setSelectedIndex(null);
  };

  const exportData = () => {
    const exportEntries = entries.map(e => ({
      banco: e.banco,
      producto: e.producto,
      tipo: e.tipo,
      saldo_actual: e.saldo,
      total_pagado: e.pagos.reduce((a, b) => a + b, 0),
      pagos: e.pagos.join(', ')
    }));
    exportToExcel(exportEntries, 'deudas');
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Cargar nueva deuda</h3>
      <div className="row g-2">
        {['banco', 'producto', 'tipo', 'saldo'].map((field, idx) => (
          <div className="col-md" key={idx}>
            <input
              className="form-control"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={form[field]}
              onChange={handleChange}
              type={field === 'saldo' ? 'number' : 'text'}
            />
          </div>
        ))}
        <div className="col-md-auto d-grid">
          <button className="btn btn-primary" onClick={addEntry}>Agregar</button>
        </div>
        <div className="col-md-auto d-grid">
          <button className="btn btn-success" onClick={exportData}>Exportar Excel</button>
        </div>
      </div>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Banco</th>
            <th>Producto</th>
            <th>Tipo</th>
            <th>Saldo Actual</th>
            <th>Total Pagado</th>
            <th>Pagos</th>
            <th>Nuevo Pago</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.banco}</td>
              <td>{entry.producto}</td>
              <td>{entry.tipo}</td>
              <td>{entry.saldo.toFixed(2)}</td>
              <td>{entry.pagos.reduce((a, b) => a + b, 0).toFixed(2)}</td>
              <td>{entry.pagos.join(', ')}</td>
              <td>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Pago"
                    value={selectedIndex === index ? pago : ''}
                    onChange={(e) => {
                      setSelectedIndex(index);
                      setPago(e.target.value);
                    }}
                  />
                  <button className="btn btn-outline-primary" onClick={addPago}>
                    +
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ChartSection data={entries.map(e => ({
        producto: e.producto,
        saldo: e.saldo,
        pago: e.pagos.reduce((a, b) => a + b, 0)
      }))} />
    </div>
  );
};

export default DebtTracker;