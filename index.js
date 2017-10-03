var fs=require('fs');  

function getDafaultVallue(formatter) {
  let result = undefined
  if (formatter === 'string') {
    result = ''
  } else if (formatter === 'number') {
    result = 0
  } else if (formatter === 'array') {
    result = []
  } else if (formatter === 'object') {
    result = {}
  }
  return result
}

let result = []
let count
fs.readFile('config.json',function(err,data){  
    if(err)  
        throw err;    
    var config=JSON.parse(data)
    const content = config.content
    count = config.count
    const keys = Object.keys(content)
    const values = Object.values(content)
    
    for (var i=0; i<count; i++) {
      const obj = {}
      keys.map((key, index) => {
        obj[key] = getDafaultVallue(values[index])
      })

      const stringJson = JSON.stringify(obj)
      const format = stringJson.split(',').map((item, index) => {
        let n = '\n' + item
        return n
      })
      result.push(format)
      if (result.length === count) {
        result = '[' + result + ']'
        fs.writeFile('result.js',result,function(err){  
            if(err) throw err;  
            console.log('write JSON');  
        })  
      }      
    }

})




