import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React, { useEffect, useRef, useState } from 'react';
import { Bar, Bubble, Doughnut, Line, Pie, PolarArea, Radar, Scatter } from 'react-chartjs-2';

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
  | 'card'
  | 'gauge'
  | 'cardIndicadores'
  | 'progresoVertical';// Interfaz para los datos del gráfico
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
    [key: string]: any;
  }>;
}

// Interfaz para el contexto del formateador de etiquetas
interface DataLabelsContext {
  dataIndex: number;
  dataset: {
    data: any[];
  };
  [key: string]: any;
}

// Interfaz para las opciones del gráfico
export interface OpcionesGrafico {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  rotation?: number;
  circumference?: number;
  cutout?: string;
  plugins?: {
    legend?: {
      position?: 'top' | 'left' | 'bottom' | 'right';
      display?: boolean;
    };
    title?: {
      display?: boolean;
      text?: string;
    };
    tooltip?: {
      enabled?: boolean;
      [key: string]: any;
    };
    datalabels?:
      | {
          display?: boolean;
          color?: string;
          font?: {
            weight?: string | number;
            size?: number;
            family?: string;
          };
          formatter?: (value: any, context: DataLabelsContext) => string;
          [key: string]: any;
        }
      | false;
    needle?: {
      needleValue: number;
      maxValue: number;
    };
    [key: string]: any;
  };
  scales?: object;
  animation?: object;
  // Permitir propiedades adicionales
  [key: string]: any;
}

