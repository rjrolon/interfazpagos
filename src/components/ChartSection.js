import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartSection = ({ data }) => {
  const labels = data.map((entry) => entry.producto);
  const saldos = data.map((entry) => entry.saldo);
  const pagos = data.map((entry) => entry.pago);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Saldo Deudor',
        data: saldos,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Pagos Realizados',
        data: pagos,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <div className="mt-4">
      <h5 className="text-center">Resumen Gráfico</h5>
      <Bar data={chartData} />
    </div>
  );
};

export default ChartSection;