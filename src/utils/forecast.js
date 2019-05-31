
const request = require("request")

const forecast = (longitude,latitude,callback)=>{
    const url = "https://api.darksky.net/forecast/5f0932baf1863a72afccc7b26208485c/"+encodeURIComponent(longitude)+","+encodeURIComponent(latitude)+"?units=si"

request({
     url,
    json: true
}, (err, response) => {
    if (err) {
        callback("Unable to Connect to weather services",undefined)
    }
    else if(response.body.error){
       callback("unable to find location",undefined)
    } else {
        let temp = response.body.currently.temperature
        let pre = response.body.currently.precipProbability
        callback(undefined,response.body.daily.data[0].summary + " The temperature is " + temp + " degree, There is a " + pre + "% chance of rain today.And the pressure is "+ response.body.daily.data[0].pressure)
    }

})
}

module.exports=forecast