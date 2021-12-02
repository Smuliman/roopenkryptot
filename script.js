 
  function bitcoin1() {
      
      let firstdate = Date.parse(document.getElementById("start").value)/1000;
      let lastdate = (Date.parse(document.getElementById("end").value)+86400000)/1000;
      let i=firstdate;
      let timeWindow = (lastdate - firstdate)/86400;
      console.log("timeWindow: "+ timeWindow);
      console.log("firsdate: "+firstdate);
      console.log("lastdate: "+lastdate);
      console.log("i: "+i);
        
            
            let yesterdaysPrice = 0;
            let bearish = 0;
            let trendStart = 0;
            let daysPrice = 0;
            let maxBearish = 0;
            let maxStart = 0;
            
        
        
      fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${firstdate}}&to=${(lastdate+86400)}`)
      .then((response) => {
        console.log(response.status);
      return response.json();
      })
      .then((data) => {

        const obj = data;
        console.log(obj.prices);
        console.log("Prices listan pituus: "+obj.prices.length);
        daysPrice = (obj.prices[0])[1];
        let closest = 0;
        thisDate = 0;
        let daysTime = 0;

        for (let i=0; i<timeWindow; i++) {
            
            thisDate=firstdate*1000+(i*86400000);
            const d = new Date(thisDate)
            console.log(d);
            console.log("ThisDate: "+thisDate)
            
            for(let i=0; i < obj.prices.length; i++) {

            const found = obj.prices[i].find(element => element > thisDate);
            console.log("found: "+found);
            if (found != undefined) {
                daysPrice=(obj.prices[i])[1];
                console.log("Daysprice: "+daysPrice)
                break;
            }
            
            
        }
        if (daysPrice < yesterdaysPrice && bearish==0) {
            bearish++;
            console.log("Bear: "+bearish)
            trendStart = thisDate;
        }else if (daysPrice < yesterdaysPrice && bearish > 0) {
            bearish++
            console.log("Bear: "+bearish)

        } else {
            bearish = 0;
            console.log("Bear: "+bearish)
        }
        if (bearish > maxBearish) {
            
            maxBearish=bearish;
            maxStart=trendStart;
            maxEnd=thisDate;
            
            
            
        } 
        
            yesterdaysPrice = daysPrice;
            
            
        }
        


        


        
        

        
        const finalTrendStart = new Date(maxStart)
        console.log("Max bear startti "+finalTrendStart);
        const finalTrendEnd = new Date(maxEnd)
            console.log("Max bear loppui: "+finalTrendEnd);

       
  
console.log("Bearish: "+bearish);
console.log("MaxBearish: "+maxBearish);


document.getElementById("tehtava1").innerHTML = "The longest bearish Bitcoin trend within a given date range was "+maxBearish+" days in a row. It happeneded between "+finalTrendStart+" and "+finalTrendEnd+". If my calculations are correct.";
//document.getElementById("tehtava1").innerHTML = "In bitcoin’s historical data from CoinGecko, the price decreased "+maxBearish+""; 
  });
  

  

  }

  function bitcoin2 (){
    let firstdate = Date.parse(document.getElementById("start2").value)/1000;
    let lastdate = (Date.parse(document.getElementById("end2").value)+86400000)/1000;
    let timeWindow = (lastdate - firstdate)/86400;
    let maxVolume = 0;

    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${firstdate}}&to=${(lastdate+86400)}`)
      .then((response) => {
        console.log(response.status);
      return response.json();
      })
      .then((data) => {

        const obj = data;
        console.log(obj);
        console.log(obj.total_volumes);

        for (let i=0; i<timeWindow; i++) {
            
            thisDate=firstdate*1000+(i*86400000);
            
            
            for(let i=0; i < obj.total_volumes.length; i++) {

                const found = obj.total_volumes[i].find(element => element > thisDate);
                console.log("found: "+found);
                if (found != undefined) {
                    console.log((obj.total_volumes[i])[1]);
                    if((obj.total_volumes[i])[1]>maxVolume) {
                        maxVolume=(obj.total_volumes[i])[1];
                    console.log("maxVolume: "+maxVolume)
                    
                    }
                    break;
                }
                
                
            }

            // const found = obj.total_volumes[i].find(element => element > thisDate);
            // console.log("found: "+found);
            // if (found != undefined) {
            //     daysPrice=(obj.prices[i])[1];
            //     console.log("Daysprice: "+daysPrice)
            //     break
            // }
            
            
        }
           console.log("maksimivola: "+maxVolume)
        
    });
  }

