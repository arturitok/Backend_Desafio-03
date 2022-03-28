const fs = require("fs");


let productArray = [];
let productObject = {};

class Contenedor {

    constructor(fileName) {
        this.fileName = "./" + fileName;
        try {
            productArray = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf-8`));
            if (this.productArray === '') this.productArray = [];
            console.log( `Se utilizará el archivo ${this.fileName}`)
        }
        catch (e) {
          //  productArray = [];
          //  fs.writeFileSync(`${this.fileName}`, JSON.stringify(''))
            console.log(`El archivo no existe o esta vacio. Se crea uno nuevo` )
        }
    }

    async save(producto) {
        try {
            productObject = producto;
            productObject.id = productArray.length + 1;
            let productExist = productArray.find((product) => product.title === productObject.title);
            if (productExist=== undefined) {
                let productExist = productArray.find((product) => product.id === productObject.id);
                if (productExist=== undefined) {
                            productArray.push(productObject);
                            await fs.promises.writeFile(this.fileName, JSON.stringify(productArray, null, 2));
                }
                else{
                    console.log(`El ID  ${productExist.id} está duplicado`); 
                }
            }
            else {
                console.log(`El producto  ${productExist.title} ya existe`);
            }
            
        }
        catch (err) {
            console.log(err);
        }
    }

    async getById(id) {
        try {
            productArray = JSON.parse(await fs.promises.readFile(this.fileName, "utf8"));
            let productById = productArray.find((product) => product.id == id);
            //productById === undefined ? console.log(null) : console.log(productById);
            return(productById);
        }
        catch (err) {
            console.log(err);
        }
    }

    async getAll() {
        try {
            productArray = JSON.parse(await fs.promises.readFile(this.fileName, "utf8"));
            return(productArray);
        }
        catch (err) {
            console.log(err);
        }

    }

    async deleteById(id) {
        try {
            productArray = JSON.parse(await fs.promises.readFile(this.fileName, "utf8")).filter((product) => product.id != id);
            fs.writeFileSync(this.fileName, JSON.stringify(productArray, null, 2));
        }
        catch (err) {
            console.log(err);
        }
    }

   async deleteAll() {
        try {
            
            fs.writeFileSync(this.fileName, "")
        }
        catch (err) {
            console.log(err);
        }
   }
         
}
module.exports = Contenedor;