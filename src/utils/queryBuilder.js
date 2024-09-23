const { Op } = require("sequelize")

const queryRegexList = (list) => {
    const entries = Object.entries(list)
    const filterEntries = entries.filter(query => query[1])
    let results = {}
    filterEntries.map(entriesQuery => {
        results[entriesQuery[0]] = {[Op.iLike]: `%${entriesQuery[1]}%`}
    })
    return results
}

const queryRegex = (query) => {
    if(query){
        const entries = Object.entries(query)[0]
        return {[entries[0]]: {[Op.iLike]: entries[1]}}
    }else{
        return null
    }
}

const queryNumber = (query) => {
    if(query){
        const entries = Object.entries(query)
        const filterIsNull = entries.filter(query => query[1]) 
        let results = {}
        
        filterIsNull.map(query => {
            if(query[1]){
                results[query[0]] = Number(query[1])
            }
        })

        return results
    }else{
        return null
    }
}

module.exports = {queryRegexList, queryRegex, queryNumber}