//looppi, jossa paalutetaan logiin ajanjakson ensimmäinen price eli ajanjakson arvo
for (let i =(Date.parse(document.getElementById("start").value)/1000) ; i < ((Date.parse(document.getElementById("end").value))+86400000)/1000; i=i+86400) {
    console.log((obj.prices[0])[1]);
    console.log(i);
    
} 
function bitcoin1() {
      
    //console.log(document.getElementById("start").value);
    //console.log(Date.parse(document.getElementById("start").value)/1000);
    //console.log(document.getElementById("end").value);
    //console.log(Date.parse(document.getElementById("end").value)+86400000)/1000;
      while(true) {
    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${Date.parse(document.getElementById("start").value)/1000}&to=${(Date.parse(document.getElementById("end").value)+86400000)/1000}` )
    .then((response) => {
    return response.text();
    })
    .then((data) => {
  // do something with 'data'
      document.querySelector('.bitcoinApi').innerHTML = data;
      //console.log(data);

      const obj = JSON.parse(data);
      console.log(obj.prices.length)

      

     for (let i = 0; i < obj.prices.length; i++) {
          console.log(obj.prices[i]);
       } 
       let alku = (Date.parse(document.getElementById("start").value));
       let loppu= ((Date.parse(document.getElementById("end").value))+86400000)

      //console.log((Date.parse(document.getElementById("start").value)/1000));
      //console.log(((Date.parse(document.getElementById("end").value))+86400000)/1000);
      //for (let i = (Date.parse(document.getElementById("start").value)/1000); i < ((Date.parse(document.getElementById("end").value))+86400000)/1000; i+86400) {
        // console.log((obj.prices[0])[1]);
      //}
      
      for (i=alku; i<loppu; i=i+86400000) {
          console.log("i on: "+i);
          //console.log(obj.prices.indexOf(i));

          const found = obj.prices[0].find(element => element.closest(i) );
          //console.log("löytö: "+found);
      }
      
      //HAE JOKA PÄIVÄ ERIKSEEN

  

  //console.log(obj.prices[0]);
  //console.log((obj.prices[0])[1]);


});
}

}

while (a < timeWindow) {
        
    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${i}&to=${i+86400}`)
    .then((response) => {
      console.log(response.status);
    return response.text();
    })
    .then((data) => {
  // do something with 'data'
      //console.log(document.querySelector('.bitcoinApi').innerHTML = data);
      //console.log(data);

      const obj = JSON.parse(data);
      console.log(obj);
      console.log("Prices listan pituus: "+obj.prices.length);
      daysPrice = (obj.prices[0])[1];
      console.log("Days price: "+daysPrice);

      if (daysPrice < yesterdaysPrice && bearish==0) {
          bearish++;
          trendStart = i;
      }else if (daysPrice < yesterdaysPrice && bearish > 0) {
          bearish++

      } 
      else {
          if (bearish > maxBearish) {
              trendEnd=i;
              maxBearish=bearish;
              //currentMax = {bearish: this.bearish, trendStart: this.trendStart, trendEnd: this.trendEnd};
              bearish = 0;
              trendEnd = 0;
              trendStart = 0;
              
          } else {
              bearish = 0;
              trendEnd = 0;
              trendStart = 0;
          
          }
      }


      
      

      

     //for (let i = 0; i < obj.prices.length; i++) {
       //   console.log(obj.prices[i]);
       //} 
       

      //console.log((Date.parse(document.getElementById("start").value)/1000));
      //console.log(((Date.parse(document.getElementById("end").value))+86400000)/1000);
      //for (let i = (Date.parse(document.getElementById("start").value)/1000); i < ((Date.parse(document.getElementById("end").value))+86400000)/1000; i+86400) {
        // console.log((obj.prices[0])[1]);
      //}

      //let alku = (Date.parse(document.getElementById("start").value));
       //let loppu= ((Date.parse(document.getElementById("end").value))+86400000)
      //for (i=alku; i<loppu; i=i+86400000) {
         // console.log("i on: "+i);
          //console.log(obj.prices.indexOf(i));

          //const found = obj.prices[0].find(element => element.closest(i) );
          //console.log("löytö: "+found);
     // }
      
      //HAE JOKA PÄIVÄ ERIKSEEN

  

  //console.log(obj.prices[0]);
  //console.log((obj.prices[0])[1]);
  yesterdaysPrice = daysPrice;

console.log("Bearish: "+bearish);
console.log("MaxBearish: "+maxBearish);


});
i=i+86400;
console.log("i: "+i);
a++;
}


//Jokin vertailu viritys tehtävä 3
if(daysPrice>yesterdaysPrice) {

    compare += (daysPrice-yesterdaysPrice);
    console.log("Compare lisäys: "+compare);
} else if(yesterdaysPrice != 0 && daysPrice<yesterdaysPrice) {
    compare -= (yesterdaysPrice-daysPrice)
    console.log("Compare vähennys: "+compare);
    
} else {
 console.log("Compare ei muuttunut. Days price: "+daysPrice+"yesterdaysprice: "+yesterdaysPrice);
}

let i=firstdate;
daysPrice = (obj.prices[0])[1]; //oli rivillä 38

const d = new Date(thisDate)
                //console.log(d);
                //console.log("ThisDate: "+thisDate) // rivillä 48