const request = require('postman-request');

//const getWeather = (data, callback) => {
const getWeather = ({longitude, latitude, location}, callback) => {
    const weather_details = {
        temperature: 0,
        description: '',
        feelsLike: 0,
        location: ''
    }
    setTimeout(() => {
        const urlWeather = `http://api.weatherstack.com/current?access_key=a81462d53ea76aad61aa92e62d8c5ba1&query=${latitude},${longitude}&units=m`;
        //const urlWeather = `http://api.weatherstack.com/current?access_key=a81462d53ea76aad61aa92e62d8c5ba1&query=${data.latitude},${data.longitude}&units=m`;
        //request({url: urlWeather}, (error, response) => {
        request({url: urlWeather}, (error, {body}) => {
            if(error){
                callback('Oops... Unable to check weather' + error, undefined);
            }else if(body.error){
                callback('Unable to find weather.. Try again..' + error, undefined);
            }else{
                weather_details.description = JSON.parse(body).current.weather_descriptions[0];
                weather_details.temperature = JSON.parse(body).current.temperature;
                weather_details.feelsLike = JSON.parse(body).current.feelslike;
                weather_details.location = location
                callback(undefined, weather_details);
            }
        })
    }, 2000);
}

module.exports = getWeather;