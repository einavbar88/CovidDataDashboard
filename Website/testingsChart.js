
const testsChartData = {
    tests: null,
    cases: null,
    lables: null,
}
let isTestsChartDataReceived = false
const setTestsChartData = ()=>{
    if(!isTestsChartDataReceived){
        testsChartData.cases = cases.dailyUntilToday.slice(cases.dailyUntilToday.length - 7).map(d => d.cases).reverse()
        testsChartData.tests = tests.untilToday.slice(tests.untilToday.length - 7).map(d => d.tests).reverse()
        testsChartData.lables = labels.slice(0, 7).reverse()
    }
    isTestsChartDataReceived = true
}
setTestsChartData()
const testingChartInit = () => {
    return Highcharts.chart('infected-locating__graph', {
        title: {
            text: ''
        },
        chart: {
            backgroundColor: 'transparent'
        },
        xAxis: [{
            categories: testsChartData.lables,
            title: {
                text: 'תאריך הבדיקה',
                style: {
                    color: testingChartColors[0]
                },
            },
            labels: {
                style: {
                    color: testingChartColors[0]
                }
            },
            crosshair: false
        }],
        yAxis: {
            gridLineWidth: 0,
            labels: {
                formatter: function () {
                    return Highcharts.numberFormat(this.value, 0, '', ',');
                },
                style: {
                    color: testingChartColors[0]
                }
            },
            title: {
                text: 'מספר בדיקות',
                style: {
                    color: testingChartColors[0]
                }
            },
        },
        tooltip: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderRadiusTopLeft: '50%',
                borderRadiusTopRight: '50%',
                pointWidth: 8,
                pointPadding: 0,
                groupPadding: 0.4,
                borderWidth: 0,
                marker: {
                    radius: 0
                },
                states: {
                    inactive: {
                        opacity: 1
                    }
                },
                dataLabels: {
                    style: {
                        fontWeight: 'normal',
                    },
                    useHTML: true,
                    enabled: true,
                    borderRadius: 5,
                    backgroundColor: testingChartColors[1],
                    borderWidth: 3,
                    allowOverlap: true,

                },
            },

        },
        series: [{
            color: testingChartColors[2],
            type: 'column',
            dataLabels: {
                formatter: function () {
                    return Highcharts.numberFormat(this.point.y, 0, '', ',');
                },
                padding: 0,
                color: testingChartColors[0],
                backgroundColor: 'transparent'
            },
            data: [
                { y: testsChartData.tests[6], className: "highcharts-hover-shadow" },
                { y: testsChartData.tests[5], className: "highcharts-hover-shadow" },
                { y: testsChartData.tests[4], className: "highcharts-hover-shadow" },
                { y: testsChartData.tests[3], className: "highcharts-hover-shadow" },
                { y: testsChartData.tests[2], className: "highcharts-hover-shadow" },
                { y: testsChartData.tests[1], className: "highcharts-hover-shadow" },
                { y: testsChartData.tests[0], className: "highcharts-hover-shadow" },],

        }, {
            type: 'line',
            lineWidth: 0,
            pointRadius: 0,
            data: [(Math.floor(1000 * (testsChartData.cases[6] / testsChartData.tests[6])) / 10),
            Math.floor((1000 * testsChartData.cases[5] / testsChartData.tests[5])) / 10,
            Math.floor(1000 * testsChartData.cases[4] / testsChartData.tests[4]) / 10,
            Math.floor(1000 * testsChartData.cases[3] / testsChartData.tests[3]) / 10,
            Math.floor(1000 * testsChartData.cases[2] / testsChartData.tests[2]) / 10,
            Math.floor(1000 * testsChartData.cases[1] / testsChartData.tests[1]) / 10,
            Math.floor(1000 * testsChartData.cases[0] / testsChartData.tests[0]) / 10],
            color: testingChartColors[3],
            dataLabels: {
                format: '{point.y}%',
                borderColor: testingChartColors[3],
                color: testingChartColors[0]
            },
            states: {
                hover: {
                    enabled: false
                }
            },
        }]
    });
}

testingChartInit()