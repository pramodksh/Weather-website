const needle = require('needle');

const weatherFunction = (long, lat, callback) => {
    const URL = 'api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=metric&appid=b013729da264a9f8bb365ba74e4f4c89&limit=1'
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