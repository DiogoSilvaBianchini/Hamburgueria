const checkCep = require("./checkCep")
const axios = require("axios")


const getCorde = async(cep) => {
    const { logradouro, localidade, estado } = await checkCep(cep)
    const request = await axios(`https://api.mapbox.com/search/geocode/v6/forward?q=${logradouro},${localidade}-${estado}&country=BR&access_token=${process.env.MAP_BOX_SCRET_KEY}`)
    const response = request.data
    return {longitude, latitude} = response.features[0].properties.coordinates
}


const shippingPrice = async (cep) => {
    try {
        const {longitude, latitude} = await getCorde(cep)
        const request = await axios(`https://api.mapbox.com/directions/v5/mapbox/driving/-47.440185%2C-23.506525%3B${longitude}%2C${latitude}?alternatives=true&geometries=geojson&language=pt&overview=full&steps=true&access_token=${process.env.MAP_BOX_SCRET_KEY}`) 
        const response = await request.data
        const {distance, duration} = response.routes[0]

        const shippingPrice = ((distance / 1000) * process.env.SHIPPING_COST_PER_KM).toFixed(2)

        return {distance: (distance / 1000).toFixed(2), duration: (duration / 60).toFixed(2), shippingPrice} 
    } catch (error) {
        throw new Error(error.message)   
    }
}

module.exports = shippingPrice