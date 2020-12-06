
const jsPaths = ["staffCurfew.js", "criticalNumChart.js", "epidemicCurve.js", "criticalVentilated.js", "positiveByAge.js",
    "testingsChart.js", "tables.js", "doublingRateChart.js", "newInfectedOutsideRed.js", "soFarCharts.js"]

let database, cases, condition, active, ventilated, deceased, healed, tests, labels, dates, hospitalsData
let accessibilityMode = false, testingChartColors, staffCurfewColors, positiveByAgeColors, CriticalVentilatedColors, epidemicCurveColors

//cases
database = fetch('http://localhost:3000/daily/get')
    .then(res => res.json())
    .then(d => database = d)
    .then(() => {
        databaseInitialize()
        database.sort(byDate)
        casesInfo(database)
        conditionInfo(database)
        activeInfo(database)
        ventilatedInfo(database)
        deceasedInfo(database)
        healedInfo(database)
        testsInfo(database)
        untilTodayInfo(database)
        turnDatesToLabels()
        agesData = database[0].agesData
        hospitalsData = database[0].hospitalsData
    }).then(() => {
        for (let i = 0; i < jsPaths.length; i++) {
            const child = document.createElement('script')
            child.src = jsPaths[i]
            document.querySelector('body').appendChild(child)
        }
        streamDataToSite()
    }).then(() => {
        testingChartColors = ['black', 'white', '#50cbfd', '#1c7d7e']
        staffCurfewColors = ['#b6ca51', '#50cbfd', '#237d7d', 'black']
        positiveByAgeColors = ['black', '#3366FF', '#b6ca51', '#50cbfd', 'white']
        CriticalVentilatedColors = ['#b6ca51', '#237d7d', '#50cbfd', 'white', 'black']
        epidemicCurveColors = ['black', '#5fd0ff', '#31898a', '#48caff', '#898989', '#1c7d7e', 'white',
            {
                linearGradient: [0, 0, 0, 400],
                stops: [
                    [0, '#a8e8ef'],
                    [0.8, 'rgba(255,255,255,0)']
                ]
            }]
    })



const streamDataToSite = () => {
    document.getElementById('total-cases').innerText = numberWithCommas(cases.total)
    document.getElementById('new-cases-yesterday').innerText = numberWithCommas(cases.yesterday, true)
    document.getElementById('new-cases-today').innerText = numberWithCommas(cases.newToday, true)
    document.getElementById('fair-cases-active').innerText = numberWithCommas(condition.fair)
    document.getElementById('serious-cases-active').innerText = numberWithCommas(condition.serious)
    document.getElementById('active-cases').innerText = numberWithCommas(active.total)
    document.getElementById('active-cases-today').innerText = numberWithCommas(active.today)
    document.getElementById('home-quarantined').innerText = numberWithCommas(active.atHome)
    document.getElementById('hotel-quarantined').innerText = numberWithCommas(active.inHotel)
    document.getElementById('hospital-quarantined').innerText = numberWithCommas(active.inHospitals)
    document.getElementById('ventilated-total').innerText = numberWithCommas(ventilated.total)
    document.getElementById('ventilated-today').innerText = numberWithCommas(ventilated.newToday, true)
    document.getElementById('deceased-total').innerText = numberWithCommas(deceased.total)
    document.getElementById('deceased-today').innerText = numberWithCommas(deceased.newToday, true)
    document.getElementById('healed-total').innerText = numberWithCommas(healed.total)
    document.getElementById('healed-today').innerText = numberWithCommas(healed.newToday, true)
    document.getElementById('tests-yesterday').innerText = numberWithCommas(tests.yesterday)
    document.getElementById('tests-today').innerText = numberWithCommas(tests.today, true)
}

function databaseInitialize() {
    cases = {
        total: 0,
        newToday: 0,
        yesterday: 0,
        dailyUntilToday: [],
        totalUntilToday: []
    }

    condition = {
        fair: 0,
        serious: 0,
        seriousUntilToday: []
    }

    active = {
        total: 0,
        today: 0,
        inHospitals: 0,
        atHome: 0,
        inHotel: 140
    }

    ventilated = {
        total: 0,
        newToday: 0,
        untilToday: []
    }

    deceased = {
        total: 0,
        newToday: 0,
        untilToday: []
    }

    healed = {
        total: 0,
        newToday: 0,
        untilToday: [],
        totalUntilToday: []
    }

    tests = {
        yesterday: 0,
        today: 0,
        untilToday: []
    }
    dates = []
    labels = []
    citiesData = []
}

