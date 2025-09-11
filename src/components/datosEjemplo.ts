import { DatosGrafico } from './Grafico';

// Paleta de colores personalizada
export const paletaColores = {
  blanco: '#ffffff',
  verdeClaro: '#eafaf1',
  verdeSuave: '#c1eac5',
  verdeHierba: '#7ccba2',
  verdeEsmeralda: '#2a9d8f'
};

// Función para generar colores con transparencia
export const generarColores = (transparencia: number = 0.8) => {
  const colores = [
    paletaColores.verdeEsmeralda,
    paletaColores.verdeHierba,
    paletaColores.verdeSuave,
    paletaColores.verdeClaro,
    paletaColores.blanco
  ];
  
  return {
    backgroundColor: colores.map(color => `${color}${Math.round(transparencia * 255).toString(16).padStart(2, '0')}`),
    borderColor: colores,
    backgroundColorSolid: colores,
    backgroundColorTransparent: colores.map(color => `${color}40`) // 25% de transparencia
  };
};

// Datos para gráfico de líneas
export const datosLineas: DatosGrafico = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'Ventas 2024',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: `${paletaColores.verdeEsmeralda}40`,
      borderColor: paletaColores.verdeEsmeralda,
      borderWidth: 2,
      fill: false,
      tension: 0.1,
    },
    {
      label: 'Ventas 2023',
      data: [28, 48, 40, 19, 86, 27],
      backgroundColor: `${paletaColores.verdeHierba}40`,
      borderColor: paletaColores.verdeHierba,
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
      backgroundColor: generarColores(0.8).backgroundColor,
      borderColor: generarColores().borderColor,
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
      backgroundColor: generarColores(0.8).backgroundColor,
      borderColor: generarColores().borderColor,
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
      backgroundColor: paletaColores.verdeEsmeralda,
      borderColor: paletaColores.verdeEsmeralda,
      borderWidth: 1,
    },
    {
      label: 'Ventas 2024',
      data: [140, 170, 160, 220],
      backgroundColor: paletaColores.verdeHierba,
      borderColor: paletaColores.verdeHierba,
      borderWidth: 1,
    },
    {
      label: 'Proyección 2025',
      data: [160, 190, 180, 250],
      backgroundColor: paletaColores.verdeSuave,
      borderColor: paletaColores.verdeSuave,
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
      backgroundColor: paletaColores.verdeEsmeralda,
      borderColor: paletaColores.verdeEsmeralda,
      borderWidth: 1,
    },
    {
      label: 'Mobile',
      data: [70, 85, 95, 110, 105],
      backgroundColor: paletaColores.verdeHierba,
      borderColor: paletaColores.verdeHierba,
      borderWidth: 1,
    },
    {
      label: 'Tablet',
      data: [20, 25, 30, 35, 40],
      backgroundColor: paletaColores.verdeSuave,
      borderColor: paletaColores.verdeSuave,
      borderWidth: 1,
    },
  ],
};

// Datos para gráfico circular (pie)
export const datosPastel: DatosGrafico = {
  labels: ['caUno', 'catDos', 'catTres'],
  datasets: [
    {
      label: 'Distribución de colores',
      data: [12, 19, 3],
      backgroundColor: generarColores(0.8).backgroundColorSolid,
      borderColor: generarColores().borderColor,
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
        paletaColores.verdeEsmeralda,
        paletaColores.verdeHierba,
        paletaColores.verdeSuave,
      ],
      borderColor: [
        paletaColores.verdeEsmeralda,
        paletaColores.verdeHierba,
        paletaColores.verdeSuave,
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
      backgroundColor: generarColores(0.5).backgroundColor,
      borderColor: generarColores().borderColor,
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
      backgroundColor: `${paletaColores.verdeEsmeralda}30`,
      borderColor: paletaColores.verdeEsmeralda,
      borderWidth: 2,
      pointBackgroundColor: paletaColores.verdeEsmeralda,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: paletaColores.verdeEsmeralda,
    },
    {
      label: 'Producto Y',
      data: [65, 75, 85, 70, 90, 80],
      backgroundColor: `${paletaColores.verdeHierba}30`,
      borderColor: paletaColores.verdeHierba,
      borderWidth: 2,
      pointBackgroundColor: paletaColores.verdeHierba,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: paletaColores.verdeHierba,
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
      backgroundColor: paletaColores.verdeEsmeralda,
      borderColor: paletaColores.verdeEsmeralda,
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
      backgroundColor: paletaColores.verdeHierba,
      borderColor: paletaColores.verdeHierba,
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
      backgroundColor: `${paletaColores.verdeEsmeralda}90`,
      borderColor: paletaColores.verdeEsmeralda,
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
      backgroundColor: `${paletaColores.verdeEsmeralda}40`,
      borderColor: paletaColores.verdeEsmeralda,
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Objetivo',
      data: [50, 55, 70, 75, 50, 60],
      backgroundColor: `${paletaColores.verdeHierba}40`,
      borderColor: paletaColores.verdeHierba,
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
      backgroundColor: `${paletaColores.verdeEsmeralda}40`,
      borderColor: paletaColores.verdeEsmeralda,
      borderWidth: 2,
      yAxisID: 'y',
    },
    {
      label: 'Temperatura (°C)',
      data: [28, 48, 40, 19, 86, 27],
      backgroundColor: `${paletaColores.verdeHierba}40`,
      borderColor: paletaColores.verdeHierba,
      borderWidth: 2,
      yAxisID: 'y1',
    },
  ],
};

