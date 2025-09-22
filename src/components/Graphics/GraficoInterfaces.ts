import { 
  ChartConfiguration, 
  ChartData, 
  ChartDataset, 
  ChartOptions, 
  TooltipItem, 
  Plugin, 
  Chart,
  ScaleOptions,
  LegendItem,
  FontSpec,
  PointStyle,
  TextAlign,
  ChartArea,
  TooltipModel,
  TooltipLabelStyle,
  ActiveElement,
  InteractionMode
} from 'chart.js';
import React from 'react';

// ============= TIPOS BASE =============

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
  | 'progresoVertical';

// ============= INTERFACES PARA CHART.JS =============

export interface CustomChartDataset {
  data: number[];
  label?: string;
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
  pointRadius?: number;
  pointHoverRadius?: number;
  // Propiedades adicionales comunes
  borderDash?: number[];
  pointBackgroundColor?: string | string[];
  pointBorderColor?: string | string[];
  pointBorderWidth?: number | number[];
  lineTension?: number;
  stepped?: boolean | 'before' | 'after' | 'middle';
  spanGaps?: boolean | number;
  stack?: string;
  order?: number;
  skipNull?: boolean;
  drawActiveElementsOnTop?: boolean;
  type?: any; // Usar any para evitar conflictos complejos de tipos de Chart.js
  // Propiedades específicas para gráficos circulares
  cutout?: string | number;
  circumference?: number;
  rotation?: number;
  // Propiedades para Bubble charts
  borderSkipped?: boolean | 'start' | 'end' | 'middle' | 'bottom' | 'left' | 'top' | 'right';
  // Propiedades adicionales de Chart.js
  [key: string]: any; // Para permitir cualquier propiedad adicional específica de Chart.js
}

export interface DatosGrafico {
  labels?: string[];
  datasets: CustomChartDataset[];
}

// ============= INTERFACES PARA CONTEXTOS =============

export interface DataLabelsContext {
  dataIndex: number;
  dataset: CustomChartDataset;
  chart: Chart;
  active: boolean;
  mode: string;
}

export interface ChartContext extends Chart {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  _metasets?: Array<{
    data: Array<{
      x: number;
      y: number;
      outerRadius: number;
      innerRadius?: number;
    }>;
  }>;
}

export interface TooltipContext {
  dataIndex: number;
  dataset: CustomChartDataset;
  datasetIndex: number;
  label: string;
  formattedValue: string;
  parsed: {
    x?: number;
    y?: number;
    _custom?: number;
  };
  raw: number;
}

export interface ChartEvent {
  type: string;
  native?: Event;
  x?: number;
  y?: number;
}

// ============= INTERFACES PARA PLUGINS =============

export interface NeedlePluginOptions {
  needleValue: number;
  maxValue: number;
  needleColor?: string;
  needleWidth?: number;
  needleStyle?: 'default' | 'arrow' | 'triangle' | 'diamond' | 'modern' | 'minimal';
  needleLength?: number;
  centerColor?: string;
  centerRadius?: number;
}

export interface CustomPluginOptions {
  needle?: NeedlePluginOptions;
  datalabels?: DataLabelsOptions | false;
}

