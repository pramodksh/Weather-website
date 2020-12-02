const needle = require('needle')

const geoFunction = (address,callback)=>{
    
    const geocodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJhbW9ka3VtYXJzaCIsImEiOiJja2d0cnp4aTIwNmpjMnNxbGZ0dXhvODE0In0.PbswEBMK6PJJWWMFgUs3Gw&limit=1'
    
    needle.get(geocodeURL,{ json:true },(error,response,body)=>{
        const jsonData = JSON.parse(body);
        const {features}= jsonData;
        if(error){
            callback('Unable to find location. Try another search.',undefined);
        }
        else if (jsonData.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else{
            const long = features[0].center[0];
            const lat = features[0].center[1];
            const location = features[0].place_name;
            callback(undefined,{long,lat,location});
        }
    })
}
module.exports=geoFunction;