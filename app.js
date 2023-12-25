import ProductManager from './ProductManager.js';

const productManager = new ProductManager('./productos.txt');

class Producto {
    constructor(title, description, price, img, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = img;
        this.code = code;
        this.stock = stock;
    }
}

const producto1 = new Producto ('Corvette', "Ultimo modelo" , 1000, 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', "71282/3", 3);
const producto2 = new Producto ('Lamborghini', "Un Lamborghini naranja", 2000, 'https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-automobiles-39501.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', "721399", 1);
const producto3 = new Producto ('Mercedes Benz', "Un Mercedes amarillo", 2800, 'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260', "040311", 5);

/*productManager.addProduct(producto1).then(id => console.log(`Se agrego el producto con id: ${id}`))
.then(() => productManager.addProduct(producto2).then(id => console.log(`Se agrego el producto con id: ${id}`)))
.then(() => productManager.addProduct(producto3).then(id => console.log(`Se agrego el producto con id: ${id}`)))*/

//productManager.getProductById(2).then(item => console.log(item));

//productManager.getProducts().then(data => console.log(data));

//productManager.updateProduct(2, {description: "Ahora son 2", price: 2300, stock: 2}).then(id => console.log(`Se actualizo el producto con id: ${id}`))

//productManager.deleteProduct(1).then(console.log);

//productManager.deleteAll();