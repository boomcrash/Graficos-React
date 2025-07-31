import React, { useState } from 'react';
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
  datosMultiEje
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
  const [vistaActual, setVistaActual] = useState<'demo' | 'galeria'>('demo');
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

  const tiposGraficos: TipoGraficoInfo[] = [
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
    }
  ];

  const tipoActual = tiposGraficos.find(t => t.tipo === tipoSeleccionado) || tiposGraficos[0];

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
      
      return `{
    ${opcionesPartes.join(',\n    ')}
  }`;
    };

    const alturaCode = alturaGrafico !== 400 ? `
  height="${alturaGrafico}px"` : '';

    // Obtener datos de ejemplo formateados (función existente...)
    const formatearDatos = () => {
      if (tipoActual.tipo === 'card') return '';
      
      const ejemploDatos = {
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

    return `<Grafico
  tipo="${tipoActual.tipo}"
  data=${formatearDatos()}${mostrarEtiquetasCode}${mostrarEjeXCode}${mostrarEjeYCode}${configEtiquetasCode}
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

              {/* Título */}
              {tipoActual.tipo !== 'card' && (
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
              {tipoActual.tipo !== 'card' && (
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
              {!['pie', 'doughnut', 'polarArea', 'card'].includes(tipoActual.tipo) && (
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

              {/* Dimensiones */}
              {tipoActual.tipo !== 'card' && (
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
                
                <div 
                  className="grafico-wrapper"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #e9ecef',
                    borderRadius: '12px',
                    padding: '20px',
                    width: '100%',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    ...(tipoActual.tipo === 'card' ? {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    } : {
                      position: 'relative'
                    })
                  }}
                >
                  <Grafico
                    tipo={tipoActual.tipo}
                    data={tipoActual.datos}
                    mostrarEtiquetas={mostrarEtiquetas}
                    mostrarEjeX={mostrarEjeXControl}
                    mostrarEjeY={mostrarEjeYControl}
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
                    mostrarEjeX={info.tipo === 'horizontalBar' ? false : true}
                    mostrarEjeY={['bar', 'line', 'barrasAgrupadas', 'barrasApiladas', 'area', 'multiEje'].includes(info.tipo) ? false : true}
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
            <p>📊 <strong>13 tipos de gráficos disponibles</strong> • ⚡ TypeScript incluido • 🎨 Totalmente personalizable</p>
            <p>Construido con ❤️ usando Chart.js y React</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
