const CriticalVentilatedData = {
    serious: condition.seriousUntilToday.sort(byDate).map(d => d.serious),
    ventilated: ventilated.untilToday.sort(byDate).map(d => d.ventilated),
    deceased: deceased.untilToday.sort(byDate).map(d => d.deceased),
    labels: labels
}

const CriticalVentilatedDataTime = (x) => {
    let days = (x === 0 ? epidemicCurveData.newCases.length : x)
    let ret = {
        serious: [...CriticalVentilatedData.serious].slice(0, days).reverse(),
        ventilated: [...CriticalVentilatedData.ventilated].slice(0, days).reverse(),
        deceased: [...CriticalVentilatedData.deceased].slice(0, days).reverse(),
        labels: [...CriticalVentilatedData.labels].slice(0, days).reverse()
    }
    if (x === 0) {
        for (let i = 0; i < ret.serious.length; i++) {
            if (i % 2 === 1 || i % 5 === 0) {
                ret.serious.splice(i, 1)
                ret.ventilated.splice(i, 1)
                ret.deceased.splice(i, 1)
                ret.labels.splice(i, 1)
            }
        }
    }
    ret.serious = turn4DataPointsInChartArrayToObjects(ret.serious)
    ret.ventilated = turn4DataPointsInChartArrayToObjects(ret.ventilated)
    ret.deceased = turn4DataPointsInChartArrayToObjects(ret.deceased)

    return ret
}

const turn4DataPointsInChartArrayToObjects = (data) => {
    let ret = data
    for (let i = 0; i < ret.length; i++) {
        if (i === 0 || i === ret.length - 1)
            continue
        else {
            if ((ret.length === 7 && i % 2 === 0) ||
                (ret.length === 14 && i % 5 === 0) ||
                (ret.length === 30 && i % 10 === 0) ||
                (ret.length > 30 && i % 6 === 0))
                continue
            ret[i] = {
                y: ret[i],
                dataLabels: {
                    enabled: false,
                }
            }
        }
    }
    return ret
}

document.getElementById('critical-ventilated__btn').onchange = () => {
    switch (document.getElementById('critical-ventilated__btn').value) {
        case 'so-far':
            CriticalVentilatedCurrentData = CriticalVentilatedDataTime(0)
            break
        case 'week':
            CriticalVentilatedCurrentData = CriticalVentilatedDataTime(7)
            break
        case 'two-weeks':
            CriticalVentilatedCurrentData = CriticalVentilatedDataTime(14)
            break
        case 'month':
            CriticalVentilatedCurrentData = CriticalVentilatedDataTime(30)
            break
    }
    initCriticalVentilatedGraph()
}


let CriticalVentilatedGraph, CriticalVentilatedCurrentData = CriticalVentilatedDataTime(30);
initCriticalVentilatedGraph()

function initCriticalVentilatedGraph() {
    let options = {
        chart: {
            backgroundColor: 'transparent'
        },
        title: {
            text: ''
        },
        tooltip: {
            enabled: false
        },

        yAxis: {
            gridLineWidth: 0,
            title: {
                text: 'מספר מקרים',
                style: {
                    color: CriticalVentilatedColors[4]
                }
            },
            labels: {
                style: {
                    color: CriticalVentilatedColors[4]
                }
            }
        },

        xAxis: {
            title: {
                text: 'תאריך',
                style: {
                    color: CriticalVentilatedColors[4]
                },
            },
            labels: {
                style: {
                    color: CriticalVentilatedColors[4],
                    fontSize: '9px'
                },
            },
            categories: CriticalVentilatedCurrentData.labels,
            tickInterval: CriticalVentilatedCurrentData.labels.length > 14 ? 2 : 1 
        },

        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                states: {
                    inactive: {
                        opacity: 1
                    },
                },
                showInLegend: false,
                dataLabels: {
                    style: {
                        fontWeight: 'normal',
                    },
                    color: CriticalVentilatedColors[4],
                    useHTML: true,
                    enabled: true,
                    crop: false,
                    overflow: 'none',
                    borderRadius: 7,
                    backgroundColor: CriticalVentilatedColors[3],
                    borderWidth: 3,
                    y: 8,
                    //allowOverlap: true,

                },
                marker: {
                    radius: 0
                }
            }
        },
        series: [{
            color: CriticalVentilatedColors[0],
            dataLabels: {
                borderColor: CriticalVentilatedColors[0]
            },
            label: { enabled: false },
            states: {
                hover: {
                    enabled: false
                }
            },
            data: CriticalVentilatedCurrentData.serious
        }, {
            label: { enabled: false },
            color: CriticalVentilatedColors[1],
            dataLabels: {
                borderColor: CriticalVentilatedColors[1],
            },
            states: {
                hover: {
                    enabled: false
                }
            },
            data: CriticalVentilatedCurrentData.deceased
        }, {
            label: { enabled: false },
            color: CriticalVentilatedColors[2],
            dataLabels: {
                borderColor: CriticalVentilatedColors[2],
            },
            states: {
                hover: {
                    enabled: false
                }
            },
            data: CriticalVentilatedCurrentData.ventilated
        }],
    };
    CriticalVentilatedGraph = Highcharts.chart('critical-ventilated__graph', options)
}
