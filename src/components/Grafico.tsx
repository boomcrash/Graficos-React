import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import {
  Line,
  Bar,
  Pie,
  Doughnut,
  PolarArea,
  Radar,
  Scatter,
  Bubble,
} from 'react-chartjs-2';

// Registrar todos los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Tipos de gráficos disponibles
export type TipoGrafico = 
  | 'line'
  | 'bar'
  | 'horizontalBar'
  | 'barrasAgrupadas'
  | 'barrasApiladas'
  | 'pie'
  | 'doughnut'
  | 'polarArea'
  | 'radar'
  | 'scatter'
  | 'bubble'
  | 'area'
  | 'multiEje';

// Interfaz para los datos del gráfico
export interface DatosGrafico {
  labels?: string[];
  datasets: Array<{
    label?: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
    pointRadius?: number;
    pointHoverRadius?: number;
    // Permitir propiedades adicionales para diferentes tipos de gráficos
    [key: string]: any;
  }>;
}

// Interfaz para las opciones del gráfico
export interface OpcionesGrafico {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      position?: 'top' | 'left' | 'bottom' | 'right';
      display?: boolean;
    };
    title?: {
      display?: boolean;
      text?: string;
    };
    tooltip?: object;
  };
  scales?: object;
  animation?: object;
  // Permitir propiedades adicionales
  [key: string]: any;
}

// Props del componente Grafico
export interface GraficoProps {
  tipo: TipoGrafico;
  data: DatosGrafico;
  options?: OpcionesGrafico;
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
}

// Mapeo de tipos de gráficos a componentes
const chartComponents = {
  line: Line,
  bar: Bar,
  horizontalBar: Bar, // Configurado con indexAxis: 'y'
  barrasAgrupadas: Bar,
  barrasApiladas: Bar, // Configurado con scales stacked
  pie: Pie,
  doughnut: Doughnut,
  polarArea: PolarArea,
  radar: Radar,
  scatter: Scatter,
  bubble: Bubble,
  area: Line, // Line chart con fill: true
  multiEje: Line, // Line chart con múltiples ejes Y
} as const;

/**
 * Componente Grafico - Librería reutilizable para gráficos con Chart.js en TypeScript
 * 
 * @param props - Props del componente
 * @returns Componente de gráfico renderizado
 */
const Grafico: React.FC<GraficoProps> = ({ 
  tipo, 
  data, 
  options = {}, 
  width, 
  height, 
  className = '', 
  style = {},
  ...otherProps 
}) => {
  // Validar que el tipo de gráfico sea válido
  const ChartComponent = chartComponents[tipo.toLowerCase() as TipoGrafico];
  
  if (!ChartComponent) {
    const tiposDisponibles = Object.keys(chartComponents).join(', ');
    console.error(`Tipo de gráfico no válido: ${tipo}. Tipos disponibles: ${tiposDisponibles}`);
    return (
      <div className={`grafico-error ${className}`} style={style}>
        <p>Error: Tipo de gráfico "{tipo}" no válido</p>
        <p>Tipos disponibles: {tiposDisponibles}</p>
      </div>
    );
  }

  // Función para obtener opciones específicas según el tipo de gráfico
  const getSpecificOptions = (tipo: TipoGrafico, options: OpcionesGrafico): OpcionesGrafico => {
    let specificOptions: OpcionesGrafico = {};

    switch (tipo) {
      case 'horizontalBar':
        specificOptions = {
          indexAxis: 'y' as const,
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        };
        break;

      case 'barrasApiladas':
        specificOptions = {
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
            },
          },
        };
        break;

      case 'area':
        // Para gráficos de área, asegurar que fill esté habilitado en datasets
        break;

      case 'multiEje':
        specificOptions = {
          scales: {
            y: {
              type: 'linear' as const,
              display: true,
              position: 'left' as const,
            },
            y1: {
              type: 'linear' as const,
              display: true,
              position: 'right' as const,
              grid: {
                drawOnChartArea: false,
              },
            },
          },
        };
        break;

      default:
        break;
    }

    return specificOptions;
  };

  // Opciones por defecto
  const defaultOptions: OpcionesGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        display: true,
      },
      title: {
        display: false,
      },
    },
  };

  // Obtener opciones específicas del tipo de gráfico
  const specificOptions = getSpecificOptions(tipo, options);

  // Combinar todas las opciones
  const finalOptions: OpcionesGrafico = {
    ...defaultOptions,
    ...specificOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...specificOptions.plugins,
      ...options.plugins,
    },
    scales: {
      ...defaultOptions.scales,
      ...specificOptions.scales,
      ...options.scales,
    },
  };

  // Estilos del contenedor
  const containerStyle: React.CSSProperties = {
    width: width || '100%',
    height: height || '400px',
    ...style,
  };

  return (
    <div 
      className={`grafico-container ${className}`} 
      style={containerStyle}
      data-chart-type={tipo}
    >
      <ChartComponent 
        data={data} 
        options={finalOptions} 
        {...otherProps}
      />
    </div>
  );
};

export default Grafico;
