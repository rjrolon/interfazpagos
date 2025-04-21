import * as XLSX from 'xlsx';

export const exportToExcel = (data, filename) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Deudas');
  XLSX.writeFile(wb, `${filename}.xlsx`);
};