export interface DataLabelsOptions {
  display?: boolean;
  color?: string | ((context: DataLabelsContext) => string);
  font?: {
    weight?: string | number;
    size?: number;
    family?: string;
  };
  formatter?: (value: unknown, context: DataLabelsContext) => string;
  anchor?: 'start' | 'center' | 'end';
  align?: 'start' | 'center' | 'end' | 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
  rotation?: number;
  backgroundColor?: string | ((context: DataLabelsContext) => string);
  borderColor?: string | ((context: DataLabelsContext) => string);
  borderRadius?: number;
  padding?: number | {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  clip?: boolean;
  clamp?: boolean;
  opacity?: number;
}

// ============= INTERFACES PARA OPCIONES =============

export interface CustomLegendOptions {
  position?: 'top' | 'left' | 'bottom' | 'right';
  display?: boolean;
  align?: 'start' | 'center' | 'end';
  fullSize?: boolean;
  onClick?: (event: ChartEvent, legendItem: LegendItem, legend: unknown) => void;
  onHover?: (event: ChartEvent, legendItem: LegendItem, legend: unknown) => void;
  onLeave?: (event: ChartEvent, legendItem: LegendItem, legend: unknown) => void;
  reverse?: boolean;
  labels?: {
    boxWidth?: number;
    boxHeight?: number;
    color?: string;
    font?: FontSpec;
    padding?: number;
    generateLabels?: (chart: Chart) => LegendItem[];
    filter?: (legendItem: LegendItem, chartData: ChartData) => boolean;
    sort?: (a: LegendItem, b: LegendItem, chartData: ChartData) => number;
    pointStyle?: PointStyle;
    textAlign?: TextAlign;
    usePointStyle?: boolean;
  };
  rtl?: boolean;
  textDirection?: string;
  title?: {
    color?: string;
    display?: boolean;
    font?: FontSpec;
    padding?: number | ChartArea;
    text?: string;
  };
}

export interface CustomTitleOptions {
  display?: boolean;
  text?: string | string[];
  color?: string;
  font?: FontSpec;
  padding?: number | ChartArea;
  position?: 'top' | 'left' | 'bottom' | 'right';
}

export interface CustomTooltipOptions {
  enabled?: boolean;
  external?: (context: { chart: Chart; tooltip: TooltipModel<'bar' | 'line' | 'pie'> }) => void;
  mode?: InteractionMode;
  intersect?: boolean;
  position?: string;
  callbacks?: {
    beforeTitle?: (tooltipItems: TooltipItem<'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'scatter' | 'bubble'>[]) => string | string[];
    title?: (tooltipItems: TooltipItem<'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'scatter' | 'bubble'>[]) => string | string[];
    afterTitle?: (tooltipItems: TooltipItem<'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'scatter' | 'bubble'>[]) => string | string[];
    beforeBody?: (tooltipItems: TooltipItem<'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'scatter' | 'bubble'>[]) => string | string[];
    beforeLabel?: (tooltipItem: TooltipItem<'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'scatter' | 'bubble'>) => string | string[];
    label?: (tooltipItem: TooltipItem<'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'scatter' | 'bubble'>) => string | string[];
    labelColor?: (tooltipItem: TooltipItem<'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'scatter' | 'bubble'>) => TooltipLabelStyle;
    labelTextColor?: (tooltipItem: TooltipItem<'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'scatter' | 'bubble'>) => string;
    labelPointStyle?: (tooltipItem: TooltipItem<'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'scatter' | 'bubble'>) => PointStyle;
    afterLabel?: (tooltipItem: TooltipItem<'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'scatter' | 'bubble'>) => string | string[];
    afterBody?: (tooltipItems: TooltipItem<'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'scatter' | 'bubble'>[]) => string | string[];
    beforeFooter?: (tooltipItems: TooltipItem<'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'scatter' | 'bubble'>[]) => string | string[];
    footer?: (tooltipItems: TooltipItem<'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'scatter' | 'bubble'>[]) => string | string[];
    afterFooter?: (tooltipItems: TooltipItem<'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'scatter' | 'bubble'>[]) => string | string[];
  };
  backgroundColor?: string;
  titleColor?: string;
  titleFont?: FontSpec;
  titleAlign?: TextAlign;
  titleSpacing?: number;
  titleMarginBottom?: number;
  bodyColor?: string;
  bodyFont?: FontSpec;
  bodyAlign?: TextAlign;
  bodySpacing?: number;
  footerColor?: string;
  footerFont?: FontSpec;
  footerAlign?: TextAlign;
  footerSpacing?: number;
  footerMarginTop?: number;
  padding?: number | ChartArea;
  caretPadding?: number;
  caretSize?: number;
  cornerRadius?: number;
  multiKeyBackground?: string;
  displayColors?: boolean;
  boxWidth?: number;
  boxHeight?: number;
  boxPadding?: number;
  usePointStyle?: boolean;
  borderColor?: string;
  borderWidth?: number;
  rtl?: boolean;
  textDirection?: string;
  xAlign?: 'left' | 'center' | 'right';
  yAlign?: 'top' | 'center' | 'bottom';
}

export interface OpcionesGrafico {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  rotation?: number;
  circumference?: number;
  cutout?: string | number;
  indexAxis?: 'x' | 'y';
  plugins?: {
    legend?: CustomLegendOptions;
    title?: CustomTitleOptions;
    tooltip?: CustomTooltipOptions;
  } & CustomPluginOptions;
  scales?: Record<string, ScaleOptions>;
  animation?: boolean | Record<string, unknown>;
  layout?: {
    padding?: number | {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };
  };
  interaction?: {
    mode?: InteractionMode;
    intersect?: boolean;
    axis?: 'x' | 'y' | 'xy' | 'r';
    includeInvisible?: boolean;
  };
  hover?: {
    mode?: InteractionMode;
    intersect?: boolean;
    axis?: 'x' | 'y' | 'xy' | 'r';
    animationDuration?: number;
  };
  onHover?: (event: ChartEvent, activeElements: ActiveElement[], chart: Chart) => void;
  onClick?: (event: ChartEvent, activeElements: ActiveElement[], chart: Chart) => void;
  onResize?: (chart: Chart, size: { width: number; height: number }) => void;
  devicePixelRatio?: number;
  locale?: string;
  aspectRatio?: number;
  resizeDelay?: number;
}

// ============= INTERFACES PARA CONFIGURACIÓN DE ETIQUETAS =============

export interface ConfiguracionEtiquetas {
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string | number;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  padding?: number;
  anchor?: 'start' | 'center' | 'end';
  align?: 'start' | 'center' | 'end' | 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
  rotation?: number;
  mostrarPorcentaje?: boolean;
  formatoNumero?: 'default' | 'currency' | 'percent' | 'decimal';
  decimales?: number;
  isPercent?: boolean;
}

// ============= INTERFACES PARA PROPS DEL COMPONENTE =============

export interface CardProps {
  title?: string;
  value?: string | number;
  change?: string;
  icon?: React.ReactNode;
  colorScheme?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';
  showBorder?: boolean;
  borderColor?: string;
  titleColor?: string;
  titleFontSize?: string;
  valueColor?: string;
  valueFontSize?: string;
  changeColor?: string;
  changeFontSize?: string;
}

export interface GaugeRange {
  from: number;
  to: number;
  color: string;
}

export interface GaugeProps {
  ranges: GaugeRange[];
  value: number;
  originalValue?: number;
  width?: number;
  label?: string;
  showLabels?: boolean;
  isPercent?: boolean;
  showValue?: boolean;
  valueColor?: string;
  valueFontSize?: number;
  labelStyle?: {
    backgroundColor?: string;
    color?: string;
  };
  containerStyle?: {
    backgroundColor?: string;
    borderRadius?: number;
    border?: string;
    padding?: number;
  };
  // Nuevas props para símbolo personalizado
  showSymbol?: boolean;
  symbol?: string;
  symbolPosition?: 'before' | 'after';
  // Nuevas props para valores min/max en los extremos
  showMinMax?: boolean;
  minMaxColor?: string;
  minMaxFontSize?: number;
  // Props para personalización de la aguja/flecha
  needleStyle?: 'default' | 'arrow' | 'triangle' | 'diamond' | 'modern' | 'minimal';
  needleColor?: string;
  needleWidth?: number;
  needleLength?: number;
}

export interface CardIndicadoresProps {
  indicadores: Array<{
    icono: string;
    nombre: string;
    valor: string | number;
    isPercent?: boolean;
    iconoColor?: string;
    iconoTamano?: number;
    nombreColor?: string;
    nombreTamano?: number;
    valorColor?: string;
    valorTamano?: number;
  }>;
  alineacion?: 'left' | 'center' | 'right' | 'justify';
  ancho?: string | number;
  padding?: number | string;
  backgroundColor?: string;
  borderRadius?: number | string;
  border?: string;
  columnGap?: number;
}

export interface ProgresoVerticalProps {
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
  /** Mostrar u ocultar los valores de cada división (Y axis) */
  showDivisionValues?: boolean;
  /** Mostrar solo los valores mínimo y máximo (inicio y fin) */
  showMinMaxValues?: boolean;
  // Configuración del título
  showTitle?: boolean;
  title?: string;
  titleColor?: string;
  titleFontSize?: number;
  titlePosition?: 'top' | 'bottom';
}

export interface GraficoProps {
  tipo: TipoGrafico;
  data?: DatosGrafico;
  options?: OpcionesGrafico;
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  mostrarEtiquetas?: boolean;
  mostrarEjeX?: boolean;
  mostrarEjeY?: boolean;
  configEtiquetas?: ConfiguracionEtiquetas;
  cardProps?: CardProps;
  gaugeProps?: GaugeProps;
  cardIndicadoresProps?: CardIndicadoresProps;
  progresoVerticalProps?: ProgresoVerticalProps;
}

// ============= INTERFACES PARA PLUGINS PERSONALIZADOS =============

export interface NeedlePlugin extends Plugin<'doughnut'> {
  id: 'needle';
  afterDatasetDraw: (chart: ChartContext, args: { meta: { data: unknown[] } }, options: NeedlePluginOptions) => void;
}

export interface MetaData {
  data: Array<{
    x: number;
    y: number;
    startAngle: number;
    endAngle: number;
    circumference: number;
    outerRadius: number;
    innerRadius: number;
  }>;
}

export interface AfterDatasetDrawArgs {
  meta: MetaData;
}