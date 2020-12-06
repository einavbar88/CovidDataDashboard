const canvas2 = document.getElementById('critical-number__chart').getContext("2d");
let criticalNumChartLineColor = '#288484'
let criticalNumChartColor = (color, bg, lineColor) => {
    criticalNumChartgradient = canvas2.createLinearGradient(0, 0, 0, 400);
    criticalNumChartgradient.addColorStop(0, color);
    criticalNumChartgradient.addColorStop(0.5, bg);
    criticalNumChartLineColor = lineColor
}
criticalNumChartColor('#62a5a6', 'rgba(255,255,255,0)', criticalNumChartLineColor)
Chart.defaults.global.legend.display = false;
Chart.defaults.global.fontSize = 16;

let sortedCriticalNumData = [...condition.seriousUntilToday]
sortedCriticalNumData.sort(byDate)
let criticalNumGraphLabels = [], criticalNumGraphData = []

for (let i = 6; i >= 0; i--) {
    criticalNumGraphLabels.push(sortedCriticalNumData[i].date.day + '.' + sortedCriticalNumData[i].date.month);
    criticalNumGraphData.push(sortedCriticalNumData[i].serious)
}


let criticalNumChartInit = () => {
    new Chart(canvas2, {
        type: 'line',
        data: {
            labels: criticalNumGraphLabels,
            datasets: [{
                fill: true,
                backgroundColor: criticalNumChartgradient,
                borderColor: criticalNumChartLineColor,
                pointBorderColor: criticalNumChartLineColor,
                pointBackgroundColor: "white",
                pointBorderWidth: 2,
                hoverBorderWidth: 1,
                data: criticalNumGraphData,
                lineTension: 0
            }]
        },
        plugins: [{
            afterDatasetsDraw: function (chart) {
                let ctx = chart.ctx;
                chart.data.datasets.forEach(function (dataset, index) {
                    let datasetMeta = chart.getDatasetMeta(index);
                    if (datasetMeta.hidden)
                        return;
                    datasetMeta.data.forEach(function (point, index) {
                        let value = dataset.data[index],
                            x = point.getCenterPoint().x,
                            y = point.getCenterPoint().y,
                            radius = point._model.radius,
                            fontSize = 16,
                            fontFamily = 'Open Sans Hebrew',
                            fontColor = staffCurfewColors[3],
                            fontStyle = 'regular';
                        ctx.save();
                        ctx.textBaseline = 'bottom';
                        ctx.textAlign = 'center';
                        ctx.font = fontStyle + ' ' + fontSize + 'px' + ' ' + fontFamily;
                        ctx.fillStyle = fontColor;
                        ctx.fillText(value, x, y - radius - fontSize);
                        ctx.restore();
                    });
                });
            }
        }],
        options: {
            responsive: false,
            layout: {
                padding: {
                    left: 30,
                    right: 70,
                    top: 40,
                    bottom: 0
                }
            },
            tooltips: { enabled: false },
            legend: {
                onHover: function (e) {
                    e.target.style.cursor = 'pointer';
                }
            },
            hover: {
                onHover: function (e) {
                    let point = this.getElementAtEvent(e);
                    if (point.length) e.target.style.cursor = 'pointer';
                    else e.target.style.cursor = 'default';
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: staffCurfewColors[3],
                        fontStyle: "regular",
                        fontFamily: "Open Sans Hebrew",
                        fontSize: 16,
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        padding: 40
                    },
                    gridLines: {
                        drawTicks: false,
                        display: false
                    }
                }],
                xAxes: [{
                    gridLines: {
                        drawTicks: false,
                        display: false
                    },
                    ticks: {
                        fontFamily: "Open Sans Hebrew",
                        padding: 10,
                        fontColor: staffCurfewColors[3],
                        fontSize: 16
                    }
                }]
            },
        }
    });
}
criticalNumChartInit()