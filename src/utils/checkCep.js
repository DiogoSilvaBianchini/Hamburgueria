const checkCep = async (cep) => {
    try {
        
        const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const response = await request.json()
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = checkCep