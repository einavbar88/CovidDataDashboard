// const hospitalList = ["שיבא", "יוספטל", "שמיר", "וולפסון", "זיו צפת", "הלל יפה", "נהריה", "ברזילי", "פוריה", "סוראסקי", "בני ציון", "רבין ק. בלינסון", "סורוקה", "מאיר", "כפר קאסם", "קפלן", "הסקוטי", "הדסה עין כרם", "שערי צדק", "לניאדו"]
// const cities = ["ירושלים", "תל אביב-יפו", "נצרת", "בני ברק", "חיפה", "באר שבע", "פתח תקווה", "נתניה", "מג'דל שמס", "אשדוד", "חולון", "אום אל-פחם", "ראשון לציון", "בוקעאתא", "כפר קאסם", "בת ים", "בית ג'ן", "טייבה", "סח'נין", "שפרעם"]

// let docData, date, covidData, ventilated, ventilatedTotal = 0, newDeaths, totalDeaths = 0
// let tests, healed, genderData, newCases, totalCases = 0, totalHealed = 0
// let active = { hotel: 140, hospital: 0 }
// fetch('http://localhost:3000/get').then(
//     function (d) { return d.json(); }
// ).then(
//     function (json) {
//         covidData = json;
//         dataTranslateInit()
//     }
// )

// function dataTranslateInit() {
//     for (let i = 9; i < 12; i++) {
//         for (let j = 1; j <= 31; j++) {
//             if (i === 9) {
//                 if (j < 20)
//                     j = 20
//                 if (j === 31)
//                     continue
//             }
//             else if (i === 11) {
//                 if (j === 18)
//                     break
//             }
//             dataTranslate(j, i)
//             dailyDocumentInit()
//             const jsonDoc = (JSON.stringify(docData))
//             upload(jsonDoc)
//         }
//     }
// }

// function upload(json) {
//     fetch('http://localhost:3000/daily/new', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: json
//     }).then((res) => {
//         if (res.ok) {
//             return res.json
//         } else
//             throw new Error(res.status)
//     })
//         .then(json => console.log(json));
// }

// function dailyDocumentInit() {
//     docData = {
//         newCases: newCases,
//         casesSoFar: totalCases,
//         date: date,
//         active: active,
//         seriousCases: seriousCases,
//         ventilated: ventilated,
//         ventilatedSoFar: ventilatedTotal,
//         deceased: newDeaths,
//         deceasedSoFar: totalDeaths,
//         tests: tests,
//         healed: healed,
//         healedSoFar: totalHealed,
//         citiesData: citiesData,
//         agesData: agesData,
//         hospitalsData: hospitalsData
//     }
// }

// const hospitalsData = {
//     "שיבא": { maxCapacity: 8300, staffCurfew: 12, patients: 0 },
//     "יוספטל": { maxCapacity: 6200, staffCurfew: 10, patients: 0 },
//     "שמיר": { maxCapacity: 4000, staffCurfew: 7, patients: 0 },
//     "וולפסון": { maxCapacity: 4570, staffCurfew: 20, patients: 0 },
//     "זיו צפת": { maxCapacity: 1940, staffCurfew: 15, patients: 0 },
//     "הלל יפה": { maxCapacity: 4670, staffCurfew: 10, patients: 0 },
//     "נהריה": { maxCapacity: 2610, staffCurfew: 8, patients: 0 },
//     "ברזילי": { maxCapacity: 1980, staffCurfew: 12, patients: 0 },
//     "פוריה": { maxCapacity: 1590, staffCurfew: 14, patients: 0 },
//     "סוראסקי": { maxCapacity: 1230, staffCurfew: 5, patients: 0 },
//     "בני ציון": { maxCapacity: 1350, staffCurfew: 6, patients: 0 },
//     "רבין ק בלינסון": { maxCapacity: 1630, staffCurfew: 4, patients: 0 },
//     "סורוקה": { maxCapacity: 3420, staffCurfew: 17, patients: 0 },
//     "מאיר": { maxCapacity: 2080, staffCurfew: 9, patients: 0 },
//     "כפר קאסם": { maxCapacity: 1090, staffCurfew: 7, patients: 0 },
//     "קפלן": { maxCapacity: 3450, staffCurfew: 8, patients: 0 },
//     "הסקוטי": { maxCapacity: 1270, staffCurfew: 12, patients: 0 },
//     "הדסה עין כרם": { maxCapacity: 2340, staffCurfew: 20, patients: 0 },
//     "שערי צדק": { maxCapacity: 4320, staffCurfew: 15, patients: 0 },
//     "לניאדו": { maxCapacity: 3210, staffCurfew: 10, patients: 0 }
// }

