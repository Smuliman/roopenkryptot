fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1616450400&to=1616536800' )
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    // do something with 'data'
    document.querySelector('.bitcoinApi').innerHTML = data;
    console.log(data);
  });
 
  function bitcoin1() {
      
      console.log(document.getElementById("start").value);
      console.log(Date.parse(document.getElementById("start").value)/1000);
      console.log(document.getElementById("end").value);
      console.log(Date.parse(document.getElementById("end").value)/1000);

      fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${Date.parse(document.getElementById("start").value)/1000}&to=${Date.parse(document.getElementById("end").value)/1000}` )
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    // do something with 'data'
    document.querySelector('.bitcoinApi').innerHTML = data;
    console.log(data);
    console.log(data.prices[0]);
  });

  }
