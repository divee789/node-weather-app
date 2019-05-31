console.log("Client side javascript is loaded")


const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const error = document.querySelector("#message1")
const message = document.querySelector("#message2")

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const location = search.value
    fetch("http://localhost:3000/weather?search="+location).then((response)=>{
        response.json().then((data)=>{//What is the goddamn bloody GodForsaken error here?
            if(data.error){
                console.log(data.error)
               return error.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)
                error.textContent = data.location
                message.textContent = data.forecast
            }
        })
    })
 
})