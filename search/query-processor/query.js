// require('../../index')
const {prepList}  = require('./preposition') 
const { JaroWinklerDistance } = require('../error-correction/jaro-winkler-distance')
const {Tag} = require('../../models/product/tag')


function punctuationMarkRemover(query){

    if(query.length)
        query = query.replace(/[^a-zA-Z0-9 ]+/g, '')//.replace('/ {2,}/',' ')
    
    return query.length? query : null
}

async function queryGenerator(query){ 
    var queryArray = null 
    if(query.length){
        query = punctuationMarkRemover(query)
        queryArray = query.trim().toLowerCase().split(/ /).filter(e=>{
            e = e.trim().toLowerCase()        
            return e.length>0 && !prepList.includes(e) 
        })
        console.log(queryArray)
    }
    return queryArray? queryArray : null
}

var query = " gamingDS !mous!E un@Der 100k fOR kids"

queryGenerator(query) 

module.exports = { queryGenerator }