// Datos para gráfico tipo gauge
export const datosGauge: DatosGrafico = {
  labels: ['0-70', '70-90', '90-100'],
  datasets: [{
    data: [70, 20, 10],
    backgroundColor: ['#d32f2f', '#fbc02d', '#388e3c'],
    borderWidth: 0,
    cutout: '80%',
    circumference: 180,
    rotation: 270,
  }],
};

// Datos para CardIndicadores
export const datosCardIndicadores = {
  indicadores: [
    {
      icono: 'show_chart',
      nombre: 'YTD Cump Presup',
      valor: 92,
      isPercent: true,
      iconoColor: '#f59e0b',
      iconoTamano: 20,
      nombreColor: '#374151',
      nombreTamano: 14,
      valorColor: '#1f2937',
      valorTamano: 16
    },
    {
      icono: 'trending_up',
      nombre: 'MTH Cump Presup',
      valor: 88,
      isPercent: true,
      iconoColor: '#10b981',
      iconoTamano: 20,
      nombreColor: '#374151',
      nombreTamano: 14,
      valorColor: '#1f2937',
      valorTamano: 16
    },
    {
      icono: 'arrow_upward',
      nombre: 'YTD1 / YTD0 Crec %',
      valor: 7,
      isPercent: true,
      iconoColor: '#3b82f6',
      iconoTamano: 20,
      nombreColor: '#374151',
      nombreTamano: 14,
      valorColor: '#1f2937',
      valorTamano: 16
    },
    {
      icono: 'north',
      nombre: 'MTH1 / MTH0 Crec %',
      valor: 5,
      isPercent: true,
      iconoColor: '#8b5cf6',
      iconoTamano: 20,
      nombreColor: '#374151',
      nombreTamano: 14,
      valorColor: '#1f2937',
      valorTamano: 16
    }
  ]
};

// Ejemplos de diferentes estilos de aguja para gauge
export const ejemplosNeedles = [
  {
    titulo: "Aguja Default",
    needleStyle: 'default' as const,
    needleColor: '#000000',
    needleWidth: 2,
    needleLength: 0.9
  },
  {
    titulo: "Aguja Arrow",
    needleStyle: 'arrow' as const,
    needleColor: '#e74c3c',
    needleWidth: 3,
    needleLength: 0.85
  },
  {
    titulo: "Aguja Triangle",
    needleStyle: 'triangle' as const,
    needleColor: '#3498db',
    needleWidth: 4,
    needleLength: 0.8
  },
  {
    titulo: "Aguja Diamond",
    needleStyle: 'diamond' as const,
    needleColor: '#f39c12',
    needleWidth: 5,
    needleLength: 0.85
  },
  {
    titulo: "Aguja Modern",
    needleStyle: 'modern' as const,
    needleColor: '#9b59b6',
    needleWidth: 4,
    needleLength: 0.9
  },
  {
    titulo: "Aguja Minimal",
    needleStyle: 'minimal' as const,
    needleColor: '#2ecc71',
    needleWidth: 2,
    needleLength: 0.75
  }
];

// Datos base para gauge con diferentes estilos de aguja
export const gaugeBaseConfig = {
  ranges: [
    { from: 0, to: 30, color: '#e74c3c' },
    { from: 30, to: 70, color: '#f39c12' },
    { from: 70, to: 100, color: '#27ae60' }
  ],
  value: 75,
  showLabels: true,
  isPercent: true,
  showValue: true,
  valueColor: '#2c3e50',
  valueFontSize: 20,
  showMinMax: true,
  minMaxColor: '#7f8c8d',
  minMaxFontSize: 14
};
