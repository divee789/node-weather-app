const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const request = require("request")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")




app.set("view engine","hbs")

const publicPath = path.join(__dirname,"../public"),
     partialsPath = path.join(__dirname,"../views/partials")

hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))


app.get("/",(req,res)=>{
  res.render("index",{
    title:"weather App",
    name:"Alpha Web"
  })
})
app.get("/weather",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a location"
        })
    }
    geocode(req.query.search,(err,{latitude,longitude,location})=>{
        if(err){
            return console.log(err)
        } else{
       console.log("data")
        forecast(latitude,longitude,(err,foreCastdata)=>{
            if(err){
             return console.log(err)
            }
            res.send({
                title:"weather App",
                location:location,
                forecast:foreCastdata,
                name:"Divine Olokor"
            })
          
        })
       
    }
    })
  
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"Weather App",
        name:"Divine Olokor"
    })
})
app.get("/product",(req,res)=>{
    if(!req.query.search){
      return  res.send({
            error:"Pease input a search term"
        })
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})
app.get("/about/*",(req,res)=>{
    res.redirect("/about")
})
app.get("*",(req,res)=>{
    res.send("Error!!!!404")
})
app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})