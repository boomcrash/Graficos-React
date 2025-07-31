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
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
  Filler,
  ChartDataLabels
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
  | 'multiEje'
  | 'card';

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
  mostrarEtiquetas?: boolean; // Nueva prop para mostrar/ocultar etiquetas de datos
  // Nuevas props para mostrar/ocultar ejes
  mostrarEjeX?: boolean; // Mostrar/ocultar eje X (por defecto: true)
  mostrarEjeY?: boolean; // Mostrar/ocultar eje Y (por defecto: true)
  configEtiquetas?: {
    color?: string; // Color del texto (por defecto: negro)
    fontSize?: number; // Tamaño de fuente (por defecto: 12)
    fontFamily?: string; // Familia de fuente (por defecto: Arial)
    fontWeight?: string | number; // Peso de fuente (por defecto: 500)
    backgroundColor?: string; // Color de fondo (por defecto: gris suave #f5f5f5)
    borderColor?: string; // Color del borde (por defecto: gris claro #d0d0d0)
    borderRadius?: number; // Radio del borde (por defecto: 6)
    padding?: number; // Padding interno (por defecto: 8)
    anchor?: 'start' | 'center' | 'end'; // Posición de anclaje (por defecto: end)
    align?: 'start' | 'center' | 'end' | 'top' | 'bottom' | 'left' | 'right'; // Alineación (por defecto: top)
    offset?: number; // Desplazamiento (por defecto: 4)
    rotation?: number; // Rotación en grados (por defecto: 0)
    mostrarPorcentaje?: boolean; // Para gráficos circulares, mostrar porcentaje (por defecto: true)
    formatoNumero?: 'default' | 'currency' | 'percent' | 'decimal'; // Formato de número
    decimales?: number; // Número de decimales a mostrar (por defecto: 1)
  };
  // Props específicas para Card cuando tipo === 'card'
  cardProps?: {
    title?: string;
    value?: string | number;
    change?: string;
    icon?: React.ReactNode;
    colorScheme?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';
    showBorder?: boolean;
    borderColor?: string;
    // Propiedades para personalizar texto
    titleColor?: string;
    titleFontSize?: string;
    valueColor?: string;
    valueFontSize?: string;
    changeColor?: string;
    changeFontSize?: string;
  };
}

// --- Interfaces para las Cards ---

