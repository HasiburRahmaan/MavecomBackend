
var distanceBetweenWords = (keyword, tag)=>{
    var distanceValue = null 

    if( (tag!= null && tag!= undefined) && (keyword!=null && keyword != undefined) ){
        var matchedWord = tag.trim()
        var word = keyword.trim() 

        var m = (word.length+1)
        var n = matchedWord.length+1
        const distanceMatrix = Array(m).fill(null).map(() => Array(n).fill(null)); 

        for(var i = 0; i<m; i++){
            distanceMatrix[i][0] = i 
        }
        for(var i = 0; i<n; i++){
            distanceMatrix[0][i] = i  
        }

        for( var i = 1; i<m; i++){
            for( var j = 1; j<n; j++){
                var value = word[i-1] == matchedWord[j-1] ? 0 : 1
                distanceMatrix[i][j] = Math.min(
                    distanceMatrix[i-1][j]+1,
                    distanceMatrix[i][j-1]+1,
                    distanceMatrix[i-1][j-1]+value
                )
            }
        }
        distanceValue = distanceMatrix[m-1][n-1]
    }

    return distanceValue
} 



module.exports = {distanceBetweenWords}

