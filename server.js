const express = require("express")

const cors = require("cors")

const axios = require("axios")

require("dotenv").config()

const app = express()

app.use(cors())

const PORT = process.env.PORT || 8092

app.get("/",(request,response) => {
    response.status(200).json("ok am here")})


app.get("/photos", async (request, response) => {
    const API = `https://api.unsplash.com/search/photos/?client_id=${process.env.ACCESS_KEY}&query=${request.query.subject}`
    const res = await axios.get(API)

    const photos = res.data.results.map((photo)=> {
        return{
            id:photo.id,
            img_url: photo.urls.regular,
            original: photo.links.self,
            photographer: photo.user.name
        }
    })
    response.status(200).json(photos)
})

app.listen(PORT,()=> {
    console.log(`listening to port ${PORT}`)
})

