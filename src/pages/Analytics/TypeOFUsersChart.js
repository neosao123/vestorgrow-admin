import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


function TypeOFUsersChart() {
    const options = {
      chart: {
        height: 227 + "px",
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
          size: 190,
          innerSize: 150,
        },
      },
      series: [
        {
          type: "pie",
          allowPointSelect: true,
          keys: ["name", "y", "selected", "sliced"],
          data: [
            ["", 70, false],
            ["", 80, false],
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
export default TypeOFUsersChart