# RxF1
Simple implementation of the following, without breaking it into components. It should be broken up for a real application as there's too much going on in the App Component, which also means it's hard to write good tests for it, but I've included a couple simple ones. The calls to the API server are broken out into a service, with simple tests for the good case. Testing for errors coming back from the server should ultimately be included, as well as handling other mangled json responses.

----


# RxF1 <img width="180" style="vertical-align:middle" src="https://uploads-ssl.webflow.com/62865614b39c464b76d339aa/62914f32232ba15d25772f9d_HeroDevs_RGB-_02-p-500.png">
[Original Document](https://gist.github.com/Villanuevand/54e67c30260e7424d6b3264cf6dfb058)


We need to create a simple app with information about Formula 1 Championship since 2018 to 2022. The information about it will be provided by
[Formula One API  by Ergast](http://ergast.com/mrd). 

You'll be a able to find a good explanation about [how the Ergast F1 API works here](https://documenter.getpostman.com/view/11586746/SztEa7bL#intro)

## Goal
Our goal with RXF1 is try to measure how well do you understands and applies the concepts of reactively thinking using Angular. 
If this term is new for you, please check this video: [Designing Reactive Angular Components (RxJS) |Deborah Kurata ](https://www.youtube.com/watch?v=CZYAph73mnI)

## Features to deliver
- List of Drivers per season.
- List of Races per season with final results.
- Qualifying Results per race in every single season.
- Driver Standings after a race.
- **BONUS**:
  - How many cars "Finished".
  - How many cars had an "Accident".
  - How many cars finished +1 Lap.

_All information shown should be since season 2018 to season 2022._

## Ground Rules
- We love css but this time is not required.
- Use a personal repo in [Github.com](https://github.com/), [GitLab.com](https://gitlab.com/) or [Stackblitz.com](https://stackblitz.com/) to share the code with us.
- Use pagination by default with results 10 items per page.
- Add number to items to show in pagination:
  - 10
  - 15
  - 25
- Tests? We definitely want to see couple of tests.   
- Any question? feel free to send a email to `andres@herodevs.com`
