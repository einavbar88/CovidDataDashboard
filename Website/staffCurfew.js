let totalStaffCurfew = 0
for (const hospital in hospitalsData) {
    totalStaffCurfew += hospitalsData[hospital].staffCurfew
}
let staffCurfewData = {
    doctors: Math.floor(totalStaffCurfew*1/8) + 1,
    nurses: Math.floor(totalStaffCurfew*3/8) + 1,
    rest: Math.floor(totalStaffCurfew/2)
}

const staffCurfewChartInit = ()=>{
    Highcharts.chart('staff-curfew__graph', {
        colors: staffCurfewColors,
        chart: {
            backgroundColor: 'transparent',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            type: 'pie',
            spacingLeft: 10 // plotLeft
        },
        title: {
            text: '<span style="font-size: 2rem; font-weight: 700; color: ' + staffCurfewColors[3] + '">' + totalStaffCurfew + '<br><span style="color: #99a4b9">סה"כ</span>',
            verticalAlign: 'middle',
            y: 30
    
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            pie: {
                borderColor: 'none',
                states: {
                    hover: {
                        brightness: 0,
                        halo: {
                            size: 8,
                        }
                    }
                },
                size: 120,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    alignTo: 'connectors',
                    connectorShape: 'crookedLine',
                    crookDistance: '90%',
                    connectorWidth: 1,
                    distance: 45,
                    padding: 0,
                    color: staffCurfewColors[3],
                    useHTML: true,
                    formatter: function(){
                        return '<div style="text-align: center; font-size: 14px; font-weight: 400;">'
                        + this.point.name + '<br> <b style="color: ' + this.color + ';">' + this.point.y 
                        + '</b></div>'
                    },
                    verticalAlign: 'top',              
                }
            },
            series: {
                events: {
                    click: null
                },
                point: {
                    events: {
                        click: null
                    }
                },
                states: {
                    inactive: {
                        opacity: 1
                    },
                },
            }
        },
        series: [{
            states: {
                select: {
                    enabled: false
                },
                hover: {
                    brightness: 0,
                    halo: {
                        size: 8,
                        attributes: {
                            "fill-opacity": 1
                        }
                    }
                }
            },
            innerSize: '80%',
            colorByPoint: true,
            data: [{
                name: 'אחים/ות',
                y: staffCurfewData.nurses
            }, {
                name: 'רופאים/ות',
                y: staffCurfewData.doctors
            }, {
                name: 'מקצועות <br> אחרים',
                y: staffCurfewData.rest,
            }]
        }]
    });    
}

staffCurfewChartInit()