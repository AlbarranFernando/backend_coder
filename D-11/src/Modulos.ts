  
 interface Product {
     id: string;
     title: string;
     price: number;
     thumbnail: string;
 }
 class Modulos {

     constructor(public products:Product[]){}

     addProduct(prod: any) {
        const {title, price, thumbnail} = prod
        const id = (this.products.length + 1 ).toString()
        const producto = {
          id,
          title,
          price,
          thumbnail,
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
        if (!producto) producto = [] as any
        return producto
     }

      updateProduct(prod: any, idn: string){
         const {title, price, thumbnail} = prod
         const id = idn
         const productoAct = {
           id,
           title,
           price,
           thumbnail,
         }
         let producto = this.products.find((prod:any) => prod.id === id);
         if (!producto) producto = [] as any
            else  {this.products.splice(this.products.indexOf(producto), 1,productoAct)
                     producto = productoAct
                 }
         return producto
    }

      delProduct(id: string){
      let producto = this.products.find((prod:any) => prod.id === id);
      if (!producto) producto = [] as any
         else  this.products.splice(this.products.indexOf(producto), 1)
            
      return producto
    }
 }
 export default Modulos

