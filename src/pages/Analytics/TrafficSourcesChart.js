import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


function TrafficSourcesChart() {
    const options = {
      chart: {
        height: 175 + "px",
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
          size: 145,
          innerSize: 115,
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

export default TrafficSourcesChart