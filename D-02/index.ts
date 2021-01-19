const asd='./calculus';

const operacion = async (num1:number,num2:number,op:string) =>
{
    let calculo = null;

    switch(op){
        case 'suma':
            calculo = await import(asd).then(m=>m.suma);
            break
        case 'resta':
            calculo = await import(asd).then(m=>m.resta);
            break 
}
    return new calculo(num1,num2).resultado();
};


const operaciones = async (num1:number,num2:number,op:string)=>
{
    let solucion = await operacion(num1,num2,op)
    console.log(solucion)
};
console.log("variable");
operaciones(8,3,'suma');
operaciones(8,3,'resta');