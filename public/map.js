 
 //fungsi dapetin data dari json file
 async function getData(data) {
        try {
            const resp = await fetch('rest1.json')
            const listResto = await resp.json()
            const resto = listResto.restaurants
            const dataResto = await resto.map(rest => {
                // destructuring object
                const {name, cuisines, location, thumb, user_rating, R} = rest.restaurant     
                return {name, cuisines, location, thumb, user_rating, R}
            })
            const restoBandung = {dataResto}
            console.log(data, restoBandung)
            //return data
            return restoBandung
        } catch (e) {
            //catch error
            console.log(e)
        }
    }

  //memulai map leaflet js
  var mymap = L.map('map').setView([-6.8938320000, 107.6123020000], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoidGFxaW45OCIsImEiOiJjamx3YnJzeWQxNTV5M2xxcGsyZ3Zta2ljIn0.tG5e2XfsziniG8MHDpZyEA'
  }).addTo(mymap);
  
  //fungsi show review dan gambar
  async function showReview(e) {
    // ambil data dari fungsi get data
    let restoData = await getData("dataResto")
    for (var i = 0; i < restoData.dataResto.length; i++) {
      if (e.latlng.lat == restoData.dataResto[i].location.latitude){
        // tampilkan gambar
        document.getElementById('gmb').innerHTML = `<img src="${restoData.dataResto[i].thumb}">`
        //tampilkan review
        document.getElementById('review').innerHTML = `${restoData.dataResto[i].cuisines}`
      }
    }
  }

  async function markerResto(params) {
      try {
        // ambil data dari fungsi get data
        let restoData = await getData("dataResto")
        console.log("params", restoData)
        //lakukan looping dengan fungsi map untuk menampilkan marker
        restoData.dataResto.map(rest => {
           L.marker([rest.location.latitude, rest.location.longitude])
        .addTo(mymap)
        .bindPopup(
        ` <p><strong>${rest.name}</strong></p>
        <img src="${rest.thumb}" width="80px" height="100%">
        <br>
        <p> ${rest.location.address} </>
        <br>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        ${rest.user_rating.aggregate_rating}
        <br>
        Reviews:
        <br>
        ${rest.cuisines}
        `
      ).on('click', showReview); //callback fungsi untuk memanggil showReview
        })
      } catch (e) {
          console.log(e)
      }
  }

  //eksekusi fungsi markerResto
  markerResto("restoData")
  /*
  const markerObj = [
    {
      marker:  [-6.9666, 110.415],
      Isi: `Restoran 1`
    },
    {
      marker:  [-6.9666, 110.416],
      Isi: `Restoran 2`
    },
    {
      marker:  [-6.9666, 110.417],
      Isi: `Restoran 3`
    },
    {
      marker:  [-6.9666, 110.418],
      Isi: `Restoran 4`
    },
  ]

  markerObj.map(item => {
    L.marker(item.marker)
    .bindPopup(item.Isi).openPopup()
    .addTo(map);
  }
  )
*/

