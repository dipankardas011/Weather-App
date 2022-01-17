//const APP_ID = "__ENTER_YOUR_KEY_HERE__"
const APP_ID = "5c6d087ebee8601a3b2d43a1a795205e"
const apiUrl = `http://api.weatherstack.com/current?access_key=${APP_ID}&units=m`

const errorFillup = (data, side) => {
	if (side == 2) {
		var classSelection = ".search-result"
	}

	document.querySelector(`${classSelection}`).innerHTML = ""
	document.querySelector(`${classSelection}`).insertAdjacentHTML(
		"beforeend",
		`<div class="error-message">
			<div class="error-title">Error</div>
			<div class="error-message">${data.error.code} : ${data.error.type}</div>
		</div>`
	)
}


const fillup = (data, side) => {
	if (side == 2) {
		var classSelection = ".search-result"
	}


	document.querySelector(`${classSelection}`).innerHTML = ""

	document.querySelector(`${classSelection}`).insertAdjacentHTML(
		"beforeend",
		`<div class="location-container">
			<div class="icon-wrapper">
						<i class="fas fa-thumbtack"></i>
					</div>
					<div class="location-details">
						<div class="location-name">${data.location.name}</div>
						<div class="location-coord">${data.location.lat}, ${data.location.lon}</div>
					</div>
				</div>
				<div class="temp-container">
					<div class="temp-logo">
						<img src="${data.current.weather_icons[0]}" />
					</div>
					<div class="temp-details">
						<div class="temp-curr">${data.current.temperature}° C</div>
						 <div class="temp-main-status">${data.current.weather_descriptions[0]} </div>
					</div>
				</div>
				<div class="temp-properties">
					<div class="temp max">
						<div class="title">Current Temp </div>
						<div class="content">${data.current.temperature}°C</div>
					</div>
					
					<div class="temp feels-like">
						<div class="title">Feels Like</div>
						<div class="content">${data.current.feelslike}°C</div>
					</div>
					<div class="pressure">
						<div class="title">pressure</div>
						<div class="content">${data.current.pressure}mbar</div>
					</div>
					<div class="temp humidity">
						<div class="title">Humidity</div>
						<div class="content">${data.current.humidity}%</div>
					</div>
					<div class="temp wind-speed">
						<div class="title">Wind Speed</div>
						<div class="content">${data.current.wind_speed}m/s</div>
					</div>
					<div class="temp wind-deg">
						<div class="title">Wind Direction</div>
						<div class="content">${data.current.wind_dir}deg</div>
					</div>
				</div>`
	)
}


const showPosition = (position) => {
	fetch(
			`${apiUrl}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
		)
		.then((res) => res.json())
		.then((data) => {
			console.log(data)
			if (data.success === false) {
				return
			}
			fillup(data, 1)
		})
	document.querySelector(".input.location").focus()
}

const findWeatherbyCity = () => {
	const city = document.querySelector(".inputLocation").value;
	console.log(city)
	fetch(`${apiUrl}&query=${city}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data)
			if (data.success === false) {
				errorFillup(data, 2)
				return
			}
			console.log(data.current);
			console.log(data.location);
			fillup(data, 2)
		})
	document.querySelector(".input.location").value = ""
	document.querySelector(".input.location").focus()
}