export interface CardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  colorScheme?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';
  showBorder?: boolean;
  borderColor?: string;
  // Propiedades para personalizar texto
  titleColor?: string;
  titleFontSize?: string;
  valueColor?: string;
  valueFontSize?: string;
  changeColor?: string;
  changeFontSize?: string;
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
  // Card no usa chartComponents, se maneja por separado
  card: null,
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
  mostrarEtiquetas = false,
  mostrarEjeX = true,
  mostrarEjeY = true,
  configEtiquetas = {},
  cardProps = {},
  ...otherProps 
}) => {
  // Manejar componente Card por separado
  if (tipo === 'card') {
    return (
      <Card
        title={cardProps.title || "Total Revenue"}
        value={cardProps.value || "$48,329"}
        change={cardProps.change || "+12.5%"}
        icon={cardProps.icon || "💹"}
        colorScheme={cardProps.colorScheme || "success"}
        showBorder={cardProps.showBorder !== undefined ? cardProps.showBorder : true}
        borderColor={cardProps.borderColor || "#e5e7eb"}
        titleColor={cardProps.titleColor}
        titleFontSize={cardProps.titleFontSize}
        valueColor={cardProps.valueColor}
        valueFontSize={cardProps.valueFontSize}
        changeColor={cardProps.changeColor}
        changeFontSize={cardProps.changeFontSize}
        className={className}
        style={style}
        {...otherProps}
      />
    );
  }

  // Validar que el tipo de gráfico sea válido para gráficos normales
  const ChartComponent = chartComponents[tipo as keyof typeof chartComponents];
  
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
              display: mostrarEjeX,
            },
            y: {
              display: mostrarEjeY,
            },
          },
        };
        break;

      case 'bar':
      case 'barrasAgrupadas':
        specificOptions = {
          scales: {
            x: {
              stacked: tipo === 'barrasAgrupadas' ? false : undefined,
              display: mostrarEjeX,
            },
            y: {
              stacked: tipo === 'barrasAgrupadas' ? false : undefined,
              beginAtZero: true,
              display: mostrarEjeY,
            },
          },
        };
        break;

      case 'barrasApiladas':
        specificOptions = {
          scales: {
            x: {
              stacked: true,
              display: mostrarEjeX,
            },
            y: {
              stacked: true,
              beginAtZero: true,
              display: mostrarEjeY,
            },
          },
        };
        break;

      case 'line':
      case 'area':
        specificOptions = {
          scales: {
            x: {
              display: mostrarEjeX,
            },
            y: {
              beginAtZero: true,
              display: mostrarEjeY,
            },
          },
        };
        break;

      case 'scatter':
      case 'bubble':
        specificOptions = {
          scales: {
            x: {
              type: 'linear' as const,
              position: 'bottom' as const,
              display: mostrarEjeX,
            },
            y: {
              type: 'linear' as const,
              display: mostrarEjeY,
            },
          },
        };
        break;

      case 'polarArea':
        specificOptions = {
          scales: {
            r: {
              beginAtZero: true,
              display: mostrarEjeX && mostrarEjeY, // Para gráficos polares, ambos ejes afectan al radio
            },
          },
        };
        break;

      case 'multiEje':
        specificOptions = {
          scales: {
            y: {
              type: 'linear' as const,
              display: mostrarEjeY,
              position: 'left' as const,
            },
            y1: {
              type: 'linear' as const,
              display: mostrarEjeY,
              position: 'right' as const,
              grid: {
                drawOnChartArea: false,
              },
            },
            x: {
              display: mostrarEjeX,
            },
          },
        };
        break;

      case 'radar':
        // Para gráficos radar, los ejes se manejan de manera diferente
        // Si se quiere ocultar, se puede hacer a través de las opciones de scale
        specificOptions = {
          scales: {
            r: {
              beginAtZero: true,
              display: mostrarEjeX && mostrarEjeY,
            },
          },
        };
        break;

      default:
        // Para gráficos que no tienen ejes tradicionales (pie, doughnut)
        // las props de ejes no aplican
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

  // Configuración de etiquetas de datos con valores predeterminados optimizados
  const dataLabelsConfig = mostrarEtiquetas ? {
    plugins: {
      datalabels: {
        display: true,
        color: configEtiquetas.color || '#333333', // Texto negro suave
        backgroundColor: configEtiquetas.backgroundColor || '#f5f5f5', // Fondo gris suave
        borderColor: configEtiquetas.borderColor || '#d0d0d0', // Borde gris claro
        borderRadius: configEtiquetas.borderRadius || 6,
        borderWidth: 1,
        padding: configEtiquetas.padding || 8,
        font: {
          size: configEtiquetas.fontSize || 12,
          family: configEtiquetas.fontFamily || 'Arial, sans-serif',
          weight: configEtiquetas.fontWeight || 500, // Texto semi-bold para mejor legibilidad
        },
        anchor: configEtiquetas.anchor || 'end',
        align: configEtiquetas.align || 'top',
        offset: configEtiquetas.offset || 4,
        rotation: configEtiquetas.rotation || 0,
        // Configuración específica por tipo de gráfico
        ...(tipo === 'bar' || tipo === 'barrasAgrupadas' || tipo === 'barrasApiladas' ? {
          anchor: 'end',
          align: 'end',
          offset: 4,
        } : {}),
        ...(tipo === 'horizontalBar' ? {
          anchor: 'end',
          align: 'start',
          offset: 4,
        } : {}),
        ...(tipo === 'pie' || tipo === 'doughnut' ? {
          align: 'center',
          anchor: 'center',
          offset: 0,
          padding: 6,
          font: {
            size: configEtiquetas.fontSize || 11,
            family: configEtiquetas.fontFamily || 'Arial, sans-serif',
            weight: configEtiquetas.fontWeight || 500,
          },
        } : {}),
        ...(tipo === 'polarArea' ? {
          align: 'center',
          anchor: 'center',
          offset: 0,
          padding: 6,
        } : {}),
        ...(tipo === 'radar' ? {
          padding: 6,
        } : {}),
        ...(tipo === 'line' || tipo === 'area' ? {
          anchor: 'end',
          align: 'top',
          offset: 4,
        } : {}),
        formatter: function(value: any, context: any) {
          const decimales = configEtiquetas.decimales || 1;
          const formato = configEtiquetas.formatoNumero || 'default';
          
          // Para gráficos de coordenadas (scatter, bubble)
          if (tipo === 'scatter') {
            return `(${value.x}, ${value.y})`;
          }
          if (tipo === 'bubble') {
            return `(${value.x}, ${value.y}, ${value.r})`;
          }
          
          // Para gráficos circulares (pie, doughnut)
          if ((tipo === 'pie' || tipo === 'doughnut') && configEtiquetas.mostrarPorcentaje !== false) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(decimales);
            return `${value}\n(${percentage}%)`;
          }
          
          // Formateo de números según el tipo especificado
          let formattedValue = value;
          switch (formato) {
            case 'currency':
              formattedValue = new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: decimales,
                maximumFractionDigits: decimales,
              }).format(value);
              break;
            case 'percent':
              formattedValue = new Intl.NumberFormat('es-ES', {
                style: 'percent',
                minimumFractionDigits: decimales,
                maximumFractionDigits: decimales,
              }).format(value / 100);
              break;
            case 'decimal':
              formattedValue = new Intl.NumberFormat('es-ES', {
                minimumFractionDigits: decimales,
                maximumFractionDigits: decimales,
              }).format(value);
              break;
            default:
              // Para valores numéricos, mostrar con decimales especificados
              if (typeof value === 'number') {
                formattedValue = decimales === 0 ? Math.round(value).toString() : value.toFixed(decimales);
              } else {
                formattedValue = value;
              }
          }
          
          return formattedValue;
        },
      }
    }
  } : {};

  // Combinar todas las opciones - el orden es importante
  const finalOptions: OpcionesGrafico = {
    ...defaultOptions,
    ...specificOptions,
    ...options, // Las opciones del usuario van antes
    ...dataLabelsConfig, // Las opciones de etiquetas van al final para tener prioridad
    plugins: {
      ...defaultOptions.plugins,
      ...specificOptions.plugins,
      ...options.plugins,
      ...dataLabelsConfig.plugins, // Las etiquetas tienen la máxima prioridad
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

// --- Componentes de Cards ---

/**
 * Card - Tarjeta para mostrar estadísticas con iconos y cambios
 */
export const Card: React.FC<CardProps> = ({
  title,
  value,
  change,
  icon,
  className = '',
  style = {},
  colorScheme = 'primary',
  showBorder = true,
  borderColor = '#e5e7eb',
  titleColor = '#9ca3af',
  titleFontSize = '13px',
  valueColor = '#111827',
  valueFontSize = '28px',
  changeColor,
  changeFontSize = '13px'
}) => {
  // Estilos base del card con borde gris suave
  const cardStyles: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: showBorder ? `1px solid ${borderColor}` : 'none',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '0px',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '80px',
    width: 'auto',
    maxWidth: '280px',
    ...style
  };

  // Estilos para el contenido izquierdo
  const contentStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    height: '100%'
  };

  // Estilos para el título (superior izquierda)
  const titleStyles: React.CSSProperties = {
    fontSize: titleFontSize,
    fontWeight: 500,
    color: titleColor,
    margin: 0,
    marginBottom: '4px',
    lineHeight: '1.2'
  };

  // Estilos para el valor principal (centro izquierda, más prominente)
  const valueStyles: React.CSSProperties = {
    fontSize: valueFontSize,
    fontWeight: 700,
    color: valueColor,
    margin: 0,
    marginBottom: change ? '2px' : 0,
    lineHeight: '1.0'
  };

  // Estilos para el cambio/valor opcional (abajo izquierda)
  const changeStyles: React.CSSProperties = {
    fontSize: changeFontSize,
    fontWeight: 600,
    margin: 0,
    lineHeight: '1.2'
  };

  // Determinar color del cambio
  const getChangeColor = () => {
    // Si se proporciona changeColor personalizado, usarlo
    if (changeColor) return changeColor;
    
    // Si no, usar la lógica automática basada en el signo
    if (!change) return '#6b7280';
    if (change.startsWith('+')) return '#059669';
    if (change.startsWith('-')) return '#dc2626';
    return '#6b7280';
  };

  // Estilos para el contenedor del icono (derecha centrado)
  const iconContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: getIconBackgroundColor(),
    color: getIconColor(),
    fontSize: '18px',
    flexShrink: 0,
    marginLeft: '12px'
  };

  // Función para obtener el color de fondo del icono según el esquema de color
  function getIconBackgroundColor() {
    const colorMap = {
      primary: 'rgba(59, 130, 246, 0.1)',
      success: 'rgba(5, 150, 105, 0.1)',
      warning: 'rgba(245, 158, 11, 0.1)',
      danger: 'rgba(220, 38, 38, 0.1)',
      info: 'rgba(14, 165, 233, 0.1)',
      secondary: 'rgba(107, 114, 128, 0.1)'
    };
    return colorMap[colorScheme] || colorMap.primary;
  }

  // Función para obtener el color del icono según el esquema de color
  function getIconColor() {
    const colorMap = {
      primary: '#3b82f6',
      success: '#059669',
      warning: '#f59e0b',
      danger: '#dc2626',
      info: '#0ea5e9',
      secondary: '#6b7280'
    };
    return colorMap[colorScheme] || colorMap.primary;
  }

  return (
    <div 
      className={className}
      style={cardStyles}
    >
      {/* Contenido izquierdo */}
      <div style={contentStyles}>
        {/* Título superior izquierda */}
        <p style={titleStyles}>{title}</p>
        
        {/* Valor centro izquierda */}
        <h2 style={valueStyles}>{value}</h2>
        
        {/* Valor opcional abajo izquierda */}
        {change && (
          <p 
            style={{
              ...changeStyles,
              color: getChangeColor()
            }}
          >
            {change}
          </p>
        )}
      </div>

      {/* Icono derecha centrado */}
      {icon && (
        <div style={iconContainerStyles}>
          {icon}
        </div>
      )}
    </div>
  );
};

export default Grafico;
