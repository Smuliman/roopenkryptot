//fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1616450400&to=1616536800' )
 // .then((response) => {
   // return response.text();
  //})
  //.then((data) => {
    // do something with 'data'
 //   document.querySelector('.bitcoinApi').innerHTML = data;
    //console.log(data);
 // });
 
  function bitcoin1() {
      
      //console.log(document.getElementById("start").value);
      //console.log(Date.parse(document.getElementById("start").value)/1000);
      //console.log(document.getElementById("end").value);
      //console.log(Date.parse(document.getElementById("end").value)+86400000)/1000;
      let firstdate = Date.parse(document.getElementById("start").value)/1000;
      let lastdate = (Date.parse(document.getElementById("end").value)+86400000)/1000;
      let i=firstdate;
      let timeWindow = (lastdate - firstdate)/86400;
      console.log("timeWindow: "+ timeWindow);
      console.log("firsdate: "+firstdate);
      console.log("lastdate: "+lastdate);
      console.log("i: "+i);
        //while (i < lastdate) {
            let a = 0;
        while (a < timeWindow) {
        
      fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${i}&to=${i+86400}`)
      .then((response) => {
        console.log(response.status);
      return response.text();
      })
      .then((data) => {
    // do something with 'data'
        //console.log(document.querySelector('.bitcoinApi').innerHTML = data);
        console.log(data);

        const obj = JSON.parse(data);
        console.log(obj);
        console.log("Prices listan pituus: "+obj.prices.length);
        let daysPrice = (obj.prices[0])[1];
        console.log("Days price: "+daysPrice);

        
        
        

        

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
    

  });
  i=i+86400;
console.log("i: "+i);

  a++;
}

  }

