const API_KEY = '65c968008bb1991ebf8f7a18c6b01dbc';

const fetchData = position => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
     .then(response => response.json())
     .then(data => setWeatherData(data))
}

const setWeatherData = (data) =>{
    const weatherData = {
        icon: `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`,
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp +`°`,
        date: getDate(),
    }

    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).innerHTML = weatherData[key];
    });

    

    cleanUp();
}

const getDate = () =>{
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`
}

const onLoad = () =>{
    navigator.geolocation.getCurrentPosition(fetchData);
}

const cleanUp = () =>{
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display= 'none';
    container.style.display='flex'
}