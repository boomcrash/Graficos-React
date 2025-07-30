import React from 'react';
import { render, screen } from '@testing-library/react';
import Grafico from './Grafico';
import { DatosGrafico } from './Grafico';

// Mock de Chart.js para testing
jest.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="line-chart">Line Chart</div>,
  Bar: () => <div data-testid="bar-chart">Bar Chart</div>,
  Pie: () => <div data-testid="pie-chart">Pie Chart</div>,
  Doughnut: () => <div data-testid="doughnut-chart">Doughnut Chart</div>,
  PolarArea: () => <div data-testid="polar-chart">Polar Chart</div>,
  Radar: () => <div data-testid="radar-chart">Radar Chart</div>,
  Scatter: () => <div data-testid="scatter-chart">Scatter Chart</div>,
  Bubble: () => <div data-testid="bubble-chart">Bubble Chart</div>,
}));

const datosEjemplo: DatosGrafico = {
  labels: ['Test 1', 'Test 2', 'Test 3'],
  datasets: [
    {
      label: 'Dataset de prueba',
      data: [10, 20, 30],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
    },
  ],
};

describe('Componente Grafico', () => {
  test('renderiza gráfico de líneas correctamente', () => {
    render(<Grafico tipo="line" data={datosEjemplo} />);
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  test('renderiza gráfico de barras correctamente', () => {
    render(<Grafico tipo="bar" data={datosEjemplo} />);
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  test('renderiza gráfico circular correctamente', () => {
    render(<Grafico tipo="pie" data={datosEjemplo} />);
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
  });

  test('renderiza gráfico de dona correctamente', () => {
    render(<Grafico tipo="doughnut" data={datosEjemplo} />);
    expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument();
  });

  test('renderiza gráfico polar correctamente', () => {
    render(<Grafico tipo="polarArea" data={datosEjemplo} />);
    expect(screen.getByTestId('polar-chart')).toBeInTheDocument();
  });

  test('renderiza gráfico radar correctamente', () => {
    render(<Grafico tipo="radar" data={datosEjemplo} />);
    expect(screen.getByTestId('radar-chart')).toBeInTheDocument();
  });

  test('renderiza gráfico de dispersión correctamente', () => {
    render(<Grafico tipo="scatter" data={datosEjemplo} />);
    expect(screen.getByTestId('scatter-chart')).toBeInTheDocument();
  });

  test('renderiza gráfico de burbujas correctamente', () => {
    render(<Grafico tipo="bubble" data={datosEjemplo} />);
    expect(screen.getByTestId('bubble-chart')).toBeInTheDocument();
  });

  test('muestra error para tipo de gráfico inválido', () => {
    // @ts-ignore - Ignorar TypeScript para probar tipo inválido
    render(<Grafico tipo="invalid" data={datosEjemplo} />);
    expect(screen.getByText(/Error: Tipo de gráfico "invalid" no válido/)).toBeInTheDocument();
    expect(screen.getByText(/Tipos disponibles:/)).toBeInTheDocument();
  });

  test('aplica className personalizada', () => {
    const { container } = render(
      <Grafico tipo="line" data={datosEjemplo} className="mi-clase-personalizada" />
    );
    expect(container.querySelector('.mi-clase-personalizada')).toBeInTheDocument();
  });

  test('aplica estilos personalizados', () => {
    const estilosPersonalizados = { backgroundColor: 'red', border: '1px solid blue' };
    const { container } = render(
      <Grafico tipo="line" data={datosEjemplo} style={estilosPersonalizados} />
    );
    const contenedor = container.querySelector('.grafico-container');
    expect(contenedor).toHaveStyle('background-color: red');
    expect(contenedor).toHaveStyle('border: 1px solid blue');
  });

  test('aplica dimensiones personalizadas', () => {
    const { container } = render(
      <Grafico tipo="line" data={datosEjemplo} width="500px" height="300px" />
    );
    const contenedor = container.querySelector('.grafico-container');
    expect(contenedor).toHaveStyle('width: 500px');
    expect(contenedor).toHaveStyle('height: 300px');
  });

  test('usa dimensiones por defecto cuando no se especifican', () => {
    const { container } = render(<Grafico tipo="line" data={datosEjemplo} />);
    const contenedor = container.querySelector('.grafico-container');
    expect(contenedor).toHaveStyle('width: 100%');
    expect(contenedor).toHaveStyle('height: 400px');
  });

  test('incluye data-chart-type attribute', () => {
    const { container } = render(<Grafico tipo="line" data={datosEjemplo} />);
    const contenedor = container.querySelector('.grafico-container');
    expect(contenedor).toHaveAttribute('data-chart-type', 'line');
  });

  test('combina opciones por defecto con opciones personalizadas', () => {
    const opcionesPersonalizadas = {
      plugins: {
        title: {
          display: true,
          text: 'Mi título personalizado',
        },
      },
    };
    
    render(<Grafico tipo="line" data={datosEjemplo} options={opcionesPersonalizadas} />);
    
    // Verificar que el componente se renderiza (las opciones se pasan internamente)
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });
});

describe('TypeScript Types', () => {
  test('acepta todos los tipos de gráfico válidos', () => {
    // Estas líneas comprueban que TypeScript acepta todos los tipos
    const tiposValidos = ['line', 'bar', 'pie', 'doughnut', 'polarArea', 'radar', 'scatter', 'bubble'] as const;
    
    tiposValidos.forEach((tipo) => {
      expect(() => {
        render(<Grafico tipo={tipo} data={datosEjemplo} />);
      }).not.toThrow();
    });
  });
});
