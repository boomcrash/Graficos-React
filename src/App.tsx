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
    labels: ['Rojo', 'Azul', 'Amarillo'],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 205, 86, 0.8)'
      ]
    }]
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
      descripción: 'Ideal para mostrar la relación entre dos variables.',
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
/>`
    }
  ];

  const tipoActual = tiposGraficos.find(t => t.tipo === tipoSeleccionado) || tiposGraficos[0];

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
        <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="selector-container">
            <label htmlFor="tipo-grafico">
              🎯 Selecciona el tipo de gráfico:
            </label>
            <select
              id="tipo-grafico"
              value={tipoSeleccionado}
              onChange={(e) => setTipoSeleccionado(e.target.value as TipoGrafico)}
              className="tipo-selector"
            >
              {tiposGraficos.map((info) => (
                <option key={info.tipo} value={info.tipo}>
                  {info.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="grafico-demo">
            <div className="grafico-header">
              <h2>{tipoActual.nombre}</h2>
              <p className="descripcion">{tipoActual.descripcion}</p>
            </div>
            
            <div className="grafico-wrapper">
              <Grafico
                tipo={tipoActual.tipo}
                data={tipoActual.datos}
                options={tipoActual.opciones || {
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: `Ejemplo: ${tipoActual.nombre}`,
                    },
                    legend: {
                      position: 'top',
                    },
                  },
                }}
                height="400px"
              />
            </div>

            <div className="codigo-ejemplo">
              <h3>💻 Código de Ejemplo</h3>
              <pre>
                <code>{tipoActual.codigoEjemplo}</code>
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
                
                <div className="card-grafico">
                  <Grafico
                    tipo={info.tipo}
                    data={info.datos}
                    options={info.opciones || {
                      responsive: true,
                      plugins: {
                        legend: { display: false },
                        title: { display: false }
                      },
                    }}
                    height="200px"
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
