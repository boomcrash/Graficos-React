# React Charts Library - TypeScript

Una librería reutilizable de gráficos para React construida con Chart.js y TypeScript, que proporciona un componente único `<Grafico>` para renderizar múltiples tipos de gráficos.

## 📊 Características

- **TypeScript**: Tipado completo para mejor desarrollo y detección de errores
- **Componente Único**: Un solo componente `<Grafico>` para todos los tipos de gráficos
- **8 Tipos de Gráficos**: line, bar, pie, doughnut, polarArea, radar, scatter, bubble
- **Altamente Personalizable**: Opciones completas de Chart.js disponibles
- **Responsive**: Diseños que se adaptan automáticamente
- **Fácil de Usar**: API simple e intuitiva

## 🚀 Instalación

```bash
npm install chart.js react-chartjs-2
```

## 📖 Uso Básico

```tsx
import React from "react";
import { Grafico, TipoGrafico, DatosGrafico } from "./components";

const datos: DatosGrafico = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
  datasets: [
    {
      label: "Ventas 2024",
      data: [65, 59, 80, 81, 56],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 2,
    },
  ],
};

function MiComponente() {
  return (
    <Grafico
      tipo="line"
      data={datos}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Gráfico de Ventas Mensuales",
          },
        },
      }}
      height="400px"
    />
  );
}
```

## 🎯 Tipos de Gráficos Soportados

| Tipo        | Descripción                  |
| ----------- | ---------------------------- |
| `line`      | Gráfico de líneas            |
| `bar`       | Gráfico de barras verticales |
| `pie`       | Gráfico circular (pastel)    |
| `doughnut`  | Gráfico de dona              |
| `polarArea` | Gráfico de área polar        |
| `radar`     | Gráfico de radar             |
| `scatter`   | Gráfico de dispersión        |
| `bubble`    | Gráfico de burbujas          |

## 🔧 Props del Componente

### GraficoProps

| Prop        | Tipo                  | Requerido | Descripción                                |
| ----------- | --------------------- | --------- | ------------------------------------------ |
| `tipo`      | `TipoGrafico`         | ✅        | Tipo de gráfico a renderizar               |
| `data`      | `DatosGrafico`        | ✅        | Datos del gráfico                          |
| `options`   | `OpcionesGrafico`     | ❌        | Opciones de configuración                  |
| `width`     | `string`              | ❌        | Ancho del contenedor                       |
| `height`    | `string`              | ❌        | Alto del contenedor (por defecto: "400px") |
| `className` | `string`              | ❌        | Clase CSS adicional                        |
| `style`     | `React.CSSProperties` | ❌        | Estilos en línea                           |

## 📊 Ejemplos por Tipo de Gráfico

### Gráfico de Líneas

```tsx
<Grafico
  tipo="line"
  data={{
    labels: ["Ene", "Feb", "Mar"],
    datasets: [
      {
        label: "Ventas",
        data: [65, 59, 80],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }}
/>
```

### Gráfico de Barras

```tsx
<Grafico
  tipo="bar"
  data={{
    labels: ["Ene", "Feb", "Mar"],
    datasets: [
      {
        label: "Ingresos",
        data: [12000, 15000, 18000],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  }}
/>
```

### Gráfico Circular

```tsx
<Grafico
  tipo="pie"
  data={{
    labels: ["Rojo", "Azul", "Amarillo"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  }}
/>
```

## ⚙️ Configuración Avanzada

### Opciones Personalizadas

```tsx
<Grafico
  tipo="line"
  data={misDatos}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Mi Gráfico Personalizado",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  }}
/>
```

## 🎨 Estilos CSS

La librería incluye clases CSS que puedes personalizar:

```css
.grafico-container {
  /* Contenedor principal del gráfico */
}

.grafico-error {
  /* Estilos para mensajes de error */
}
```

## 🧪 Desarrollo

Para ejecutar el proyecto en modo desarrollo:

```bash
npm start
```

Para construir el proyecto:

```bash
npm run build
```

Para ejecutar las pruebas:

```bash
npm test
```

## 📋 Requisitos

- React 16.8+
- TypeScript 4.0+
- Chart.js 4.0+
- react-chartjs-2 5.0+

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Reconocimientos

- [Chart.js](https://www.chartjs.org/) - La librería de gráficos
- [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2) - React wrapper para Chart.js
- [Create React App](https://create-react-app.dev/) - Configuración inicial del proyecto
