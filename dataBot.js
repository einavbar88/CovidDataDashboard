const hospitalList = ["שיבא", "יוספטל", "שמיר", "וולפסון", "זיו צפת", "הלל יפה", "נהריה", "ברזילי", "פוריה", "סוראסקי", "בני ציון", "רבין ק. בלינסון", "סורוקה", "מאיר", "כפר קאסם", "קפלן", "הסקוטי", "הדסה עין כרם", "שערי צדק", "לניאדו"]
const cities = ["ירושלים", "תל אביב-יפו", "נצרת", "בני ברק", "חיפה", "באר שבע", "פתח תקווה", "נתניה", "מג'דל שמס", "אשדוד", "חולון", "אום אל-פחם", "ראשון לציון", "בוקעאתא", "כפר קאסם", "בת ים", "בית ג'ן", "טייבה", "סח'נין", "שפרעם"]
//add people to pool 
// for (let i = 0; i < 100000; i++) {
//     const data = {
//         "name": 'Person' + i,
//         "personID": i+1,
//         "age": Math.floor(Math.random() * 100),
//         "city": cities[Math.floor(Math.random() * 20)],
//     }

// fetch('http://localhost:3000/new/person', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
// }).then(response => response.json())
//     .then(data => console.log(data));
// }


for (let i = 10001; i <= 50000; i++) {
    let testDate, healedDate, hospital, healed = true, deceased = false, condition, ventilated = false, gender = "male"
    //     testDate = {
    //         "month": 11,
    //         "day": null
    //     }
    //     healedDate = {
    //         "month": 11,
    //         "day": null
    //     }

    //     if (i < 18758) {
    //         testDate.month = 9
    //         if (i < 1457)
    //             testDate.day = 20
    //         else if (i < 3120)
    //             testDate.day = 21
    //         else if (i < 4040)
    //             testDate.day = 22
    //         else if (i < 5095)
    //             testDate.day = 23
    //         else if (i < 6170)
    //             testDate.day = 24
    //         else if (i < 7684)
    //             testDate.day = 25
    //         else if (i < 10410)
    //             testDate.day = 26
    //         else if (i < 12209)
    //             testDate.day = 27
    //         else if (i < 14088)
    //             testDate.day = 28
    //         else if (i < 16512)
    //             testDate.day = 29
    //         else
    //             testDate.day = 30
    //     } else if (i < 51114) {
    //         testDate.month = 10
    //         if (i < 20198)
    //             testDate.day = 1
    //         else if (i < 21120)
    //             testDate.day = 2
    //         else if (i < 23040)
    //             testDate.day = 3
    //         else if (i < 25095)
    //             testDate.day = 4
    //         else if (i < 26170)
    //             testDate.day = 5
    //         else if (i < 27684)
    //             testDate.day = 6
    //         else if (i < 30410)
    //             testDate.day = 7
    //         else if (i < 32209)
    //             testDate.day = 8
    //         else if (i < 33188)
    //             testDate.day = 9
    //         else if (i < 35512)
    //             testDate.day = 10
    //         else if (i < 36198)
    //             testDate.day = 11
    //         else if (i < 37120)
    //             testDate.day = 12
    //         else if (i < 39011)
    //             testDate.day = 13
    //         else if (i < 40951)
    //             testDate.day = 14
    //         else if (i < 41670)
    //             testDate.day = 15
    //         else if (i < 42084)
    //             testDate.day = 16
    //         else if (i < 43000)
    //             testDate.day = 17
    //         else if (i < 43539)
    //             testDate.day = 18
    //         else if (i < 44088)
    //             testDate.day = 19
    //         else if (i < 44612)
    //             testDate.day = 20
    //         else if (i < 45198)
    //             testDate.day = 21
    //         else if (i < 45620)
    //             testDate.day = 22
    //         else if (i < 46040)
    //             testDate.day = 23
    //         else if (i < 46495)
    //             testDate.day = 24
    //         else if (i < 46990)
    //             testDate.day = 25
    //         else if (i < 47684)
    //             testDate.day = 26
    //         else if (i < 48410)
    //             testDate.day = 27
    //         else if (i < 49209)
    //             testDate.day = 28
    //         else if (i < 50088)
    //             testDate.day = 29
    //         else if (i < 50712)
    //             testDate.day = 30
    //         else
    //             testDate.day = 31
    //     } else {
    //         if (i < 52104)
    //             testDate.day = 1
    //         else if (i < 53120)
    //             testDate.day = 2
    //         else if (i < 54341)
    //             testDate.day = 3
    //         else if (i < 55125)
    //             testDate.day = 4
    //         else if (i < 56016)
    //             testDate.day = 5
    //         else if (i < 57684)
    //             testDate.day = 6
    //         else if (i < 59000)
    //             testDate.day = 7
    //         else if (i < 60209)
    //             testDate.day = 8
    //         else if (i < 62188)
    //             testDate.day = 9
    //         else if (i < 65682)
    //             testDate.day = 10
    //         else if (i < 66959)
    //             testDate.day = 11
    //         else if (i < 68000)
    //             testDate.day = 12
    //         else if (i < 68711)
    //             testDate.day = 13
    //         else if (i < 69551)
    //             testDate.day = 14
    //         else if (i < 69710)
    //             testDate.day = 15
    //         else if (i < 71000)
    //             testDate.day = 16
    //         else
    //             testDate.day = 17
    //     }

    //     if (i % 29 === 0 || i > 60209) {
    //         healed = false
    //         healedDate.month = null
    //         if (i % 87 === 0) {
    //             deceased = true
    //             condition = "dead"
    //             ventilated = false
    //             hospital = null
    //         }else if (i % 261 === 0){
     
        //deceased = false
        //condition = "serious"
        //hospital = hospitalList[Math.floor(Math.random() * 20)]
        //ventilated = false
        if (condition === "fair") {
            if(i%2 === 0 || i%3 === 0 || i%5 === 0){
                hospital = null
                condition === "good"
            }
            //condition = "critical"
            //ventilated = true
        }
        const data = {
            // "testDate": testDate,
            // "healed": healed,
            // "healedDate": healedDate,
            "hospital": hospital,
            // "deceased": false,
            "condition": condition,
            //"ventilated": ventilated
            //"gender" : gender
        }
        fetch('http://localhost:3000/edit?id=' + i, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => console.log(data));

    }
    //         else if (i % 377)
    //             condition = "fair"
    //         else
    //             condition = "good"
    //     } else {
    //         healed = true
    //         deceased = false
    //         condition = null
    //         ventilated = false
    //         hospital = null
    //         if (i < 3758) {
    //             healedDate.month = 9
    //             if (i < 857)
    //                 healedDate.day = 28
    //             else if (i < 2120)
    //                 healedDate.day = 29
    //             else
    //                 healedDate.day = 30
    //         }
    //         else if (i < 42783) {
    //             healedDate.month = 10
    //             if (i < 5198)
    //                 healedDate.day = 1
    //             else if (i < 6120)
    //                 healedDate.day = 2
    //             else if (i < 7040)
    //                 healedDate.day = 3
    //             else if (i < 8095)
    //                 healedDate.day = 4
    //             else if (i < 10170)
    //                 healedDate.day = 5
    //             else if (i < 12684)
    //                 healedDate.day = 6
    //             else if (i < 13410)
    //                 healedDate.day = 7
    //             else if (i < 15209)
    //                 healedDate.day = 8
    //             else if (i < 16588)
    //                 healedDate.day = 9
    //             else if (i < 17512)
    //                 healedDate.day = 10
    //             else if (i < 18198)
    //                 healedDate.day = 11
    //             else if (i < 19120)
    //                 healedDate.day = 12
    //             else if (i < 20011)
    //                 healedDate.day = 13
    //             else if (i < 21451)
    //                 healedDate.day = 14
    //             else if (i < 22670)
    //                 healedDate.day = 15
    //             else if (i < 23084)
    //                 healedDate.day = 16
    //             else if (i < 24000)
    //                 healedDate.day = 17
    //             else if (i < 25539)
    //                 healedDate.day = 18
    //             else if (i < 27088)
    //                 healedDate.day = 19
    //             else if (i < 29612)
    //                 healedDate.day = 20
    //             else if (i < 31198)
    //                 healedDate.day = 21
    //             else if (i < 32620)
    //                 healedDate.day = 22
    //             else if (i < 34040)
    //                 healedDate.day = 23
    //             else if (i < 35495)
    //                 healedDate.day = 24
    //             else if (i < 36990)
    //                 healedDate.day = 25
    //             else if (i < 37684)
    //                 healedDate.day = 26
    //             else if (i < 39410)
    //                 healedDate.day = 27
    //             else if (i < 40209)
    //                 healedDate.day = 28
    //             else if (i < 41088)
    //                 healedDate.day = 29
    //             else if (i < 41712)
    //                 healedDate.day = 30
    //             else
    //                 healedDate.day = 31
    //         }
    //         else {
    //             if (i < 43583)
    //                 healedDate.day = 1
    //             else if (i < 44120)
    //                 healedDate.day = 2
    //             else if (i < 45341)
    //                 healedDate.day = 3
    //             else if (i < 46125)
    //                 healedDate.day = 4
    //             else if (i < 47016)
    //                 healedDate.day = 5
    //             else if (i < 48174)
    //                 healedDate.day = 6
    //             else if (i < 49020)
    //                 healedDate.day = 7
    //             else if (i < 50183)
    //                 healedDate.day = 8
    //             else if (i < 51188)
    //                 healedDate.day = 9
    //             else if (i < 52682)
    //                 healedDate.day = 10
    //             else if (i < 53959)
    //                 healedDate.day = 11
    //             else if (i < 54000)
    //                 healedDate.day = 12
    //             else if (i < 55711)
    //                 healedDate.day = 13
    //             else if (i < 57551)
    //                 healedDate.day = 14
    //             else if (i < 59009)
    //                 healedDate.day = 15
    //             else if (i < 59976)
    //                 healedDate.day = 16
    //             else
    //                 healedDate.day = 17
    //         }
    //     }
        //if(i%2 === 0)
            //gender = "female"
        // const data = {
        //     "testDate": testDate,
        //     "healed": healed,
        //     "healedDate": healedDate,
        //     "hospital": hospital,
        //     "deceased": false,
        //     "condition": condition,
        //     "ventilated": ventilated
        //     "gender" : gender
        // }
        // fetch('http://localhost:3000/edit?id=' + i, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // }).then(response => response.json())
        //     .then(data => console.log(data));


//}



// for (let i = 94427; i < 94485; i++) {
//     fetch('http://localhost:3000/delete?id=' + i, {
//                 method: 'DELETE'
//             }).then(response => response.json())
//                 .then(data => console.log(data));  
// }


