import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {

  constructor() { }

  exportToXls(jsonData: { headers: string[]; data: any[] }, fileName: string): void {
    // Comienza creando una tabla HTML
    let table = '<table>';

    // Genera las cabeceras
    table += '<tr>';
    jsonData.headers.forEach(header => {
      table += `<th>${header}</th>`; // Añade las cabeceras como fila inicial
    });
    table += '</tr>';

    // Genera las filas de datos
    jsonData.data.forEach(row => {
      table += '<tr>';
      jsonData.headers.forEach(header => {
        // Usa la clave correspondiente al header para obtener el valor
        const key = header
          .toLowerCase()
          .replace(/ /g, '_') // Convierte espacios a guiones bajos
          .replace(/[()]/g, ''); // Elimina paréntesis si los hay
        table += `<td>${row[key] ?? ''}</td>`; // Muestra el valor o vacío si es nulo
      });
      table += '</tr>';
    });

    table += '</table>';

    // Crea un Blob con el contenido de la tabla en formato Excel
    const blob = new Blob([table], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);

    // Crea un enlace para descargar el archivo
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.xls`;
    a.click();

    // Limpia el objeto URL
    window.URL.revokeObjectURL(url);
  }






}
