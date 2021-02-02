const fs = require('fs');


    
    class Archivo{
        constructor(nombre){
            this.nombre=nombre
        }
        async guardarid(a,b,c){
            
            try {
                
                let asd = await fs.promises.readFile(this.nombre, 'utf-8'); 
                let iden =JSON.parse(`[${asd.split("}{").join('},{')}]`).length  
               
                this.guardar(a, b, c, iden+1);           
           
            } catch (error) {
                let iden=1
                
                this.guardar(a, b, c, iden);   
            }

        }
        async leer(){
            
            try {
                
                let asd = await fs.promises.readFile(this.nombre, 'utf-8'); 
              
                console.log(JSON.parse(`[${asd.split("}{").join('},{')}]`))
                      
            } catch (error) {
                console.log([])
            }

        };
        async guardar(a,b,c,d){
           
            try {

                let itProd =  JSON.stringify( {title: a, price: b, thumbail: c, id: d})

                await fs.promises.appendFile(this.nombre,`${itProd}`)
            }
            catch (err) {

            console.log(err)
            }
        };
        async borrar(){

            try {
                await fs.promises.unlink(this.nombre);
                return `Archivo ${this.nombre} borrado`;
            } catch (error) {
                return 'Error al borrar el archivo';
            }
            
        };
    
    }

    let producto01 = new Archivo ('Productos.txt');
    producto01.leer();
    
    producto01.guardarid('silla', 250, 'https://sarlanga/200');
  
    //producto01.borrar();
    