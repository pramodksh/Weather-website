const needle = require('needle')

// if (process.env.GeoAPIkey == undefined) {
//     require('../../key').GeoAPIkey;
// }
// const { GeoAPIkey } = require('../../key');

const geoFunction = (address,callback)=>{
    var key = process.env.GeoAPIkey || require('../../key').GeoAPIkey;
    const geocodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token='+ key +'&limit=1'
    
    needle.get(geocodeURL,{ json:true },(error,response,body)=>{
        const jsonData = JSON.parse(body);
        const {features}= jsonData;
        const statusCode = response.statusCode;
        if(error){
            callback("Check the access token you used in the query", undefined);
        } else if (statusCode === 403){
            callback("There may be an issue with your account. Check your Account page for more details.",undefined);
        }else if(statusCode === 404){
            callback("Check the endpoint you used in the query.",undefined)
        } else if (statusCode === 401) {
            callback('Unable to find location. Try another search.',undefined);
        } else if (jsonData.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else{
            const long = features[0].center[0];
            const lat = features[0].center[1];
            const location = features[0].place_name;
            callback(undefined,{long,lat,location});
        }
    })
}
module.exports=geoFunction;