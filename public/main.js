//check dukungan browser

if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/service-worker.js')
           .then(function() { console.log("Service Worker Registered"); });
}

const orderButton = document.getElementById('orderButton')
addToHomescreen();
// fungsi hitung menu
orderButton.onclick = function() {
  const harga = [17500, 14500, 10600]
  const [hargaBurger, hargaSandwich, hargaSpaghetti] = harga
  const input1 = parseInt(document.getElementById("burger").value);
  const input2 = parseInt(document.getElementById("sandwich").value);
  const input3 = parseInt(document.getElementById("spaghetti").value);
  const total = (input1 * hargaBurger ) + (input2 * hargaSandwich) + (input3*hargaSpaghetti)
  const totalAkhir = total.toLocaleString();
  console.log(total)
  const totalRupiah = `
    <p> Total orderan kamu: Rp. ${totalAkhir} </p>
  `
  document.querySelector('#textTotal').innerHTML = totalRupiah
}

// promt untuk pemasangan home to screen
window.addEventListener('beforeinstallprompt', function(e) {
  e.userChoice.then(function(choiceResult) {

    console.log(choiceResult.outcome);

    //check apkaah user menambahkan ke home atau tidak
    if(choiceResult.outcome == 'dismissed') {
      console.log('User cancelled home screen install');
    }
    else {
      console.log('User added to home screen');
    }
  });
});
