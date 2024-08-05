
const url = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
const apikey = "3265f9035977827aa13a0e631144de67";
const searchinput = document.querySelector("header input");
const searchbtn = document.querySelector("header img");
const favouritebtn = document.querySelector(".favourite");

let favoriteCities = [];

async function weather(city) {
    const response = await fetch(url + `&q=${city}` + `&appid=${apikey}`);
    let data = await response.json();
    console.log(data);

    document.querySelector(".main__celc").addEventListener("click", () => {
        document.querySelector(".main__temperature").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".min").innerHTML = Math.round(data.main.temp_min) + "°c";
        document.querySelector(".max").innerHTML = Math.round(data.main.temp_max) + "°c";
    });

    document.querySelector(".main__ferh").addEventListener("click", () => {
        document.querySelector(".main__temperature").innerHTML = Math.round((data.main.temp * 1.8) + 32) + "°F";
        document.querySelector(".min").innerHTML = Math.round((data.main.temp_min * 1.8) + 32) + "°F";
        document.querySelector(".max").innerHTML = Math.round((data.main.temp_max * 1.8) + 32) + "°F";
    });

    const img = data.weather[0].main;
    if (img == "Clouds") {
        document.querySelector(".main__temp img").src = "clouds.png";
    } else if (img == "Clear") {
        document.querySelector(".main__temp img").src = "clear.png";
    } else if (img == "Drizzle") {
        document.querySelector(".main__temp img").src = "drizzle.png";
    } else if (img == "Mist") {
        document.querySelector(".main__temp img").src = "mist.png";
    } else if (img == "Rain") {
        document.querySelector(".main__temp img").src = "rain.png";
    } else if (img == "Snow") {
        document.querySelector(".main__temp img").src = "snow.png";
    } else if (img == "Wind") {
        document.querySelector(".main__temp img").src = "wind.png";
    }
    document.querySelector(".main__city").innerHTML = data.name;
    document.querySelector(".main__temperature").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".min").innerHTML = Math.round(data.main.temp_min) + "°c";
    document.querySelector(".max").innerHTML = Math.round(data.main.temp_max) + "°c";
    document.querySelector(".humid").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
}

favouritebtn.addEventListener("click", () => {
    const city = document.querySelector(".main__city").innerHTML;
    const maintemp = document.querySelector(".main__temperature").innerHTML;

    const cityIndex = favoriteCities.indexOf(city);
    if (cityIndex !== -1) {
        favoriteCities.splice(cityIndex, 1);
        
        removeCard(city);
    } else {
        favoriteCities.push(city);
        
        createCard(city, maintemp);
    }
});

function createCard(city, maintemp) {
    const html = `
        <div class="section__card" data-city="${city}">
          <h1 class="section__city">${city}</h1>
          <h1 class="section__temp">${maintemp}</h1>
        </div>
    `;
    document.querySelector("section").innerHTML += html;
}

function removeCard(city) {
    const card = document.querySelector(`.section__card[data-city="${city}"]`);
   
        card.remove();
    
}

searchbtn.addEventListener("click", () => {
    weather(searchinput.value);
    searchinput.value = "";
});


document.querySelector(".header__fav").addEventListener("click", () => {
    const mainElement = document.querySelector("main");
    const sectionElement = document.querySelector("section");

    if (mainElement.style.display === "none") {
        mainElement.style.display = "flex"; // Show the main element
        sectionElement.style.display = "none"; // Hide the section element
    } else {
        mainElement.style.display = "none"; // Hide the main element
        sectionElement.style.display = "flex"; // Show the section element
    }
});
