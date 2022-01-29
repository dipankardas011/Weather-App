const APP_ID = "dd4bd7d05bc3698f8c78d7399617b172"
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${APP_ID}&units=metric`
const imgURL = "http://openweathermap.org/img/wn/"

const errorFillup = (data) => {
	
	classSelection = ".search-result"

	document.querySelector(`${classSelection}`).innerHTML = ""
	document.querySelector(`${classSelection}`).insertAdjacentHTML(
		"beforeend",
		`<div class="error-message">
			<div class="error-title">Error</div>
			<div class="error-message">${data.message}</div>
		</div>`
	)

	classSelection = ".search-resultF"

	document.querySelector(`${classSelection}`).innerHTML = ""
	document.querySelector(`${classSelection}`).insertAdjacentHTML(
		"beforeend",
		`<div class="error-message">
			<div class="error-title">Error</div>
			<div class="error-message">${data.message}</div>
		</div>`
	)
}

const fillup = (data) => {

	var classSelection = ".search-result"


	document.querySelector(`${classSelection}`).innerHTML = ""

	document.querySelector(`${classSelection}`).insertAdjacentHTML(
		"beforeend",
		`<div class="location-container">
					<div class="icon-wrapper">
						<i class="fas fa-thumbtack"></i>
					</div>
					<div class="location-details">
						<div class="location-name">${data.name}</div>
						<div class="location-coord">${data.coord.lat}, ${data.coord.lon}</div>
					</div>
				</div>
				<div class="temp-container">
					<div class="temp-logo">
						<img src="${imgURL}${data.weather[0].icon}@2x.png" />
					</div>
					<div class="temp-details">
						<div class="temp-curr">${data.main.temp}° C</div>
						<div class="temp-main-status">${data.weather[0].main} - ${data.weather[0].description} </div>
					</div>
				</div>
				<div class="temp-properties">
					<div class="temp max">
						<div class="title">Temp max</div>
						<div class="content">${data.main.temp_max}°C</div>
					</div>
					<div class="temp min">
						<div class="title">Temp min</div>
						<div class="content">${data.main.temp_min}°C</div>
					</div>
					<div class="temp feels-like">
						<div class="title">Feels Like</div>
						<div class="content">${data.main.feels_like}°C</div>
					</div>
					<div class="temp humidity">
						<div class="title">Humidity</div>
						<div class="content">${data.main.humidity}%</div>
					</div>
					<div class="temp wind-speed">
						<div class="title">Wind Speed</div>
						<div class="content">${data.wind.speed}m/s</div>
					</div>
					<div class="temp wind-deg">
						<div class="title">Wind Direction</div>
						<div class="content">${data.wind.deg}deg</div>
					</div>
				</div>`
	)
}

/**
 * forcast 
 * @param dataF 
 */
const fillupF = (data) => {

	const classSelection = ".search-resultF"


	document.querySelector(`${classSelection}`).innerHTML = ""

	document.querySelector(`${classSelection}`).insertAdjacentHTML(
		"beforeend",
		`<div class="location-container">
					<div class="icon-wrapper">
						<i class="fas fa-thumbtack"></i>
					</div>
					<div class="location-details">
						<div class="location-name">${data.name}</div>
						<div class="location-coord">${data.coord.lat}, ${data.coord.lon}</div>
					</div>
				</div>
				<div class="temp-container">
					<div class="temp-logo">
						<img src="${imgURL}${data.weather[0].icon}@2x.png" />
					</div>
					<div class="temp-details">
						<div class="temp-curr">${data.main.temp}° C</div>
						<div class="temp-main-status">${data.weather[0].main} - ${data.weather[0].description} </div>
					</div>
				</div>
				<div class="temp-properties">
					<div class="temp max">
						<div class="title">Temp max</div>
						<div class="content">${data.main.temp_max}°C</div>
					</div>
					<div class="temp min">
						<div class="title">Temp min</div>
						<div class="content">${data.main.temp_min}°C</div>
					</div>
					<div class="temp feels-like">
						<div class="title">Feels Like</div>
						<div class="content">${data.main.feels_like}°C</div>
					</div>
					<div class="temp humidity">
						<div class="title">Humidity</div>
						<div class="content">${data.main.humidity}%</div>
					</div>
					<div class="temp wind-speed">
						<div class="title">Wind Speed</div>
						<div class="content">${data.wind.speed}m/s</div>
					</div>
					<div class="temp wind-deg">
						<div class="title">Wind Direction</div>
						<div class="content">${data.wind.deg}deg</div>
					</div>
				</div>`
	)
}



const MapElement = (position) => {
	fetch(
		`${apiUrl}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data)
			if (data.cod !== 200) {
				return
			}
			fillup(data, 1)
		})
	document.querySelector(".input.location").focus()
}



const findWeatherbyCity = () => {
	const city = document.querySelector(".inputLocation").value;
	console.log(city)
	fetch(`${apiUrl}&q=${city}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data)
			if (data.cod !== 200) {
				errorFillup(data, 2)
				return
			}
			fillup(data)
			fillupF(data)
		})
	
	// api call to get the future forecast		
	document.querySelector(".inputLocation").value = ""
	document.querySelector(".inputLocation").focus()
}