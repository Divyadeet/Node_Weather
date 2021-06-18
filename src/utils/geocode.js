const request = require('postman-request');

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            longitude: 0,
            latitude: 0,
            location:''
        }
        const urlMap = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGl2eWFkZWV0IiwiYSI6ImNrcG91d2VjZTBwYTgzMXA0OWJyczg0anAifQ.ox52hxvl-QLxV1yYLCWXGA`;

        //request({url: urlMap, json:true},(error, response) => {
        request({url: urlMap, json:true},(error, {body}) => { 
                if(error){
                callback('Unable to reach weather ', undefined);
            }else if(body.features.length === 0){
                callback('Unable to find location. Try another search.. ', undefined);
            }
            else{
                data.longitude = body.features[0].center[0];
                data.latitude = body.features[0].center[1];
                data.location = body.features[0].place_name;
                callback(undefined, data);
            }
        })
    }, 2000);
}

module.exports = geocode;
