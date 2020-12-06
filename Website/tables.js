/////////cities
let cityDataArrayForTable
let cityTableData = []
let isSortDirectionUpCity = false, isSortDirectionUpCases = false,
    isSortDirectionUpActive = false, isSortDirectionUpNewCases = false,
    isSortDirectionUpTests = false, isSortDirectionUpPerCapita = false

const renderCitiesTable = () => {
    if (cityDataArrayForTable == undefined) {
        cityDataArrayForTable = []
        for (let i = citiesData.length - 1; i >= citiesData.length - 8; i--) {
            cityDataArrayForTable.push(citiesData[i])
        }
        for (const city in cityDataArrayForTable[0]) {
            cityTableData.push({
                name: city,
                newCases: cityDataArrayForTable[0][city].newCases,
                active: cityDataArrayForTable[0][city].active,
                newCasesLastWeek: cityDataArrayForTable[0][city].newCases - cityDataArrayForTable[7][city].newCases,
                tests: Math.floor((database[0].tests.totalTests - Math.floor(Math.random() * database[0].tests.totalTests))/2),
                perCapita: Math.floor(10 * cityDataArrayForTable[0][city].active / 10 * Math.random())
            })
        }
        sortCol(cityTableData, false, 'active')
    }
    for (const city of cityTableData) {
        const row = document.createElement('tr')
        let dataInsert = []
        for (let i = 0; i < 6; i++)
            dataInsert.push(document.createElement('th'))

        dataInsert[0].innerText = city.name
        dataInsert[0].style.fontWeight = 600
        dataInsert[0].style.textAlign = 'right'
        dataInsert[0].style.marginRight = '25px'
        dataInsert[1].innerText = city.newCases
        dataInsert[2].innerText = city.active
        dataInsert[3].innerText = city.newCasesLastWeek
        dataInsert[4].innerText = city.tests
        dataInsert[5].innerText = city.perCapita
        for (let i = 0; i < dataInsert.length; i++) {
            row.appendChild(dataInsert[i])
        }
        document.getElementById('spread-areas__table').appendChild(row)
    }
}

document.getElementById('city-header').addEventListener('click', () => {
    sortCol(cityTableData, isSortDirectionUpCity, 'name')
    destroyTable()
    renderCitiesTable()
    isSortDirectionUpCity = !isSortDirectionUpCity
})

document.getElementById('cases-header').addEventListener('click', () => {
    sortCol(cityTableData, isSortDirectionUpCases, 'newCases')
    destroyTable()
    renderCitiesTable()
    isSortDirectionUpCases = !isSortDirectionUpCases

})

document.getElementById('active-header').addEventListener('click', () => {
    sortCol(cityTableData, isSortDirectionUpActive, 'active')
    destroyTable()
    renderCitiesTable()
    isSortDirectionUpActive = !isSortDirectionUpActive

})

document.getElementById('new-cases-header').addEventListener('click', () => {
    sortCol(cityTableData, isSortDirectionUpNewCases, 'newCasesLastWeek')
    destroyTable()
    renderCitiesTable()
    isSortDirectionUpNewCases = !isSortDirectionUpNewCases

})

document.getElementById('tests-header').addEventListener('click', () => {
    sortCol(cityTableData, isSortDirectionUpTests, 'tests')
    destroyTable()
    renderCitiesTable()
    isSortDirectionUpTests = !isSortDirectionUpTests
})

document.getElementById('per-capita-header').addEventListener('click', () => {
    sortCol(cityTableData, isSortDirectionUpPerCapita, 'perCapita')
    destroyTable()
    renderCitiesTable()
    isSortDirectionUpPerCapita = !isSortDirectionUpPerCapita

})


const sortCol = (arr, isSortDirectionUp, sortBy) => {
    arr.sort((a, b) => {
        const direction = isSortDirectionUp ? -1 : 1
        if (a[sortBy] < b[sortBy])
            return 1 * direction
        if (a[sortBy] > b[sortBy])
            return -1 * direction

    })
}

const destroyTable = () => {
    const table = document.getElementById('spread-areas__table')
    while (table.hasChildNodes()) {
        if (table.children[0] == null)
            break
        table.removeChild(table.children[0])
    }
}
renderCitiesTable()
////////hospitals

let hospitalDataArrayForTable
let hospitalTableData = []
let isSortDirectionUphospital = false, isSortDirectionUpCapacity = false,
    isSortDirectionUpCoronaCapacity = false, isSortDirectionUpCurfew = false

const renderHospitalTable = () => {
    if (hospitalDataArrayForTable == undefined) {
        hospitalDataArrayForTable = hospitalsData
        for (const hospital in hospitalDataArrayForTable) {
            hospitalTableData.push({
                name: hospital,
                maxCapacity: hospitalDataArrayForTable[hospital].maxCapacity,
                staffCurfew: hospitalDataArrayForTable[hospital].staffCurfew,
                patients: hospitalDataArrayForTable[hospital].patients,
            })
        }
        sortCol(hospitalTableData, true, 'name')
    }
    for (const hospital of hospitalTableData) {
        const row = document.createElement('tr')
        let dataInsert = []
        const fullBar = document.createElement('div')
        fullBar.className = 'hospitals-chart-bar__bg'
        const emptyFullBar = fullBar
        const capacityBar = document.createElement('div')
        capacityBar.className = 'hospitals-chart-bar__color'
        const capacityPercentage = Math.floor(10000*hospital.patients / hospital.maxCapacity)/100 + '%'
        capacityBar.style.width = capacityPercentage
        fullBar.appendChild(capacityBar)
        capacityBar.id = hospital.name.replace(/\s/g, '')
        const capacityText = document.createElement('div')
        capacityText.innerText = capacityPercentage

        for (let i = 0; i < 4; i++)
            dataInsert.push(document.createElement('th'))
  
        dataInsert[0].innerText = hospital.name
        dataInsert[0].style.fontWeight = 600
        dataInsert[0].style.textAlign = 'right' 
        dataInsert[0].style.margin = '10px'
        dataInsert[1].style.display = 'flex'
        dataInsert[1].style.justifyContent = 'right'
        dataInsert[1].style.marginRight = '20px'
        dataInsert[1].appendChild(fullBar)
        dataInsert[1].appendChild(capacityText)
        dataInsert[2].innerText = "אין מידע"
        dataInsert[2].style.color = '#ccc'
        dataInsert[3].innerText = hospital.staffCurfew
        for (let i = 0; i < dataInsert.length; i++) {
            row.appendChild(dataInsert[i])
        }
        document.getElementById('hospitals-status__table').appendChild(row)
        
    }
}
renderHospitalTable()