import { DatosGrafico } from './Grafico';

// Datos para gráfico de líneas
export const datosLineas: DatosGrafico = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'Ventas 2024',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false,
      tension: 0.1,
    },
    {
      label: 'Ventas 2023',
      data: [28, 48, 40, 19, 86, 27],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
      fill: false,
      tension: 0.1,
    },
  ],
};

// Datos para gráfico de barras verticales
export const datosBarras: DatosGrafico = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'Ingresos',
      data: [12000, 15000, 18000, 22000, 19000, 25000],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

// Datos para gráfico de barras horizontales
export const datosBarrasHorizontales: DatosGrafico = {
  labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D', 'Producto E'],
  datasets: [
    {
      label: 'Unidades Vendidas',
      data: [120, 190, 300, 500, 200],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

// Datos para gráfico de barras agrupadas
export const datosBarrasAgrupadas: DatosGrafico = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Ventas 2023',
      data: [120, 150, 180, 200],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    {
      label: 'Ventas 2024',
      data: [140, 170, 160, 220],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
    {
      label: 'Proyección 2025',
      data: [160, 190, 180, 250],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

// Datos para gráfico de barras apiladas
export const datosBarrasApiladas: DatosGrafico = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
  datasets: [
    {
      label: 'Desktop',
      data: [30, 45, 60, 70, 65],
      backgroundColor: 'rgba(255, 99, 132, 0.8)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    {
      label: 'Mobile',
      data: [70, 85, 95, 110, 105],
      backgroundColor: 'rgba(54, 162, 235, 0.8)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
    {
      label: 'Tablet',
      data: [20, 25, 30, 35, 40],
      backgroundColor: 'rgba(255, 205, 86, 0.8)',
      borderColor: 'rgba(255, 205, 86, 1)',
      borderWidth: 1,
    },
  ],
};

// Datos para gráfico circular (pie)
export const datosPastel: DatosGrafico = {
  labels: ['Rojo', 'Azul', 'Amarillo', 'Verde', 'Púrpura', 'Naranja'],
  datasets: [
    {
      label: 'Distribución de colores',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 205, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

// Datos para gráfico dona (doughnut)
export const datosDona: DatosGrafico = {
  labels: ['Ventas Online', 'Ventas en Tienda', 'Ventas Telefónicas'],
  datasets: [
    {
      label: 'Canal de Ventas',
      data: [300, 150, 100],
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(255, 205, 86, 0.8)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 205, 86, 1)',
      ],
      borderWidth: 2,
    },
  ],
};

// Datos para gráfico polar
export const datosPolar: DatosGrafico = {
  labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D', 'Producto E'],
  datasets: [
    {
      label: 'Ventas por Producto',
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 205, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

// Datos para gráfico radar
export const datosRadar: DatosGrafico = {
  labels: ['Velocidad', 'Confiabilidad', 'Comodidad', 'Seguridad', 'Eficiencia', 'Estilo'],
  datasets: [
    {
      label: 'Producto X',
      data: [80, 90, 70, 85, 60, 95],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
    },
    {
      label: 'Producto Y',
      data: [65, 75, 85, 70, 90, 80],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
    },
  ],
};

// Datos para gráfico de dispersión (scatter)
export const datosDispersion: DatosGrafico = {
  datasets: [
    {
      label: 'Serie A',
      data: [
        { x: -10, y: 0 },
        { x: 0, y: 10 },
        { x: 10, y: 5 },
        { x: 0.5, y: 5.5 },
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      pointRadius: 6,
    } as any,
    {
      label: 'Serie B',
      data: [
        { x: -15, y: -5 },
        { x: -5, y: 15 },
        { x: 15, y: 10 },
        { x: 2, y: 8 },
      ],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      pointRadius: 6,
    } as any,
  ],
};

// Datos para gráfico de burbujas (bubble)
export const datosBurbujas: DatosGrafico = {
  datasets: [
    {
      label: 'Productos',
      data: [
        { x: 20, y: 30, r: 15 },
        { x: 40, y: 10, r: 10 },
        { x: 30, y: 40, r: 20 },
        { x: 10, y: 20, r: 8 },
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    } as any,
  ],
};

// Datos para gráfico de área
export const datosArea: DatosGrafico = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'Ventas',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(75, 192, 192, 0.3)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Objetivo',
      data: [50, 55, 70, 75, 50, 60],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
  ],
};

// Datos para gráfico multi-eje
export const datosMultiEje: DatosGrafico = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'Ventas (Miles)',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
      yAxisID: 'y',
    },
    {
      label: 'Temperatura (°C)',
      data: [28, 48, 40, 19, 86, 27],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
      yAxisID: 'y1',
    },
  ],
};
