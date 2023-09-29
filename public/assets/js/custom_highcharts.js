/**********|| Users week/Last week Chart js ||**********/
Highcharts.chart('ljpAllUsers', {
    chart: {
        type: 'areaspline',
        height: 235 + 'px',
        margin: [0, -5, 0, -5]
    },
    title: {
        text: null
    },
    subtitle: {
        text: null
    },
    credits: {
        enabled: false
    },
    xAxis: {
        title: {
            text: null
        },
        labels: {
            enabled: false
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        tickWidth: 0,
        tickLength: 0,
        gridLineColor: 'white',
    },
    yAxis: {
        title: {
            text: null
        },
        labels: {
            enabled: false
        },
        gridLineColor: 'white',
    },
    legend: {
      showInLegend: false,   
        align: 'right',
        x: 0,
        verticalAlign: 'top',
        y: 5,
        floating: true,
        shadow: false
    },
    navigation: {
        buttonOptions: {
            enabled: false
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    series: [{
        showInLegend: false,  
        name: 'This Week',
        lineColor: '#855CF8',
        marker: {
            fillColor: '#855CF8',
            lineWidth: 4,
            lineColor: '#fff',
            radius: 6
        },
        data: [5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 1, 2],
        color: '#c9f4e8',
    }, {
      showInLegend: false,  
        name: 'Last Week',
        lineColor: '#3A86FF',
        marker: {
            fillColor: '#3A86FF',
            lineWidth: 1,
            lineColor: '#fff',
            radius: 6
        },
        data: [5, 3, 4, 7, 2, 1, 2, 2, 2, 3, 2, 1],
        color: {
            linearGradient: {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 1
            },
            stops: [
                [0, '#c9f4e8']
            ]
        },
    }],
});
/**********|| Users week/Last week Chart js ||**********/
/**********|| Users Gender Chart js ||**********/
Highcharts.chart('ljpUsersGender', {
    chart: {
        height: 235 + 'px',
        margin: [0, 0, 0, 0]
    },
    title: {
        text: null
    },
    xAxis: {
        categories: ['Correct', 'Incorrect', 'Not Answered']
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    navigation: {
        buttonOptions: {
            enabled: false
        }
    },
    plotOptions: {
        pie: {
            size: 200,
            innerSize: 150
        }
    },
    series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data: [
            ['', 70, false],
            ['', 80, false],
            ['', 70, false],
            ['', 70, false],
            ['', 70, false]
        ],
        showInLegend: true,
        dataLabels: {
            connectorWidth: 0
        },
    }]
});
/**********|| Users Gender Chart js ||**********/
/**********|| Users Online 7 Days Chart js ||**********/
Highcharts.chart('ljpUserOline', {
    chart: {
        type: 'column',
        height: 150 + 'px'
    },
    title: {
        text: null
    },
    subtitle: {
        text: null
    },
    credits: {
        enabled: false
    },
    xAxis: {
        title: {
            text: null
        },
        labels: {
            enabled: false
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        tickWidth: 0,
        tickLength: 0,
        gridLineColor: 'white',
    },
    yAxis: {
        title: {
            text: null
        },
        labels: {
            enabled: false
        },
        gridLineColor: 'white',
    },
    plotOptions: {
        series: {
            borderRadius: 0,
            pointWidth: 20
        }
      },
    legend: {
      showInLegend: false
    },
    navigation: {
        buttonOptions: {
            enabled: false
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    series: [{
        showInLegend: false,
        data: [15, 13, 14, 30, 12, 15, 13],
        color: '#dcdedf',
        borderColor: '#a7a8a9',
        states: {
                hover: {
                    color: '#855cf8',
                    borderColor: '#855cf8'
                }
            }
    }],
});
/**********|| Users Online 7 Days Chart js ||**********/
/**********|| Users Online 7 Days Chart js ||**********/
Highcharts.chart('ljpUserSessions', {
    chart: {
        type: 'column',
        height: 150 + 'px'
    },
    title: {
        text: null
    },
    subtitle: {
        text: null
    },
    credits: {
        enabled: false
    },
    xAxis: {
        title: {
            text: null
        },
        labels: {
            enabled: false
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        tickWidth: 0,
        tickLength: 0,
        gridLineColor: 'white',
    },
    yAxis: {
        title: {
            text: null
        },
        labels: {
            enabled: false
        },
        gridLineColor: 'white',
    },
    plotOptions: {
        series: {
            borderRadius: 0,
            pointWidth: 20
        }
      },
    legend: {
      showInLegend: false
    },
    navigation: {
        buttonOptions: {
            enabled: false
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    series: [{
        showInLegend: false,
        data: [15, 13, 14, 17, 12, 15, 13],
        color: '#dcdedf',
        borderColor: '#a7a8a9',
        states: {
                hover: {
                    color: '#855cf8',
                    borderColor: '#855cf8'
                }
            }
    }],
});
/**********|| Users Online 7 Days Chart js ||**********/
/**********|| Users Online 7 Days Chart js ||**********/
Highcharts.chart('ljpDemographic', {
    chart: {
        type: 'column',
        height: 150 + 'px'
    },
    title: {
        text: null
    },
    subtitle: {
        text: null
    },
    credits: {
        enabled: false
    },
    xAxis: {
        title: {
            text: null
        },
        labels: {
            enabled: false
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        tickWidth: 0,
        tickLength: 0,
        gridLineColor: 'white',
    },
    yAxis: {
        title: {
            text: null
        },
        labels: {
            enabled: false
        },
        gridLineColor: 'white',
    },
    plotOptions: {
        series: {
            borderRadius: 0,
            pointWidth: 20
        }
      },
    legend: {
      showInLegend: false
    },
    navigation: {
        buttonOptions: {
            enabled: false
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    series: [{
        showInLegend: false,
        data: [15, 13, 14, 17, 12, 15, 13],
        color: '#dcdedf',
        borderColor: '#a7a8a9',
        states: {
                hover: {
                    color: '#855cf8',
                    borderColor: '#855cf8'
                }
            }
    }],
});
/**********|| Users Online 7 Days Chart js ||**********/
/**********|| Users Types Chart js ||**********/
Highcharts.chart('ljpTypeOFUsers', {
    chart: {
        height: 227 + 'px',
        margin: [0, 0, 0, 0]
    },
    title: {
        text: null
    },
    xAxis: {
        categories: ['Correct', 'Incorrect', 'Not Answered']
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    navigation: {
        buttonOptions: {
            enabled: false
        }
    },
    plotOptions: {
        pie: {
            size: 190,
            innerSize: 150
        }
    },
    series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data: [
            ['', 70, false],
            ['', 80, false],
        ],
        showInLegend: true,
        dataLabels: {
            connectorWidth: 0
        },
    }]
});
/**********|| Users Types Chart js ||**********/
/**********|| Users Types Chart js ||**********/
Highcharts.chart('ljpTrafficSources', {
    chart: {
        height: 175 + 'px',
        margin: [0, 0, 0, 0]
    },
    title: {
        text: null
    },
    xAxis: {
        categories: ['Correct', 'Incorrect', 'Not Answered']
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    navigation: {
        buttonOptions: {
            enabled: false
        }
    },
    plotOptions: {
        pie: {
            size: 145,
            innerSize: 115
        }
    },
    series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data: [
            ['', 90, false],
            ['', 80, false],
            ['', 70, false],
            ['', 60, false],
            ['', 50, false],
            ['', 40, false],
            ['', 30, false],
            ['', 20, false],
        ],
        showInLegend: true,
        dataLabels: {
            connectorWidth: 0
        },
    }]
});
/**********|| Users Types Chart js ||**********/
/**********|| Users Types Chart js ||**********/
Highcharts.chart('ljpTopBrowsers', {
    chart: {
        height: 175 + 'px',
        margin: [0, 0, 0, 0]
    },
    title: {
        text: null
    },
    xAxis: {
        categories: ['Correct', 'Incorrect', 'Not Answered']
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    navigation: {
        buttonOptions: {
            enabled: false
        }
    },
    plotOptions: {
        pie: {
            size: 145,
            innerSize: 115
        }
    },
    series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data: [
            ['', 90, false],
            ['', 80, false],
            ['', 70, false],
            ['', 60, false],
            ['', 50, false],
            ['', 40, false],
        ],
        showInLegend: true,
        dataLabels: {
            connectorWidth: 0
        },
    }]
});
/**********|| Users Types Chart js ||**********/
/**********|| Users Types Chart js ||**********/
Highcharts.chart('ljpTopCountries', {
    chart: {
        height: 240 + 'px',
        margin: [0, 0, 0, 0]
    },
    title: {
        text: null
    },
    xAxis: {
        categories: ['Correct', 'Incorrect', 'Not Answered']
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    navigation: {
        buttonOptions: {
            enabled: false
        }
    },
    plotOptions: {
        pie: {
            size: 210,
            innerSize: 170
        }
    },
    series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data: [
            ['', 90, false],
            ['', 80, false],
            ['', 70, false],
            ['', 60, false],
            ['', 50, false],
            ['', 40, false],
            ['', 30, false],
            ['', 20, false],
        ],
        showInLegend: true,
        dataLabels: {
            connectorWidth: 0
        },
    }]
});
/**********|| Users Types Chart js ||**********/
/**********|| Users Types Chart js ||**********/
Highcharts.chart('ljpTopCities', {
    chart: {
        height: 240 + 'px',
        margin: [0, 0, 0, 0]
    },
    title: {
        text: null
    },
    xAxis: {
        categories: ['Correct', 'Incorrect', 'Not Answered']
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    navigation: {
        buttonOptions: {
            enabled: false
        }
    },
    plotOptions: {
        pie: {
            size: 210,
            innerSize: 170
        }
    },
    series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data: [
            ['', 90, false],
            ['', 80, false],
            ['', 70, false],
            ['', 60, false],
            ['', 50, false],
            ['', 40, false],
            ['', 30, false],
            ['', 20, false],
        ],
        showInLegend: true,
        dataLabels: {
            connectorWidth: 0
        },
    }]
});
/**********|| Users Types Chart js ||**********/