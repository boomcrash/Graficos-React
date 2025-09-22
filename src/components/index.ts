// Exportar el componente principal
export { default as Grafico } from './Graphics/Grafico';

// Exportar componente Card desde Grafico.tsx
export { 
  Card
} from './Graphics/Grafico';

// Exportar tipos desde GraficoInterfaces.ts
export type { 
  CardProps,
  DatosGrafico,
  TipoGrafico,
  OpcionesGrafico,
  ConfiguracionEtiquetas,
  GaugeProps,
  CardIndicadoresProps,
  ProgresoVerticalProps,
  GraficoProps
} from './Graphics/GraficoInterfaces';

// Exportar todos los datos de ejemplo
export * from './GraphicsData/datosEjemplo';
