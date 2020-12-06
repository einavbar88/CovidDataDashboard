const epidemicCurveData = {
    newCases: cases.dailyUntilToday.sort(byDate).map(d => d.cases),
    newHealed: healed.untilToday.sort(byDate).map(d => d.healed),
    totalHealed: healed.totalUntilToday.sort(byDate).map(d => d.healed),
    totalCases: cases.totalUntilToday.sort(byDate).map(d => d.cases),
    labels: labels
}

const epidemicCurveDataTime = (x) => {
    let days = (x === 0 ? epidemicCurveData.newCases.length : x)
    let ret = {
        newCases: [...epidemicCurveData.newCases].slice(0, days).reverse(),
        newHealed: [...epidemicCurveData.newHealed].slice(0, days).reverse(),
        totalHealed: [...epidemicCurveData.totalHealed].slice(0, days).reverse(),
        totalCases: [...epidemicCurveData.totalCases].slice(0, days).reverse(),
        labels: [...epidemicCurveData.labels].slice(0, days).reverse()
    }
    if (x === 0) {
        for (let i = 0; i < ret.newCases.length; i++) {
            if (i % 2 === 1 || i % 5 === 0) {
                ret.newCases.splice(i, 1)
                ret.totalCases.splice(i, 1)
                ret.newHealed.splice(i, 1)
                ret.totalHealed.splice(i, 1)
                ret.labels.splice(i, 1)
            }
        }
    }
    return ret
}
let epidemicCurveGraph

document.getElementById('epidemic-curve__btn').onchange = () => {
    switch (document.getElementById('epidemic-curve__btn').value) {
        case 'so-far':
            epidemicCurveCurrentData = epidemicCurveDataTime(0)
            break
        case 'week':
            epidemicCurveCurrentData = epidemicCurveDataTime(7)
            break
        case 'two-weeks':
            epidemicCurveCurrentData = epidemicCurveDataTime(14)
            break
        case 'month':
            epidemicCurveCurrentData = epidemicCurveDataTime(30)
            break
    }
    epidemicCurveGraph.destroy()
    initEpidemicCurveGraph()
}

let epidemicCurveCurrentData = epidemicCurveDataTime(14);
initEpidemicCurveGraph()

function initEpidemicCurveGraph() {
    let options = {
        chart: {
            marginBottom: 60,
            backgroundColor: 'transparent'
        },
        xAxis: [{
            title: {
                text: 'תאריך הבדיקה',
                style: {
                    color: epidemicCurveColors[0]
                }
            },
            labels:{
                style:{
                    color: epidemicCurveColors[0],
                    fontSize: '9px'
                }
            },
            categories: epidemicCurveCurrentData.labels,
            crosshair: {
                width: 1,
                color: 'gray'
            },
            tickInterval: epidemicCurveCurrentData.newCases.length > 14 ? 2 : 1 
        }],
        yAxis: [{ // Primary yAxis
            gridLineWidth: 0,
            crosshair: {
                width: 1,
                color: 'gray',
                dashStyle: 'dash',
                snap: false
            },
            labels: {
                formatter: function () {
                    return Highcharts.numberFormat(this.value, 0, '', ',');
                },
                style: {
                    color: epidemicCurveColors[1]
                }
            },
            title: {
                text: 'מספר מקרים מצטבר',
                style: {
                    color: epidemicCurveColors[0]
                }
            }
        }, { // Secondary yAxis
            gridLineWidth: 0,
            zoomEnabled: false,
            title: {
                text: 'מספר מקרים חדשים',
                style: {
                    color: epidemicCurveColors[0]
                }
            },
            labels: {
                formatter: function () {
                    return Highcharts.numberFormat(this.value, 0, '', ',');
                },
                style: {
                    color: epidemicCurveColors[2]
                }
            },
            opposite: true
        }],
        tooltip: {
            useHTML: true,
            backgroundColor: epidemicCurveColors[6],
            shared: true,
            formatter() {
                let ret = '\t'
                this.points.forEach(function (point) {
                    if (point.series.name !== 'S')
                        ret += '<b style="color: ' + point.series.color + '">' + numberWithCommas(point.y) + ' ' + point.series.name + '</b><br>'
                })
                return ret
            },
        },
        series: [{
            name: 'מאומתים מצטבר',
            type: 'area',
            data: epidemicCurveCurrentData.totalCases,
            fillColor: epidemicCurveColors[7],
            color: epidemicCurveColors[3]
        }, {
            name: epidemicCurveCurrentData.newCases.length > 30 ? 'מחלימים מצטבר' : 'מחלימים חדשים',
            type: epidemicCurveCurrentData.newCases.length > 30 ? 'line' : 'column',
            marker: {
                symbol: 'circle'
            },
            yAxis: epidemicCurveCurrentData.newCases.length > 30 ? 0 : 1,
            data: epidemicCurveCurrentData.newCases.length > 30 ? epidemicCurveCurrentData.totalHealed : epidemicCurveCurrentData.newHealed,
            color:  epidemicCurveColors[4]

        }, {
            name: 'מאומתים חדשים',
            type: 'column',
            yAxis: 1,
            data: epidemicCurveCurrentData.newCases,
            color: epidemicCurveColors[5],

        }, {
            name: 'S',
            type: 'area',
            data: epidemicCurveCurrentData.totalCases,
            color: epidemicCurveColors[3],
            fillColor: 'transparent',
            marker: {
                symbol: 'circle'
            }
        },],

        plotOptions: {
            series: {
                borderRadiusTopLeft: '50%',
                borderRadiusTopRight: '50%',
                pointWidth: 8,
                pointPadding: 0,

                groupPadding: epidemicCurveCurrentData.newCases.length === 7 ? 0.6 :
                    (epidemicCurveCurrentData.newCases.length === 30 ? 0.1 : 0.3),
                borderWidth: 0
            },

        },

    };
    epidemicCurveGraph = Highcharts.chart('epidemic-curve__graph', options)
}


