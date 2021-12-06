# roopenkryptot

Author: Samuli Tyyskä



This website project is part of a job application. The assaignment was as follows:

Scrooge McDuck is once again requesting consultation from fellow ducks at Vincit.
This time Scrooge has his eyes on cryptocurrency — bitcoin to be exact — and he needs a tool to
analyze its market value for a given date range.
Your mission, should you choose to accept it, is to create an application that meets Scrooge’s needs.
You are free to use any technology of your choosing. The resulting application can be for example a web
page, an API backend, a mobile application, or anything else you deem suitable.
Application
Scrooge wants to use the application to get the following information for different date ranges he is
analyzing:
Additional information:

● Both start and end dates should be included in a date range.

● A day’s price means the price at 00:00 UTC time (use price data from as close to midnight as
possible as the day’s price, if you don’t have a datapoint from exactly midnight).

● Allow the user of your application to pass the start and end dates of the date range in some way,
e.g. via input fields in a UI or as parameters to an API.

A. How many days is the longest bearish (downward) trend within a given date range?
● Definition of a downward trend shall be: “Price of day N is lower than price of day N-1”

● Expected output: The maximum amount of days bitcoin’s price was decreasing in a row.

Example: In bitcoin’s historical data from CoinGecko, the price decreased 2 days in a row for the
inputs from 2020-01-19 and to 2020-01-21, and the price decreased for 8 days in a row for the
inputs from 2020-03-01 and to 2021-08-01.

B. Which date within a given date range had the highest trading volume?
● Expected output: The date with the highest trading volume and the volume on that day in
euros.

C. Scrooge has access to Gyro Gearloose’s newest invention, a time machine. Scrooge
wants to use the time machine to profit from bitcoin. The application should be able to tell
for a given date range, the best day for buying bitcoin, and the best day for selling the
bought bitcoin to maximize profits. If the price only decreases in the date range, your
output should indicate that one should not buy (nor sell) bitcoin on any of the days. You
don't have to consider any side effects of time travel or how Scrooge's massive purchases
would affect the price history.
● Expected output: A pair of days: The day to buy and the day to sell. In the case when one
should neither buy nor sell, return an indicative output of your choice.


