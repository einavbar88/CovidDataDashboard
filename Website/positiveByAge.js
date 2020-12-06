let byAgeGraph, byAgeData, byAgeDataCategory = 'cases'

document.getElementById('by-age__btn').onchange = () => {
    byAgeDataCategory = document.getElementById('by-age__btn').value
    initByAgeData()
    initByAgeGraph()
}

const initByAgeData = () => {
    byAgeData = []
    let categoryTotal
    switch (byAgeDataCategory) {
        case 'cases':
            categoryTotal = cases.total
            break
        case 'deceased':
            categoryTotal = deceased.total
            break
        case 'ventilated':
            categoryTotal = ventilated.total
            break
        case 'serious':
            categoryTotal = condition.serious
            break
    }
    for (let i = 0; i < categories.length; i++) {
        byAgeData.push({
            maleTotal: agesData[categories[i]][byAgeDataCategory].male + 1,
            femaleTotal: agesData[categories[i]][byAgeDataCategory].female + 1,
            malePercentage: Math.floor((agesData[categories[i]][byAgeDataCategory].male / categoryTotal)*100*100 + 1)/100,
            femalePercentage: Math.floor((agesData[categories[i]][byAgeDataCategory].female / categoryTotal)*100*100 + 1)/100
        })

    }
}

// Age categories
const categories = [
    '0-9', '10-19', '20-29',
    '30-39', '40-49', '50-59', '60-69', '70-79',
    '80-89', '90+'
];