// const citiesData = {
//     "ירושלים": { newCases: 0, active: 0 },
//     "תל אביב-יפו": { newCases: 0, active: 0 },
//     "נצרת": { newCases: 0, active: 0 },
//     "בני ברק": { newCases: 0, active: 0 },
//     "חיפה": { newCases: 0, active: 0 },
//     "באר שבע": { newCases: 0, active: 0 },
//     "פתח תקווה": { newCases: 0, active: 0 },
//     "נתניה": { newCases: 0, active: 0 },
//     "מג'דל שמס": { newCases: 0, active: 0 },
//     "אשדוד": { newCases: 0, active: 0 },
//     "חולון": { newCases: 0, active: 0 },
//     "אום אל-פחם": { newCases: 0, active: 0 },
//     "ראשון לציון": { newCases: 0, active: 0 },
//     "בוקעאתא": { newCases: 0, active: 0 },
//     "כפר קאסם": { newCases: 0, active: 0 },
//     "בת ים": { newCases: 0, active: 0 },
//     "בית ג'ן": { newCases: 0, active: 0 },
//     "טייבה": { newCases: 0, active: 0 },
//     "סח'נין": { newCases: 0, active: 0 },
//     "שפרעם": { newCases: 0, active: 0 },
// }

// const seriousCases = { serious: 0, fair: 0, critical: 0 }

// function dataTranslate(day, month) {
//     if (day == null || month == null)
//         return
//     newCases = 0
//     tests = { positiveTests: 0, totalTests: 2000 + Math.floor(Math.random() * 20000) }
//     ventilated = 0
//     healed = 0
//     newDeaths = 0
//     citiesDataInit()
//     date = { day: day, month: month }
//     for (let i = 0; i <= covidData.length; i++) {
//         const data = covidData[i]
//         if (data == null || data.testDate == null)
//             continue
//         if (data.testDate.month === month && data.testDate.day === day) {
//             newCases++
//             totalCases++
//             tests.positiveTests++
//             condition(data)
//             ventilatedActiveCount(data)
//             insertHospitalData(data)
//             cityData(data, false)
//             death(data)
//             ages(data)
//         }
//         if (data.healedDate.month === month && data.healedDate.day === day) {
//             healed++
//             totalHealed++
//             cityData(data, true)
//         }
//     }
// }

// const citiesDataInit = () => {
//     for (const city in citiesData)
//         city.newCases = 0;
// }