// Props del componente Grafico
export interface GraficoProps {
  tipo: TipoGrafico;
  data?: DatosGrafico;
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
    isPercent?: boolean; // Si los valores son porcentajes y deben mostrar el símbolo % (por defecto: false)
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
  // Props específicas para el gráfico tipo gauge
  gaugeProps?: {
    ranges: Array<{
      from: number;
      to: number;
      color: string;
    }>;
    value: number;
    originalValue?: number; // Valor original sin limitar para mostrar en el centro
    width?: number;
    label?: string;
    showLabels?: boolean;
    isPercent?: boolean;
    showValue?: boolean;
    valueColor?: string;
    valueFontSize?: number; // Tamaño de fuente del valor del centro
    labelStyle?: {
      backgroundColor?: string;
      color?: string;
    };
    // Nuevas props para estilizado del contenedor
    containerStyle?: {
      backgroundColor?: string;
      borderRadius?: number;
      border?: string;
      padding?: number;
    };
    // Nuevas props para símbolo personalizado
    showSymbol?: boolean; // Mostrar símbolo cuando isPercent es false
    symbol?: string; // El símbolo a mostrar (ej: '$', '€', etc.)
    symbolPosition?: 'before' | 'after'; // Posición del símbolo
    // Nuevas props para valores min/max en los extremos
    showMinMax?: boolean; // Mostrar valores mínimo y máximo en los extremos del semicírculo
    minMaxColor?: string; // Color de los valores min/max (por defecto usa valueColor)
    minMaxFontSize?: number; // Tamaño de fuente de los valores min/max (por defecto 60% del valueFontSize)
    // Props para personalización de la aguja/flecha
    needleStyle?: 'default' | 'arrow' | 'triangle' | 'diamond' | 'modern' | 'minimal'; // Tipo de aguja
    needleColor?: string; // Color de la aguja (por defecto '#000')
    needleWidth?: number; // Grosor de la aguja (por defecto 2)
    needleLength?: number; // Longitud de la aguja como porcentaje del radio (por defecto 0.9)
  };
  // Props específicas para el gráfico tipo cardIndicadores
  cardIndicadoresProps?: {
    indicadores: Array<{
      icono: string; // Nombre del ícono de Material Icons
      nombre: string;
      valor: string | number;
      isPercent?: boolean;
      iconoColor?: string;
      iconoTamano?: number; // Solo número, no string
      nombreColor?: string;
      nombreTamano?: number; // Solo número, no string
      valorColor?: string;
      valorTamano?: number; // Solo número, no string
    }>;
    alineacion?: 'left' | 'center' | 'right' | 'justify';
    ancho?: string | number;
    padding?: number | string;
    backgroundColor?: string;
    borderRadius?: number | string;
    border?: string;
    columnGap?: number; // Espaciado entre columnas para modo justify
  };
  // Props específicas para el gráfico tipo progresoVertical
  progresoVerticalProps?: {
    valor: number; // Valor actual del progreso
    minimo?: number; // Valor mínimo (por defecto 0)
    maximo?: number; // Valor máximo (por defecto 100)
    isPercent?: boolean; // Si mostrar como porcentaje (por defecto true)
    symbol?: string; // Símbolo personalizado cuando isPercent es false (ej: '$', '€')
    symbolPosition?: 'before' | 'after'; // Posición del símbolo (por defecto 'after')
    colorBar?: string; // Color de relleno de la barra (por defecto '#4CAF50')
    backgroundColor?: string; // Color de fondo de la barra vacía (por defecto 'transparent')
    subdivisions?: number; // Número de subdivisiones (por defecto 10)
    showSubdivisions?: boolean; // Mostrar líneas de subdivisión (por defecto true)
    subdivisionColor?: string; // Color de las líneas de subdivisión (por defecto '#CCCCCC')
    barWidth?: number; // Ancho de la barra en píxeles (por defecto 40)
    height?: number; // Altura del componente en píxeles (por defecto 300)
    showValue?: boolean; // Mostrar el valor numérico (por defecto true)
    valuePosition?: 'top' | 'center' | 'bottom'; // Posición del valor mostrado (por defecto 'top')
    valueColor?: string; // Color del texto del valor (por defecto '#333333')
    valueFontSize?: number; // Tamaño de fuente del valor en píxeles (por defecto 14)
    borderRadius?: number; // Radio del borde de la barra (por defecto 4)
    containerStyle?: React.CSSProperties; // Estilos adicionales del contenedor
    showDivisionValues?: boolean; // Mostrar u ocultar los valores de cada división (Y axis)
    // Configuración del título
    showTitle?: boolean; // Mostrar u ocultar el título (por defecto false)
    title?: string; // Texto del título
    titleColor?: string; // Color del título (por defecto '#333333')
    titleFontSize?: number; // Tamaño de fuente del título (por defecto 18)
    titlePosition?: 'top' | 'bottom'; // Posición del título (por defecto 'top')
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
// Funciones para dibujar diferentes tipos de agujas
const drawNeedleStyles = {
  default: (ctx: CanvasRenderingContext2D, length: number, width: number, color: string) => {
    // Aguja simple (línea recta)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
  },

  arrow: (ctx: CanvasRenderingContext2D, length: number, width: number, color: string) => {
    // Aguja con punta de flecha
    const arrowSize = width * 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length - arrowSize, 0);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();

    // Punta de flecha
    ctx.beginPath();
    ctx.moveTo(length - arrowSize, -arrowSize / 2);
    ctx.lineTo(length, 0);
    ctx.lineTo(length - arrowSize, arrowSize / 2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  },

  triangle: (ctx: CanvasRenderingContext2D, length: number, width: number, color: string) => {
    // Aguja triangular completa
    ctx.beginPath();
    ctx.moveTo(0, -width / 2);
    ctx.lineTo(length, 0);
    ctx.lineTo(0, width / 2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  },

  diamond: (ctx: CanvasRenderingContext2D, length: number, width: number, color: string) => {
    // Aguja en forma de diamante
    const midPoint = length * 0.7;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(midPoint, -width / 2);
    ctx.lineTo(length, 0);
    ctx.lineTo(midPoint, width / 2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  },

  modern: (ctx: CanvasRenderingContext2D, length: number, width: number, color: string) => {
    // Aguja moderna con gradiente
    const gradient = ctx.createLinearGradient(0, 0, length, 0);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, color + '80'); // Semi-transparente al final

    ctx.beginPath();
    ctx.moveTo(0, -width / 3);
    ctx.lineTo(length * 0.8, -width / 4);
    ctx.lineTo(length, 0);
    ctx.lineTo(length * 0.8, width / 4);
    ctx.lineTo(0, width / 3);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
  },

  minimal: (ctx: CanvasRenderingContext2D, length: number, width: number, color: string) => {
    // Aguja minimalista (línea fina con punto)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length * 0.95, 0);
    ctx.lineWidth = width * 0.5;
    ctx.strokeStyle = color;
    ctx.stroke();

    // Punto al final
    ctx.beginPath();
    ctx.arc(length * 0.95, 0, width, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  },
};

// Plugin mejorado para dibujar la aguja del gauge
const needlePlugin = {
  id: 'needle',
  afterDatasetDraw(chart: any, args: any, options: any) {
    const { needleValue, maxValue, needleStyle = 'default', needleColor = '#000', needleWidth = 2, needleLength = 0.9 } = options;

    const angle = Math.PI + (Math.PI * needleValue) / maxValue;

    const cx = chart._metasets[0].data[0].x;
    const cy = chart._metasets[0].data[0].y;
    const r = chart._metasets[0].data[0].outerRadius;

    const length = r * needleLength;
    const needleRadius = Math.max(needleWidth + 2, 5); // Círculo base más grande y mínimo de 5px

    const ctx = chart.ctx;
    ctx.save();

    ctx.translate(cx, cy);
    ctx.rotate(angle);

    // Dibujar la aguja según el estilo seleccionado
    drawNeedleStyles[needleStyle as keyof typeof drawNeedleStyles](ctx, length, needleWidth, needleColor);

    // Centro de la aguja (círculo base) - más prominente
    ctx.beginPath();
    ctx.arc(0, 0, needleRadius, 0, Math.PI * 2);
    ctx.fillStyle = needleColor;
    ctx.fill();

    // Añadir un borde al círculo base para mejor visibilidad
    ctx.beginPath();
    ctx.arc(0, 0, needleRadius, 0, Math.PI * 2);
    ctx.strokeStyle = needleColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  },
};

// Registrar el plugin de la aguja
ChartJS.register(needlePlugin);

// Componente CardIndicadores
interface CardIndicadoresComponentProps {
  indicadores: Array<{
    icono: string;
    nombre: string;
    valor: string | number;
    isPercent?: boolean;
    iconoColor?: string;
    iconoTamano?: number; // Solo número, no string
    nombreColor?: string;
    nombreTamano?: number; // Solo número, no string
    valorColor?: string;
    valorTamano?: number; // Solo número, no string
  }>;
  alineacion?: 'left' | 'center' | 'right' | 'justify';
  ancho?: string | number;
  padding?: number | string;
  backgroundColor?: string;
  borderRadius?: number | string;
  border?: string;
  columnGap?: number; // Espaciado entre columnas para modo justify
  className?: string;
  style?: React.CSSProperties;
}

const CardIndicadores: React.FC<CardIndicadoresComponentProps> = ({
  indicadores,
  alineacion = 'left',
  ancho = '100%',
  padding = 0,
  backgroundColor = 'transparent',
  borderRadius = 0,
  border = 'none',
  columnGap = 16,
  className = '',
  style = {},
}) => {
  const [containerWidth, setContainerWidth] = useState<number>(320); // Ancho por defecto
  const containerRef = useRef<HTMLDivElement>(null);

  // ResizeObserver para monitorear el tamaño del contenedor
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setContainerWidth(width);
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Función auxiliar para convertir tamaños de iconos a responsive basado en el ancho real del contenedor
  const getResponsiveSize = (size: number | undefined, defaultSize: number): string => {
    const numSize = typeof size === 'number' ? size : defaultSize;

    // Factor de escala basado en el ancho del contenedor
    // Contenedor de 320px = factor 1, escalando proporcionalmente
    const scaleFactor = Math.min(Math.max(containerWidth / 320, 0.5), 2); // Entre 0.5x y 2x
    const scaledSize = numSize * scaleFactor;

    // Convertir a rem (asumiendo 16px = 1rem)
    const remSize = scaledSize / 16;
    const minSize = Math.max(0.75, remSize * 0.7);
    const maxSize = remSize * 1.3;

    return `clamp(${minSize}rem, ${remSize}rem, ${maxSize}rem)`;
  };

  // Función auxiliar para convertir tamaños de texto a responsive basado en el ancho real del contenedor
  const getResponsiveTextSize = (size: number | undefined, defaultSize: number): string => {
    const numSize = typeof size === 'number' ? size : defaultSize;

    // Factor de escala basado en el ancho del contenedor
    const scaleFactor = Math.min(Math.max(containerWidth / 320, 0.6), 1.8); // Entre 0.6x y 1.8x
    const scaledSize = numSize * scaleFactor;

    // Convertir a rem
    const remSize = scaledSize / 16;
    const minSize = Math.max(0.625, remSize * 0.8);
    const maxSize = remSize * 1.2;

    return `clamp(${minSize}rem, ${remSize}rem, ${maxSize}rem)`;
  };

  const containerStyle: React.CSSProperties = {
    width: typeof ancho === 'number' ? `${ancho}%` : ancho,
    padding: typeof padding === 'number' ? `${padding * 0.25}rem` : padding,
    backgroundColor,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius * 0.0625}rem` : borderRadius,
    border,
    // Contenedor principal - sin overflow
    overflow: 'hidden',
    boxSizing: 'border-box',
    ...style,
  };

  // Estilos para el contenedor interno (95% del ancho)
  const innerContainerStyle: React.CSSProperties = {
    width: '95%',
    maxWidth: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
  };

  const getAlineacionStyle = (): React.CSSProperties => {
    switch (alineacion) {
      case 'center':
        return { textAlign: 'center', justifyContent: 'center' };
      case 'right':
        return { textAlign: 'right', justifyContent: 'flex-end' };
      case 'justify':
        return {
          display: 'grid',
          gridTemplateColumns: `auto 1fr auto`,
          gap: `clamp(0.5rem, ${columnGap * 0.0625}rem, 2rem)`, // Gap responsive
          alignContent: 'space-around',
          alignItems: 'center',
        };
      default:
        return { textAlign: 'left', justifyContent: 'flex-start' };
    }
  };

  // Renderizado para modo justify (formato de tabla con columnas)
  if (alineacion === 'justify') {
    return (
      <div ref={containerRef} className={`card-indicadores ${className}`} style={containerStyle}>
        <div style={innerContainerStyle}>
          {indicadores.map((indicador, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: `auto 1fr auto`,
                gap: `clamp(0.25rem, ${columnGap * 0.0625}rem, 1rem)`, // Gap más conservador
                alignItems: 'center',
                marginBottom: index < indicadores.length - 1 ? `${Math.max(4, containerWidth * 0.01)}px` : '0',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              {/* Columna 1: Ícono */}
              <span
                className="material-icons"
                style={{
                  fontSize: getResponsiveSize(indicador.iconoTamano, 20),
                  color: indicador.iconoColor || '#666666',
                  lineHeight: 1,
                  justifySelf: 'start',
                  flexShrink: 0,
                }}
              >
                {indicador.icono}
              </span>

              {/* Columna 2: Nombre (ocupa el espacio disponible pero con límites) */}
              <span
                style={{
                  fontSize: getResponsiveTextSize(indicador.nombreTamano, 14),
                  color: indicador.nombreColor || '#000000',
                  fontWeight: 500,
                  justifySelf: 'start',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  minWidth: 0, // Permite que el flex item se encoja
                }}
              >
                {indicador.nombre}
              </span>

              {/* Columna 3: Valor */}
              <span
                style={{
                  fontSize: getResponsiveTextSize(indicador.valorTamano, 14),
                  color: indicador.valorColor || '#000000',
                  fontWeight: 600,
                  justifySelf: 'end',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                {indicador.valor}
                {indicador.isPercent ? '%' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Renderizado para modos tradicionales (left, center, right)
  return (
    <div ref={containerRef} className={`card-indicadores ${className}`} style={containerStyle}>
      <div style={innerContainerStyle}>
        {indicadores.map((indicador, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: index < indicadores.length - 1 ? `${Math.max(4, containerWidth * 0.01)}px` : '0',
              width: '100%',
              boxSizing: 'border-box',
              ...getAlineacionStyle(),
            }}
          >
            {/* Ícono de Material Icons */}
            <span
              className="material-icons"
              style={{
                fontSize: getResponsiveSize(indicador.iconoTamano, 20),
                color: indicador.iconoColor || '#666666',
                marginRight: `${Math.max(2, containerWidth * 0.005)}px`,
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              {indicador.icono}
            </span>

            {/* Nombre del indicador */}
            <span
              style={{
                fontSize: getResponsiveTextSize(indicador.nombreTamano, 14),
                color: indicador.nombreColor || '#000000',
                marginRight: `${Math.max(2, containerWidth * 0.005)}px`,
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                minWidth: 0,
                flex: 1,
              }}
            >
              {indicador.nombre}
            </span>

            {/* Valor del indicador */}
            <span
              style={{
                fontSize: getResponsiveTextSize(indicador.valorTamano, 14),
                color: indicador.valorColor || '#000000',
                fontWeight: 600,
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              {indicador.valor}
              {indicador.isPercent ? '%' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente ProgresoVertical
interface ProgresoVerticalComponentProps {
  valor: number;
  minimo?: number;
  maximo?: number;
  isPercent?: boolean;
  symbol?: string;
  symbolPosition?: 'before' | 'after';
  colorBar?: string;
  backgroundColor?: string;
  subdivisions?: number;
  showSubdivisions?: boolean;
  subdivisionColor?: string;
  barWidth?: number;
  height?: number;
  showValue?: boolean;
  valuePosition?: 'top' | 'center' | 'bottom';
  valueColor?: string;
  valueFontSize?: number;
  borderRadius?: number;
  containerStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
  /** Mostrar u ocultar los valores de cada división (Y axis) */
  showDivisionValues?: boolean;
  /** Configuración del título */
  showTitle?: boolean; // Mostrar u ocultar el título (por defecto false)
  title?: string; // Texto del título
  titleColor?: string; // Color del título (por defecto '#333333')
  titleFontSize?: number; // Tamaño de fuente del título (por defecto 18)
  titlePosition?: 'top' | 'bottom'; // Posición del título (por defecto 'top')
}

const ProgresoVertical: React.FC<ProgresoVerticalComponentProps> = ({
  valor,
  minimo = 0,
  maximo = 100,
  isPercent = true,
  symbol = '',
  symbolPosition = 'after',
  colorBar = '#4CAF50',
  backgroundColor = 'transparent',
  subdivisions = 10,
  showSubdivisions = true,
  subdivisionColor = '#CCCCCC',
  barWidth = 40,
  height = 300,
  showValue = true,
  valuePosition = 'top',
  valueColor = '#333333',
  valueFontSize = 14,
  borderRadius = 4,
  containerStyle = {},
  className = '',
  style = {},
  showDivisionValues = false,
  showTitle = false,
  title = '',
  titleColor = '#333333',
  titleFontSize = 18,
  titlePosition = 'top'
}) => {
  // Calcular el porcentaje de llenado
  const porcentajeLlenado = Math.min(Math.max(((valor - minimo) / (maximo - minimo)) * 100, 0), 100);
  
  // Formatear el valor mostrado
  const formatearValor = () => {
    if (isPercent) {
      // Mostrar el valor actual con símbolo de porcentaje
      return `${valor}%`;
    } else {
      return symbolPosition === 'before' ? `${symbol}${valor}` : `${valor}${symbol}`;
    }
  };

  // Generar las subdivisiones
  const generarSubdivisiones = () => {
    if (!showSubdivisions || subdivisions <= 0) return [];
    
    const subdivisiones = [];
    const paso = 100 / subdivisions;
    
    for (let i = 1; i < subdivisions; i++) {
      const posicion = i * paso;
      subdivisiones.push(posicion);
    }
    
    return subdivisiones;
  };

  // Generar todas las posiciones de división incluyendo extremos (para showDivisionValues)
  const generarTodasLasDivisiones = () => {
    if (subdivisions <= 0) return [];
    
    const divisiones = [];
    const paso = 100 / subdivisions;
    
    // Incluir todos los valores desde 0 hasta el máximo
    for (let i = 0; i <= subdivisions; i++) {
      const posicion = i * paso;
      divisiones.push(posicion);
    }
    
    return divisiones;
  };

  // Estilos del contenedor principal
  const estilosContenedor: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto', // Espacio extra para labels
    width: '100%', // Espacio extra para labels laterales
    position: 'relative',
    ...containerStyle,
    ...style
  };

  // Estilos de la barra contenedora
  const estilosBarraContenedora: React.CSSProperties = {
    width: `${barWidth}px`,
    height: `${height}px`,
    backgroundColor: backgroundColor,
    borderRadius: `${borderRadius}px`,
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #DDDDDD'
  };

  // Estilos de la barra de relleno
  const estilosBarraRelleno: React.CSSProperties = {
    width: '100%',
    height: `${porcentajeLlenado}%`,
    backgroundColor: colorBar,
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderRadius: `0 0 ${borderRadius}px ${borderRadius}px`,
    transition: 'height 0.3s ease-in-out'
  };

  // Estilos para las líneas de subdivisión
  const estilosSubdivision: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '1px',
    backgroundColor: subdivisionColor,
    left: 0
  };

  return (
    <div className={`progreso-vertical-container ${className}`} style={estilosContenedor}>
      {/* Título en la parte superior */}
      {showTitle && title && titlePosition === 'top' && (
        <div
          style={{
            fontSize: `${titleFontSize}px`,
            color: titleColor,
            fontWeight: '600',
            marginBottom: '16px',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            lineHeight: '1.2',
            letterSpacing: '-0.025em',
            width: '100%'
          }}
        >
          {title}
        </div>
      )}

      {/* Valor en la parte superior */}
      {showValue && valuePosition === 'top' && (
        <div
          style={{
            fontSize: `${valueFontSize}px`,
            color: valueColor,
            fontWeight: 'bold',
            marginBottom: '8px'
          }}
        >
          {formatearValor()}
        </div>
      )}

      {/* Contenedor de la barra */}
      <div style={{ position: 'relative' }}>
        <div style={estilosBarraContenedora}>
          {/* Barra de relleno */}
          <div style={estilosBarraRelleno} />
          
          {/* Líneas de subdivisión (solo intermedias) */}
          {generarSubdivisiones().map((posicion, index) => (
            <div
              key={`subdivision-${index}`}
              style={{
                ...estilosSubdivision,
                bottom: `${posicion}%`
              }}
            />
          ))}
        </div>

        {/* Valores de todas las divisiones cuando showDivisionValues está activo */}
        {showDivisionValues && generarTodasLasDivisiones().map((posicion, index) => {
          // Calcular el valor real correspondiente a esta posición
          const valorEnPosicion = minimo + (maximo - minimo) * (posicion / 100);
          
          return (
            <div
              key={`division-value-${index}`}
              style={{
                position: 'absolute',
                left: -8,
                bottom: `${posicion}%`,
                fontSize: `12px`,
                color: '#666666',
                transform: 'translate(-100%, 50%)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {isPercent
                ? `${Math.round(((valorEnPosicion - minimo) / (maximo - minimo)) * 100)}%`
                : symbolPosition === 'before'
                  ? `${symbol}${Math.round(valorEnPosicion)}`
                  : `${Math.round(valorEnPosicion)}${symbol}`}
            </div>
          );
        })}

        {/* Valor en el centro */}
        {showValue && valuePosition === 'center' && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: `${valueFontSize}px`,
              color: valueColor,
              fontWeight: 'bold',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '4px 8px',
              borderRadius: '4px',
              zIndex: 1
            }}
          >
            {formatearValor()}
          </div>
        )}
      </div>

      {/* Valor en la parte inferior */}
      {showValue && valuePosition === 'bottom' && (
        <div
          style={{
            fontSize: `${valueFontSize}px`,
            color: valueColor,
            fontWeight: 'bold',
            marginTop: '8px'
          }}
        >
          {formatearValor()}
        </div>
      )}

      {/* Título en la parte inferior */}
      {showTitle && title && titlePosition === 'bottom' && (
        <div
          style={{
            fontSize: `${titleFontSize}px`,
            color: titleColor,
            fontWeight: '600',
            marginTop: '16px',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            lineHeight: '1.2',
            letterSpacing: '-0.025em'
          }}
        >
          {title}
        </div>
      )}
    </div>
  );
};

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
  // Gauge usa el componente Doughnut con configuración especial
  gauge: Doughnut,
  // CardIndicadores no usa chartComponents, se maneja por separado
  cardIndicadores: null,
  // ProgresoVertical no usa chartComponents, se maneja por separado
  progresoVertical: null,
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
  gaugeProps,
  cardIndicadoresProps,
  progresoVerticalProps,
  ...otherProps
}) => {
  // Manejar componente Card por separado
  if (tipo === 'card') {
    return (
      <Card
        title={cardProps.title || 'Total Revenue'}
        value={cardProps.value || '$48,329'}
        change={cardProps.change || '+12.5%'}
        icon={cardProps.icon || '💹'}
        colorScheme={cardProps.colorScheme || 'success'}
        showBorder={cardProps.showBorder !== undefined ? cardProps.showBorder : true}
        borderColor={cardProps.borderColor || '#e5e7eb'}
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

  // Manejar componente CardIndicadores por separado
  if (tipo === 'cardIndicadores') {
    if (!cardIndicadoresProps || !cardIndicadoresProps.indicadores) {
      console.error('CardIndicadores requiere la prop cardIndicadoresProps con indicadores');
      return <div>Error: CardIndicadores requiere datos de indicadores</div>;
    }

    return (
      <CardIndicadores
        indicadores={cardIndicadoresProps.indicadores}
        alineacion={cardIndicadoresProps.alineacion || 'left'}
        ancho={cardIndicadoresProps.ancho || '100%'}
        padding={cardIndicadoresProps.padding || 0}
        backgroundColor={cardIndicadoresProps.backgroundColor || 'transparent'}
        borderRadius={cardIndicadoresProps.borderRadius || 0}
        border={cardIndicadoresProps.border || 'none'}
        columnGap={cardIndicadoresProps.columnGap || 16}
        className={className}
        style={style}
        {...otherProps}
      />
    );
  }

  // Manejar componente ProgresoVertical por separado
  if (tipo === 'progresoVertical') {
    if (!progresoVerticalProps || progresoVerticalProps.valor === undefined) {
      console.error('ProgresoVertical requiere la prop progresoVerticalProps con valor');
      return <div>Error: ProgresoVertical requiere la propiedad valor</div>;
    }

    // Extraer opciones de título de las opciones generales si están disponibles
    const titleFromOptions = options?.plugins?.title;
    const shouldShowTitle = progresoVerticalProps.showTitle ?? (titleFromOptions?.display ?? false);
    const titleText = progresoVerticalProps.title || titleFromOptions?.text || '';

    return (
      <ProgresoVertical
        valor={progresoVerticalProps.valor}
        minimo={progresoVerticalProps.minimo || 0}
        maximo={progresoVerticalProps.maximo || 100}
        isPercent={progresoVerticalProps.isPercent ?? true}
        symbol={progresoVerticalProps.symbol || ''}
        symbolPosition={progresoVerticalProps.symbolPosition || 'after'}
        colorBar={progresoVerticalProps.colorBar || '#4CAF50'}
        backgroundColor={progresoVerticalProps.backgroundColor || 'transparent'}
        subdivisions={progresoVerticalProps.subdivisions || 10}
        showSubdivisions={progresoVerticalProps.showSubdivisions ?? true}
        subdivisionColor={progresoVerticalProps.subdivisionColor || '#CCCCCC'}
        barWidth={progresoVerticalProps.barWidth || 40}
        height={progresoVerticalProps.height || 300}
        showValue={progresoVerticalProps.showValue ?? true}
        valuePosition={progresoVerticalProps.valuePosition || 'top'}
        valueColor={progresoVerticalProps.valueColor || '#333333'}
        valueFontSize={progresoVerticalProps.valueFontSize || 14}
        borderRadius={progresoVerticalProps.borderRadius || 4}
        containerStyle={progresoVerticalProps.containerStyle || {}}
        showDivisionValues={progresoVerticalProps.showDivisionValues ?? false}
        showTitle={shouldShowTitle}
        title={titleText}
        titleColor={progresoVerticalProps.titleColor || '#333333'}
        titleFontSize={progresoVerticalProps.titleFontSize || 18}
        titlePosition={progresoVerticalProps.titlePosition || 'top'}
        className={className}
        style={style}
        {...otherProps}
      />
    );
  }

  // Validar que el tipo de gráfico sea válido para gráficos normales
  const ChartComponent = chartComponents[tipo as keyof typeof chartComponents];

  const safeData: DatosGrafico | undefined = ChartComponent && data?.datasets?.length ? data : undefined;

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

  // Configuración especial para el gauge
  if (tipo === 'gauge' && gaugeProps) {
    const {
      ranges,
      value,
      originalValue,
      showLabels = mostrarEtiquetas,
      isPercent,
      label,
      width: gaugeWidth,
      showValue = false,
      valueColor = '#333333',
      valueFontSize = 24,
      containerStyle = {},
      showSymbol = false,
      symbol = '$',
      symbolPosition = 'before',
      showMinMax = true, // Por defecto mostrar min/max
      minMaxColor,
      minMaxFontSize,
      // Nuevas propiedades para la aguja
      needleStyle = 'default',
      needleColor = '#000000',
      needleWidth = 2,
      needleLength = 0.9,
    } = gaugeProps;
    const max = ranges[ranges.length - 1].to;

    // Valor limitado para la aguja del gauge (no debe exceder el rango máximo)
    const limitedValue = Math.min(value, max);

    const segments = ranges.map((r) => ({
      value: r.to - r.from,
      color: r.color,
      from: r.from,
      to: r.to,
    }));

    const total = segments.reduce((sum, s) => sum + s.value, 0);
    const dataValues = segments.map((s) => s.value / total);
    const colors = segments.map((s) => s.color);
    // Generar etiquetas con o sin símbolo de porcentaje según isPercent
    const labels = segments.map((s) => {
      if (isPercent) {
        return `${s.from}% - ${s.to}%`;
      } else {
        return `${s.from}-${s.to}`;
      }
    });

    data = {
      labels: labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: colors,
          borderWidth: 0,
          cutout: '80%',
          circumference: 180,
          rotation: 270,
        },
      ],
    };

    // Configuración específica del gauge - evitar conflictos con datalabels generales
    const finalOptions = {
      rotation: -90,
      circumference: 180,
      cutout: '80%',
      responsive: options.responsive ?? true,
      maintainAspectRatio: options.maintainAspectRatio ?? false,
      layout: {
        padding: {
          bottom: 40, // Espacio extra en la parte inferior para ver la aguja
          top: 10,
          left: 10,
          right: 10,
        },
      },
      plugins: {
        legend: {
          display: options.plugins?.legend?.display ?? true,
          position: options.plugins?.legend?.position ?? 'top',
        },
        title: {
          display: options.plugins?.title?.display ?? false,
          text: options.plugins?.title?.text ?? label ?? '',
        },
        tooltip: {
          enabled: options.plugins?.tooltip?.enabled ?? false,
          callbacks: {
            label: function (context: any) {
              const dataIndex = context.dataIndex;
              if (dataIndex !== undefined && labels[dataIndex]) {
                return labels[dataIndex];
              }
              return '';
            },
          },
        },
        datalabels: showLabels
          ? {
              display: true,
              color: configEtiquetas?.color || '#333333',
              backgroundColor: configEtiquetas?.backgroundColor || '#f5f5f5',
              borderColor: configEtiquetas?.borderColor || '#d0d0d0',
              borderRadius: configEtiquetas?.borderRadius || 6,
              borderWidth: 1,
              padding: configEtiquetas?.padding || 8,
              z: 9999, // Z-index muy alto para que esté por encima de todo
              font: {
                size: configEtiquetas?.fontSize || 25,
                family: configEtiquetas?.fontFamily || 'Arial, sans-serif',
                weight: configEtiquetas?.fontWeight || 500,
              },
              // Posicionamiento inteligente según la posición de la etiqueta
              anchor: (context: { dataIndex?: number }) => {
                if (context && typeof context.dataIndex === 'number') {
                  const totalSegments = labels.length;
                  const index = context.dataIndex;

                  // Primera etiqueta (extremo izquierdo): anclaje a la derecha para que no se salga por la izquierda
                  if (index === 0) return 'end';

                  // Última etiqueta (extremo derecho): anclaje a la izquierda para que no se salga por la derecha
                  if (index === totalSegments - 1) return 'start';

                  // Etiquetas del medio: centrado normal
                  return 'center';
                }
                return 'center';
              },
              align: (context: { dataIndex?: number }) => {
                if (context && typeof context.dataIndex === 'number') {
                  const totalSegments = labels.length;
                  const index = context.dataIndex;

                  // Ajustar alineación para etiquetas extremas
                  if (index === 0) return 'end'; // Primera etiqueta hacia adentro
                  if (index === totalSegments - 1) return 'start'; // Última etiqueta hacia adentro

                  return 'center'; // Etiquetas del medio centradas
                }
                return 'center';
              },
              offset: (context: { dataIndex?: number }) => {
                if (context && typeof context.dataIndex === 'number') {
                  const totalSegments = labels.length;
                  const index = context.dataIndex;

                  // Ajustar offset para etiquetas extremas para que no toquen el borde
                  if (index === 0 || index === totalSegments - 1) {
                    return 10; // Mayor offset para las etiquetas extremas
                  }

                  return 0; // Sin offset para etiquetas centrales
                }
                return 0;
              },
              formatter: (_value: any, context: { dataIndex?: number }) => {
                if (context && typeof context.dataIndex === 'number' && labels[context.dataIndex]) {
                  return labels[context.dataIndex];
                }
                return '';
              },
            }
          : { display: false },
        needle: {
          needleValue: limitedValue, // Usar valor limitado para la aguja
          maxValue: max,
          needleStyle: needleStyle,
          needleColor: needleColor,
          needleWidth: needleWidth,
          needleLength: needleLength,
        },
      },
    };

    // Calcular dimensiones responsive para mantener proporciones
    const containerWidth = typeof width === 'string' && width.includes('px') ? parseInt(width.replace('px', '')) : typeof width === 'number' ? width : 931; // Ancho de referencia donde se ve perfecto

    // Calcular factor de escala basado en el ancho de referencia (931px)
    const scaleFactor = containerWidth / 931;

    // Altura proporcional manteniendo aspect ratio del diseño perfecto
    const proportionalHeight = Math.max(200, 300 * scaleFactor);

    // Offset vertical responsive basado únicamente en el tamaño del contenedor
    const getVerticalOffsetByContainer = (scaleFactor: number) => {
      return 210 + 80 * scaleFactor; // Escalado más agresivo sin Math.min
    };

    // Posiciones horizontales responsive para valores min/max basado en el tamaño del contenedor
    const getHorizontalPositionsByContainer = () => {
      return {
        minLeft: '9%',
        maxLeft: '93%',
      };
    };

    const verticalOffset = getVerticalOffsetByContainer(scaleFactor);
    const horizontalPositions = getHorizontalPositionsByContainer();

    // Estilos del contenedor específicos para gauge con valores por defecto transparentes
    const defaultContainerStyle: React.CSSProperties = {
      width: width || '100%',
      height: height || `${proportionalHeight + 40}px`, // Añadir 40px extra para la aguja
      backgroundColor: 'transparent', // Por defecto transparente
      borderRadius: 0, // Por defecto sin border radius
      border: 'none', // Por defecto sin borde
      padding: '0 0 30px 0', // Padding inferior para dar espacio a la aguja
      position: 'relative', // Para permitir posicionamiento de etiquetas
      zIndex: 1, // Z-index alto para el contenedor
      overflow: 'visible', // Cambiar a visible para que se vea la aguja
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start', // Alinear al inicio para dar espacio abajo
      ...style,
    };

    // Aplicar estilos personalizados del containerStyle si se proporcionan
    if (containerStyle.backgroundColor !== undefined) {
      defaultContainerStyle.backgroundColor = containerStyle.backgroundColor;
    }
    if (containerStyle.borderRadius !== undefined) {
      defaultContainerStyle.borderRadius = `${containerStyle.borderRadius}px`;
    }
    if (containerStyle.border !== undefined) {
      defaultContainerStyle.border = containerStyle.border;
    }
    if (containerStyle.padding !== undefined) {
      defaultContainerStyle.padding = `${containerStyle.padding}px`;
    }

    if (gaugeWidth) {
      defaultContainerStyle.maxWidth = gaugeWidth;
    }

    return (
      <div className={`grafico-container flex flex-row md:flex-col ${className}`} style={defaultContainerStyle} data-chart-type={tipo}>
        <div
          style={{
            paddingBottom: '20px', // Espacio extra para la base de la aguja
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChartComponent data={data} options={finalOptions as any} {...otherProps} />
        </div>

        {/* Valores mínimo y máximo en los extremos del semicírculo */}
        {showMinMax && (
          <>
            {/* Valor mínimo (lado izquierdo del semicírculo) */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: horizontalPositions.minLeft,
                transform: `translate(-50%, ${verticalOffset}%)`, // Offset proporcional
                fontSize: `${minMaxFontSize || Math.max(12, valueFontSize * 0.6)}rem`,
                fontWeight: '500',
                color: minMaxColor || valueColor,
                textAlign: 'center',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              {(() => {
                const minValue = ranges[0].from;

                if (isPercent) {
                  return `${minValue}%`;
                } else if (showSymbol) {
                  return symbolPosition === 'before' ? `${symbol}${minValue}` : `${minValue}${symbol}`;
                } else {
                  return minValue;
                }
              })()}
            </div>

            {/* Valor máximo (lado derecho del semicírculo) */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: horizontalPositions.maxLeft,
                transform: `translate(-50%, ${verticalOffset}%)`, // Offset proporcional - ambos usan -50% para centrado perfecto
                fontSize: `${minMaxFontSize || Math.max(12, valueFontSize * 0.6)}rem`,
                fontWeight: '500',
                color: minMaxColor || valueColor,
                textAlign: 'center',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              {(() => {
                const maxValue = ranges[ranges.length - 1].to;

                if (isPercent) {
                  return `${maxValue}%`;
                } else if (showSymbol) {
                  return symbolPosition === 'before' ? `${symbol}${maxValue}` : `${maxValue}${symbol}`;
                } else {
                  return maxValue;
                }
              })()}
            </div>
          </>
        )}

        {showValue && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, 70%)', // Al mismo nivel que los valores min/max, pero un poco más arriba
              fontSize: `${valueFontSize}rem`,
              fontWeight: 'bold',
              color: valueColor,
              textAlign: 'center',
              pointerEvents: 'none',
              zIndex: 1, // Z-index muy alto, mayor que las etiquetas
            }}
          >
            {(() => {
              const displayValue = originalValue !== undefined ? originalValue : value;

              if (isPercent) {
                // Modo porcentaje
                return `${displayValue}%`;
              } else {
                // Modo no porcentaje
                if (showSymbol) {
                  // Con símbolo personalizado
                  return symbolPosition === 'before' ? `${symbol}${displayValue}` : `${displayValue}${symbol}`;
                } else {
                  // Sin símbolo
                  return displayValue;
                }
              }
            })()}
          </div>
        )}
      </div>
    );
  }

  // Obtener opciones específicas del tipo de gráfico
  const specificOptions = getSpecificOptions(tipo, options);

  // Configuración de etiquetas de datos con valores predeterminados optimizados
  // No aplicar a gauge ya que tiene su propia configuración
  const dataLabelsConfig =
    mostrarEtiquetas && tipo !== 'gauge'
      ? {
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
              ...(tipo === 'bar' || tipo === 'barrasAgrupadas' || tipo === 'barrasApiladas'
                ? {
                    anchor: 'end',
                    align: 'end',
                    offset: 4,
                  }
                : {}),
              ...(tipo === 'horizontalBar'
                ? {
                    anchor: 'end',
                    align: 'start',
                    offset: 4,
                  }
                : {}),
              ...(tipo === 'pie' || tipo === 'doughnut'
                ? {
                    align: 'center',
                    anchor: 'center',
                    offset: 0,
                    padding: 6,
                    font: {
                      size: configEtiquetas.fontSize || 11,
                      family: configEtiquetas.fontFamily || 'Arial, sans-serif',
                      weight: configEtiquetas.fontWeight || 500,
                    },
                  }
                : {}),
              ...(tipo === 'polarArea'
                ? {
                    align: 'center',
                    anchor: 'center',
                    offset: 0,
                    padding: 6,
                  }
                : {}),
              ...(tipo === 'radar'
                ? {
                    padding: 6,
                  }
                : {}),
              ...(tipo === 'line' || tipo === 'area'
                ? {
                    anchor: 'end',
                    align: 'top',
                    offset: 4,
                  }
                : {}),
              formatter: function (value: any, context: any) {
                const decimales = configEtiquetas.decimales || 1;
                const formato = configEtiquetas.formatoNumero || 'default';
                const isPercent = configEtiquetas.isPercent || false;

                // Para gráficos de coordenadas (scatter, bubble)
                if (tipo === 'scatter') {
                  const displayValue = isPercent ? `(${value.x}%, ${value.y}%)` : `(${value.x}, ${value.y})`;
                  return displayValue;
                }
                if (tipo === 'bubble') {
                  const displayValue = isPercent ? `(${value.x}%, ${value.y}%, ${value.r}%)` : `(${value.x}, ${value.y}, ${value.r})`;
                  return displayValue;
                }

                // Para gráficos circulares (pie, doughnut)
                if ((tipo === 'pie' || tipo === 'doughnut') && configEtiquetas.mostrarPorcentaje !== false) {
                  const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(decimales);
                  const valueDisplay = isPercent ? `${value}%` : value;
                  return `${valueDisplay}\n(${percentage}%)`;
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

                // Agregar símbolo de porcentaje si isPercent es true y formato no es 'percent'
                if (isPercent && formato !== 'percent') {
                  formattedValue = `${formattedValue}%`;
                }

                return formattedValue;
              },
            },
          },
        }
      : {};

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
      // Configuración de tooltips para manejar isPercent
      tooltip: {
        ...defaultOptions.plugins?.tooltip,
        ...specificOptions.plugins?.tooltip,
        ...options.plugins?.tooltip,
        callbacks: {
          ...options.plugins?.tooltip?.callbacks,
          label: function (context: any) {
            // Si el usuario ya definió su propio callback, usarlo
            if (options.plugins?.tooltip?.callbacks?.label) {
              return options.plugins.tooltip.callbacks.label(context);
            }

            const isPercent = configEtiquetas?.isPercent || false;
            const value = context.parsed?.y !== undefined ? context.parsed.y : context.parsed;
            const datasetLabel = context.dataset.label || '';

            // Formatear el valor base
            let formattedValue = value;
            const decimales = configEtiquetas?.decimales || 1;
            const formato = configEtiquetas?.formatoNumero || 'default';

            // Aplicar formato según el tipo especificado
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
                if (typeof value === 'number') {
                  formattedValue = decimales === 0 ? Math.round(value).toString() : value.toFixed(decimales);
                }
            }

            // Agregar símbolo de porcentaje si isPercent es true y formato no es 'percent'
            if (isPercent && formato !== 'percent') {
              formattedValue = `${formattedValue}%`;
            }

            return datasetLabel ? `${datasetLabel}: ${formattedValue}` : formattedValue;
          },
        },
      },
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
    <div className={`grafico-container ${className}`} style={containerStyle} data-chart-type={tipo}>
      <ChartComponent
        data={safeData as any}
        options={finalOptions as any} // Temporal fix para los tipos de Chart.js
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
  valueFontSize = '10px',
  changeColor,
  changeFontSize = '13px',
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
    ...style,
  };

  // Estilos para el contenido izquierdo
  const contentStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  };

  // Estilos para el título (superior izquierda)
  const titleStyles: React.CSSProperties = {
    fontSize: titleFontSize,
    fontWeight: 500,
    color: titleColor,
    margin: 0,
    marginBottom: '4px',
    lineHeight: '1.2',
  };

  // Estilos para el valor principal (centro izquierda, más prominente)
  const valueStyles: React.CSSProperties = {
    fontSize: valueFontSize,
    fontWeight: 700,
    color: valueColor,
    margin: 0,
    marginBottom: change ? '2px' : 0,
    lineHeight: '1.0',
  };

  // Estilos para el cambio/valor opcional (abajo izquierda)
  const changeStyles: React.CSSProperties = {
    fontSize: changeFontSize,
    fontWeight: 600,
    margin: 0,
    lineHeight: '1.2',
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
    marginLeft: '12px',
  };

  // Función para obtener el color de fondo del icono según el esquema de color
  function getIconBackgroundColor() {
    const colorMap = {
      primary: 'rgba(59, 130, 246, 0.1)',
      success: 'rgba(5, 150, 105, 0.1)',
      warning: 'rgba(245, 158, 11, 0.1)',
      danger: 'rgba(220, 38, 38, 0.1)',
      info: 'rgba(14, 165, 233, 0.1)',
      secondary: 'rgba(107, 114, 128, 0.1)',
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
      secondary: '#6b7280',
    };
    return colorMap[colorScheme] || colorMap.primary;
  }

  return (
    <div className={className} style={cardStyles}>
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
              color: getChangeColor(),
            }}
          >
            {change}
          </p>
        )}
      </div>

      {/* Icono derecha centrado */}
      {icon && <div style={iconContainerStyles}>{icon}</div>}
    </div>
  );
};

export default Grafico;
