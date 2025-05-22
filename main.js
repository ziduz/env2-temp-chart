// main.js
import { hoy } from './data.js';
import { chartSeries } from './chartConfig.js';
import { formatHOYArray } from './hoyFormatter.js';
import { renderPlotlyChart } from './renderPlotlyChart.js';

const controlDiv = document.getElementById("dynamicDatasetControls").querySelector("tbody");

chartSeries.forEach(series => {
  const checkedByDefault = (series.id === 'opt1'||series.id === 'outdoor' || series.isBand) ? 'checked' : '';
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input type="checkbox" id="toggle-${series.id}" ${checkedByDefault} /></td>
    <td>${series.fullName}</td>
    <td><span class="notes-cell">${series.notes}</span></td>
    <td><input type="text" id="color-${series.id}" value="${series.defaultColor}" /></td>
  `;
  controlDiv.appendChild(row);
});

document.getElementById("updateButton").addEventListener("click", updateChart);

function updateChart() {
  const startHOY = parseInt(document.getElementById("startHOYInput").value);
  const numWeeks = parseInt(document.getElementById("numWeeksInput").value);
  const endHOY = startHOY + numWeeks * 7 * 24;

  const hoyRange = hoy.slice(startHOY, endHOY + 1);
  const labels = formatHOYArray(hoyRange);

  const activeSeries = chartSeries.filter(series => !series.isBand && document.getElementById(`toggle-${series.id}`).checked);

  const datasetsConfig = activeSeries.map(series => ({
    name: series.fullName,
    data: series.hoyData.slice(startHOY, endHOY + 1),
    color: document.getElementById(`color-${series.id}`).value || series.defaultColor,
    notes: series.notes
  }));

  const bandSeries = chartSeries.find(s => s.isBand);
  const showComfort = document.getElementById(`toggle-${bandSeries.id}`)?.checked;
  const colorComfort = document.getElementById(`color-${bandSeries.id}`)?.value || bandSeries.defaultColor;

  const titleEntries = activeSeries.map(series => series.titleName).filter(Boolean);
  const chartTitle = titleEntries.join(" vs ");

  const chartWidthMM = parseFloat(document.getElementById("chartWidthMMInput").value);
  const chartHeightMM = parseFloat(document.getElementById("chartHeightMMInput").value);
  const width = chartWidthMM ? chartWidthMM * 72 / 25.4 : undefined;
  const height = chartHeightMM ? chartHeightMM * 72 / 25.4 : undefined;

  const yMin = parseFloat(document.getElementById("yMinInput").value);
  const yMax = parseFloat(document.getElementById("yMaxInput").value);

  const minComfort = parseFloat(document.getElementById("minComfortInput").value);
  const maxComfort = parseFloat(document.getElementById("maxComfortInput").value);

  renderPlotlyChart({
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
    title: chartTitle
  });
}

window.setSummerRange = function () {
  document.getElementById("startHOYInput").value = 1032;
    document.getElementById("yMinInput").value = 10;     // Summer Y-Min
  document.getElementById("yMaxInput").value = 40;     // Summer Y-Max
};

window.setWinterRange = function () {
  document.getElementById("startHOYInput").value = 4512;
    document.getElementById("yMinInput").value = 5;      // Winter Y-Min
  document.getElementById("yMaxInput").value = 35;     // Winter Y-Max
};

updateChart();
