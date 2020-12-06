const canvas3 = document.getElementById('new-infected-outside-red-zones__chart').getContext("2d");

Chart.defaults.global.legend.display = false;
Chart.defaults.global.fontSize = 16;

const newInfectedOutsideRedZonesChart = () => {
    new Chart(canvas3, {
        type: 'bar',
        data: {
            labels: labels.slice(0, 7).reverse(),
            datasets: [{
                backgroundColor: staffCurfewColors[0],
                hoverBackgroundColor: staffCurfewColors[0],
                borderWidth: 1,
                barThickness: 9,
                data: [173, 315, 500, 181, 132, 455, 121],
                order: 2
            }, {
                type: 'line',
                data: [100, 100, 100, 100, 100, 100, 100],
                fill: false,
                borderColor: '#f0465e',
                borderDash: [5, 5],
                borderWidth: 1,
                pointRadius: 0,
                pointHoverRadius: 0,
                label: '100',
                order: 1
            }]

        },
        options: {
            responsive: false,
            layout: {
                padding: {
                    left: 20,
                    right: 0,
                    top: 20,
                    bottom: 0
                }
            },
            tooltips: { enabled: false },
            hover: {
                "animationDuration": 0,
                onHover: function (e) {
                    var point = this.getElementAtEvent(e);
                    if (point.length) e.target.style.cursor = 'pointer';
                    else e.target.style.cursor = 'default';
                }
            },
            "animation": {
                "onComplete": function () {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;

                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        if (meta.type === 'line')
                            return
                        meta.data.forEach(function (bar, index) {
                            var data = dataset.data[index];
                            ctx.fillStyle = staffCurfewColors[3]
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                    });
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
                        maxTicksLimit: 8,
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
                        fontColor: staffCurfewColors[3],
                        fontFamily: "Open Sans Hebrew",
                        padding: 10,
                        fontSize: 16
                    }
                }]
            }
        },
    });
}

Chart.elements.Rectangle.prototype.draw = function () {

    var ctx = this._chart.ctx;
    var vm = this._view;
    var left, right, top, bottom, signX, signY, borderSkipped, radius;
    var borderWidth = vm.borderWidth;
    // Set Radius Here
    // If radius is large enough to cause drawing errors a max radius is imposed
    var cornerRadius = 20;

    if (!vm.horizontal) {
        // bar
        left = vm.x - vm.width / 2;
        right = vm.x + vm.width / 2;
        top = vm.y;
        bottom = vm.base;
        signX = 1;
        signY = bottom > top ? 1 : -1;
        borderSkipped = vm.borderSkipped || 'bottom';
    } else {
        // horizontal bar
        left = vm.base;
        right = vm.x;
        top = vm.y - vm.height / 2;
        bottom = vm.y + vm.height / 2;
        signX = right > left ? 1 : -1;
        signY = 1;
        borderSkipped = vm.borderSkipped || 'left';
    }

    // Canvas doesn't allow us to stroke inside the width so we can
    // adjust the sizes to fit if we're setting a stroke on the line
    if (borderWidth) {
        // borderWidth shold be less than bar width and bar height.
        var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
        borderWidth = borderWidth > barSize ? barSize : borderWidth;
        var halfStroke = borderWidth / 2;
        // Adjust borderWidth when bar top position is near vm.base(zero).
        var borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
        var borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
        var borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
        var borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
        // not become a vertical line?
        if (borderLeft !== borderRight) {
            top = borderTop;
            bottom = borderBottom;
        }
        // not become a horizontal line?
        if (borderTop !== borderBottom) {
            left = borderLeft;
            right = borderRight;
        }
    }

    ctx.beginPath();
    ctx.fillStyle = vm.backgroundColor;
    ctx.strokeStyle = vm.borderColor;
    ctx.lineWidth = borderWidth;

    // Corner points, from bottom-left to bottom-right clockwise
    // | 1 2 |
    // | 0 3 |
    var corners = [
        [left, bottom],
        [left, top],
        [right, top],
        [right, bottom]
    ];

    // Find first (starting) corner with fallback to 'bottom'
    var borders = ['bottom', 'left', 'top', 'right'];
    var startCorner = borders.indexOf(borderSkipped, 0);
    if (startCorner === -1) {
        startCorner = 0;
    }

    function cornerAt(index) {
        return corners[(startCorner + index) % 4];
    }

    // Draw rectangle from 'startCorner'
    var corner = cornerAt(0);
    var width, height, x, y, nextCorner, nextCornerId
    var x_tl, x_tr, y_tl, y_tr;
    var x_bl, x_br, y_bl, y_br;
    ctx.moveTo(corner[0], corner[1]);

    for (var i = 1; i < 4; i++) {
        corner = cornerAt(i);
        nextCornerId = i + 1;
        if (nextCornerId == 4) {
            nextCornerId = 0
        }

        nextCorner = cornerAt(nextCornerId);

        width = corners[2][0] - corners[1][0];
        height = corners[0][1] - corners[1][1];
        x = corners[1][0];
        y = corners[1][1];

        radius = cornerRadius;

        // Fix radius being too large        
        if (radius > Math.abs(height) / 2) {
            radius = Math.floor(Math.abs(height) / 2);
        }
        if (radius > Math.abs(width) / 2) {
            radius = Math.floor(Math.abs(width) / 2);
        }

        if (height < 0) {
            // Negative values in a standard bar chart
            x_tl = x; x_tr = x + width;
            y_tl = y + height; y_tr = y + height;

            x_bl = x; x_br = x + width;
            y_bl = y; y_br = y;

            // Draw
            ctx.moveTo(x_bl + radius, y_bl);
            ctx.lineTo(x_br - radius, y_br);
            ctx.quadraticCurveTo(x_br, y_br, x_br, y_br - radius);
            ctx.lineTo(x_tr, y_tr + radius);
            ctx.quadraticCurveTo(x_tr, y_tr, x_tr - radius, y_tr);
            ctx.lineTo(x_tl + radius, y_tl);
            ctx.quadraticCurveTo(x_tl, y_tl, x_tl, y_tl + radius);
            ctx.lineTo(x_bl, y_bl - radius);
            ctx.quadraticCurveTo(x_bl, y_bl, x_bl + radius, y_bl);

        } else if (width < 0) {
            // Negative values in a horizontal bar chart
            x_tl = x + width; x_tr = x;
            y_tl = y; y_tr = y;

            x_bl = x + width; x_br = x;
            y_bl = y + height; y_br = y + height;

            // Draw
            ctx.moveTo(x_bl + radius, y_bl);
            ctx.lineTo(x_br - radius, y_br);
            ctx.quadraticCurveTo(x_br, y_br, x_br, y_br - radius);
            ctx.lineTo(x_tr, y_tr + radius);
            ctx.quadraticCurveTo(x_tr, y_tr, x_tr - radius, y_tr);
            ctx.lineTo(x_tl + radius, y_tl);
            ctx.quadraticCurveTo(x_tl, y_tl, x_tl, y_tl + radius);
            ctx.lineTo(x_bl, y_bl - radius);
            ctx.quadraticCurveTo(x_bl, y_bl, x_bl + radius, y_bl);

        } else {
            //Positive Value
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width, y + height);//changedx + width - radius
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height);//changed y + height - radius
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
        }
    }

    ctx.fill();
    if (borderWidth) {
        ctx.stroke();
    }
};


newInfectedOutsideRedZonesChart()