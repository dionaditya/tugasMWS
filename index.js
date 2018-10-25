const fetch = require('node-fetch')
const fs = require('fs')

const data = fs.readFileSync('rest.json', 'UTF-8')

async function getData(data) {
    try {
        const listResto = JSON.parse(data)
        const resto = listResto.restaurants
        resto.map(rest => {
            const {name, cuisines, location} = rest.restaurant     
            console.log(location.latitude, location.longitude)
        })
    } catch (e) {
        console.log(e)
    }
}

getData(data);