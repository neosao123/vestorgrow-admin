import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


function DemographicChart() {
    const options = {
      chart: {
        type: "column",
        height: 150 + "px",
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
      plotOptions: {
        series: {
          borderRadius: 0,
          pointWidth: 20,
        },
      },
      legend: {
        showInLegend: false,
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
          data: [15, 13, 14, 17, 12, 15, 13],
          color: "#dcdedf",
          borderColor: "#a7a8a9",
          states: {
            hover: {
              color: "#855cf8",
              borderColor: "#855cf8",
            },
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

export default DemographicChart;