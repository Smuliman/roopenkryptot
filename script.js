//Function for button in machine 1:
function bitcoin1() {
    // Parsing date from input form YYYY-MM-DD in to TIMESTAMP
    let firstdate = Date.parse(document.getElementById("start").value) / 1000;
    let lastdate = (Date.parse(document.getElementById("end").value) + 86400000) / 1000;
    // count to quantity of days in the selected time window to be used later

    let timeWindow = (lastdate - firstdate) / 86400;

    // variables are introduced. These will be exploited to keep up with the trends and saving data of the longest bearish trend
    let yesterdaysPrice = 0;
    let bearish = 0;
    let trendStart = 0;
    let daysPrice = 0;
    let maxBearish = 0;
    let maxStart = 0;


    // Fetch data from the goingekko API in the given time period
    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${firstdate}}&to=${(lastdate + 3600)}`)
        .then((response) => {
            //console.log(response.status);

            return response.json();
        })
        .then((data) => {
            //save data in the form of object
            const obj = data;
            //console.log(obj.prices);
            //console.log("Prices listan pituus: "+obj.prices.length);


            //variable thisDate for the loop
            thisDate = 0;

            //Loop to which goes around as many times as there are days in the time period. 
            //The loop finds the earliest TIMESTAMP of every day in the time period and the compares it to yesterdays value
            //if yesterdaysPrice is bigger than daysPrice, it means bearish trend. If not some other things happen:)
            for (let i = 0; i < timeWindow; i++) {
                //thisDate is calculated by multipling firstdate TIMESTAMP with 1000(to mseconds) and adding 86400000(one day) for every loop round.
                thisDate = firstdate * 1000 + (i * 86400000);

                //other loop inside loop: this loop finds the first datapoint of the day and saves that datapoints Bitcoin value to variable daysPrice
                for (let i = 0; i < obj.prices.length; i++) {

                    const found = obj.prices[i].find(element => element > thisDate);
                    //console.log("found: "+found);
                    // as long as the value of found is undefined, we want to continue the loop. But when a value is returned in found, it will be
                    //the first one of the wanted day so we use it and break the loop.
                    if (found != undefined) {
                        daysPrice = (obj.prices[i])[1];
                        //console.log("Daysprice: "+daysPrice)
                        break;
                    }
                }
                //now we have found the days closest value to 00:00 and we want to do couple of checks on that value:
                //first if the value is smaller than yesterdays value AND value of variable bearish is 0 it is a sign of the new bearish trend
                //so we add 1 to bearish (amount of bearish days in a row) and save this date as a starting day of the trend.
                if (daysPrice < yesterdaysPrice && bearish == 0) {
                    bearish++;
                    //console.log("Bear: "+bearish)
                    trendStart = thisDate;
                    // other option is that daysPrice is smaller than yesterdays but bearish value is more than 0. In that case we just add 1 to bearish
                    //as this is not the start of the trend
                } else if (daysPrice < yesterdaysPrice && bearish > 0) {
                    bearish++
                    //console.log("Bear: "+bearish)
                    // in other cases the daysPrice is more than yesterdays which means end of the bear trend->we set bearish to 0    
                } else {
                    bearish = 0;
                    //console.log("Bear: "+bearish)
                }
                //if the bearish has reached a new record in the time period, we want to save these figures in these variables
                if (bearish > maxBearish) {
                    maxBearish = bearish;
                    maxStart = trendStart;
                    maxEnd = thisDate;
                }
                // after we are ready with todays numbers we save daysPrice to yesterdaysPrice for the next rounf of the loop
                yesterdaysPrice = daysPrice;
            }
            //end of looping

            //formatting TIMESTAMP to more UI friendly format
            const finalTrendStart = new Date(maxStart).toLocaleDateString();
            //console.log("Max bear startti "+finalTrendStart);
            const finalTrendEnd = new Date(maxEnd).toLocaleDateString();
            //console.log("Max bear loppui: "+finalTrendEnd);
            //console.log("Bearish: "+bearish);
            //console.log("MaxBearish: "+maxBearish);

            //finally we add our findings to html
            document.getElementById("tehtava1").innerHTML = "The longest bearish Bitcoin trend within a given date range was " + maxBearish + " days in a row. It happeneded between " + finalTrendStart + " and " + finalTrendEnd + ". If my calculations are correct.";
            //document.getElementById("tehtava1").innerHTML = "In bitcoin’s historical data from CoinGecko, the price decreased "+maxBearish+""; 
        });
}

// Next is function fot the second machine
function bitcoin2() {
    // Format date inputs, count how many days and introduce 2 variables
    let firstdate = Date.parse(document.getElementById("start2").value) / 1000;
    let lastdate = (Date.parse(document.getElementById("end2").value) + 86400000) / 1000;
    let timeWindow = (lastdate - firstdate) / 86400;
    let maxVolume = 0;
    let maxDate = 0;

    //Fetch data from API
    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${firstdate}}&to=${(lastdate + 3600)}`)
        .then((response) => {
            //console.log(response.status);
            return response.json();
        })
        .then((data) => {
            //form object of json data
            const obj = data;
            //console.log(obj);
            //console.log(obj.total_volumes);

            //loop to go through imputted time period 
            for (let i = 0; i < timeWindow; i++) {

                thisDate = firstdate * 1000 + (i * 86400000);

                //another loop to find datapoints closest to 00:00
                for (let i = 0; i < obj.total_volumes.length; i++) {

                    const found = obj.total_volumes[i].find(element => element > thisDate);
                    //console.log("found: "+found);

                    if (found != undefined) {
                        //console.log((obj.total_volumes[i])[1]);

                        //If the found quantity of volume is bigger than existing macXolume, update todays volume as a new maxVolume and thisDate to maxDate
                        if ((obj.total_volumes[i])[1] > maxVolume) {
                            maxVolume = (obj.total_volumes[i])[1];
                            maxDate = thisDate;
                            //console.log("maxVolume: "+maxVolume)
                        }
                        // we want only the volume from the datapoint closest to 00:00 so we break the loop after non-undefined is found
                        break;
                    }
                }
            }
            //formatting date from TIMESTAMP to Date
            const finalMaxDate = new Date(maxDate)
            //console.log("maksimivola: "+maxVolume)

            //update html with the result
            document.getElementById("tehtava2").innerHTML = "The highest trading volume in the chosen period was on " + (finalMaxDate).toLocaleDateString() + " when the trading volume was " + maxVolume.toFixed(0) + " €.";

        });
}

