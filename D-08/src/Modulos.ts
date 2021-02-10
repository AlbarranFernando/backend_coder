  
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
 }

 export default Modulos

