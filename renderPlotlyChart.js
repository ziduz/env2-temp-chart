// renderPlotlyChart.js
import { formatHOYArray } from './hoyFormatter.js';

export function renderPlotlyChart({
  labels,
  datasetsConfig,
  minComfort,
  maxComfort,
  showComfort,
  colorComfort,
  yMin,
  yMax,
  width,
  height,
  gridStepX = 24,
  gridStepY = 5,
  labelFactorX = 7,
  labelFactorY = 1
}) {
  const traces = datasetsConfig.map(series => ({
    x: labels,
    y: series.data,
    type: 'scatter',
    mode: 'lines',
    name: series.name,
    line: { color: series.color },
    opacity: 1 // Fully opaque
  }));

  if (showComfort) {
    traces.unshift({
      x: labels.concat([...labels].reverse()),
      y: Array(labels.length).fill(minComfort).concat(Array(labels.length).fill(maxComfort).reverse()),
      fill: 'toself',
      fillcolor: colorComfort, // Should be a solid hex like "#F3CFCF"
      opacity: 1, // Fully opaque
      line: { color: 'transparent' },
      name: '',
      type: 'scatter',
      hoverinfo: 'skip',
      showlegend: false
    });
  }

  const xTickIndices = labels.map((_, i) => i).filter(i => i % gridStepX === 0);
  const xTickText = xTickIndices.map(i => i % (gridStepX * labelFactorX) === 0 ? labels[i] : "");

  const yTicks = [];
  const yTickLabels = [];
  for (let y = yMin; y <= yMax; y += gridStepY) {
    yTicks.push(y);
    const index = Math.round((y - yMin) / gridStepY);
    yTickLabels.push(index % labelFactorY === 0 ? y.toString() : "");
  }

  const layout = {
    font: {
  family: 'Arial',
  size: 12,
  color: '#000000' // Force text to black
},
    xaxis: {
      title: { text: '<b>Date / Time</b>', font: { size: 14 }, standoff: 8 },
      tickmode: 'array',
      tickvals: xTickIndices,
      ticktext: xTickText,
      showgrid: true,
      tickangle: 0,
      gridcolor: '#bbb',
      gridwidth: 0.5,
      linecolor: '#000',
      linewidth: 1.5,
      mirror: true
    },
    yaxis: {
      title: { text: '<b>Temperature (°C)</b>', font: { size: 14 }, standoff: 8 },
      tickmode: 'array',
      tickvals: yTicks,
      ticktext: yTickLabels,
      showgrid: true,
      range: [yMin, yMax],
      fixedrange: true,
      gridcolor: '#bbb',
      gridwidth: 0.5,
      linecolor: '#000',
      linewidth: 1.5,
      mirror: true
    },
    margin: {
      l: 60,
      r: 45,
      t: 15,
      b: 5
    },
    width,
    height,
    legend: {
      orientation: 'h',
      y: -0.2,
      x: 0,
      xanchor: 'left',
      font: {
        size: 12
      },
      itemwidth: 80,
      itemsizing: 'constant'
    }
  };

  const svgButton = {
    name: 'Download SVG',
    icon: Plotly.Icons.camera,
    click: function (gd) {
      const now = new Date();
      const fallbackName = `temp_chart_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
      const cleanTitle = gd.layout.title?.text?.replace(/<[^>]*>/g, '').replace(/\s+/g, '_') || fallbackName;

      Plotly.downloadImage(gd, {
        format: 'svg',
        filename: cleanTitle,
        width: gd._fullLayout.width,
        height: gd._fullLayout.height
      });
    }
  };

  Plotly.newPlot('chart', traces, layout, {
    modeBarButtonsToRemove: ['toImage'],
    modeBarButtonsToAdd: [[svgButton]],
    displaylogo: false
  });
}
