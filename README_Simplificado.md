# Componente Simplificado - Librería de Gráficos

Esta es una versión simplificada de la librería de gráficos que incluye únicamente **3 componentes** esenciales:

## 🎯 Componentes Incluidos

### 1. **Gauge (Tacómetro)**
- Gráfico semicircular con aguja indicadora
- Soporte para múltiples rangos de colores
- Diferentes estilos de aguja (default, arrow, triangle, diamond, modern, minimal)
- Personalización completa de valores y colores

### 2. **Card de Indicadores** 
- Tarjetas informativas con iconos Material Icons
- Múltiples modos de alineación (left, center, right, justify)
- Soporte para valores numéricos y porcentuales
- Diseño responsive automático

### 3. **Progreso Vertical**
- Barra de progreso vertical con subdivisiones
- Soporte para valores absolutos o porcentuales
- Títulos configurables en parte superior o inferior
- Valores de división opcionales en el eje Y

## 🚀 Instalación y Uso Básico

```typescript
import { ComponenteSimplificado } from './components';

// Ejemplo básico de Gauge
<ComponenteSimplificado
  tipo="gauge"
  width="300px"
  height="200px"
  gaugeProps={{
    ranges: [
      { from: 0, to: 30, color: '#ff4444' },
      { from: 30, to: 70, color: '#ffaa00' },
      { from: 70, to: 100, color: '#44aa44' },
    ],
    value: 75,
    isPercent: true,
    showValue: true,
  }}
/>

// Ejemplo básico de Card de Indicadores
<ComponenteSimplificado
  tipo="cardIndicadores"
  cardIndicadoresProps={{
    indicadores: [
      {
        icono: 'trending_up',
        nombre: 'Ventas',
        valor: 1250,
        iconoColor: '#4CAF50',
      },
      {
        icono: 'people',
        nombre: 'Usuarios',
        valor: 94,
        isPercent: true,
        iconoColor: '#2196F3',
      },
    ],
    alineacion: 'left',
  }}
/>

// Ejemplo básico de Progreso Vertical
<ComponenteSimplificado
  tipo="progresoVertical"
  progresoVerticalProps={{
    valor: 75,
    minimo: 0,
    maximo: 100,
    isPercent: true,
    colorBar: '#4CAF50',
    height: 300,
    showTitle: true,
    title: 'Progreso del Proyecto',
  }}
/>
```

## 📋 Propiedades Detalladas

### Props Comunes
```typescript
interface ComponenteSimplificadoProps {
  tipo: 'gauge' | 'cardIndicadores' | 'progresoVertical';
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  // ... props específicas por componente
}
```

### 🎪 Gauge Props
```typescript
gaugeProps: {
  ranges: Array<{
    from: number;
    to: number; 
    color: string;
  }>;
  value: number;                    // Valor actual
  originalValue?: number;           // Valor original a mostrar
  label?: string;                   // Etiqueta del gauge
  isPercent?: boolean;              // Si mostrar como porcentaje
  showValue?: boolean;              // Mostrar valor en el centro
  valueColor?: string;              // Color del valor
  valueFontSize?: number;           // Tamaño de fuente del valor
  showMinMax?: boolean;             // Mostrar valores min/max
  needleStyle?: 'default' | 'arrow' | 'triangle' | 'diamond' | 'modern' | 'minimal';
  needleColor?: string;             // Color de la aguja
  needleWidth?: number;             // Grosor de la aguja
  needleLength?: number;            // Longitud de la aguja (0-1)
}
```

### 📊 Card Indicadores Props
```typescript
cardIndicadoresProps: {
  indicadores: Array<{
    icono: string;                  // Nombre del ícono Material Icons
    nombre: string;                 // Nombre del indicador
    valor: string | number;         // Valor a mostrar
    isPercent?: boolean;            // Si el valor es porcentaje
    iconoColor?: string;            // Color del ícono
    iconoTamano?: number;           // Tamaño del ícono
    nombreColor?: string;           // Color del nombre
    nombreTamano?: number;          // Tamaño de fuente del nombre
    valorColor?: string;            // Color del valor
    valorTamano?: number;           // Tamaño de fuente del valor
  }>;
  alineacion?: 'left' | 'center' | 'right' | 'justify';
  ancho?: string | number;          // Ancho del contenedor
  padding?: number | string;        // Padding interno
  backgroundColor?: string;         // Color de fondo
  borderRadius?: number | string;   // Radio del borde
  border?: string;                  // Borde CSS
  columnGap?: number;               // Espaciado entre columnas (modo justify)
}
```

