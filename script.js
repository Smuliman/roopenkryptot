 
  function bitcoin1() {
      //
      let firstdate = Date.parse(document.getElementById("start").value)/1000;
      let lastdate = (Date.parse(document.getElementById("end").value)+86400000)/1000;
      let i=firstdate;
      let timeWindow = (lastdate - firstdate)/86400;
      //console.log("timeWindow: "+ timeWindow);
      //console.log("firsdate: "+firstdate);
      //console.log("lastdate: "+lastdate);
      //console.log("i: "+i);
        
            
            let yesterdaysPrice = 0;
            let bearish = 0;
            let trendStart = 0;
            let daysPrice = 0;
            let maxBearish = 0;
            let maxStart = 0;
            
        
        
      fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${firstdate}}&to=${(lastdate+86400)}`)
      .then((response) => {
        //console.log(response.status);
      return response.json();
      })
      .then((data) => {

        const obj = data;
        //console.log(obj.prices);
        //console.log("Prices listan pituus: "+obj.prices.length);
        daysPrice = (obj.prices[0])[1];
        let closest = 0;
        thisDate = 0;
        let daysTime = 0;

        for (let i=0; i<timeWindow; i++) {
            
            thisDate=firstdate*1000+(i*86400000);
            const d = new Date(thisDate)
            //console.log(d);
            //console.log("ThisDate: "+thisDate)
            
            for(let i=0; i < obj.prices.length; i++) {

            const found = obj.prices[i].find(element => element > thisDate);
            //console.log("found: "+found);
            if (found != undefined) {
                daysPrice=(obj.prices[i])[1];
                //console.log("Daysprice: "+daysPrice)
                break;
            }
            
            
        }
        if (daysPrice < yesterdaysPrice && bearish==0) {
            bearish++;
            //console.log("Bear: "+bearish)
            trendStart = thisDate;
        }else if (daysPrice < yesterdaysPrice && bearish > 0) {
            bearish++
            //console.log("Bear: "+bearish)

        } else {
            bearish = 0;
            //console.log("Bear: "+bearish)
        }
        if (bearish > maxBearish) {
            
            maxBearish=bearish;
            maxStart=trendStart;
            maxEnd=thisDate;
            
            
            
        } 
        
            yesterdaysPrice = daysPrice;
            
            
        }
        


        


        
        

        
        const finalTrendStart = new Date(maxStart).toLocaleDateString();
        //console.log("Max bear startti "+finalTrendStart);
        const finalTrendEnd = new Date(maxEnd).toLocaleDateString();
            //console.log("Max bear loppui: "+finalTrendEnd);

       
  
//console.log("Bearish: "+bearish);
//console.log("MaxBearish: "+maxBearish);


document.getElementById("tehtava1").innerHTML = "The longest bearish Bitcoin trend within a given date range was "+maxBearish+" days in a row. It happeneded between "+finalTrendStart+" and "+finalTrendEnd+". If my calculations are correct.";
//document.getElementById("tehtava1").innerHTML = "In bitcoin’s historical data from CoinGecko, the price decreased "+maxBearish+""; 
  });
  

  

  }

  function bitcoin2 (){
    let firstdate = Date.parse(document.getElementById("start2").value)/1000;
    let lastdate = (Date.parse(document.getElementById("end2").value)+86400000)/1000;
    let timeWindow = (lastdate - firstdate)/86400;
    let maxVolume = 0;
    let maxDate

    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${firstdate}}&to=${(lastdate+86400)}`)
      .then((response) => {
        //console.log(response.status);
      return response.json();
      })
      .then((data) => {

        const obj = data;
        //console.log(obj);
        //console.log(obj.total_volumes);

        for (let i=0; i<timeWindow; i++) {
            
            thisDate=firstdate*1000+(i*86400000);
            
            
            for(let i=0; i < obj.total_volumes.length; i++) {

                const found = obj.total_volumes[i].find(element => element > thisDate);
                //console.log("found: "+found);
                if (found != undefined) {
                    //console.log((obj.total_volumes[i])[1]);
                    if((obj.total_volumes[i])[1]>maxVolume) {
                        maxVolume=(obj.total_volumes[i])[1];
                        maxDate=thisDate;
                    //console.log("maxVolume: "+maxVolume)
                    
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
        const finalMaxDate = new Date(maxDate)
           //console.log("maksimivola: "+maxVolume)
           document.getElementById("tehtava2").innerHTML = "The highest trading volume in the chosen period was on "+(finalMaxDate).toLocaleDateString()+" when the trading volume was $"+maxVolume.toFixed(0)+"!"; 
        
    });
  }
  function bitcoin3() {
      
    let firstdate = Date.parse(document.getElementById("start3").value)/1000;
    let lastdate = (Date.parse(document.getElementById("end3").value)+86400000)/1000;
    let i=firstdate;
    let timeWindow = (lastdate - firstdate)/86400;
    console.log("timeWindow: "+ timeWindow);
    console.log("firsdate: "+firstdate);
    console.log("lastdate: "+lastdate);
    console.log("i: "+i);
      
          
          let yesterdaysPrice = 0;
          let lowestValue = 0;
          let highestValue= 0;
          //let bestBuy = 0;
          //let bestSell = 0;
          let daysPrice = 0;
          let compare = 0;
          let trendGain = 0;
          let maxTrendGain = 0;
          let trendEndDay = 0;
          let trendStartDay = 0;
          let maxTrendStartDay = 0;
          let maxTrendEndDay = 0;

          
          
          
      
      
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
      
      thisDate = 0;
      

      for (let i=0; i<timeWindow; i++) {
          
          thisDate=firstdate*1000+(i*86400000);
          const d = new Date(thisDate)
          console.log(d);
          //console.log("ThisDate: "+thisDate)
          
          for(let i=0; i < obj.prices.length; i++) {

          const found = obj.prices[i].find(element => element > thisDate);
          //console.log("found: "+found);
          if (found != undefined) {
              daysPrice=(obj.prices[i])[1];
              console.log("Daysprice: "+daysPrice)
              break;
          }
        }
          
          
      
      /* if (highestValue==0 && lowestValue==0){
          highestValue=daysPrice;
          lowestValue=daysPrice;
          bestBuy=thisDate;
          bestSell=thisDate;
          //console.log("alkuarvo price päivitetty"); 
      }else if (daysPrice > highestValue) {
           highestValue=daysPrice; 
           bestSell=thisDate;
           //console.log("highest price päivitetty"); 
           //console.log("highest price "+highestValue); 
       } else if (daysPrice < lowestValue) {
           lowestValue=daysPrice;
           bestBuy=thisDate;
           //console.log("lowest price päivitetty");
           //console.log("lowest price "+lowestValue);  
       }   */
       
       if (yesterdaysPrice>0) {
           console.log("aloitettu trendin jahti")

           compare = daysPrice-yesterdaysPrice;
           console.log("compare: "+compare);
           
           if (trendGain<=0){
               
               if(compare>0) {
                
               trendStartDay=(thisDate-86400000);
               maxTrendStartDay=trendStartDay;
               
               trendEndDay=thisDate;
               maxTrendEndDay=trendEndDay
               
               trendGain+=compare;
               maxTrendGain=trendGain;
               console.log("trend start: "+trendStartDay+" trend ens: "+trendEndDay+"trend Gain: "+trendGain)
               yesterdaysPrice = daysPrice;
               continue;
               } 
               }
            if(trendGain>0){
               if (compare>0 ) {
                   trendGain+=compare;
                   if(trendGain>maxTrendGain){
                       maxTrendGain=trendGain;
                       maxTrendEndDay=thisDate;
                       maxTrendStartDay=trendStartDay
                       console.log("maxTrend päivitetty: "+maxTrendGain)
                   } 
               } else if(compare<0){
                   trendGain+=compare;
                   if (trendGain<0) {
                       trendGain=0;
                       console.log("TrendGain nollaantui");
                   }
               }
           }
           console.log("trendGain: "+trendGain);
       
    }
    console.log(trendEndDay)
    
      
          yesterdaysPrice = daysPrice;
          
          
      }
      


      /* if(bestSell) {
          
      } else {

      } */

      
      
    const startTime = new Date(maxTrendStartDay).toLocaleDateString();
          //console.log(startTime);

    const endTime = new Date(maxTrendEndDay).toLocaleDateString();
          //console.log(endTime);

      
      //console.log("MaxTrendGain: "+maxTrendGain+" Trendi alkoi: "+startTime+" trendi loppui: "+endTime)
     

//console.log("Osta: "+lowestValue+" päivänä: "+bestBuy+" vs "+maxTrendStartDay);
//console.log("Myy: "+highestValue+" päivänä: "+bestSell+" vs "+maxTrendEndDay);


if (maxTrendGain == 0) {
    document.getElementById("tehtava3").innerHTML = "Price is only going down. No point travelling to that time period. You should try some other period.";
}else {
document.getElementById("tehtava3").innerHTML = "If you can travel back in time to this period of time, you should buy around "+startTime+" and sell around "+endTime+", because in mentioned timeperiod the worth of 1 Bitcoin rose about $"+maxTrendGain.toFixed(0)+".";
//document.getElementById("tehtava1").innerHTML = "In bitcoin’s historical data from CoinGecko, the price decreased "+maxBearish+""; 
}
});




}

