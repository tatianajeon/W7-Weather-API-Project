// let weather = {
//     apikey: 'f1101d0fcac884b61b93d278869b946c',

//     getWeather: function(zip){
//         fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&units=imperial&appid=' + this.apikey)
//             .then((response) => response.json())
//             .then((data) => this.displayWeather(data));
//     },
    
//     displayWeather: function(data){
//         const { name } = data;
//         const { icon, description } = data.weather[0];
//         const { temp, humidity } = data.main;
//         document.querySelector('.cityName').innerText = name;
//         document.querySelector('.icon').src="http://openweathermap.org/img/wn/" + icon + "@2x.png";
//         document.querySelector('.temp').innerText = temp + '°F';
//         document.querySelector('.description').innerText = description;
//         document.querySelector('.humidity').innerText = 'Humidity | ' + humidity + '%';
//     },
      


//     getForecast: async function(zip){
//         await fetch('https://api.openweathermap.org/data/2.5/forecast?zip=' + zip + ',us&units=imperial&appid=' + this.apikey)
//         .then((response) => response.json())
//         .then((data) => { 
//             for(i = 8; i < (data.list.length/5); i += 8){
//                 document.getElementsByClassName("lowTemp" + (i).toString()).innerHTML = "Min: " + data.list[i].main.temp_min + '°F';
//             }
//             for(i = 0; i< data.list.length; i += 8){
//                 document.getElementsByClassName("highTemp" + (i).toString()).innerHTML = "Max: " + data.list[i].main.temp_max + '°F';
//             }
//             for(i = 0; i< data.list.length; i += 8){
//                 document.getElementsByClassName("icon" + (i).toString()).src="http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
//             }   
//             for(i = 0; i< data.list.length; i += 8){
//                 document.getElementsByClassName("humidity" + (i).toString()).innerHTML = "Humidity: " + data.list[i].main.humidity + "@2x.png";
//             }
//         }) 
//         .catch(error => alert("Something Went Wrong"))   
//     },

    
//     checkDay: function(day){
//         const d = new Date();
//         const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//         for(i = 0; i<5; i++){
//             document.getElementById(".day" + (i)).innerHTML = weekday[checkDay(i)];
//           }
//         if(day + d.getDay() > 6){
//             return day + d.getDay() - 7;
//         }
//         else{
//             return day + d.getDay();
//     }},

//     search: function () {
//         this.getWeather(document.querySelector(".search-bar").value);}
// };

// document.querySelector(".search button").addEventListener("click", function(){weather.search();
// });


// https://api.openweathermap.org/data/2.5/weather?zip=37207,us&units=imperial&appid=f1101d0fcac884b61b93d278869b946c
// https://api.openweathermap.org/data/2.5/forecast?zip=37207,us&units=imperial&appid=f1101d0fcac884b61b93d278869b946c





let weather;


const apikey = 'f1101d0fcac884b61b93d278869b946c';

const getData = async (zip) => {
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${apikey}`)
    const data = await result.json()
    return data
}

let displayWeather = async (data) => {
    const { name } = await data;
    const { icon } = await data.weather[0];
    const { description } = await data.weather[0];
    const { temp } = await data.main;
    const { temp_min } = await data.main;
    const { temp_max } = await data.main;
    const { humidity } = await data.main;
    document.querySelector('.cityName').innerText = name;
    document.querySelector('.icon').src="http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector('.temp').innerText = temp + '°F';
    document.querySelector('.highTemp').innerText = temp_max + '°F';
    document.querySelector('.lowTemp').innerText = temp_min + '°F';
    document.querySelector('.description').innerText = description;
    document.querySelector('.humidity').innerText = 'Humidity | ' + humidity + '%';
}
      

const getForecast = async (zip) => {
    const result = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&units=imperial&appid=${apikey}`)
    const forecastData = await result.json()
    return forecastData
}

let fiveDays = async (forecastData) => { 
    let data = await forecastData
    let weatherList = await data.list
    return weatherList
    
} 

let getFive = async (weatherList) => {
    let data = await weatherList
    let lstLength = Number(data)
    for(i = 8; i < lstLength; i += 8){
        document.getElementsByClassName("lowTemp" + (i).toString()).innerHTML = "Min: " + data[i].main.temp_min + '°F';
        document.getElementsByClassName("highTemp" + (i).toString()).innerHTML = "Max: " + data[i].main.temp_max + '°F';
        document.getElementsByClassName("icon" + (i).toString()).src="http://openweathermap.org/img/wn/" + data[i].weather[0].icon + "@2x.png";
        document.getElementsByClassName("humidity" + (i).toString()).innerHTML = "Humidity: " + data[i].main.humidity + "@2x.png";
    }
}

    
let checkDay = async (day) => {
        const d = new Date();
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        for(i = 0; i<5; i++){
            document.getElementByClassName("day" + (i)).innerHTML = weekday[checkDay(i)];
          }
        if(day + d.getDay() > 6){
            return day + d.getDay() - 7;
        }
        else{
            return day + d.getDay();
}}


let search = async () => {
    let weatherData = await (getData(document.querySelector(".search-bar").value));
    displayWeather(weatherData)
    getFive(weatherData)
}

