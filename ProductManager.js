import fs from "fs";

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    static id = 1;

    async addProduct(obj) {
        try {
            let file = await fs.promises.readFile(this.path, 'utf8');
            let products = [];
            if (file) {
                products = JSON.parse(file);
            }
            obj.id = ProductManager.id++;
            products.push(obj);
            try {
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                return obj.id;
            }
            catch (err) {
                console.log('Hubo un error de escritura', err)
            }
        }
        catch (err) {
            console.log('Hubo un error de lectura', err)
        };
    }

    async getProductById(id) {
        try {
            let file = await fs.promises.readFile(this.path, 'utf-8');
            if (file) {
                const products = JSON.parse(file);
                let obj = products.find(prod => prod.id === id);
                if (obj) {
                    return obj;
                }
                else {
                    console.log(`No existe un producto con el id: ${id}`);
                    return null;
                }
            }
        }
        catch (err) {
            console.log('Hubo un error de lectura', err)
        }
    }

    async getProducts() {
        try {
            let file = await fs.promises.readFile(this.path, 'utf8');
            if (!file) {
                console.log('No hay productos');
            }
            else {
                return JSON.parse(file);
            }
        }
        catch (err) {
            console.log('Hubo un error de lectura', err)
        };
    }

    async updateProduct(id, obj) {
        try {
            let file = await fs.promises.readFile(this.path, 'utf8');
            let products;
            if (file) {
                products = JSON.parse(file);
                const index = products.findIndex(prod => prod.id === id)
                if (index !== -1) {
                    for (const prop in obj) {
                        products[index][prop] = obj[prop];
                    }
                } else {
                    console.log(`No existe un producto con el id: ${id}`);
                    return null;
                }
            }
            try {
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                return id;
            }
            catch (err) {
                console.log('Hubo un error de escritura', err)
            }
        }
        catch (err) {
            console.log('Hubo un error de lectura', err)
        };
    }

    async deleteProduct(id) {
        try {
            let file = await fs.promises.readFile(this.path, 'utf8');
            if (file) {
                const products = JSON.parse(file);
                const rest = products.filter(prod => prod.id !== id);
                if (rest.length) {
                    try {
                        await fs.promises.writeFile(this.path, JSON.stringify(rest, null, 2));
                        return `Se elimino el objeto con el id: ${id}`;
                    }
                    catch (err) {
                        console.log('Hubo un error de escritura', err)
                    }
                }
                else this.deleteAll();
            }
        }
        catch (err) {
            console.log('Hubo un error de lectura', err)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.path, '');
            console.log('Todos los productos fueron eliminados');
        }
        catch (err) {
            console.log('Hubo un error al intentar obtener el archivo', err)
        }
    }
}

export default ProductManager;