const APP_ID = "5c6d087ebee8601a3b2d43a1a795205e"
const apiUrl = `http://api.weatherstack.com/forecast?access_key=${APP_ID}&units=m`


const errorFillup = (data) => {
	
	classSelection = ".search-result"

	document.querySelector(`${classSelection}`).innerHTML = ""
	document.querySelector(`${classSelection}`).insertAdjacentHTML(
		"beforeend",
		`<div class="error-message">
			<div class="error-title">Error</div>
			<div class="error-message">${data.error.code} : ${data.error.type}</div>
		</div>`
	)

	classSelection = ".search-resultF"

	document.querySelector(`${classSelection}`).innerHTML = ""
	document.querySelector(`${classSelection}`).insertAdjacentHTML(
		"beforeend",
		`<div class="error-message">
			<div class="error-title">Error</div>
			<div class="error-message">${data.error.code} : ${data.error.type}</div>
		</div>`
	)
}


const fillup = (data) => {

	const classSelection = ".search-result"


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
						<div class="temp-curr">${data.current.temperature} °C</div>
						 <div class="temp-main-status">${data.current.weather_descriptions[0]} </div>
					</div>
				</div>
				<div class="temp-properties">
					<div class="temp max">
						<div class="title">Current Temp </div>
						<div class="content">${data.current.temperature} °C</div>
					</div>
					
					<div class="temp feels-like">
						<div class="title">Feels Like</div>
						<div class="content">${data.current.feelslike} °C</div>
					</div>
					<div class="temp pressure">
						<div class="title">pressure</div>
						<div class="content">${data.current.pressure} mbar</div>
					</div>
					<div class="temp humidity">
						<div class="title">Humidity</div>
						<div class="content">${data.current.humidity} %</div>
					</div>
					<div class="temp wind-speed">
						<div class="title">Wind Speed</div>
						<div class="content">${data.current.wind_speed} m/s</div>
					</div>
					<div class="temp wind-deg">
						<div class="title">Wind Direction</div>
						<div class="content">${data.current.wind_dir}</div>
					</div>
				</div>`
	)
}


const fillupF = (dataF) => {

	const classSelection = ".search-resultF"


	document.querySelector(`${classSelection}`).innerHTML = ""

	document.querySelector(`${classSelection}`).insertAdjacentHTML(
		"beforeend",
		`<div class="location-container">
			<div class="icon-wrapper">
						<i class="fas fa-thumbtack"></i>
					</div>
					<div class="location-details">
						<div class="location-name">${dataF.location.name}</div>
						<div class="location-coord">${dataF.location.lat}, ${dataF.location.lon}</div>
					</div>
				</div>
				For date :: ${Object.keys(dataF.forecast)[0]}
					<br>
				<div class="temp-container">
					
					<div class="temp-details">
						<div class="title">AvgTemp</div>
						<div class="temp-curr">${dataF.forecast[Object.keys(dataF.forecast)[0]].avgtemp} °C</div>
					</div>
				</div>
				<div class="temp-properties">
					<div class="temp max">
						<div class="title">Max Temp </div>
						<div class="content">${dataF.forecast[Object.keys(dataF.forecast)[0]].maxtemp} °C</div>
					</div>

					<div class="temp min">
						<div class="title">Min Temp </div>
						<div class="content">${dataF.forecast[Object.keys(dataF.forecast)[0]].mintemp} °C</div>
					</div>
					
					<div class="temp sunhour">
						<div class="title">Sun hours</div>
						<div class="content">${dataF.forecast[Object.keys(dataF.forecast)[0]].sunhour} hrs</div>
					</div>

					<div class="temp totalsnow">
						<div class="title">Visibility</div>
						<div class="content">${dataF.forecast[Object.keys(dataF.forecast)[0]].totalsnow} m</div>
					</div>

					<div class="temp uv index">
						<div class="title">UV index</div>
						<div class="content">${dataF.forecast[Object.keys(dataF.forecast)[0]].uv_index}</div>
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
			fillup(data)
		})
	document.querySelector(".inputLocation").focus()
}

const findWeatherbyCity = () => {
	const city = document.querySelector(".inputLocation").value;
	console.log(city)
	// api call to get the current forecast
	fetch(`${apiUrl}&query=${city}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data)
			console.log("Current -> ", data.current)
			console.log("Future -> ", data.forecast[Object.keys(data.forecast)[0]])
			
			if (data.success === false) {
				errorFillup(data)
				return
			}
			fillup(data)
			fillupF(data)
		})
	
	// api call to get the future forecast		
	document.querySelector(".inputLocation").value = ""
	document.querySelector(".inputLocation").focus()
}