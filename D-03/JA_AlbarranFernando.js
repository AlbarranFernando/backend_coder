const lectura = (texto1, intervalo, callback) => {
    var i =0
    const ArrW = texto1.split(' ');

    const TempInt = setInterval((pal)=>{
    
        if (i < pal.length){
        console.log(pal[i])
        i++;}
        else {clearInterval(TempInt); console.log("Final")}

    },intervalo,ArrW)

   // else {clearInterval(TempInt)}
    //console.log(ArrW)
    

    //clearInterval()
}

lectura('Los hermanos sean unidos, porque esa es la ley primera',500, ()=>{
    lectura('Vuelve el perro arrepentido, con el rabo entre las patas',500, ()=>{
        lectura('La venganza nunca es buena, mata el alma y envenena',500, ()=>{


        });

    });

});
/* lectura('Vuelve el perro arrepentido, con el rabo entre las patas',500, ()=>{


});
lectura('La venganza nunca es buena, mata el alma y envenena',500, ()=>{


}); */