// const agesData = {
//     "0-9": { cases: { male: 0, female: 0 }, deceased: { male: 0, female: 0 }, ventilated: { male: 0, female: 0 }, serious: { male: 0, female: 0 } },
//     "10-19": { cases: { male: 0, female: 0 }, deceased: { male: 0, female: 0 }, ventilated: { male: 0, female: 0 }, serious: { male: 0, female: 0 } },
//     "20-29": { cases: { male: 0, female: 0 }, deceased: { male: 0, female: 0 }, ventilated: { male: 0, female: 0 }, serious: { male: 0, female: 0 } },
//     "30-39": { cases: { male: 0, female: 0 }, deceased: { male: 0, female: 0 }, ventilated: { male: 0, female: 0 }, serious: { male: 0, female: 0 } },
//     "40-49": { cases: { male: 0, female: 0 }, deceased: { male: 0, female: 0 }, ventilated: { male: 0, female: 0 }, serious: { male: 0, female: 0 } },
//     "50-59": { cases: { male: 0, female: 0 }, deceased: { male: 0, female: 0 }, ventilated: { male: 0, female: 0 }, serious: { male: 0, female: 0 } },
//     "60-69": { cases: { male: 0, female: 0 }, deceased: { male: 0, female: 0 }, ventilated: { male: 0, female: 0 }, serious: { male: 0, female: 0 } },
//     "70-79": { cases: { male: 0, female: 0 }, deceased: { male: 0, female: 0 }, ventilated: { male: 0, female: 0 }, serious: { male: 0, female: 0 } },
//     "80-89": { cases: { male: 0, female: 0 }, deceased: { male: 0, female: 0 }, ventilated: { male: 0, female: 0 }, serious: { male: 0, female: 0 } },
//     "90+": { cases: { male: 0, female: 0 }, deceased: { male: 0, female: 0 }, ventilated: { male: 0, female: 0 }, serious: { male: 0, female: 0 } }
// }

// function cityData(data, isHealed) {
//     for (let i = 0; i < cities.length; i++) {
//         let city = cities[i]
//         if (data.city === city) {
//             if (isHealed)
//                 citiesData[city].active--
//             else {
//                 citiesData[city].newCases++
//                 citiesData[city].active++
//             }
//         }
//     }
// }
// function death(data) {
//     if (data.deceased) {
//         newDeaths++
//         totalDeaths++
//     }
// }

// function ventilatedActiveCount(data) {
//     if (data.ventilated) {
//         ventilated++
//         ventilatedTotal++
//     }
//     if (data.hospital !== null)
//         active.hospital++
// }

// function condition(data) {
//     if (data.condition === "fair")
//         seriousCases.fair++
//     else if (data.condition === "serious")
//         seriousCases.serious++
//     else if (data.condition === "critical")
//         seriousCases.critical++
// }
// function ages(data) {
//     let age = "90+"
//     if (data.age < 10)
//         age = "0-9"
//     else if (data.age < 20)
//         age = "10-19"
//     else if (data.age < 30)
//         age = "20-29"
//     else if (data.age < 40)
//         age = "30-39"
//     else if (data.age < 50)
//         age = "40-49"
//     else if (data.age < 60)
//         age = "50-59"
//     else if (data.age < 70)
//         age = "60-69"
//     else if (data.age < 80)
//         age = "70-79"
//     else if (data.age < 90)
//         age = "80-89"

//     agesData[age].cases[data.gender]++
//     if (data.deceased)
//         agesData[age].deceased[data.gender]++
//     if (data.ventilated)
//         agesData[age].ventilated[data.gender]++
//     if (data.condition === "serious")
//         agesData[age].serious[data.gender]++
// }

// function insertHospitalData(data) {
//     let hospital = data.hospital
//     if (hospital != null){
//         console.log(hospital)
//         hospitalsData[hospital].patients++
//     }

// }



// // let database
// // let cases = 0, healed = 0, deceased = 0, citiesData, agesData
// // fetch('http://localhost:3000/daily/get')
// //     .then(res => res.json())
// //     .then(d => database = d)
// //     .then(() => {
// //         citiesInit()
// //         agesInit()
// //         database.sort(database.sort((a, b) => (a.date.month < b.date.month) ? 1 : -1))
// //         for (let i = 0; i < database.length; i++) {
// //             cases += database[i].newCases
// //             deceased += database[i].newDeaths
// //             healed += database[i].healed
// //             insertCitiesData(database[i].citiesData)
// //             insertAgesData(database[i].agesData)
// //         }
// //     })

// // function insertCitiesData(data) {
// //     for (const city in data) {
// //         citiesData[city].cases += city.cases
// //         citiesData[city].active += city.active
// //     }
// // }