const soFarChartsBtns = document.getElementsByClassName('daily-change')
const soFarChartsContainers = document.getElementsByClassName('daily-changes')
const soFarChartsData = {
    ventilated: null,
    deceased: null,
    healed: null,
    labels: null
}

let isDataRefresh = true
const getDataForSoFarChart = () => {
    if (isDataRefresh) {
        soFarChartsData.ventilated = CriticalVentilatedData.ventilated.reverse()
        soFarChartsData.deceased = CriticalVentilatedData.deceased.reverse()
        soFarChartsData.healed = epidemicCurveData.newHealed.reverse()
        soFarChartsData.labels = labels.reverse()
    }
}

for (let i = 0; i < soFarChartsBtns.length; i++) {
    soFarChartsBtns[i].addEventListener('click', () => {
        showChart(soFarChartsContainers[i])
        document.querySelector('body').addEventListener('click', removeChart, true)
    })
}
function showChart(chart) {
    getDataForSoFarChart()
    isDataRefresh = false
    chart.style.display = 'flex'
}

function removeChart() {
    for (let charts of soFarChartsContainers)
        charts.style.display = 'none'
    document.querySelector('body').removeEventListener('click', removeChart, true)
}

document.getElementById('ventilated-so-far__btn').addEventListener('click', () => {
    document.getElementById('ventilated-so-far__container').style.display = 'flex'
    soFarChartsInit('ventilated-so-far-chart', soFarChartsData.ventilated, 'מונשמים')
})

document.getElementById('deceased-so-far__btn').addEventListener('click', () => {
    document.getElementById('deceased-so-far__container').style.display = 'flex'
    soFarChartsInit('deceased-so-far-chart', soFarChartsData.deceased, 'נפטרים')
})
document.getElementById('healed-so-far__btn').addEventListener('click', () => {
    document.getElementById('healed-so-far__container').style.display = 'flex'
    soFarChartsInit('healed-so-far-chart', soFarChartsData.healed, 'מחלימים')
})

document.getElementById('tests-so-far__btn').addEventListener('click', () => {
    document.getElementById('tests-so-far__container').style.display = 'flex'
    soFarChartsInit('tests-so-far-chart', tests.untilToday.sort(byDate).map(d => d.tests), 'בדיקות')
})


const soFarChartsInit = (container, data, text) => {
    Highcharts.chart(container, {
        chart: {
            backgroundColor: 'transparent',
        },
        title: {
            text: ''
        },
        xAxis: {
            tickInterval: 10,
            title: {
                text: "תאריך",
                style: {
                    color: testingChartColors[0]
                },
            },
            categories: soFarChartsData.labels,
            labels: {
                style: {
                    color: testingChartColors[0]
                },
            }
        },
        yAxis: {
            title: {
                text: text + "עד עכשיו",
                style: {
                    color: testingChartColors[0]
                },
            },
            labels: {
                style: {
                    color: testingChartColors[0]
                }
            },
        },
        tooltip: {
            useHTML: true,
            backgroundColor: epidemicCurveColors[6],
            formatter() {
                let ret = '\t'
                ret += '<b style="color: ' + Highcharts.getOptions().colors[0] + '">' + this.y + ' ' + text + '</b><br>'
                return ret
            },
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 0
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
            }
        },
        series: [{
            type: 'area',
            data: data
        }]
    })
}
