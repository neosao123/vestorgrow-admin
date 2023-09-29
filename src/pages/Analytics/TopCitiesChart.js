import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function TopCitiesChart() {
  const options = {
    chart: {
      height: 240 + "px",
      margin: [0, 0, 0, 0],
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: ["Correct", "Incorrect", "Not Answered"],
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        size: 210,
        innerSize: 170,
      },
    },
    series: [
      {
        type: "pie",
        allowPointSelect: true,
        keys: ["name", "y", "selected", "sliced"],
        data: [
          ["", 90, false],
          ["", 80, false],
          ["", 70, false],
          ["", 60, false],
          ["", 50, false],
          ["", 40, false],
          ["", 30, false],
          ["", 20, false],
        ],
        showInLegend: true,
        dataLabels: {
          connectorWidth: 0,
        },
      },
    ],
  };
  return (
    <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
  )
}

export default TopCitiesChart