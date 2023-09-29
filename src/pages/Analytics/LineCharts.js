import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
const options = {
  chart: {
    type: "areaspline",
    height: 235 + "px",
    margin: [0, -5, 0, -5],
  },
  title: {
    text: null,
  },
  subtitle: {
    text: null,
  },
  credits: {
    enabled: false,
  },
  xAxis: {
    title: {
      text: null,
    },
    labels: {
      enabled: false,
    },
    lineWidth: 0,
    minorGridLineWidth: 0,
    lineColor: "transparent",
    tickWidth: 0,
    tickLength: 0,
    gridLineColor: "white",
  },
  yAxis: {
    title: {
      text: null,
    },
    labels: {
      enabled: false,
    },
    gridLineColor: "white",
  },
  legend: {
    showInLegend: false,
    align: "right",
    x: 0,
    verticalAlign: "top",
    y: 5,
    floating: true,
    shadow: false,
  },
  navigation: {
    buttonOptions: {
      enabled: false,
    },
  },
  tooltip: {
    pointFormat:
      '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
    shared: true,
  },
  series: [
    {
      showInLegend: false,
      name: "This Week",
      lineColor: "#855CF8",
      marker: {
        fillColor: "#855CF8",
        lineWidth: 4,
        lineColor: "#fff",
        radius: 6,
      },
      data: [5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 1, 2],
      color: "#c9f4e8",
    },
    {
      showInLegend: false,
      name: "Last Week",
      lineColor: "#3A86FF",
      marker: {
        fillColor: "#3A86FF",
        lineWidth: 1,
        lineColor: "#fff",
        radius: 6,
      },
      data: [5, 3, 4, 7, 2, 1, 2, 2, 2, 3, 2, 1],
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1,
        },
        stops: [[0, "#c9f4e8"]],
      },
    },
  ],
};

function LineCharts() {
  return (
    <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
  )
}

export default LineCharts