//Then the last machine, this was a puzzle
function bitcoin3() {
    //First formatting TIMESTAMPs to Dates and a lot of variables that were needed for comparing and saving info from trends
    let firstdate = Date.parse(document.getElementById("start3").value) / 1000;
    let lastdate = (Date.parse(document.getElementById("end3").value) + 86400000) / 1000;
    let i = firstdate;
    let timeWindow = (lastdate - firstdate) / 86400;

    let yesterdaysPrice = 0;
    let daysPrice = 0;
    let compare = 0;
    let trendGain = 0;
    let maxTrendGain = 0;
    let trendEndDay = 0;
    let trendStartDay = 0;
    let maxTrendStartDay = 0;
    let maxTrendEndDay = 0;

    //Fetch data from API
    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${firstdate}}&to=${(lastdate + 3600)}`)
        .then((response) => {
            //console.log(response.status);
            return response.json();
        })
        .then((data) => {
            //putting data in to object
            const obj = data;
            //console.log(obj.prices);
            //console.log("Prices listan pituus: " + obj.prices.length);

            // variable to loop
            thisDate = 0;

            //loop to go through amount of days based on inputs
            for (let i = 0; i < timeWindow; i++) {
                //this counts the TIMESTAMP in ms for wanted day
                thisDate = firstdate * 1000 + (i * 86400000);
                const d = new Date(thisDate)
                console.log(d);
                //console.log("ThisDate: "+thisDate)

                //loop to find datapoint closest to 00:00
                for (let i = 0; i < obj.prices.length; i++) {

                    const found = obj.prices[i].find(element => element > thisDate);
                    //console.log("found: "+found);
                    if (found != undefined) {
                        //wanted datapoint found: lets save its price to daysPrice and break the loop
                        daysPrice = (obj.prices[i])[1];
                        console.log("Daysprice: " + daysPrice)
                        break;
                    }
                }
                //then continue inside the second loop with if comparing
                //if yesterdays price is 0 it must be the first day and in the first day we cant compare anything so we just copy this days value to yesterdaysValue variable in the end of loop
                // If yesterdaysPrice is more than 0(there is something to compare) we start comparing
                if (yesterdaysPrice > 0) {
                    //console.log("aloitettu trendin jahti")
                    // we save the difference of daysPrice and yesterdaysPrice in variable compare
                    compare = daysPrice - yesterdaysPrice;
                    console.log("compare: " + compare);
                    //trendGain is variable which keeps track on gains inside a bull (bull: price goes up) trend. 
                    if (trendGain <= 0) {
                        //TrendGain is in minus so it means we are not yet inside bull trend as we dont have any gains
                        if (compare > 0) {
                            // compare is positive so price has gone up comparing to yesterday, so we save yesterday day as a Trend start day
                            trendStartDay = (thisDate - 86400000);

                            //when trandGain is updated, also trendEndDay will be updated
                            trendEndDay = thisDate;
                            trendGain += compare;
                            //console.log("trend start: " + trendStartDay + " trend ens: " + trendEndDay + "trend Gain: " + trendGain)

                            // if trendGain is bigger than maxTrendGain, max variables must be updated
                            if (trendGain > maxTrendGain) {
                                maxTrendGain = trendGain;
                                maxTrendEndDay = thisDate;
                                maxTrendStartDay = trendStartDay
                                //console.log("maxTrend päivitetty: " + maxTrendGain)
                                //console.log("maxTrendEndDay päivitetty: " + maxTrendEndDay)
                            }
                            //continue statement is coming as we dont want to proceed anymore inside this round of the loop, so daysPrice must be updated to yesterdaysPrice
                            yesterdaysPrice = daysPrice;
                            console.log("trendGain: " + trendGain);
                            continue;
                        }
                    }
                    //next up is those cases when already trendGain is positive
                    if (trendGain > 0) {
                        //console.log("tämä valittu");

                        //if also compare is positive we just add compare value to trenGain
                        if (compare > 0) {
                            trendGain += compare;
                        }
                    }
                    //if compare is negative we also "add" it to trendGain value but negative value naturally decreases trendGain
                    if (compare < 0) {
                        //console.log("sekä tämä");
                        trendGain += compare;
                        //if trendGain goes to zero or to negative value, trendGain needs to be set to 0
                        if (trendGain < 0) {
                            trendGain = 0;
                            //console.log("TrendGain nollaantui");
                        }
                    }
                    //Check if trendGain breaks record and max values need to be updated
                    if (trendGain > maxTrendGain) {
                        maxTrendGain = trendGain;
                        maxTrendEndDay = thisDate;
                        maxTrendStartDay = trendStartDay
                        //console.log("maxTrend päivitetty: " + maxTrendGain)
                        //console.log("maxTrendEndDay päivitetty: " + maxTrendEndDay)
                    }
                    

                }
                //console.log(trendEndDay)

                //update daysPrice to yesterdaysPrice for the next round in the loop
                yesterdaysPrice = daysPrice;
                console.log("trendGain: " + trendGain);


            }
            //Formatting TIMESTAMP in to more UI friendly format
            const startTime = new Date(maxTrendStartDay).toLocaleDateString();
            //console.log(startTime);

            const endTime = new Date(maxTrendEndDay).toLocaleDateString();
            //console.log(endTime);


            //console.log("MaxTrendGain: "+maxTrendGain+" Trendi alkoi: "+startTime+" trendi loppui: "+endTime)


            //console.log("Osta: "+lowestValue+" päivänä: "+bestBuy+" vs "+maxTrendStartDay);
            //console.log("Myy: "+highestValue+" päivänä: "+bestSell+" vs "+maxTrendEndDay);

            //Add info to html, if the price only goes down, message is shown. Otherwise user will be notified when to buy and sell bitcoin in the past
            if (maxTrendGain == 0) {
                document.getElementById("tehtava3").innerHTML = "Price is only going down. No point travelling to that time period. You should try some other period.";
            } else {
                document.getElementById("tehtava3").innerHTML = "If you can travel back in time to this period of time, you should buy around " + startTime + " and sell around " + endTime + ", because in mentioned timeperiod the worth of 1 Bitcoin rose about " + maxTrendGain.toFixed(0) + " €.";
            }
        });
}