### 📈 Progreso Vertical Props
```typescript
progresoVerticalProps: {
  valor: number;                    // Valor actual
  minimo?: number;                  // Valor mínimo (default: 0)
  maximo?: number;                  // Valor máximo (default: 100)
  isPercent?: boolean;              // Si mostrar como porcentaje
  symbol?: string;                  // Símbolo personalizado ($, €, etc.)
  symbolPosition?: 'before' | 'after';
  colorBar?: string;                // Color de la barra de progreso
  backgroundColor?: string;         // Color de fondo de la barra
  subdivisions?: number;            // Número de subdivisiones (default: 10)
  showSubdivisions?: boolean;       // Mostrar líneas de subdivisión
  subdivisionColor?: string;        // Color de las subdivisiones
  barWidth?: number;                // Ancho de la barra en píxeles
  height?: number;                  // Altura total en píxeles
  showValue?: boolean;              // Mostrar valor numérico
  valuePosition?: 'top' | 'center' | 'bottom';
  valueColor?: string;              // Color del texto del valor
  valueFontSize?: number;           // Tamaño de fuente del valor
  borderRadius?: number;            // Radio del borde de la barra
  showDivisionValues?: boolean;     // Mostrar valores en divisiones (eje Y)
  showTitle?: boolean;              // Mostrar título
  title?: string;                   // Texto del título
  titleColor?: string;              // Color del título
  titleFontSize?: number;           // Tamaño de fuente del título
  titlePosition?: 'top' | 'bottom';
}
```

## 🎨 Ejemplos Avanzados

### Gauge con Múltiples Rangos
```typescript
<ComponenteSimplificado
  tipo="gauge"
  gaugeProps={{
    ranges: [
      { from: 0, to: 20, color: '#dc3545' },   // Crítico
      { from: 20, to: 40, color: '#fd7e14' },  // Bajo
      { from: 40, to: 60, color: '#ffc107' },  // Medio
      { from: 60, to: 80, color: '#28a745' },  // Bueno  
      { from: 80, to: 100, color: '#007bff' }, // Excelente
    ],
    value: 85,
    needleStyle: 'modern',
    needleColor: '#333',
    showMinMax: true,
    valueFontSize: 24,
  }}
/>
```

### Card en Modo Tabla (Justify)
```typescript
<ComponenteSimplificado
  tipo="cardIndicadores"
  cardIndicadoresProps={{
    indicadores: [
      { icono: 'assessment', nombre: 'Ventas Totales', valor: '$125,430' },
      { icono: 'people', nombre: 'Usuarios Activos', valor: 1847 },
      { icono: 'trending_up', nombre: 'Crecimiento', valor: 12.5, isPercent: true },
    ],
    alineacion: 'justify',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 20,
    columnGap: 24,
  }}
/>
```

### Progreso con Valor Monetario
```typescript
<ComponenteSimplificado
  tipo="progresoVertical"
  progresoVerticalProps={{
    valor: 45000,
    maximo: 60000,
    isPercent: false,
    symbol: '$',
    symbolPosition: 'before',
    colorBar: '#007bff',
    showDivisionValues: true,
    showTitle: true,
    title: 'Meta de Ventas Q4',
    titlePosition: 'top',
    height: 400,
  }}
/>
```

## 🔧 Personalización

### Material Icons
Para usar los iconos en Card Indicadores, asegúrate de incluir Material Icons en tu proyecto:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

### Colores Personalizados
Todos los componentes soportan colores CSS estándar:
- Hex: `#ff4444`
- RGB: `rgb(255, 68, 68)`
- Named: `red`
- HSL: `hsl(0, 100%, 50%)`

### Responsive Design
Los componentes están diseñados para ser responsive:
- **Card Indicadores**: Se ajusta automáticamente al ancho del contenedor
- **Gauge**: Mantiene proporción con `responsive: true`
- **Progreso Vertical**: Altura fija, ancho adaptable

## 📦 Dependencias

- React >= 16.8
- Chart.js >= 4.0
- react-chartjs-2 >= 5.0
- chartjs-plugin-datalabels >= 2.2

## 🐛 Troubleshooting

**Error: Material Icons no se muestran**
- Asegúrate de incluir la fuente Material Icons en tu proyecto

**Error: Gauge no renderiza correctamente**
- Verifica que el valor esté dentro del rango definido
- Asegúrate de que los rangos no tengan gaps

**Error: Progreso Vertical no se actualiza**
- Verifica que `valor` esté entre `minimo` y `maximo`
- Asegúrate de que `subdivisions` sea mayor a 0

## 📄 Licencia

Este componente simplificado mantiene la misma licencia que la librería principal.