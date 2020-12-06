const canvas1 = document.getElementById('doubling-rate__chart').getContext("2d")

Chart.defaults.global.legend.display = false;
Chart.defaults.global.fontSize = 16;

let doublingChartColor
let doublingChartColorInit = (color, bg) => {
    doublingChartColor = canvas1.createLinearGradient(0, 0, 0, 400);
    doublingChartColor.addColorStop(0, color);
    doublingChartColor.addColorStop(0.7, bg);
}

doublingChartColorInit('#85dafd', 'rgba(255,255,255,0)')
//one week data only
let percentafeFormatAndText = '%- (דעיכה)'

let doublingChartInit = () => {
    new Chart(canvas1, {
        type: 'line',
        data: {
            labels: labels.slice(0, 7).reverse(),
            datasets: [{
                fill: true,
                backgroundColor: doublingChartColor,
                borderColor: staffCurfewColors[1],
                pointBorderColor: staffCurfewColors[1],
                pointBackgroundColor: "white",
                pointBorderWidth: 2,
                data: [-4, -11, -9, -10, -3, -7, -4],
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
                        let value = -dataset.data[index] + percentafeFormatAndText,
                            x = point.getCenterPoint().x,
                            y = point.getCenterPoint().y,
                            fontSize = 16,
                            fontFamily = 'Open Sans Hebrew',
                            fontColor = staffCurfewColors[3],
                            fontStyle = 'bold';
                        value = value.split(" ")
                        ctx.save();
                        ctx.textBaseline = 'bottom';
                        ctx.textAlign = 'center';
                        ctx.font = fontStyle + ' ' + fontSize + 'px' + ' ' + fontFamily;
                        ctx.fillStyle = fontColor;
                        ctx.fillText(value[0], x, y - fontSize * 2);
                        ctx.font = fontSize + 'px' + ' ' + fontFamily;
                        ctx.fillText(value[1], x, y - 10);
                        ctx.restore();
                    });
                });
            }
        }],
        options: {
            responsive: false,
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
            layout: {
                padding: {
                    left: 30,
                    right: 30,
                    top: 30,
                    bottom: 20
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "transparent",
                        fontStyle: "bold",
                        beginAtZero: true,
                        fontSize: 16,
                        //maxTicksLimit: 2,
                        padding: 10
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
doublingChartInit()