const calculo = (cant) => {
  //  console.log("El msg",msge);
    let ranArr = {}
    for(let i=0; i<=cant; i++) {
     let num = Math.round(Math.random()*1000) ;
     if (ranArr[num]) 
            {
               let text = JSON.stringify(ranArr, function (key, value) {
                    if (key == num) {
                      return value=value+1;
                    } else {
                      return value;
                    }
                  });    
                  ranArr = JSON.parse(text)
            }
     else ranArr[num] = 1
      
    }  
    //console.log(ranArr);
    //ranArr.stringify = JSON.stringify(ranArr)
    return ranArr
}

process.on('message', cant => {
    let lista = calculo(cant)
    //console.log("En random.js",lista);
    process.send(lista)
})