const initByAgeGraph = () => {
    const options = {
        legend: {
            enabled: false
        },
        chart: {
            type: 'bar',
            backgroundColor: 'transparent'
        },
        title: {
            text: ''
        },
        xAxis: [{
            gridLineWidth: 0.5,
            gridLineColor: 'gray',
            categories: categories,
            reversed: false,
            labels: {
                step: 1,
                align: 'center',
                style: {
                    color: positiveByAgeColors[0]
                }
            },
            crosshair: {
                zIndex: 10,
                snap: false,
                label: {
                    align: "center",
                    useHTML: true,
                    enabled: true,
                    shape: 'rectangle',
                    backgroundColor: '#3366FF',
                    formatter(value) {
                        let min = Math.floor((value + 0.2) * 10)
                        if (min % 10 === 0)
                            return min + '-' + (min + 9)
                    }
                },
                width: 1,
                color: 'gray',
                dashStyle: 'dash',
            },
            title: {
                text: 'קבוצות גיל',
                style: {
                    color: positiveByAgeColors[0]
                }
            },
        }],
        yAxis: {
            title: {
                text: '% סה"כ',
                style: {
                    color: positiveByAgeColors[0]
                }
            },
            plotLines: [{
                color: positiveByAgeColors[0],
                width: 1,
                value: -0.1
            }],
            tickInterval: 10,

            labels: {
                style: {
                    color: positiveByAgeColors[0]
                },
                formatter: function () {
                    return Math.abs(this.value);
                }
            },
            crosshair: {
                snap: false,
                zIndex: 10,
                label: {
                    style: {
                        fontSize: '10px',
                    },
                    align: "center",
                    enabled: true,
                    shape: 'rectangle',
                    backgroundColor: positiveByAgeColors[1],
                    formatter(value) {
                        return Math.floor(Math.abs(value))
                    }
                },
                width: 1,
                color: 'gray',
                dashStyle: 'dash',
            }

        },
        defs: {
        },
        plotOptions: {
            series: {
                dataLabels: {
                    inside: false,
                    padding: 10,
                    x: 32,
                    enabled: true,
                    formatter() {
                        return Math.abs(this.point.y) + '%'
                    },
                    style: {
                        fontWeight: 'normal',
                        color: positiveByAgeColors[0],
                        textOutline: 0
                    }
                },
                states: {
                    inactive: {
                        opacity: 1
                    },
                },
                stacking: 'normal',
                pointWidth: 10,
            }
        },

        tooltip: {
            backgroundColor: positiveByAgeColors[4],
            style: {
                textAlign: 'right'
            },
            borderColor: 'none',
            borderRadius: 15,
            useHTML: true,
            formatter: function () {
                return '<b style="color: ' + this.point.series.color + '">' + this.series.name + ' ' + this.point.category + '<br/>' +
                Highcharts.numberFormat(Math.abs(this.point.y), 1) + '% ('  + this.point.value + ') </b>';
            }
        },

        series: [{
            color: positiveByAgeColors[2],
            borderColor: positiveByAgeColors[2],
            borderRadiusBottomLeft: '50%',
            borderRadiusBottomRight: '50%',
            name: 'נשים',
            data: [{
                y: byAgeData[0].femalePercentage * -1,
                value: byAgeData[0].femaleTotal,
                className: "highcharts-hover-shadow",
            }, {
                y: byAgeData[1].femalePercentage * -1,
                value: byAgeData[1].femaleTotal,
                className: "highcharts-hover-shadow",
            }, {
                y: byAgeData[2].femalePercentage * -1,
                value: byAgeData[2].femaleTotal,
                className: "highcharts-hover-shadow",
            }, {
                y: byAgeData[3].femalePercentage * -1,
                value: byAgeData[3].femaleTotal,
                className: "highcharts-hover-shadow",
            },
            {
                y: byAgeData[4].femalePercentage * -1,
                value: byAgeData[4].femaleTotal,
                className: "highcharts-hover-shadow",
            }, {
                y: byAgeData[5].femalePercentage * -1,
                value: byAgeData[5].femaleTotal,
                className: "highcharts-hover-shadow",
            }, {
                y: byAgeData[6].femalePercentage * -1,
                value: byAgeData[6].femaleTotal,
                className: "highcharts-hover-shadow",
            }, {
                y: byAgeData[7].femalePercentage * -1,
                value: byAgeData[7].femaleTotal,
                className: "highcharts-hover-shadow",
            },
            {
                y: byAgeData[8].femalePercentage * -1,
                value: byAgeData[8].femaleTotal,
                className: "highcharts-hover-shadow",
            }, {
                y: byAgeData[9].femalePercentage * -1,
                value: byAgeData[9].femaleTotal,
                className: "highcharts-hover-shadow",
            }
            ],
        }, {
            color: positiveByAgeColors[3],
            borderColor: positiveByAgeColors[3],
            borderRadiusTopLeft: '50%',
            borderRadiusTopRight: '50%',
            name: 'גברים',
            data: [
                {
                    y: byAgeData[0].malePercentage,
                    value: byAgeData[0].maleTotal,
                    className: "highcharts-hover-shadow",
                }, {
                    y: byAgeData[1].malePercentage,
                    value: byAgeData[1].maleTotal,
                    className: "highcharts-hover-shadow",
                }, {
                    y: byAgeData[2].malePercentage,
                    value: byAgeData[2].maleTotal,
                    className: "highcharts-hover-shadow",
                }, {
                    y: byAgeData[3].malePercentage,
                    value: byAgeData[3].maleTotal,
                    className: "highcharts-hover-shadow",
                },
                {
                    y: byAgeData[4].malePercentage,
                    value: byAgeData[4].maleTotal,
                    className: "highcharts-hover-shadow",
                }, {
                    y: byAgeData[5].malePercentage,
                    value: byAgeData[5].maleTotal,
                    className: "highcharts-hover-shadow",
                }, {
                    y: byAgeData[6].malePercentage,
                    value: byAgeData[6].maleTotal,
                    className: "highcharts-hover-shadow",
                }, {
                    y: byAgeData[7].malePercentage,
                    value: byAgeData[7].maleTotal,
                    className: "highcharts-hover-shadow",
                },
                {
                    y: byAgeData[8].malePercentage,
                    value: byAgeData[8].maleTotal,
                    className: "highcharts-hover-shadow",
                }, {
                    y: byAgeData[9].malePercentage,
                    value: byAgeData[9].maleTotal,
                    className: "highcharts-hover-shadow",
                }

            ]
        }]
    };
    Highcharts.chart('positive-by-age__graph', options)
}

initByAgeData()
initByAgeGraph()