const casesInfo = (database) => {
    cases.total = database[0].casesSoFar
    cases.newToday = database[0].newCases
    cases.yesterday = database[1].newCases
}

const conditionInfo = (database) => {
    condition.fair = database[0].seriousCases.fair
    condition.serious = database[0].seriousCases.serious + database[0].seriousCases.critical
}

const activeInfo = (database) => {
    active.total = database[0].casesSoFar - database[0].healedSoFar - database[0].deceasedSoFar
    let activeYesterday = database[1].casesSoFar - database[1].healedSoFar - database[1].deceasedSoFar
    active.today = active.total - activeYesterday
    active.inHospitals = database[0].active.hospital
    active.atHome = active.total - active.inHospitals
}

const ventilatedInfo = (database) => {
    ventilated.total = database[0].ventilatedSoFar
    ventilated.newToday = database[0].ventilated
}

const deceasedInfo = (database) => {
    deceased.total = database[0].deceasedSoFar
    deceased.newToday = database[0].deceased
}

const healedInfo = (database) => {
    healed.total = database[0].healedSoFar
    healed.newToday = database[0].healed
}

const testsInfo = (database) => {
    tests.yesterday = database[1].tests.totalTests
    tests.today = database[0].tests.totalTests
}

const untilTodayInfo = (database) => {
    for (let i = database.length - 1; i >= 0; i--) {
        const date = database[i].date
        dates.push(date)
        healed.untilToday.push({ healed: database[i].healed, date: date })
        healed.totalUntilToday.push({ healed: database[i].healedSoFar, date: date })
        ventilated.untilToday.push({ ventilated: database[i].ventilated, date: date })
        tests.untilToday.push({ tests: database[i].tests.totalTests, date: date })
        deceased.untilToday.push({ deceased: database[i].deceased, date: date })
        cases.dailyUntilToday.push({ cases: database[i].newCases, date: date })
        cases.totalUntilToday.push({ cases: database[i].casesSoFar, date: date })
        condition.seriousUntilToday.push({
            serious: (database[i].seriousCases.serious + database[i].seriousCases.critical),
            date: date
        })
        citiesData.push(database[i].citiesData)
    }
}

