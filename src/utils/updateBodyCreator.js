module.exports = (list) => {
    const data = Object.entries(list)

    const removeNull = data.filter(item => item[1])
    const payload = Object.fromEntries(removeNull)
    
    return payload
}