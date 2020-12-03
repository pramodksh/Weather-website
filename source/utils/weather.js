const needle = require('needle');
// const { weatherAPIkey } = require('../../key');

const weatherFunction = (long, lat, callback) => {
    var key =  process.env.WeatherAPIkey || require('../../key').weatherAPIkey;
    const URL = 'api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=metric&appid='+ key +'&limit=1'
    needle.get(URL, (error, response, body) => {
        if (error) {
            callback(error,undefined);
        }
        else {
            callback(undefined,body.main.temp);
        }
    })

}
module.exports = weatherFunction;