function numberWithCommas(x, isSignIncluded) {
    let sign = isSignIncluded ? "+" : ""
    if (x < 0)
        sign = "-";
    return Math.abs(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + sign
}

function byDate(a, b) {
    if (a.date.month < b.date.month)
        return 1
    if (a.date.day > b.date.day)
        return -1
    return 1

}

function turnDatesToLabels() {
    dates.sort((a, b) => {
        if (a.month < b.month)
            return 1
        if (a.day > b.day)
            return -1
        return 1
    })
    for (const date of dates) {
        labels.push(date.day + '.' + date.month)
    }
}


document.getElementById('accessibility-btn').addEventListener('click', () => {
    if (!accessibilityMode) {
        document.querySelector('body').classList.add('dark-theme-body-bg')
        for (let i = 0; i < document.getElementsByClassName('statistics').length; i++)
            document.getElementsByClassName('statistics')[i].classList.add('dark-theme-item-bg')
        for (let i = 0; i < document.querySelectorAll('.box').length; i++)
            document.querySelectorAll('.box')[i].classList.add('dark-theme-item-bg')
    } else {
        document.querySelector('body').classList.remove('dark-theme-body-bg')
        document.querySelector('.box').classList.remove('dark-theme-item-bg')
        for (let i = 0; i < document.getElementsByClassName('statistics').length; i++)
            document.getElementsByClassName('statistics')[i].classList.remove('dark-theme-item-bg')
        for (let i = 0; i < document.querySelectorAll('.box').length; i++)
            document.querySelectorAll('.box')[i].classList.remove('dark-theme-item-bg')
    }
    changeClassesColors()
    changeColorsInCharts()
    chartsBtnsColorChange()
    chnageIconsTheme()
    document.getElementById('accessibility-btn').className = accessibilityMode ? '' : 'button-dark-theme'
    document.getElementById('accessibility-btn').innerText = accessibilityMode ? 'לתצוגה נגישה' : 'לתצוגה רגילה'
    accessibilityMode = !accessibilityMode
})

const changeClassesColors = () => {
    let colors = accessibilityMode ?
        ['#b6ca51', '#50cbfd', '#898989', '#237d7d', '#1c7d7e', 'black', '#e6f1f4', '#eff5f9', ' #50cbfd', 'white'] :
        ['#fd8264', '#2cd2db', '#9ffa82', '#9be985', '#fd8264', 'white', '#2a3b47', '#293b48', ' #2cd2db', '#384f5f']
    $('.olive').css('background', colors[0])
    $('.torquize').css('background', colors[1])
    $('.grey').css('background', colors[2])
    $('.green').css('background', colors[3])
    $('.darkgreen').css('background', colors[4])
    $('.daily-change__text').css('color', colors[5])
    $('.graph__note').css('color', colors[5])
    $('.graph__note').css('background', colors[6])
    $('.header-row').css('background', colors[6])
    $('.hospitals-chart-bar__bg').css('background', colors[7])
    $('.hospitals-chart-bar__color').css('background', colors[8])
    $('.daily-changes').css('background', colors[9])
}
const chartsBtnsColorChange = () => {
    const chartsBtns = document.querySelectorAll('select')
    for (let i = 0; i < chartsBtns.length; i++) {
        chartsBtns[i].className = accessibilityMode ? '' : 'btns-accessibility'
    }

}

const changeColorsInCharts = () => {
    if (!accessibilityMode) {
        testingChartColors = ['white', '#384f5f', '#2cd2db', '#fd8264']
        staffCurfewColors = ['#fd8264', '#2cd2db', '#9be985', 'white']
        positiveByAgeColors = ['white', '#3366FF', '#fd8264', '#2cd2db', '#22303b']
        CriticalVentilatedColors = ['#fd8264', '#9be985', '#2cd2db', '#384f5f', 'white']
        epidemicCurveColors = ['white', '#5fd0ff', '#fd8264', '#48caff', '#9ffa82', '#fd8264', '#384f5f', 'none']
        criticalNumChartColor('#7cc076', '#384f5f', '#7fc676')
        doublingChartColorInit('#3094a0', '#384f5f')
    } else {
        testingChartColors = ['black', 'white', '#50cbfd', '#1c7d7e']
        staffCurfewColors = ['#b6ca51', '#50cbfd', '#237d7d', 'black']
        positiveByAgeColors = ['black', '#3366FF', '#b6ca51', '#50cbfd', 'white']
        CriticalVentilatedColors = ['#b6ca51', '#237d7d', '#50cbfd', 'white', 'black']
        epidemicCurveColors = ['black', '#5fd0ff', '#31898a', '#48caff', '#898989', '#1c7d7e', 'white',
            {
                linearGradient: [0, 0, 0, 400],
                stops: [
                    [0, '#a8e8ef'],
                    [0.8, 'rgba(255,255,255,0)']
                ]
            }]
        criticalNumChartColor('#62a5a6', 'rgba(255,255,255,0)', '#288484')
        doublingChartColorInit('#85dafd', 'rgba(255,255,255,0)')
    }
    testingChartInit()
    staffCurfewChartInit()
    initByAgeGraph()
    initCriticalVentilatedGraph()
    initEpidemicCurveGraph()
    newInfectedOutsideRedZonesChart()
    criticalNumChartInit()
    doublingChartInit()
}

const chnageIconsTheme = () => {
    const icons = document.getElementsByClassName('eva-bar-chart-2')
    for (let i = 0; i < icons.length; i++) {
        if (accessibilityMode)
            document.getElementsByClassName('eva-bar-chart-2')[i].classList.remove('dark-theme-icons')
        else
            document.getElementsByClassName('eva-bar-chart-2')[i].classList.add('dark-theme-icons')
    }
}

