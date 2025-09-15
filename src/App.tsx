import React, { useState, useMemo } from 'react';
import './App.css';
import { 
  Grafico, 
  TipoGrafico, 
  datosLineas, 
  datosBarras, 
  datosBarrasHorizontales,
  datosBarrasAgrupadas,
  datosBarrasApiladas,
  datosPastel, 
  datosDona, 
  datosPolar, 
  datosRadar, 
  datosDispersion, 
  datosBurbujas,
  datosArea,
  datosMultiEje,
  datosGauge,
  datosCardIndicadores,
  // datosProgresoVertical,
  ejemplosNeedles,
  gaugeBaseConfig
} from './components';

interface TipoGraficoInfo {
  tipo: TipoGrafico;
  nombre: string;
  descripcion: string;
  datos: any;
  opciones?: any;
  codigoEjemplo: string;
}

function App() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<TipoGrafico>('line');
  const [vistaActual, setVistaActual] = useState<'demo' | 'galeria' | 'needles'>('demo');
  const [mostrarEtiquetas, setMostrarEtiquetas] = useState<boolean>(false);
  const [colorEtiquetas, setColorEtiquetas] = useState<string>('#000000');
  const [colorFondoEtiquetas, setColorFondoEtiquetas] = useState<string>('#ffffff');
  const [tamanoFuente, setTamanoFuente] = useState<number>(12);
  
  // Nuevos controles estéticos
  const [paddingEtiquetas, setPaddingEtiquetas] = useState<number>(6);
  const [borderRadiusEtiquetas, setBorderRadiusEtiquetas] = useState<number>(4);
  const [mostrarTitulo, setMostrarTitulo] = useState<boolean>(true);
  const [textoTitulo, setTextoTitulo] = useState<string>('');
  const [mostrarLeyenda, setMostrarLeyenda] = useState<boolean>(true);
  const [posicionLeyenda, setPosicionLeyenda] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const [mostrarEjeXControl, setMostrarEjeXControl] = useState<boolean>(true);
  const [mostrarEjeYControl, setMostrarEjeYControl] = useState<boolean>(true);
  const [alturaGrafico, setAlturaGrafico] = useState<number>(400);

  // Estados específicos para el tacómetro
  const [tacometroLabels, setTacometroLabels] = useState<string>('0-70,70-90,90-100');
  const [tacometroColors, setTacometroColors] = useState<string>('#d32f2f,#fbc02d,#388e3c');
  const [tacometroValue, setTacometroValue] = useState<number>(85);
  const [tacometroValidationError, setTacometroValidationError] = useState<string>('');
  const [tacometroShowValue, setTacometroShowValue] = useState<boolean>(true);
  const [tacometroValueColor, setTacometroValueColor] = useState<string>('#333333');
  const [tacometroValueFontSize, setTacometroValueFontSize] = useState<number>(1);
  const [tacometroIsPercent, setTacometroIsPercent] = useState<boolean>(true);

  // Estados para el estilo del contenedor del tacómetro
  const [tacometroBackgroundColor, setTacometroBackgroundColor] = useState<string>('transparent');
  const [tacometroBorderRadius, setTacometroBorderRadius] = useState<number>(0);
  const [tacometroBorder, setTacometroBorder] = useState<string>('none');
  const [tacometroPadding, setTacometroPadding] = useState<number>(0);

  // Estados para el símbolo personalizado del tacómetro
  const [tacometroShowSymbol, setTacometroShowSymbol] = useState<boolean>(false);
  const [tacometroSymbol, setTacometroSymbol] = useState<string>('$');
  const [tacometroSymbolPosition, setTacometroSymbolPosition] = useState<'before' | 'after'>('before');

  // Estados para los valores min/max del tacómetro
  const [tacometroShowMinMax, setTacometroShowMinMax] = useState<boolean>(true);
  const [tacometroMinMaxColor, setTacometroMinMaxColor] = useState<string>('#666666');
  const [tacometroMinMaxFontSize, setTacometroMinMaxFontSize] = useState<number>(1);

  // Estados específicos para Needle (Aguja del tacómetro)
  const [needleStyle, setNeedleStyle] = useState<'default' | 'arrow' | 'triangle' | 'diamond' | 'modern' | 'minimal'>('default');
  const [needleColor, setNeedleColor] = useState<string>('#000000');
  const [needleWidth, setNeedleWidth] = useState<number>(2);
  const [needleLength, setNeedleLength] = useState<number>(0.9);

  // Estados específicos para ProgresoVertical
  const [progresoValor, setProgresoValor] = useState<number>(75);
  const [progresoMinimo, setProgresoMinimo] = useState<number>(0);
  const [progresoMaximo, setProgresoMaximo] = useState<number>(100);
  const [progresoIsPercent, setProgresoIsPercent] = useState<boolean>(true);
  const [progresoSymbol, setProgresoSymbol] = useState<string>('$');
  const [progresoSymbolPosition, setProgresoSymbolPosition] = useState<'before' | 'after'>('after');
  const [progresoColorBar, setProgresoColorBar] = useState<string>('#4CAF50');
  const [progresoBackgroundColor, setProgresoBackgroundColor] = useState<string>('transparent');
  const [progresoBarWidth, setProgresoBarWidth] = useState<number>(40);
  const [progresoHeight, setProgresoHeight] = useState<number>(300);
  const [progresoShowValue, setProgresoShowValue] = useState<boolean>(true);
  const [progresoValuePosition, setProgresoValuePosition] = useState<'top' | 'center' | 'bottom'>('top');
  const [progresoSubdivisions, setProgresoSubdivisions] = useState<number>(10);
  const [progresoShowSubdivisions, setProgresoShowSubdivisions] = useState<boolean>(true);
  // Nuevo estado para mostrar/ocultar valores de división
  const [progresoShowDivisionValues, setProgresoShowDivisionValues] = useState<boolean>(false);

  // Estados específicos para CardIndicadores
  const [cardIndicadores, setCardIndicadores] = useState([
    {
      icono: 'home',
      nombre: 'Ventas Totales',
      valor: 125000,
      isPercent: false,
      iconoColor: '#2196F3',
      iconoTamano: 20,
      nombreColor: '#666666',
      nombreTamano: 14,
      valorColor: '#333333',
      valorTamano: 14
    },
    {
      icono: 'trending_up',
      nombre: 'Crecimiento',
      valor: 15,
      isPercent: true,
      iconoColor: '#4CAF50',
      iconoTamano: 20,
      nombreColor: '#666666',
      nombreTamano: 14,
      valorColor: '#333333',
      valorTamano: 14
    },
    {
      icono: 'shopping_cart',
      nombre: 'Productos',
      valor: 1250,
      isPercent: false,
      iconoColor: '#FF9800',
      iconoTamano: 20,
      nombreColor: '#666666',
      nombreTamano: 14,
      valorColor: '#333333',
      valorTamano: 14
    },
    {
      icono: 'people',
      nombre: 'Clientes',
      valor: 450,
      isPercent: false,
      iconoColor: '#9C27B0',
      iconoTamano: 20,
      nombreColor: '#666666',
      nombreTamano: 14,
      valorColor: '#333333',
      valorTamano: 14
    }
  ]);

  // Estados para configuraciones globales del CardIndicadores
  const [cardAlineacion, setCardAlineacion] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [cardAncho, setCardAncho] = useState<string>('320px');
  const [cardPadding, setCardPadding] = useState<number>(0);
  const [cardBackgroundColor, setCardBackgroundColor] = useState<string>('transparent');
  const [cardBorderRadius, setCardBorderRadius] = useState<number>(0);
  const [cardBorder, setCardBorder] = useState<string>('none');
  const [cardColumnGap, setCardColumnGap] = useState<number>(16);

  // Funciones helper para CardIndicadores

  const generateCardIndicadoresData = () => {
    return {
      indicadores: cardIndicadores.map(indicador => ({
        icono: indicador.icono,
        nombre: indicador.nombre,
        valor: indicador.valor,
        isPercent: indicador.isPercent,
        iconoColor: indicador.iconoColor,
        iconoTamano: indicador.iconoTamano,
        nombreColor: indicador.nombreColor,
        nombreTamano: indicador.nombreTamano,
        valorColor: indicador.valorColor,
        valorTamano: indicador.valorTamano
      })),
      alineacion: cardAlineacion,
      ancho: cardAncho,
      padding: cardPadding,
      backgroundColor: cardBackgroundColor,
      borderRadius: cardBorderRadius,
      border: cardBorder,
      columnGap: cardColumnGap
    };
  };

  // Funciones para manejar los indicadores
  const agregarIndicador = () => {
    setCardIndicadores([...cardIndicadores, {
      icono: 'home',
      nombre: 'Nuevo Indicador',
      valor: 0,
      isPercent: false,
      iconoColor: '#2196F3',
      iconoTamano: 20,
      nombreColor: '#666666',
      nombreTamano: 14,
      valorColor: '#333333',
      valorTamano: 14
    }]);
  };

  const eliminarIndicador = (index: number) => {
    setCardIndicadores(cardIndicadores.filter((_, i) => i !== index));
  };

  const actualizarIndicador = (index: number, campo: string, valor: any) => {
    const nuevosIndicadores = [...cardIndicadores];
    (nuevosIndicadores[index] as any)[campo] = valor;
    setCardIndicadores(nuevosIndicadores);
  };

  const tiposGraficos: TipoGraficoInfo[] = [
    {
      tipo: 'gauge',
      nombre: 'Grafico Tacometro',
      descripcion: 'Ideal para mostrar métricas de rendimiento o progreso con rangos de valores.',
      datos: datosGauge,
      codigoEjemplo: `<Grafico
  tipo="gauge"
  gaugeProps={{
    ranges: [
      { from: 0, to: 70, color: '#d32f2f' },
      { from: 70, to: 90, color: '#fbc02d' },
      { from: 90, to: 100, color: '#388e3c' }
    ],
    value: 85,
    showLabels: false,
    showValue: true,
    valueColor: '#333333',
    valueFontSize: 24,
    isPercent: true
  }}
  height="300px"
/>`,
      opciones: {
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        }
      }
    },
    {
      tipo: 'line',
      nombre: 'Gráfico de Líneas',
      descripcion: 'Ideal para mostrar tendencias a lo largo del tiempo. Permite múltiples series de datos.',
      datos: datosLineas,
      codigoEjemplo: `<Grafico
  tipo="line"
  data={{
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      label: 'Ventas 2024',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.1
    }]
  }}
  mostrarEtiquetas={true}
  mostrarEjeY={false}
  configEtiquetas={{
    color: '#333',
    fontSize: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 4
  }}
  options={{
    responsive: true,
    plugins: {
      title: { display: true, text: 'Tendencia de Ventas' }
    }
  }}
/>`
    },
    {
      tipo: 'bar',
      nombre: 'Gráfico de Barras Verticales',
      descripcion: 'Perfecto para comparar valores entre diferentes categorías.',
      datos: datosBarras,
      codigoEjemplo: `<Grafico
  tipo="bar"
  data={{
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      label: 'Ingresos',
      data: [12000, 15000, 18000, 22000, 19000, 25000],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)'
    }]
  }}
  mostrarEtiquetas={true}
  mostrarEjeY={false}
  configEtiquetas={{
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  }}
/>`
    },
    {
      tipo: 'horizontalBar',
      nombre: 'Gráfico de Barras Horizontales',
      descripcion: 'Útil cuando las etiquetas son largas o cuando quieres enfatizar los valores.',
      datos: datosBarrasHorizontales,
      codigoEjemplo: `<Grafico
  tipo="horizontalBar"
  data={{
    labels: ['Producto A', 'Producto B', 'Producto C'],
    datasets: [{
      label: 'Unidades Vendidas',
      data: [120, 190, 300],
      backgroundColor: 'rgba(54, 162, 235, 0.6)'
    }]
  }}
  mostrarEjeX={false}
/>`
    },
    {
      tipo: 'barrasAgrupadas',
      nombre: 'Gráfico de Barras Agrupadas',
      descripcion: 'Ideal para comparar múltiples series de datos lado a lado.',
      datos: datosBarrasAgrupadas,
      codigoEjemplo: `<Grafico
  tipo="barrasAgrupadas"
  data={{
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Ventas 2023',
        data: [120, 150, 180, 200],
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
      },
      {
        label: 'Ventas 2024',
        data: [140, 170, 160, 220],
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }
    ]
  }}
  mostrarEjeY={false}
/>`
    },
    {
      tipo: 'barrasApiladas',
      nombre: 'Gráfico de Barras Apiladas',
      descripcion: 'Muestra la composición de un total dividido en partes.',
      datos: datosBarrasApiladas,
      codigoEjemplo: `<Grafico
  tipo="barrasApiladas"
  data={{
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [
      {
        label: 'Desktop',
        data: [30, 45, 60, 70, 65],
        backgroundColor: 'rgba(255, 99, 132, 0.8)'
      },
      {
        label: 'Mobile',
        data: [70, 85, 95, 110, 105],
        backgroundColor: 'rgba(54, 162, 235, 0.8)'
      }
    ]
  }}
  mostrarEjeY={false}
/>`
    },
    {
      tipo: 'pie',
      nombre: 'Gráfico Circular (Pie)',
      descripcion: 'Perfecto para mostrar proporciones de un total.',
      datos: datosPastel,
      codigoEjemplo: `<Grafico
  tipo="pie"
  data={{
    labels: ['CatUno', 'CatDos', 'CatTres'],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 205, 86, 0.8)'
      ]
    }]
  }}
  mostrarEtiquetas={true}
  configEtiquetas={{
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  }}
/>`
    },
    {
      tipo: 'doughnut',
      nombre: 'Gráfico de Dona',
      descripcion: 'Similar al pie chart pero con un agujero en el centro, ideal para mostrar múltiples métricas.',
      datos: datosDona,
      codigoEjemplo: `<Grafico
  tipo="doughnut"
  data={{
    labels: ['Online', 'Tienda', 'Teléfono'],
    datasets: [{
      data: [300, 150, 100],
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(255, 205, 86, 0.8)'
      ]
    }]
  }}
/>`
    },
    {
      tipo: 'polarArea',
      nombre: 'Gráfico de Área Polar',
      descripcion: 'Combina características de gráficos circulares y de barras.',
      datos: datosPolar,
      codigoEjemplo: `<Grafico
  tipo="polarArea"
  data={{
    labels: ['A', 'B', 'C', 'D', 'E'],
    datasets: [{
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 205, 86, 0.5)'
      ]
    }]
  }}
/>`
    },
    {
      tipo: 'radar',
      nombre: 'Gráfico de Radar',
      descripcion: 'Excelente para comparar múltiples variables en diferentes categorías.',
      datos: datosRadar,
      codigoEjemplo: `<Grafico
  tipo="radar"
  data={{
    labels: ['Velocidad', 'Confiabilidad', 'Comodidad'],
    datasets: [{
      label: 'Producto X',
      data: [80, 90, 70],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)'
    }]
  }}
/>`
    },
    {
      tipo: 'scatter',
      nombre: 'Gráfico de Dispersión',
      descripcion: 'Ideal para mostrar la relación entre dos variables.',
      datos: datosDispersion,
      codigoEjemplo: `<Grafico
  tipo="scatter"
  data={{
    datasets: [{
      label: 'Serie A',
      data: [
        { x: -10, y: 0 },
        { x: 0, y: 10 },
        { x: 10, y: 5 }
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.6)'
    }]
  }}
/>`
    },
    {
      tipo: 'bubble',
      nombre: 'Gráfico de Burbujas',
      descripcion: 'Muestra tres dimensiones de datos: X, Y y tamaño de burbuja.',
      datos: datosBurbujas,
      codigoEjemplo: `<Grafico
  tipo="bubble"
  data={{
    datasets: [{
      label: 'Productos',
      data: [
        { x: 20, y: 30, r: 15 },
        { x: 40, y: 10, r: 10 }
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.6)'
    }]
  }}
/>`
    },
    {
      tipo: 'area',
      nombre: 'Gráfico de Área',
      descripcion: 'Similar a líneas pero con el área bajo la curva rellenada.',
      datos: datosArea,
      codigoEjemplo: `<Grafico
  tipo="area"
  data={{
    labels: ['Ene', 'Feb', 'Mar', 'Abr'],
    datasets: [{
      label: 'Ventas',
      data: [65, 59, 80, 81],
      backgroundColor: 'rgba(75, 192, 192, 0.3)',
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: true
    }]
  }}
  mostrarEjeY={false}
/>`
    },
    {
      tipo: 'multiEje',
      nombre: 'Gráfico Multi-Eje',
      descripcion: 'Permite mostrar datos con diferentes escalas en un mismo gráfico.',
      datos: datosMultiEje,
      opciones: {
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
      codigoEjemplo: `<Grafico
  tipo="multiEje"
  data={{
    labels: ['Ene', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Ventas (Miles)',
        data: [65, 59, 80],
        yAxisID: 'y'
      },
      {
        label: 'Temperatura (°C)',
        data: [28, 48, 40],
        yAxisID: 'y1'
      }
    ]
  }}
  mostrarEjeY={false}
/>`
    },
    {
      tipo: 'card',
      nombre: 'Card - Tarjeta de Estadística',
      descripcion: 'Tarjeta para mostrar métricas y estadísticas. Se consume como Grafico con tipo "card" y parámetros en cardProps.',
      datos: datosBarras, // No se usa pero es requerido
      codigoEjemplo: `// Uso principal - Todo se consume como Grafico
<Grafico
  tipo="card"
  cardProps={{
    title: "Total Revenue",
    value: "$48,329",
    change: "+12.5%",
    icon: "💰",
    colorScheme: "success",
    showBorder: true,
    borderColor: "#e5e7eb"
  }}
/>

// Layout responsivo con múltiples Cards:
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '16px'
}}>
  <Grafico 
    tipo="card" 
    cardProps={{ title: "Revenue", value: "$48,329", change: "+12.5%", icon: "💰" }} 
  />
  <Grafico 
    tipo="card" 
    cardProps={{ title: "Users", value: "12,456", change: "+8.2%", icon: "👥" }} 
  />
  <Grafico 
    tipo="card" 
    cardProps={{ title: "Orders", value: "3,432", change: "-2.1%", icon: "📦" }} 
  />
</div>

// Personalización completa:
<Grafico
  tipo="card"
  cardProps={{
    title: "Custom Metric",
    value: "1,234",
    change: "+15.3%",
    icon: "📈",
    colorScheme: "success",
    showBorder: true,
    borderColor: "#22c55e"
  }}
  style={{ maxWidth: '300px', margin: '0 auto' }}
/>`
    },
    {
      tipo: 'cardIndicadores',
      nombre: 'Card de Indicadores',
      descripcion: 'Muestra múltiples indicadores con iconos de Material Icons en un formato de lista compacto.',
      datos: datosCardIndicadores, // No se usa pero es requerido
      codigoEjemplo: `<Grafico
  tipo="cardIndicadores"
  cardIndicadoresProps={{
    indicadores: [
      {
        icono: 'show_chart',
        nombre: 'YTD Cump Presup',
        valor: 92,
        isPercent: true,
        iconoColor: '#f59e0b',
        nombreColor: '#374151',
        valorColor: '#1f2937'
      },
      {
        icono: 'trending_up',
        nombre: 'MTH Cump Presup',
        valor: 88,
        isPercent: true,
        iconoColor: '#10b981',
        nombreColor: '#374151',
        valorColor: '#1f2937'
      }
    ],
    alineacion: 'left',
    ancho: '320px',
    padding: 0
  }}
/>`
    },
    {
      tipo: 'progresoVertical',
      nombre: 'Progreso Vertical',
      descripcion: 'Barra vertical para mostrar progreso con subdivisiones. Ideal para mostrar porcentajes, valores monetarios o cualquier métrica de progreso.',
      datos: null,
      codigoEjemplo: `<Grafico
  tipo="progresoVertical"
  progresoVerticalProps={{
    valor: 75,
    maximo: 100,
    minimo: 0,
    isPercent: true,
    colorBar: '#4CAF50',
    backgroundColor: 'transparent',
    barWidth: 40,
    height: 300,
    showValue: true,
    valuePosition: 'top',
    subdivisions: 10,
    showSubdivisions: true,
    showMinMax: true
  }}
/>`
    }
  ];

  const tipoActual = tiposGraficos.find(t => t.tipo === tipoSeleccionado) || tiposGraficos[0];

  // Memorizar validación y procesamiento de datos del tacómetro
  const datosValidadosTacometro = useMemo(() => {
    if (tipoSeleccionado !== 'gauge') return null;
    
    const labels = tacometroLabels.split(',').map(l => l.trim()).filter(l => l);
    const colors = tacometroColors.split(',').map(c => c.trim()).filter(c => c);

    if (labels.length !== colors.length) {
      const error = `Error: Labels (${labels.length}) y Colors (${colors.length}) deben tener la misma cantidad de elementos.`;
      setTacometroValidationError(error);
      return null;
    }

    // Validar que colors sean válidos
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!colors.every(c => colorRegex.test(c))) {
      setTacometroValidationError('Error: Todos los colores deben ser códigos hex válidos (ej: #ff0000).');
      return null;
    }

    setTacometroValidationError('');
    return {
      labels,
      backgroundColor: colors
    };
  }, [tipoSeleccionado, tacometroLabels, tacometroColors]);

  // Función para generar código de ejemplo dinámico
  const generarCodigoEjemplo = () => {
    const configEtiquetasCode = mostrarEtiquetas ? `
  configEtiquetas={{
    color: '${colorEtiquetas}',
    backgroundColor: '${colorFondoEtiquetas}',
    fontSize: ${tamanoFuente},
    borderRadius: ${borderRadiusEtiquetas},
    padding: ${paddingEtiquetas},
  }}` : '';

    // Solo mostrar props de ejes si son diferentes del comportamiento por defecto
    const mostrarEjeXCode = (tipoActual.tipo === 'horizontalBar' && mostrarEjeXControl) || 
                           (tipoActual.tipo !== 'horizontalBar' && !mostrarEjeXControl) ? `
  mostrarEjeX={${mostrarEjeXControl}}` : '';
    
    const mostrarEjeYCode = (['bar', 'line', 'barrasAgrupadas', 'barrasApiladas', 'area', 'multiEje'].includes(tipoActual.tipo) && mostrarEjeYControl) ||
                           (!['bar', 'line', 'barrasAgrupadas', 'barrasApiladas', 'area', 'multiEje'].includes(tipoActual.tipo) && !mostrarEjeYControl) ? `
  mostrarEjeY={${mostrarEjeYControl}}` : '';

    const mostrarEtiquetasCode = mostrarEtiquetas ? `
  mostrarEtiquetas={true}` : '';

    const cardPropsCode = tipoActual.tipo === 'card' ? `
  cardProps={{
    title: "Total Revenue",
    value: "$48,329",
    change: "+12.5%",
    icon: "💰",
    colorScheme: "success",
    showBorder: true,
    borderColor: "#e5e7eb"
  }}` : '';

    // Generar opciones dinámicas
    const generarOpciones = () => {
      const tituloFinal = textoTitulo || `Ejemplo: ${tipoActual.nombre}`;
      const opcionesPartes = [];
      
      opcionesPartes.push('responsive: true');
      
      const pluginsPartes = [];
      
      // Configuración del título
      if (mostrarTitulo) {
        pluginsPartes.push(`title: { display: true, text: '${tituloFinal}' }`);
      } else {
        pluginsPartes.push('title: { display: false }');
      }
      
      // Configuración de la leyenda
      if (mostrarLeyenda) {
        pluginsPartes.push(`legend: { display: true, position: '${posicionLeyenda}' }`);
      } else {
        pluginsPartes.push('legend: { display: false }');
      }
      
      if (pluginsPartes.length > 0) {
        opcionesPartes.push(`plugins: {
      ${pluginsPartes.join(',\n      ')}
    }`);
      }
      
      return `{{
    ${opcionesPartes.join(',\n    ')}
  }}`;
    };

    const alturaCode = alturaGrafico !== 400 ? `
  height="${alturaGrafico}px"` : '';

    // Obtener datos de ejemplo formateados (función existente...)
    const formatearDatos = () => {
      if (tipoActual.tipo === 'card' || tipoActual.tipo === 'cardIndicadores') return '';
      
      const ejemploDatos = {
        gauge: (() => {
          const datosValidados = datosValidadosTacometro;
          if (!datosValidados) {
            return `data={/* No se requiere data específica para gauge */}`;
          }
          return `data={/* No se requiere data específica para gauge */}`;
        })(),
        line: `{
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      label: 'Ventas 2024',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.1
    }]
  }`,
        bar: `{
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      label: 'Ingresos',
      data: [12000, 15000, 18000, 22000, 19000, 25000],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)'
    }]
  }`,
        horizontalBar: `{
    labels: ['Producto A', 'Producto B', 'Producto C'],
    datasets: [{
      label: 'Unidades Vendidas',
      data: [120, 190, 300],
      backgroundColor: 'rgba(54, 162, 235, 0.6)'
    }]
  }`,
        barrasAgrupadas: `{
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Ventas 2023',
        data: [120, 150, 180, 200],
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
      },
      {
        label: 'Ventas 2024',
        data: [140, 170, 160, 220],
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }
    ]
  }`,
        barrasApiladas: `{
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [
      {
        label: 'Desktop',
        data: [30, 45, 60, 70, 65],
        backgroundColor: 'rgba(255, 99, 132, 0.8)'
      },
      {
        label: 'Mobile',
        data: [70, 85, 95, 110, 105],
        backgroundColor: 'rgba(54, 162, 235, 0.8)'
      }
    ]
  }`,
        pie: `{
    labels: ['CatUno', 'CatDos', 'CatTres'],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 205, 86, 0.8)'
      ]
    }]
  }`,
        doughnut: `{
    labels: ['Online', 'Tienda', 'Teléfono'],
    datasets: [{
      data: [300, 150, 100],
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(255, 205, 86, 0.8)'
      ]
    }]
  }`,
        polarArea: `{
    labels: ['A', 'B', 'C', 'D', 'E'],
    datasets: [{
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 205, 86, 0.5)'
      ]
    }]
  }`,
        radar: `{
    labels: ['Velocidad', 'Confiabilidad', 'Comodidad'],
    datasets: [{
      label: 'Producto X',
      data: [80, 90, 70],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)'
    }]
  }`,
        scatter: `{
    datasets: [{
      label: 'Serie A',
      data: [
        { x: -10, y: 0 },
        { x: 0, y: 10 },
        { x: 10, y: 5 }
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.6)'
    }]
  }`,
        bubble: `{
    datasets: [{
      label: 'Productos',
      data: [
        { x: 20, y: 30, r: 15 },
        { x: 40, y: 10, r: 10 }
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.6)'
    }]
  }`,
        area: `{
    labels: ['Ene', 'Feb', 'Mar', 'Abr'],
    datasets: [{
      label: 'Ventas',
      data: [65, 59, 80, 81],
      backgroundColor: 'rgba(75, 192, 192, 0.3)',
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: true
    }]
  }`,
        multiEje: `{
    labels: ['Ene', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Ventas (Miles)',
        data: [65, 59, 80],
        yAxisID: 'y'
      },
      {
        label: 'Temperatura (°C)',
        data: [28, 48, 40],
        yAxisID: 'y1'
      }
    ]
  }`
      };
      
      return ejemploDatos[tipoActual.tipo as keyof typeof ejemploDatos] || `{ /* Datos del gráfico */ }`;
    };

    if (tipoActual.tipo === 'card') {
      return `<Grafico
  tipo="card"${cardPropsCode}
  style={{ maxWidth: '300px', margin: '0 auto' }}
/>`;
    }

    if (tipoActual.tipo === 'cardIndicadores') {
      // Generar indicadores dinámicamente basado en el estado actual
      const indicadoresCode = cardIndicadores.map(indicador => `      {
        icono: '${indicador.icono}',
        nombre: '${indicador.nombre}',
        valor: ${indicador.valor},
        isPercent: ${indicador.isPercent},
        iconoColor: '${indicador.iconoColor}',
        iconoTamano: ${indicador.iconoTamano},
        nombreColor: '${indicador.nombreColor}',
        nombreTamano: ${indicador.nombreTamano},
        valorColor: '${indicador.valorColor}',
        valorTamano: ${indicador.valorTamano}
      }`).join(',\n');

      return `<Grafico
  tipo="cardIndicadores"
  cardIndicadoresProps={{
    indicadores: [
${indicadoresCode}
    ],
    alineacion: '${cardAlineacion}',
    ancho: '${cardAncho}',
    padding: ${cardPadding},
    backgroundColor: '${cardBackgroundColor}',
    borderRadius: ${cardBorderRadius},
    border: '${cardBorder}'${cardAlineacion === 'justify' ? `,
    columnGap: ${cardColumnGap}` : ''}
  }}
/>`;
    }

    // Generar gaugeProps dinámico para el tipo gauge
    const gaugePropsCode = tipoActual.tipo === 'gauge' ? (() => {
      const datosValidados = datosValidadosTacometro;
      if (!datosValidados) {
        const valorLimitado = Math.min(tacometroValue, 100);
        
        // Construir containerStyle solo si hay valores diferentes a los por defecto
        const containerStyleParts = [];
        if (tacometroBackgroundColor !== 'transparent') {
          containerStyleParts.push(`backgroundColor: '${tacometroBackgroundColor}'`);
        }
        if (tacometroBorderRadius !== 0) {
          containerStyleParts.push(`borderRadius: ${tacometroBorderRadius}`);
        }
        if (tacometroBorder !== 'none') {
          containerStyleParts.push(`border: '${tacometroBorder}'`);
        }
        if (tacometroPadding !== 0) {
          containerStyleParts.push(`padding: ${tacometroPadding}`);
        }
        
        const containerStyleCode = containerStyleParts.length > 0 ? `,
    containerStyle: {
      ${containerStyleParts.join(',\n      ')}
    }` : '';
        
        // Construir opciones de símbolo personalizado solo si showSymbol es true y no es porcentaje
        const symbolCode = (!tacometroIsPercent && tacometroShowSymbol) ? `,
    showSymbol: true,
    symbol: '${tacometroSymbol}',
    symbolPosition: '${tacometroSymbolPosition}'` : '';

        // Construir opciones de valores mínimo y máximo
        const minMaxCode = tacometroShowMinMax ? `,
    showMinMax: true,
    minMaxColor: '${tacometroMinMaxColor}',
    minMaxFontSize: ${tacometroMinMaxFontSize}` : '';

        // Construir opciones del needle
        const needleCode = `,
    needleStyle: '${needleStyle}',
    needleColor: '${needleColor}',
    needleWidth: ${needleWidth},
    needleLength: ${needleLength}`;
        
        return `
  gaugeProps={{
    ranges: [
      { from: 0, to: 70, color: '#d32f2f' },
      { from: 70, to: 90, color: '#fbc02d' },
      { from: 90, to: 100, color: '#388e3c' }
    ],
    value: ${valorLimitado},
    showLabels: ${mostrarEtiquetas},
    showValue: ${tacometroShowValue},
    valueColor: '${tacometroValueColor}',
    valueFontSize: ${tacometroValueFontSize},
    isPercent: ${tacometroIsPercent}${containerStyleCode}${symbolCode}${minMaxCode}${needleCode}
  }}`;
      }
      
      const ranges = datosValidados.labels.map((label: string, index: number) => {
        const [from, to] = label.split('-').map((v: string) => parseFloat(v.trim()));
        return { from: from || index * 10, to: to || (index + 1) * 10 };
      });
      
      const valorMaximo = Math.max(...ranges.map(range => range.to));
      const valorLimitado = Math.min(tacometroValue, valorMaximo);
      
      const rangesString = datosValidados.labels.map((label: string, index: number) => {
        const [from, to] = label.split('-').map((v: string) => parseFloat(v.trim()));
        return `      { from: ${from || index * 10}, to: ${to || (index + 1) * 10}, color: '${datosValidados.backgroundColor[index]}' }`;
      }).join(',\n');
      
      // Construir containerStyle solo si hay valores diferentes a los por defecto
      const containerStyleParts = [];
      if (tacometroBackgroundColor !== 'transparent') {
        containerStyleParts.push(`backgroundColor: '${tacometroBackgroundColor}'`);
      }
      if (tacometroBorderRadius !== 0) {
        containerStyleParts.push(`borderRadius: ${tacometroBorderRadius}`);
      }
      if (tacometroBorder !== 'none') {
        containerStyleParts.push(`border: '${tacometroBorder}'`);
      }
      if (tacometroPadding !== 0) {
        containerStyleParts.push(`padding: ${tacometroPadding}`);
      }
      
      const containerStyleCode = containerStyleParts.length > 0 ? `,
    containerStyle: {
      ${containerStyleParts.join(',\n      ')}
    }` : '';
      
      // Construir opciones de símbolo personalizado solo si showSymbol es true y no es porcentaje
      const symbolCode = (!tacometroIsPercent && tacometroShowSymbol) ? `,
    showSymbol: true,
    symbol: '${tacometroSymbol}',
    symbolPosition: '${tacometroSymbolPosition}'` : '';

      // Construir opciones de valores mínimo y máximo
      const minMaxCode = tacometroShowMinMax ? `,
    showMinMax: true,
    minMaxColor: '${tacometroMinMaxColor}',
    minMaxFontSize: ${tacometroMinMaxFontSize}` : '';

      // Construir opciones del needle
      const needleCode = `,
    needleStyle: '${needleStyle}',
    needleColor: '${needleColor}',
    needleWidth: ${needleWidth},
    needleLength: ${needleLength}`;
      
      return `
  gaugeProps={{
    ranges: [
${rangesString}
    ],
    value: ${valorLimitado},
    showLabels: ${mostrarEtiquetas},
    showValue: ${tacometroShowValue},
    valueColor: '${tacometroValueColor}',
    valueFontSize: ${tacometroValueFontSize},
    isPercent: ${tacometroIsPercent}${containerStyleCode}${symbolCode}${minMaxCode}${needleCode}
  }}`;
    })() : '';

    // Generar progresoVerticalProps dinámico para el tipo progresoVertical
    const progresoVerticalPropsCode = tipoActual.tipo === 'progresoVertical' ? (() => {
      // Construir opciones de símbolo personalizado solo si no es porcentaje
      const symbolCode = !progresoIsPercent ? `,
    symbol: '${progresoSymbol}',
    symbolPosition: '${progresoSymbolPosition}'` : '';

      // Construir backgroundColor solo si no es transparente
      const backgroundColorCode = progresoBackgroundColor !== 'transparent' ? `,
    backgroundColor: '${progresoBackgroundColor}'` : '';

      // Construir showSubdivisions y subdivisions
      const subdivisionsCode = progresoShowSubdivisions ? `,
    subdivisions: ${progresoSubdivisions},
    showSubdivisions: true` : ',\n    showSubdivisions: false';

      // Construir showDivisionValues
      const divisionValuesCode = progresoShowDivisionValues ? `,
    showDivisionValues: true` : '';
      
      return `
  progresoVerticalProps={{
    valor: ${progresoValor},
    maximo: ${progresoMaximo},
    minimo: ${progresoMinimo},
    isPercent: ${progresoIsPercent}${symbolCode},
    colorBar: '${progresoColorBar}'${backgroundColorCode},
    barWidth: ${progresoBarWidth},
    height: ${progresoHeight},
    showValue: ${progresoShowValue},
    valuePosition: '${progresoValuePosition}'${subdivisionsCode}${divisionValuesCode}
  }}`;
    })() : '';

    return `<Grafico
  tipo="${tipoActual.tipo}"${tipoActual.tipo === 'gauge' || tipoActual.tipo === 'progresoVertical' ? '' : `
  data=${formatearDatos()}`}${mostrarEtiquetasCode}${mostrarEjeXCode}${mostrarEjeYCode}${configEtiquetasCode}${gaugePropsCode}${progresoVerticalPropsCode}
  options=${generarOpciones()}${alturaCode}
/>`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 React Charts Library - TypeScript</h1>
        <p>Librería completa de gráficos reutilizables con Chart.js</p>
        
        <nav style={{ marginTop: '20px' }}>
          <button
            className={`nav-button ${vistaActual === 'demo' ? 'active' : ''}`}
            onClick={() => setVistaActual('demo')}
          >
            🎯 Demo Interactivo
          </button>
          <button
            className={`nav-button ${vistaActual === 'galeria' ? 'active' : ''}`}
            onClick={() => setVistaActual('galeria')}
          >
            🎨 Galería Completa
          </button>
          <button
            className={`nav-button ${vistaActual === 'needles' ? 'active' : ''}`}
            onClick={() => setVistaActual('needles')}
          >
            ⚡ Estilos de Aguja
          </button>
          <button
            className={`nav-button ${vistaActual === 'needles' ? 'active' : ''}`}
            onClick={() => setVistaActual('needles')}
          >
            ⚡ Estilos de Aguja
          </button>
        </nav>
      </header>
      
      {vistaActual === 'demo' && (
        <main style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
          <div className="selector-container" style={{ marginBottom: '20px' }}>
            <label htmlFor="tipo-grafico" style={{ fontSize: '18px', fontWeight: 600, color: '#333' }}>
              🎯 Selecciona el tipo de gráfico:
            </label>
            <select
              id="tipo-grafico"
              value={tipoSeleccionado}
              onChange={(e) => setTipoSeleccionado(e.target.value as TipoGrafico)}
              className="tipo-selector"
              style={{ 
                marginLeft: '10px', 
                padding: '8px 12px', 
                fontSize: '16px',
                borderRadius: '6px',
                border: '2px solid #e9ecef'
              }}
            >
              {tiposGraficos.map((info) => (
                <option key={info.tipo} value={info.tipo}>
                  {info.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Layout de dos columnas */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '400px 1fr', 
            gap: '25px',
            alignItems: 'start'
          }}>
            
            {/* Columna izquierda - Controles */}
            <div className="controles-panel" style={{
              backgroundColor: '#f8f9fa',
              border: '2px solid #e9ecef',
              borderRadius: '12px',
              padding: '20px',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#333', fontSize: '18px', textAlign: 'center' }}>
                🎨 Configuración
              </h3>
              
              {/* Etiquetas de Datos */}
              {(tipoActual.tipo as any) !== 'cardIndicadores' && (tipoActual.tipo as any) !== 'progresoVertical' && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 12px 0', color: '#555', fontSize: '14px', fontWeight: 600 }}>
                    🏷️ Etiquetas de Datos
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={mostrarEtiquetas}
                        onChange={(e) => setMostrarEtiquetas(e.target.checked)}
                      />
                      <span style={{ fontSize: '13px' }}>Mostrar etiquetas</span>
                    </label>
                    
                    {mostrarEtiquetas && (
                      <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', minWidth: '70px' }}>Color texto:</span>
                          <input
                            type="color"
                            value={colorEtiquetas}
                            onChange={(e) => setColorEtiquetas(e.target.value)}
                            style={{ width: '35px', height: '25px' }}
                          />
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', minWidth: '70px' }}>Color fondo:</span>
                          <input
                            type="color"
                            value={colorFondoEtiquetas}
                            onChange={(e) => setColorFondoEtiquetas(e.target.value)}
                            style={{ width: '35px', height: '25px' }}
                          />
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', minWidth: '70px' }}>Tamaño:</span>
                          <input
                            type="range"
                            min="8"
                            max="24"
                            value={tamanoFuente}
                            onChange={(e) => setTamanoFuente(parseInt(e.target.value))}
                            style={{ flex: 1 }}
                          />
                          <span style={{ fontSize: '12px', minWidth: '35px' }}>{tamanoFuente}px</span>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', minWidth: '70px' }}>Padding:</span>
                          <input
                            type="range"
                            min="2"
                            max="16"
                            value={paddingEtiquetas}
                            onChange={(e) => setPaddingEtiquetas(parseInt(e.target.value))}
                            style={{ flex: 1 }}
                          />
                          <span style={{ fontSize: '12px', minWidth: '35px' }}>{paddingEtiquetas}px</span>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', minWidth: '70px' }}>Radio:</span>
                          <input
                            type="range"
                            min="0"
                            max="12"
                            value={borderRadiusEtiquetas}
                            onChange={(e) => setBorderRadiusEtiquetas(parseInt(e.target.value))}
                            style={{ flex: 1 }}
                          />
                          <span style={{ fontSize: '12px', minWidth: '35px' }}>{borderRadiusEtiquetas}px</span>
                        </div>
                      </div>
                    )}
                  </div>
                  </div>
                  
              )}

              {/* Título */}
              {(tipoActual.tipo as any) !== 'card' && (tipoActual.tipo as any) !== 'cardIndicadores' && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 12px 0', color: '#555', fontSize: '14px', fontWeight: 600 }}>
                    📝 Título
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={mostrarTitulo}
                        onChange={(e) => setMostrarTitulo(e.target.checked)}
                      />
                      <span style={{ fontSize: '13px' }}>Mostrar título</span>
                    </label>
                    
                    {mostrarTitulo && (
                      <input
                        type="text"
                        value={textoTitulo}
                        onChange={(e) => setTextoTitulo(e.target.value)}
                        placeholder={`Ejemplo: ${tipoActual.nombre}`}
                        style={{ 
                          padding: '6px 8px', 
                          borderRadius: '4px', 
                          border: '1px solid #ccc',
                          fontSize: '12px',
                          marginLeft: '20px'
                        }}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Leyenda */}
              {(tipoActual.tipo as any) !== 'card' && (tipoActual.tipo as any) !== 'cardIndicadores' && (tipoActual.tipo as any) !== 'progresoVertical' && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 12px 0', color: '#555', fontSize: '14px', fontWeight: 600 }}>
                    🔤 Leyenda
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={mostrarLeyenda}
                        onChange={(e) => setMostrarLeyenda(e.target.checked)}
                      />
                      <span style={{ fontSize: '13px' }}>Mostrar leyenda</span>
                    </label>
                    
                    {mostrarLeyenda && (
                      <select
                        value={posicionLeyenda}
                        onChange={(e) => setPosicionLeyenda(e.target.value as 'top' | 'bottom' | 'left' | 'right')}
                        style={{ 
                          padding: '6px 8px', 
                          borderRadius: '4px', 
                          border: '1px solid #ccc',
                          fontSize: '12px',
                          marginLeft: '20px'
                        }}
                      >
                        <option value="top">Arriba</option>
                        <option value="bottom">Abajo</option>
                        <option value="left">Izquierda</option>
                        <option value="right">Derecha</option>
                      </select>
                    )}
                  </div>
                </div>
              )}

              {/* Ejes */}
              {!['pie', 'doughnut', 'polarArea', 'card', 'gauge', 'cardIndicadores', 'progresoVertical'].includes(tipoActual.tipo) && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 12px 0', color: '#555', fontSize: '14px', fontWeight: 600 }}>
                    📊 Ejes
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={mostrarEjeXControl}
                        onChange={(e) => setMostrarEjeXControl(e.target.checked)}
                      />
                      <span style={{ fontSize: '13px' }}>Mostrar Eje X</span>
                    </label>
                    
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={mostrarEjeYControl}
                        onChange={(e) => setMostrarEjeYControl(e.target.checked)}
                      />
                      <span style={{ fontSize: '13px' }}>Mostrar Eje Y</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Configuración específica del Tacómetro */}
              {tipoActual.tipo === 'gauge' && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 12px 0', color: '#555', fontSize: '14px', fontWeight: 600 }}>
                    ⚙️ Configuración del Tacómetro
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                        Labels (separados por comas):
                      </label>
                      <input
                        type="text"
                        value={tacometroLabels}
                        onChange={(e) => setTacometroLabels(e.target.value)}
                        placeholder="0-70,70-90,90-100"
                        style={{ 
                          width: '100%',
                          padding: '6px 8px', 
                          borderRadius: '4px', 
                          border: '1px solid #ccc',
                          fontSize: '12px'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                        Colores (separados por comas):
                      </label>
                      <input
                        type="text"
                        value={tacometroColors}
                        onChange={(e) => setTacometroColors(e.target.value)}
                        placeholder="#d32f2f,#fbc02d,#388e3c"
                        style={{ 
                          width: '100%',
                          padding: '6px 8px', 
                          borderRadius: '4px', 
                          border: '1px solid #ccc',
                          fontSize: '12px'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                        Valor del tacómetro {(() => {
                          const datosValidados = datosValidadosTacometro;
                          if (!datosValidados) return '(0-100):';
                          
                          const ranges = datosValidados.labels.map((label: string) => {
                            const [from, to] = label.split('-').map((v: string) => parseFloat(v.trim()));
                            return { from: from || 0, to: to || 100 };
                          });
                          const valorMaximo = Math.max(...ranges.map(range => range.to));
                          return `(0-${valorMaximo}):`;
                        })()}
                      </label>
                      <input
                        type="number"
                        value={tacometroValue}
                        onChange={(e) => setTacometroValue(parseFloat(e.target.value) || 0)}
                        min="0"
                        max={(() => {
                          const datosValidados = datosValidadosTacometro;
                          if (!datosValidados) return 100;
                          
                          const ranges = datosValidados.labels.map((label: string) => {
                            const [from, to] = label.split('-').map((v: string) => parseFloat(v.trim()));
                            return { from: from || 0, to: to || 100 };
                          });
                          return Math.max(...ranges.map(range => range.to));
                        })()}
                        style={{ 
                          width: '100%',
                          padding: '6px 8px', 
                          borderRadius: '4px', 
                          border: '1px solid #ccc',
                          fontSize: '12px'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <input
                          type="checkbox"
                          checked={tacometroShowValue}
                          onChange={(e) => setTacometroShowValue(e.target.checked)}
                        />
                        <span style={{ fontSize: '12px' }}>Mostrar valor en el centro</span>
                      </label>
                      
                      {tacometroShowValue && (
                        <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                              Color del valor:
                            </label>
                            <input
                              type="color"
                              value={tacometroValueColor}
                              onChange={(e) => setTacometroValueColor(e.target.value)}
                              style={{ 
                                width: '100%',
                                height: '30px',
                                padding: '2px', 
                                borderRadius: '4px', 
                                border: '1px solid #ccc'
                              }}
                            />
                          </div>
                          
                          <div>
                            <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                              Tamaño de fuente ({tacometroValueFontSize}rem):
                            </label>
                            <input
                              type="range"
                              min="0.1"
                              max="48"
                              value={tacometroValueFontSize}
                              onChange={(e) => setTacometroValueFontSize(parseInt(e.target.value))}
                              style={{ 
                                width: '100%'
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="checkbox"
                          checked={tacometroIsPercent}
                          onChange={(e) => setTacometroIsPercent(e.target.checked)}
                        />
                        <span style={{ fontSize: '12px' }}>Mostrar símbolo de porcentaje (%)</span>
                      </label>
                    </div>
                    
                    {/* Configuración del símbolo personalizado cuando no es porcentaje */}
                    {!tacometroIsPercent && (
                      <div style={{
                        backgroundColor: '#f0f8ff',
                        border: '1px solid #b3d9ff',
                        borderRadius: '6px',
                        padding: '12px',
                        marginTop: '12px'
                      }}>
                        <h5 style={{ 
                          margin: '0 0 10px 0', 
                          fontSize: '12px', 
                          fontWeight: 600, 
                          color: '#0066cc' 
                        }}>
                          💰 Símbolo Personalizado
                        </h5>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input
                                type="checkbox"
                                checked={tacometroShowSymbol}
                                onChange={(e) => setTacometroShowSymbol(e.target.checked)}
                              />
                              <span style={{ fontSize: '12px' }}>Mostrar símbolo personalizado</span>
                            </label>
                          </div>
                          
                          {tacometroShowSymbol && (
                            <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                                  Símbolo:
                                </label>
                                <input
                                  type="text"
                                  value={tacometroSymbol}
                                  onChange={(e) => setTacometroSymbol(e.target.value)}
                                  placeholder="ej: $, €, £, ¥"
                                  style={{ 
                                    width: '100%',
                                    padding: '4px 8px', 
                                    borderRadius: '4px', 
                                    border: '1px solid #ccc',
                                    fontSize: '12px'
                                  }}
                                />
                              </div>
                              
                              <div>
                                <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                                  Posición del símbolo:
                                </label>
                                <select
                                  value={tacometroSymbolPosition}
                                  onChange={(e) => setTacometroSymbolPosition(e.target.value as 'before' | 'after')}
                                  style={{ 
                                    width: '100%',
                                    padding: '4px 8px', 
                                    borderRadius: '4px', 
                                    border: '1px solid #ccc',
                                    fontSize: '12px'
                                  }}
                                >
                                  <option value="before">Antes del valor (ej: $1100)</option>
                                  <option value="after">Después del valor (ej: 1100$)</option>
                                </select>
                              </div>
                              
                              <div style={{ 
                                padding: '8px', 
                                backgroundColor: '#e8f5e8', 
                                border: '1px solid #4caf50', 
                                borderRadius: '4px',
                                fontSize: '11px',
                                color: '#2e7d32'
                              }}>
                                <strong>Vista previa:</strong> {tacometroSymbolPosition === 'before' 
                                  ? `${tacometroSymbol}${tacometroValue}` 
                                  : `${tacometroValue}${tacometroSymbol}`}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Configuración del estilo del contenedor */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      padding: '12px',
                      marginTop: '12px'
                    }}>
                      <h5 style={{ 
                        margin: '0 0 10px 0', 
                        fontSize: '12px', 
                        fontWeight: 600, 
                        color: '#475569' 
                      }}>
                        🎨 Estilo del Contenedor
                      </h5>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                            Color de fondo:
                          </label>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input
                              type="color"
                              value={tacometroBackgroundColor === 'transparent' ? '#ffffff' : tacometroBackgroundColor}
                              onChange={(e) => setTacometroBackgroundColor(e.target.value)}
                              style={{ 
                                width: '40px',
                                height: '30px',
                                padding: '2px', 
                                borderRadius: '4px', 
                                border: '1px solid #ccc'
                              }}
                            />
                            <button
                              onClick={() => setTacometroBackgroundColor('transparent')}
                              style={{
                                padding: '4px 8px',
                                fontSize: '10px',
                                backgroundColor: tacometroBackgroundColor === 'transparent' ? '#e3f2fd' : '#f5f5f5',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              Transparente
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                            Radio del borde ({tacometroBorderRadius}px):
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="20"
                            value={tacometroBorderRadius}
                            onChange={(e) => setTacometroBorderRadius(parseInt(e.target.value))}
                            style={{ width: '100%' }}
                          />
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                            Borde:
                          </label>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input
                              type="text"
                              value={tacometroBorder}
                              onChange={(e) => setTacometroBorder(e.target.value)}
                              placeholder="ej: 1px solid #ccc"
                              style={{ 
                                flex: 1,
                                padding: '4px 8px', 
                                borderRadius: '4px', 
                                border: '1px solid #ccc',
                                fontSize: '11px'
                              }}
                            />
                            <button
                              onClick={() => setTacometroBorder('none')}
                              style={{
                                padding: '4px 8px',
                                fontSize: '10px',
                                backgroundColor: tacometroBorder === 'none' ? '#e3f2fd' : '#f5f5f5',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              Sin borde
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                            Padding ({tacometroPadding}px):
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="40"
                            value={tacometroPadding}
                            onChange={(e) => setTacometroPadding(parseInt(e.target.value))}
                            style={{ width: '100%' }}
                          />
                        </div>

                        {/* Configuración de valores mínimo y máximo */}
                        <div style={{ 
                          marginTop: '16px', 
                          padding: '12px', 
                          backgroundColor: '#f8f9fa', 
                          borderRadius: '6px',
                          border: '1px solid #dee2e6'
                        }}>
                          <h4 style={{ 
                            margin: '0 0 12px 0', 
                            fontSize: '13px', 
                            fontWeight: '600', 
                            color: '#495057' 
                          }}>
                            Valores Mínimo y Máximo
                          </h4>

                          <div style={{ marginBottom: '12px' }}>
                            <label style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}>
                              <input
                                type="checkbox"
                                checked={tacometroShowMinMax}
                                onChange={(e) => setTacometroShowMinMax(e.target.checked)}
                                style={{ marginRight: '6px' }}
                              />
                              Mostrar valores mín/máx en los extremos
                            </label>
                          </div>

                          {tacometroShowMinMax && (
                            <>
                              <div style={{ marginBottom: '12px' }}>
                                <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                                  Color de valores mín/máx:
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <input
                                    type="color"
                                    value={tacometroMinMaxColor}
                                    onChange={(e) => setTacometroMinMaxColor(e.target.value)}
                                    style={{ 
                                      width: '30px', 
                                      height: '30px', 
                                      border: '1px solid #ccc',
                                      borderRadius: '4px',
                                      cursor: 'pointer'
                                    }}
                                  />
                                  <span style={{ fontSize: '11px', color: '#666' }}>
                                    {tacometroMinMaxColor}
                                  </span>
                                </div>
                              </div>

                              <div>
                                <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                                  Tamaño de fuente mín/máx ({tacometroMinMaxFontSize}px):
                                </label>
                                <input
                                  type="range"
                                  min="0"
                                  max="20"
                                  value={tacometroMinMaxFontSize}
                                  onChange={(e) => setTacometroMinMaxFontSize(parseInt(e.target.value))}
                                  style={{ width: '100%' }}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {tacometroValidationError && (
                      <div style={{ 
                        padding: '8px', 
                        backgroundColor: '#ffebee', 
                        border: '1px solid #f44336', 
                        borderRadius: '4px',
                        color: '#d32f2f',
                        fontSize: '12px'
                      }}>
                        {tacometroValidationError}
                      </div>
                    )}
                    
                    {/* Configuración del Needle (Aguja) */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      padding: '12px',
                      marginTop: '12px'
                    }}>
                      <h5 style={{ 
                        margin: '0 0 10px 0', 
                        fontSize: '12px', 
                        fontWeight: 600, 
                        color: '#475569' 
                      }}>
                        🎯 Configuración de la Aguja
                      </h5>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {/* Tipo de aguja */}
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                            Estilo de aguja:
                          </label>
                          <select
                            value={needleStyle}
                            onChange={(e) => setNeedleStyle(e.target.value as any)}
                            style={{ 
                              width: '100%',
                              padding: '6px 8px', 
                              borderRadius: '4px', 
                              border: '1px solid #ccc',
                              fontSize: '12px'
                            }}
                          >
                            <option value="default">🔹 Default - Línea simple</option>
                            <option value="arrow">🏹 Arrow - Con punta de flecha</option>
                            <option value="triangle">🔺 Triangle - Triangular</option>
                            <option value="diamond">💎 Diamond - Forma de diamante</option>
                            <option value="modern">✨ Modern - Estilo moderno</option>
                            <option value="minimal">⚪ Minimal - Minimalista</option>
                          </select>
                        </div>
                        
                        {/* Color de la aguja */}
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                            Color de la aguja:
                          </label>
                          <input
                            type="color"
                            value={needleColor}
                            onChange={(e) => setNeedleColor(e.target.value)}
                            style={{ 
                              width: '100%',
                              height: '30px',
                              padding: '2px', 
                              borderRadius: '4px', 
                              border: '1px solid #ccc'
                            }}
                          />
                        </div>
                        
                        {/* Grosor de la aguja */}
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                            Grosor ({needleWidth}px):
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="8"
                            value={needleWidth}
                            onChange={(e) => setNeedleWidth(parseInt(e.target.value))}
                            style={{ width: '100%' }}
                          />
                        </div>
                        
                        {/* Longitud de la aguja */}
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                            Longitud ({Math.round(needleLength * 100)}%):
                          </label>
                          <input
                            type="range"
                            min="0.5"
                            max="1"
                            step="0.05"
                            value={needleLength}
                            onChange={(e) => setNeedleLength(parseFloat(e.target.value))}
                            style={{ width: '100%' }}
                          />
                        </div>
                        
                        {/* Vista previa del estilo */}
                        <div style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e0e0e0',
                          borderRadius: '4px',
                          padding: '8px',
                          marginTop: '8px'
                        }}>
                          <div style={{
                            fontSize: '11px',
                            color: '#2e7d32',
                            textAlign: 'center'
                          }}>
                            <strong>Configuración actual:</strong><br/>
                            {needleStyle.charAt(0).toUpperCase() + needleStyle.slice(1)} • 
                            {needleColor} • {needleWidth}px • {Math.round(needleLength * 100)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Configuración específica del Progreso Vertical */}
              {tipoActual.tipo === 'progresoVertical' && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 12px 0', color: '#555', fontSize: '14px', fontWeight: 600 }}>
                    📊 Configuración del Progreso Vertical
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    
                    {/* Valor */}
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                        Valor actual:
                      </label>
                      <input
                        type="number"
                        value={progresoValor}
                        onChange={(e) => setProgresoValor(parseFloat(e.target.value) || 0)}
                        min={progresoMinimo}
                        max={progresoMaximo}
                        step="0.1"
                        style={{ 
                          width: '100%',
                          padding: '6px 8px', 
                          borderRadius: '4px', 
                          border: '1px solid #ccc',
                          fontSize: '12px'
                        }}
                      />
                    </div>
                    
                    {/* Rango Min/Max */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                          Mínimo:
                        </label>
                        <input
                          type="number"
                          value={progresoMinimo}
                          onChange={(e) => setProgresoMinimo(parseFloat(e.target.value) || 0)}
                          style={{ 
                            width: '100%',
                            padding: '6px 8px', 
                            borderRadius: '4px', 
                            border: '1px solid #ccc',
                            fontSize: '12px'
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                          Máximo:
                        </label>
                        <input
                          type="number"
                          value={progresoMaximo}
                          onChange={(e) => setProgresoMaximo(parseFloat(e.target.value) || 100)}
                          style={{ 
                            width: '100%',
                            padding: '6px 8px', 
                            borderRadius: '4px', 
                            border: '1px solid #ccc',
                            fontSize: '12px'
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Color de la barra */}
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                        Color de la barra:
                      </label>
                      <input
                        type="color"
                        value={progresoColorBar}
                        onChange={(e) => setProgresoColorBar(e.target.value)}
                        style={{ 
                          width: '100%',
                          height: '30px',
                          padding: '2px', 
                          borderRadius: '4px', 
                          border: '1px solid #ccc'
                        }}
                      />
                    </div>
                    
                    {/* Dimensiones */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                          Ancho de barra ({progresoBarWidth}px):
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={progresoBarWidth}
                          onChange={(e) => setProgresoBarWidth(parseInt(e.target.value))}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                          Altura ({progresoHeight}px):
                        </label>
                        <input
                          type="range"
                          min="100"
                          max="500"
                          value={progresoHeight}
                          onChange={(e) => setProgresoHeight(parseInt(e.target.value))}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                    
                    {/* Mostrar porcentaje o símbolo personalizado */}
                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="checkbox"
                          checked={progresoIsPercent}
                          onChange={(e) => setProgresoIsPercent(e.target.checked)}
                        />
                        <span style={{ fontSize: '12px' }}>Mostrar porcentaje (%)</span>
                      </label>
                    </div>
                    
                    {/* Configuración del símbolo personalizado */}
                    {!progresoIsPercent && (
                      <div style={{
                        backgroundColor: '#f0f8ff',
                        border: '1px solid #b3d9ff',
                        borderRadius: '6px',
                        padding: '12px',
                        marginTop: '8px'
                      }}>
                        <h5 style={{ 
                          margin: '0 0 10px 0', 
                          fontSize: '12px', 
                          fontWeight: 600, 
                          color: '#0066cc' 
                        }}>
                          💰 Símbolo Personalizado
                        </h5>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                              Símbolo:
                            </label>
                            <input
                              type="text"
                              value={progresoSymbol}
                              onChange={(e) => setProgresoSymbol(e.target.value)}
                              placeholder="ej: $, €, puntos, unidades"
                              style={{ 
                                width: '100%',
                                padding: '4px 8px', 
                                borderRadius: '4px', 
                                border: '1px solid #ccc',
                                fontSize: '12px'
                              }}
                            />
                          </div>
                          
                          <div>
                            <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                              Posición del símbolo:
                            </label>
                            <select
                              value={progresoSymbolPosition}
                              onChange={(e) => setProgresoSymbolPosition(e.target.value as 'before' | 'after')}
                              style={{ 
                                width: '100%',
                                padding: '4px 8px', 
                                borderRadius: '4px', 
                                border: '1px solid #ccc',
                                fontSize: '12px'
                              }}
                            >
                              <option value="before">Antes del valor (ej: $75)</option>
                              <option value="after">Después del valor (ej: 75 puntos)</option>
                            </select>
                          </div>
                          
                          <div style={{ 
                            padding: '8px', 
                            backgroundColor: '#e8f5e8', 
                            border: '1px solid #4caf50', 
                            borderRadius: '4px',
                            fontSize: '11px',
                            color: '#2e7d32'
                          }}>
                            <strong>Vista previa:</strong> {progresoSymbolPosition === 'before' 
                              ? `${progresoSymbol}${progresoValor}` 
                              : `${progresoValor} ${progresoSymbol}`}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Mostrar valor */}
                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="checkbox"
                          checked={progresoShowValue}
                          onChange={(e) => setProgresoShowValue(e.target.checked)}
                        />
                        <span style={{ fontSize: '12px' }}>Mostrar valor</span>
                      </label>
                      
                      {progresoShowValue && (
                        <div style={{ marginLeft: '20px', marginTop: '8px' }}>
                          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                            Posición del valor:
                          </label>
                          <select
                            value={progresoValuePosition}
                            onChange={(e) => setProgresoValuePosition(e.target.value as 'top' | 'bottom' | 'center')}
                            style={{ 
                              width: '100%',
                              padding: '4px 8px', 
                              borderRadius: '4px', 
                              border: '1px solid #ccc',
                              fontSize: '12px'
                            }}
                          >
                            <option value="top">Arriba de la barra</option>
                            <option value="center">En el centro de la barra</option>
                            <option value="bottom">Abajo de la barra</option>
                          </select>
                        </div>
                      )}
                    </div>
                    
                    {/* Subdivisiones */}
                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="checkbox"
                          checked={progresoShowSubdivisions}
                          onChange={(e) => setProgresoShowSubdivisions(e.target.checked)}
                        />
                        <span style={{ fontSize: '12px' }}>Mostrar subdivisiones</span>
                      </label>
                      
                      {progresoShowSubdivisions && (
                        <div style={{ marginLeft: '20px', marginTop: '8px' }}>
                          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                            Intervalo de subdivisiones:
                          </label>
                          <input
                            type="number"
                            value={progresoSubdivisions}
                            onChange={(e) => setProgresoSubdivisions(parseInt(e.target.value) || 10)}
                            min="1"
                            max="50"
                            style={{ 
                              width: '100%',
                              padding: '4px 8px', 
                              borderRadius: '4px', 
                              border: '1px solid #ccc',
                              fontSize: '12px'
                            }}
                          />
                        </div>
                      )}
                    </div>
                    

                    {/* Mostrar valores de cada división (Y axis) */}
                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="checkbox"
                          checked={progresoShowDivisionValues}
                          onChange={e => setProgresoShowDivisionValues(e.target.checked)}
                        />
                        <span style={{ fontSize: '12px' }}>Mostrar valores de cada división (Y axis)</span>
                      </label>
                    </div>
                    
                    {/* Color de fondo */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      padding: '12px',
                      marginTop: '12px'
                    }}>
                      <h5 style={{ 
                        margin: '0 0 10px 0', 
                        fontSize: '12px', 
                        fontWeight: 600, 
                        color: '#475569' 
                      }}>
                        🎨 Color de Fondo
                      </h5>
                      
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="color"
                          value={progresoBackgroundColor === 'transparent' ? '#ffffff' : progresoBackgroundColor}
                          onChange={(e) => setProgresoBackgroundColor(e.target.value)}
                          disabled={progresoBackgroundColor === 'transparent'}
                          style={{ 
                            width: '40px',
                            height: '30px',
                            padding: '2px', 
                            borderRadius: '4px', 
                            border: '1px solid #ccc',
                            opacity: progresoBackgroundColor === 'transparent' ? 0.5 : 1
                          }}
                        />
                        <button
                          onClick={() => setProgresoBackgroundColor(
                            progresoBackgroundColor === 'transparent' ? '#ffffff' : 'transparent'
                          )}
                          style={{
                            padding: '4px 12px',
                            fontSize: '11px',
                            backgroundColor: progresoBackgroundColor === 'transparent' ? '#e3f2fd' : '#f5f5f5',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          {progresoBackgroundColor === 'transparent' ? '✓ Transparente' : 'Usar Transparente'}
                        </button>
                      </div>
                    </div>
                    
                  </div>
                </div>
              )}

              {/* Configuración específica del CardIndicadores */}
              {tipoActual.tipo === 'cardIndicadores' && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 12px 0', color: '#555', fontSize: '14px', fontWeight: 600 }}>
                    🎯 Configuración de Card Indicadores
                  </h4>
                  
                  {/* Nota sobre tamaños responsivos */}
                  <div style={{
                    backgroundColor: '#e8f5e8',
                    border: '1px solid #4caf50',
                    borderRadius: '4px',
                    padding: '8px',
                    marginBottom: '12px',
                    fontSize: '11px',
                    color: '#2e7d32'
                  }}>
                    <strong>📱 Adaptación automática:</strong> Los tamaños de iconos y textos se convierten automáticamente a medidas responsivas que se adaptan al tamaño del contenedor.
                    <br />
                    <strong>🧪 Para probar:</strong> Usa el slider "Ancho rápido" arriba para cambiar el tamaño del contenedor y ver cómo se adaptan los elementos.
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {/* Botón para agregar nuevo indicador */}
                    <button
                      onClick={agregarIndicador}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      + Agregar Indicador
                    </button>

                    {/* Configuraciones Globales */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      padding: '12px',
                      marginBottom: '12px'
                    }}>
                      <h5 style={{ 
                        margin: '0 0 10px 0', 
                        fontSize: '12px', 
                        fontWeight: 600, 
                        color: '#475569' 
                      }}>
                        ⚙️ Configuraciones Globales
                      </h5>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {/* Alineación */}
                        <div>
                          <label style={{ display: 'block', fontSize: '10px', marginBottom: '3px', color: '#6b7280' }}>
                            Alineación:
                          </label>
                          <select
                            value={cardAlineacion}
                            onChange={(e) => setCardAlineacion(e.target.value as 'left' | 'center' | 'right' | 'justify')}
                            style={{
                              width: '100%',
                              padding: '4px 6px',
                              fontSize: '11px',
                              border: '1px solid #d1d5db',
                              borderRadius: '3px'
                            }}
                          >
                            <option value="left">Izquierda</option>
                            <option value="center">Centro</option>
                            <option value="right">Derecha</option>
                            <option value="justify">Justificado</option>
                          </select>
                        </div>

                        {/* Ancho */}
                        <div>
                          <label style={{ display: 'block', fontSize: '10px', marginBottom: '3px', color: '#6b7280' }}>
                            Ancho:
                          </label>
                          <input
                            type="text"
                            value={cardAncho}
                            onChange={(e) => setCardAncho(e.target.value)}
                            placeholder="320px, 100%, auto"
                            style={{
                              width: '100%',
                              padding: '4px 6px',
                              fontSize: '11px',
                              border: '1px solid #d1d5db',
                              borderRadius: '3px'
                            }}
                          />
                        </div>

                        {/* Control de ancho rápido con slider */}
                        <div>
                          <label style={{ display: 'block', fontSize: '10px', marginBottom: '3px', color: '#6b7280' }}>
                            Ancho rápido (px):
                          </label>
                          <input
                            type="range"
                            min="200"
                            max="800"
                            step="20"
                            value={parseInt(cardAncho.replace('px', '')) || 320}
                            onChange={(e) => setCardAncho(`${e.target.value}px`)}
                            style={{
                              width: '100%',
                              height: '20px'
                            }}
                          />
                          <div style={{ 
                            fontSize: '9px', 
                            color: '#6b7280', 
                            textAlign: 'center',
                            marginTop: '2px'
                          }}>
                            {parseInt(cardAncho.replace('px', '')) || 320}px
                          </div>
                        </div>

                        {/* Padding */}
                        <div>
                          <label style={{ display: 'block', fontSize: '10px', marginBottom: '3px', color: '#6b7280' }}>
                            Padding:
                          </label>
                          <input
                            type="number"
                            value={cardPadding}
                            onChange={(e) => setCardPadding(parseInt(e.target.value) || 0)}
                            style={{
                              width: '100%',
                              padding: '4px 6px',
                              fontSize: '11px',
                              border: '1px solid #d1d5db',
                              borderRadius: '3px'
                            }}
                          />
                        </div>

                        {/* Border Radius */}
                        <div>
                          <label style={{ display: 'block', fontSize: '10px', marginBottom: '3px', color: '#6b7280' }}>
                            Border Radius:
                          </label>
                          <input
                            type="number"
                            value={cardBorderRadius}
                            onChange={(e) => setCardBorderRadius(parseInt(e.target.value) || 0)}
                            style={{
                              width: '100%',
                              padding: '4px 6px',
                              fontSize: '11px',
                              border: '1px solid #d1d5db',
                              borderRadius: '3px'
                            }}
                          />
                        </div>

                        {/* Background Color */}
                        <div>
                          <label style={{ display: 'block', fontSize: '10px', marginBottom: '3px', color: '#6b7280' }}>
                            Color de Fondo:
                          </label>
                          <input
                            type="color"
                            value={cardBackgroundColor}
                            onChange={(e) => setCardBackgroundColor(e.target.value)}
                            style={{
                              width: '100%',
                              height: '25px',
                              border: '1px solid #d1d5db',
                              borderRadius: '3px'
                            }}
                          />
                        </div>

                        {/* Border */}
                        <div>
                          <label style={{ display: 'block', fontSize: '10px', marginBottom: '3px', color: '#6b7280' }}>
                            Borde:
                          </label>
                          <input
                            type="text"
                            value={cardBorder}
                            onChange={(e) => setCardBorder(e.target.value)}
                            placeholder="1px solid #e0e0e0"
                            style={{
                              width: '100%',
                              padding: '4px 6px',
                              fontSize: '11px',
                              border: '1px solid #d1d5db',
                              borderRadius: '3px'
                            }}
                          />
                        </div>

                        {/* Column Gap - Solo visible cuando alineación es justify */}
                        {cardAlineacion === 'justify' && (
                          <div>
                            <label style={{ display: 'block', fontSize: '10px', marginBottom: '3px', color: '#6b7280' }}>
                              Espaciado Columnas:
                            </label>
                            <input
                              type="number"
                              value={cardColumnGap}
                              onChange={(e) => setCardColumnGap(parseInt(e.target.value) || 16)}
                              min="0"
                              max="50"
                              style={{
                                width: '100%',
                                padding: '4px 6px',
                                fontSize: '11px',
                                border: '1px solid #d1d5db',
                                borderRadius: '3px'
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tabla de indicadores */}
                    <div style={{ 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#fff'
                    }}>
                      {cardIndicadores.map((indicador, index) => (
                        <div key={index} style={{
                          padding: '12px',
                          borderBottom: index < cardIndicadores.length - 1 ? '1px solid #e5e7eb' : 'none',
                          backgroundColor: index % 2 === 0 ? '#f9fafb' : '#fff'
                        }}>
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '8px'
                          }}>
                            <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>
                              Indicador {index + 1}
                            </span>
                            <button
                              onClick={() => eliminarIndicador(index)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#ef4444',
                                cursor: 'pointer',
                                fontSize: '14px'
                              }}
                            >
                              🗑️
                            </button>
                          </div>

                          {/* Campo Icono */}
                          <div style={{ marginBottom: '8px' }}>
                            <label style={{ display: 'block', fontSize: '10px', marginBottom: '2px', color: '#6b7280' }}>
                              Icono Material:
                            </label>
                            <input
                              type="text"
                              value={indicador.icono}
                              onChange={(e) => actualizarIndicador(index, 'icono', e.target.value)}
                              placeholder="home, star, favorite, etc."
                              style={{
                                width: '100%',
                                padding: '4px 6px',
                                fontSize: '11px',
                                border: '1px solid #d1d5db',
                                borderRadius: '3px'
                              }}
                            />
                          </div>

                          {/* Campo Nombre */}
                          <div style={{ marginBottom: '8px' }}>
                            <label style={{ display: 'block', fontSize: '10px', marginBottom: '2px', color: '#6b7280' }}>
                              Nombre:
                            </label>
                            <input
                              type="text"
                              value={indicador.nombre}
                              onChange={(e) => actualizarIndicador(index, 'nombre', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '4px 6px',
                                fontSize: '11px',
                                border: '1px solid #d1d5db',
                                borderRadius: '3px'
                              }}
                            />
                          </div>

                          {/* Campo Valor y Checkbox Porcentaje */}
                          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                            <div style={{ flex: 1 }}>
                              <label style={{ display: 'block', fontSize: '10px', marginBottom: '2px', color: '#6b7280' }}>
                                Valor:
                              </label>
                              <input
                                type="number"
                                value={indicador.valor}
                                onChange={(e) => actualizarIndicador(index, 'valor', parseFloat(e.target.value) || 0)}
                                style={{
                                  width: '100%',
                                  padding: '4px 6px',
                                  fontSize: '11px',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '3px'
                                }}
                              />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'end' }}>
                              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px' }}>
                                <input
                                  type="checkbox"
                                  checked={indicador.isPercent}
                                  onChange={(e) => actualizarIndicador(index, 'isPercent', e.target.checked)}
                                />
                                %
                              </label>
                            </div>
                          </div>

                          {/* Colores */}
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <div style={{ flex: 1 }}>
                              <label style={{ display: 'block', fontSize: '10px', marginBottom: '2px', color: '#6b7280' }}>
                                Color Icono:
                              </label>
                              <input
                                type="color"
                                value={indicador.iconoColor}
                                onChange={(e) => actualizarIndicador(index, 'iconoColor', e.target.value)}
                                style={{
                                  width: '100%',
                                  height: '25px',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '3px'
                                }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ display: 'block', fontSize: '10px', marginBottom: '2px', color: '#6b7280' }}>
                                Color Nombre:
                              </label>
                              <input
                                type="color"
                                value={indicador.nombreColor}
                                onChange={(e) => actualizarIndicador(index, 'nombreColor', e.target.value)}
                                style={{
                                  width: '100%',
                                  height: '25px',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '3px'
                                }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ display: 'block', fontSize: '10px', marginBottom: '2px', color: '#6b7280' }}>
                                Color Valor:
                              </label>
                              <input
                                type="color"
                                value={indicador.valorColor}
                                onChange={(e) => actualizarIndicador(index, 'valorColor', e.target.value)}
                                style={{
                                  width: '100%',
                                  height: '25px',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '3px'
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Tamaños de Fuente - Valores responsivos automáticos */}
                          <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                            <div style={{ flex: 1 }}>
                              <label style={{ display: 'block', fontSize: '10px', marginBottom: '2px', color: '#6b7280' }}>
                                Tamaño Icono ({indicador.iconoTamano}):
                              </label>
                              <input
                                type="range"
                                min="12"
                                max="32"
                                value={indicador.iconoTamano}
                                onChange={(e) => actualizarIndicador(index, 'iconoTamano', parseInt(e.target.value))}
                                style={{
                                  width: '100%',
                                  height: '20px'
                                }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ display: 'block', fontSize: '10px', marginBottom: '2px', color: '#6b7280' }}>
                                Tamaño Nombre ({indicador.nombreTamano}):
                              </label>
                              <input
                                type="range"
                                min="10"
                                max="24"
                                value={indicador.nombreTamano}
                                onChange={(e) => actualizarIndicador(index, 'nombreTamano', parseInt(e.target.value))}
                                style={{
                                  width: '100%',
                                  height: '20px'
                                }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ display: 'block', fontSize: '10px', marginBottom: '2px', color: '#6b7280' }}>
                                Tamaño Valor ({indicador.valorTamano}):
                              </label>
                              <input
                                type="range"
                                min="10"
                                max="28"
                                value={indicador.valorTamano}
                                onChange={(e) => actualizarIndicador(index, 'valorTamano', parseInt(e.target.value))}
                                style={{
                                  width: '100%',
                                  height: '20px'
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Dimensiones */}
              {tipoActual.tipo !== 'card' && tipoActual.tipo !== 'cardIndicadores' && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 12px 0', color: '#555', fontSize: '14px', fontWeight: 600 }}>
                    📐 Dimensiones
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', minWidth: '50px' }}>Altura:</span>
                    <input
                      type="number"
                      min="200"
                      max="800"
                      step="50"
                      value={alturaGrafico}
                      onChange={(e) => setAlturaGrafico(parseInt(e.target.value) || 400)}
                      style={{ 
                        padding: '6px 8px', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc',
                        fontSize: '12px',
                        width: '80px'
                      }}
                    />
                    <span style={{ fontSize: '12px' }}>px</span>
                  </div>
                </div>
              )}
            </div>
  
            {/* Columna derecha - Gráfico y Código */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Sección del Gráfico */}
              <div className="grafico-demo">
                <div className="grafico-header" style={{ marginBottom: '15px' }}>
                  <h2 style={{ margin: '0 0 8px 0', color: '#333' }}>{tipoActual.nombre}</h2>
                  <p className="descripcion" style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                    {tipoActual.descripcion}
                  </p>
                </div>

                {/* Control para mostrar/ocultar valores de división en ProgresoVertical */}
                {tipoActual.tipo === 'progresoVertical' && (
                  <div style={{ margin: '8px 0' }}>
                    <label>
                      <input
                        type="checkbox"
                        checked={progresoShowDivisionValues}
                        onChange={e => setProgresoShowDivisionValues(e.target.checked)}
                      /> Mostrar valores de cada división (Y axis)
                    </label>
                  </div>
                )}

                {/* Render del gráfico */}
                <div 
                  className="grafico-wrapper"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                    border: '2px solid #e9ecef',
                    borderRadius: '12px',
                    padding: '20px',
                    width: tipoActual.tipo === 'cardIndicadores' ? cardAncho : '100%',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    ...(tipoActual.tipo === 'card' ? {
                      alignItems: 'center'
                    } : {
                      position: 'relative'
                    })
                  }}
                >
                  <Grafico
                    tipo={tipoActual.tipo}
                    data={tipoActual.tipo === 'gauge' ? (() => {
                      const datosValidados = datosValidadosTacometro;
                      if (!datosValidados) {
                        return tipoActual.datos;
                      }
                      return {
                        labels: datosValidados.labels,
                        datasets: [{
                          data: datosValidados.labels.map(() => 1), // Datos dummy para cada segmento
                          backgroundColor: datosValidados.backgroundColor,
                          borderWidth: 0,
                          cutout: '80%',
                          circumference: 180,
                          rotation: 270,
                        }]
                      };
                    })() : tipoActual.datos}
                    mostrarEtiquetas={mostrarEtiquetas}
                    mostrarEjeX={tipoActual.tipo === 'gauge' ? undefined : mostrarEjeXControl}
                    mostrarEjeY={tipoActual.tipo === 'gauge' ? undefined : mostrarEjeYControl}
                    gaugeProps={tipoActual.tipo === 'gauge' ? (() => {
                      const datosValidados = datosValidadosTacometro;
                      
                      // Construir containerStyle con los valores actuales
                      const containerStyle = {
                        backgroundColor: tacometroBackgroundColor,
                        borderRadius: tacometroBorderRadius,
                        border: tacometroBorder,
                        padding: tacometroPadding
                      };
                      
                      if (!datosValidados) {
                        // Si hay error de validación, usar datos por defecto
                        const valorLimitado = Math.min(tacometroValue, 100); // Limitar a 100% máximo
                        return {
                          ranges: [
                            { from: 0, to: 70, color: '#d32f2f' },
                            { from: 70, to: 90, color: '#fbc02d' },
                            { from: 90, to: 100, color: '#388e3c' }
                          ],
                          value: valorLimitado,
                          originalValue: tacometroValue, // Valor original para mostrar en el centro
                          showLabels: mostrarEtiquetas,
                          showValue: tacometroShowValue,
                          valueColor: tacometroValueColor,
                          valueFontSize: tacometroValueFontSize,
                          isPercent: tacometroIsPercent,
                          containerStyle: containerStyle,
                          showSymbol: tacometroShowSymbol,
                          symbol: tacometroSymbol,
                          symbolPosition: tacometroSymbolPosition,
                          showMinMax: tacometroShowMinMax,
                          minMaxColor: tacometroMinMaxColor,
                          minMaxFontSize: tacometroMinMaxFontSize,
                          // Propiedades del needle
                          needleStyle: needleStyle,
                          needleColor: needleColor,
                          needleWidth: needleWidth,
                          needleLength: needleLength
                        };
                      }
                      
                      // Generar ranges basados en los datos validados
                      const ranges = datosValidados.labels.map((label: string, index: number) => {
                        const [from, to] = label.split('-').map((v: string) => parseFloat(v.trim()));
                        return {
                          from: from || index * 10,
                          to: to || (index + 1) * 10,
                          color: datosValidados.backgroundColor[index]
                        };
                      });
                      
                      // Calcular el valor máximo de los ranges para limitar el valor
                      const valorMaximo = Math.max(...ranges.map(range => range.to));
                      const valorLimitado = Math.min(tacometroValue, valorMaximo);
                      
                      return {
                        ranges,
                        value: valorLimitado,
                        originalValue: tacometroValue, // Valor original para mostrar en el centro
                        showLabels: mostrarEtiquetas,
                        showValue: tacometroShowValue,
                        valueColor: tacometroValueColor,
                        valueFontSize: tacometroValueFontSize,
                        isPercent: tacometroIsPercent,
                        containerStyle: containerStyle,
                        showSymbol: tacometroShowSymbol,
                        symbol: tacometroSymbol,
                        symbolPosition: tacometroSymbolPosition,
                        showMinMax: tacometroShowMinMax,
                        minMaxColor: tacometroMinMaxColor,
                        minMaxFontSize: tacometroMinMaxFontSize,
                        // Propiedades del needle
                        needleStyle: needleStyle,
                        needleColor: needleColor,
                        needleWidth: needleWidth,
                        needleLength: needleLength
                      };
                    })() : undefined}
                    configEtiquetas={{
                      color: colorEtiquetas,
                      backgroundColor: colorFondoEtiquetas,
                      fontSize: tamanoFuente,
                      borderRadius: borderRadiusEtiquetas,
                      padding: paddingEtiquetas,
                    }}
                    cardProps={tipoActual.tipo === 'card' ? {
                      title: "Total Revenue",
                      value: "$48,329",
                      change: "+12.5%",
                      icon: "💰",
                      colorScheme: "success",
                      showBorder: true,
                      borderColor: "#e5e7eb"
                    } : undefined}
                    cardIndicadoresProps={tipoActual.tipo === 'cardIndicadores' ? {
                      indicadores: generateCardIndicadoresData().indicadores,
                      alineacion: cardAlineacion,
                      ancho: '100%', // Usar 100% para que tome el ancho del wrapper
                      padding: cardPadding,
                      backgroundColor: cardBackgroundColor,
                      borderRadius: cardBorderRadius,
                      border: cardBorder,
                      columnGap: cardColumnGap
                    } : undefined}
                    progresoVerticalProps={tipoActual.tipo === 'progresoVertical' ? {
                      valor: progresoValor,
                      maximo: progresoMaximo,
                      minimo: progresoMinimo,
                      isPercent: progresoIsPercent,
                      symbol: progresoSymbol,
                      symbolPosition: progresoSymbolPosition,
                      colorBar: progresoColorBar,
                      backgroundColor: progresoBackgroundColor,
                      barWidth: progresoBarWidth,
                      height: progresoHeight,
                      showValue: progresoShowValue,
                      valuePosition: progresoValuePosition,
                      subdivisions: progresoSubdivisions,
                      showSubdivisions: progresoShowSubdivisions,
                      showDivisionValues: progresoShowDivisionValues
                    } : undefined}


                    options={tipoActual.opciones ? {
                      ...tipoActual.opciones,
                      responsive: true,
                      maintainAspectRatio: false,
                      interaction: {
                        intersect: false,
                      },
                      plugins: {
                        ...tipoActual.opciones.plugins,
                        title: {
                          display: mostrarTitulo,
                          text: textoTitulo || `Ejemplo: ${tipoActual.nombre}`,
                        },
                        legend: {
                          display: mostrarLeyenda,
                          position: posicionLeyenda,
                        },
                      },
                    } : {
                      responsive: true,
                      maintainAspectRatio: false,
                      interaction: {
                        intersect: false,
                      },
                      plugins: {
                        title: {
                          display: mostrarTitulo,
                          text: textoTitulo || `Ejemplo: ${tipoActual.nombre}`,
                        },
                        legend: {
                          display: mostrarLeyenda,
                          position: posicionLeyenda,
                        },
                      },
                    }}
                    height={`${alturaGrafico}px`}
                    style={tipoActual.tipo === 'card' ? { 
                      padding: '40px'
                    } : {}}
                  />
                </div>
              </div>
            </div>
          </div>         
          <div className="grafico-demo">
            <div className="codigo-ejemplo">
              <h3>💻 Código de Ejemplo Dinámico</h3>
              <p style={{ 
                fontSize: '14px', 
                color: '#666', 
                marginBottom: '10px',
                fontStyle: 'italic' 
              }}>
                Este código se actualiza automáticamente según tu configuración actual ✨
              </p>
              <pre>
                <code>{generarCodigoEjemplo()}</code>
              </pre>
            </div>
          </div>
        </main>
      )}

      {vistaActual === 'galeria' && (
        <main style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
            🎨 Galería Completa de Gráficos
          </h2>
          
          <div className="galeria-grid">
            {tiposGraficos.map((info) => (
              <div key={info.tipo} className="grafico-card">
                <div className="card-header">
                  <h3>{info.nombre}</h3>
                  <p>{info.descripcion}</p>
                </div>
                
                <div 
                  className="card-grafico"
                  style={info.tipo === 'card' ? {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                  } : {}}
                >
                  <Grafico
                    tipo={info.tipo}
                    data={info.datos}
                    mostrarEjeX={info.tipo === 'horizontalBar' ? false : info.tipo === 'gauge' ? undefined : true}
                    mostrarEjeY={['bar', 'line', 'barrasAgrupadas', 'barrasApiladas', 'area', 'multiEje'].includes(info.tipo) ? false : info.tipo === 'gauge' ? undefined : true}
                    mostrarEtiquetas={true}
                    configEtiquetas={{
                      color: '#333333fa',
                      backgroundColor: '#8d8d8d17',
                      fontSize: 11,
                      borderRadius: 4,
                      padding: 6,
                    }}
                    cardProps={info.tipo === 'card' ? {
                      title: "Revenue 2",
                      value: "$12,456",
                      change: "+8.2%",
                      icon: "💹",
                      colorScheme: "success",
                      showBorder: true,
                      borderColor: "#e5e7eb"
                    } : undefined}
                    cardIndicadoresProps={info.tipo === 'cardIndicadores' ? {
                      indicadores: datosCardIndicadores.indicadores,
                      alineacion: 'left',
                      ancho: '280px',
                      padding: 12
                    } : undefined}
                    progresoVerticalProps={info.tipo === 'progresoVertical' ? {
                      valor: 75,
                      maximo: 100,
                      minimo: 0,
                      isPercent: true,
                      colorBar: '#4CAF50',
                      backgroundColor: 'transparent',
                      barWidth: 40,
                      height: 200,
                      showValue: true,
                      valuePosition: 'top',
                      subdivisions: 10,
                      showSubdivisions: true
                    } : undefined}
                    options={info.opciones ? {
                      ...info.opciones,
                      responsive: true,
                      plugins: {
                        ...info.opciones.plugins,
                        legend: { 
                          display: ['barrasAgrupadas', 'barrasApiladas', 'multiEje', 'line', 'area', 'pie', 'doughnut'].includes(info.tipo) ? true : false 
                        },
                        title: { display: false }
                      },
                    } : {
                      responsive: true,
                      plugins: {
                        legend: { 
                          display: ['barrasAgrupadas', 'barrasApiladas', 'multiEje', 'line', 'area', 'pie', 'doughnut'].includes(info.tipo) ? true : false 
                        },
                        title: { display: false }
                      },
                    }}
                    height="200px"
                    style={info.tipo === 'card' ? { 
                      padding: '5px',
                      width: '40%',
                    } : info.tipo === 'cardIndicadores' ? {
                      padding: '5px',
                      width: '90%',
                    } : {}}
                  />
                </div>
                
                <div className="card-footer">
                  <button
                    className="ver-detalle-btn"
                    onClick={() => {
                      setTipoSeleccionado(info.tipo);
                      setVistaActual('demo');
                    }}
                  >
                    Ver Detalle →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      <footer style={{ 
        marginTop: '60px', 
        padding: '30px 20px', 
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e9ecef'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h3>� Instalación y Uso</h3>
          <div style={{ 
            backgroundColor: '#f8f8f8', 
            padding: '20px', 
            borderRadius: '8px', 
            margin: '20px 0',
            textAlign: 'left'
          }}>
            <pre style={{ margin: 0 }}>
{`# Instalar dependencias
npm install chart.js react-chartjs-2

# Importar en tu proyecto
import { Grafico, TipoGrafico, DatosGrafico } from 'react-charts-library';

# Usar el componente
<Grafico tipo="barrasAgrupadas" data={misDatos} options={misOpciones} />`}
            </pre>
          </div>
          
          <div style={{ marginTop: '20px', color: '#666' }}>
            <p>📊 <strong>14 tipos de gráficos disponibles</strong> • ⚡ TypeScript incluido • 🎨 Totalmente personalizable</p>
            <p>Construido con ❤️ usando Chart.js y React</p>
          </div>
        </div>
      </footer>

      {vistaActual === 'needles' && (
        <main style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
            ⚡ Estilos de Aguja para Gauge
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '40px', color: '#666', fontSize: '16px' }}>
            Elige entre 6 estilos diferentes de agujas para personalizar tus gráficos gauge
          </p>
          
          <div className="galeria-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px',
            marginBottom: '40px' 
          }}>
            {ejemplosNeedles.map((ejemplo, index) => (
              <div key={index} className="grafico-card" style={{
                border: '2px solid #e1e8ed',
                borderRadius: '12px',
                padding: '20px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}>
                <div className="card-header" style={{ marginBottom: '20px' }}>
                  <h3 style={{ 
                    color: '#2c3e50', 
                    margin: '0 0 8px 0',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    {ejemplo.titulo}
                  </h3>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#7f8c8d',
                    backgroundColor: '#f8f9fa',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    display: 'inline-block'
                  }}>
                    needleStyle: '{ejemplo.needleStyle}'
                  </div>
                </div>
                
                <div className="card-grafico" style={{ height: '250px', marginBottom: '15px' }}>
                  <Grafico
                    tipo="gauge"
                    gaugeProps={{
                      ...gaugeBaseConfig,
                      needleStyle: ejemplo.needleStyle,
                      needleColor: ejemplo.needleColor,
                      needleWidth: ejemplo.needleWidth,
                      needleLength: ejemplo.needleLength
                    }}
                    height="250px"
                    width="100%"
                  />
                </div>
                
                <div style={{ 
                  backgroundColor: '#f8f9fa',
                  padding: '10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontFamily: 'Monaco, Consolas, monospace'
                }}>
                  <div>needleColor: <span style={{ color: ejemplo.needleColor, fontWeight: 'bold' }}>{ejemplo.needleColor}</span></div>
                  <div>needleWidth: {ejemplo.needleWidth}</div>
                  <div>needleLength: {ejemplo.needleLength}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h3 style={{ color: '#495057', marginBottom: '15px' }}>💡 Cómo usar los estilos de aguja</h3>
            <pre style={{ 
              backgroundColor: '#ffffff',
              padding: '15px',
              borderRadius: '6px',
              border: '1px solid #dee2e6',
              overflow: 'auto',
              fontSize: '13px',
              margin: 0
            }}>
{`<Grafico
  tipo="gauge"
  gaugeProps={{
    ranges: [
      { from: 0, to: 30, color: '#e74c3c' },
      { from: 30, to: 70, color: '#f39c12' },
      { from: 70, to: 100, color: '#27ae60' }
    ],
    value: 75,
    needleStyle: 'arrow',      // 'default' | 'arrow' | 'triangle' | 'diamond' | 'modern' | 'minimal'
    needleColor: '#e74c3c',    // Color de la aguja
    needleWidth: 3,            // Grosor de la aguja
    needleLength: 0.85,        // Longitud como porcentaje del radio (0-1)
    showValue: true,
    isPercent: true
  }}
/>`}
            </pre>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
