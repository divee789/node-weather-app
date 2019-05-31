const request = require("request")
//=============
//Geocoding request
//========= 


const geocode = (address,callback)=>{
    const url2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZG9uYWxwaGEiLCJhIjoiY2p3N3FyNmF4MDdmMTRhcXJhamtkcWpnMiJ9.JS_3i1ni-vz6hvMmHD14YQ&limit=1"

    request({
        url: url2,
        json: true
    }, (err, {body}) => {//NB: {body} was used in place of response.body
        if(err){
            console.log(err)
        } else if(body.error){
            console.log(body.error)
        } else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode