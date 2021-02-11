  
 class Modulos {

     constructor(public products:any){}

     addProduct(prod: any) {
        const {title, price, thumbail} = prod
        const id = (this.products.length + 1 ).toString()
        const producto = {
          id,
          title,
          price,
          thumbail,
        }
        this.products.push(producto)
     }

     getProducts() {
        let productoVista:any[] = this.products
        if(!this.products.length) productoVista = [{error : "no hay productos cargados"}]
         return productoVista;
     }

     findOneProduct(id: string){
        let producto = this.products.find((prod:any) => prod.id === id);
        if (!producto) producto = {error : 'producto no encontrado'}
        return producto
     }

      updateProduct(prod: any, idn: string){
         const {title, price, thumbail} = prod
         const id = idn
         const productoAct = {
           id,
           title,
           price,
           thumbail,
         }
         let producto = this.products.find((prod:any) => prod.id === id);
         if (!producto) producto = {error : 'producto no encontrado'}
            else  {this.products.splice(this.products.indexOf(producto), 1,productoAct)
                     producto = productoAct
                 }
         return producto
    }

      delProduct(id: string){
      let producto = this.products.find((prod:any) => prod.id === id);
      if (!producto) producto = {error : 'producto no encontrado'}
         else  this.products.splice(this.products.indexOf(producto), 1)
            
      return producto
    }
 }
 export default Modulos

