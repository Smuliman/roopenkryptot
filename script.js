fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1616450400&to=1616536800' )
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    // do something with 'data'
    document.querySelector('.bitcoinApi').innerHTML = data;
    //console.log(data);
  });
 
  function bitcoin1() {
      
      //console.log(document.getElementById("start").value);
      //console.log(Date.parse(document.getElementById("start").value)/1000);
      //console.log(document.getElementById("end").value);
      //console.log(Date.parse(document.getElementById("end").value)+86400000)/1000;

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
        console.log((Date.parse(document.getElementById("start").value)/1000));
        console.log(((Date.parse(document.getElementById("end").value))+86400000)/1000);
        //for (let i = (Date.parse(document.getElementById("start").value)/1000); i < ((Date.parse(document.getElementById("end").value))+86400000)/1000; i+86400) {
          // console.log((obj.prices[0])[1]);
        //}
        for (let i =Date.parse(document.getElementById("start").value)/1000 ; i < ((Date.parse(document.getElementById("end").value))+86400000)/1000; i=i+86400) {
            console.log((obj.prices[0])[1]);
            
        } 
         //let i=1636588800;
         //let day=86400;
         //while(true){
         //if (i < 1636848000) {
           //  console.log("3 kertaa");
             //i+day;
         //} else {
           //  break;
         //}
        //}

    

    //console.log(obj.prices[0]);
    //console.log((obj.prices[0])[1]);


  });

  }
