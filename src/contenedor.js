const fs = require('fs');

class Contenedor{
    constructor(nombreArchivo){
        this.nombre = nombreArchivo;
        async function create() {
                try {
                    await fs.promises.writeFile(`./${nombreArchivo}`, '[]');
                    console.log('Se ha creado un archivo con nombre ' + nombreArchivo);
                } catch(err) {
                    console.log('Ha ocurrido un error ' + err);
                }
            }
        if (fs.existsSync(`./${nombreArchivo}`)) {
            console.log("Ya existe un archivo con ese nombre");
        } else {
            create();
        }
        };
    
    async save(obj) {
        console.log(obj)
        
        try {
            let data  = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let dataArr = JSON.parse(data);
            obj.id = dataArr.length+1;
            dataArr = [...dataArr, obj];
            console.log(dataArr)
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(dataArr));
            console.log(`Se agrego el objeto con el siguiente ID: ${obj.id}`);
            return obj.id;
        } catch (error) {
            console.log(`No se ha podido guardar el objeto: ${error}`);
        }
    }
    async getById(id){
        
        try {
            let data  = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let dataArr = JSON.parse(data);
            console.log(dataArr);
            const objeto = dataArr.find(obj => obj.id === id);
            if(objeto){
                console.log(`Se encontro el objeto: ${objeto.nombre}`);
                return objeto;
            } else {
                return null;
            }
        } catch (error) {
            console.log(`No se encontro el objeto: ${error}`);
        }
    }
    async getAll(){
        try{
            let data  = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let dataArr = JSON.parse(data);
            return dataArr;
        } catch (error) {
            console.log(`No se encontro el objeto: ${error}`);
        }
    }
    async update(id, obj){
        try {
            let data  = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let dataArr = JSON.parse(data);
            const index = dataArr.findIndex(p => p.id === Number(id));
            dataArr[index] = {...dataArr[index], ...obj};
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(dataArr));
            console.log(`Se actualizo el objeto con el siguiente ID: ${id}`);
            return obj.id;
        } catch (error) {
            console.log(`No se ha podido guardar el objeto: ${error}`);
        }
    }
    async saveProd(id, obj){
        try {
            let data  = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let dataArr = JSON.parse(data);
            const indexCart = dataArr.findIndex(c => c.id === Number(id));
            let cartProducts = dataArr[indexCart].productos;
            const id_prod = cartProducts.length+1;
            const date = Date.now();
            dataArr[indexCart].productos = [...cartProducts, {id:id_prod, timestamp:date, ...obj}];
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(dataArr));
            console.log(`Se agrego el objeto con el siguiente ID: ${id_prod}`);
            return id_prod;
        } catch (error) {
            console.log(`No se ha podido guardar el objeto: ${error}`);
        }
    }
    async deleteById(id){
        try {
            let data  = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            console.log(data)
            let dataArr = JSON.parse(data);
            console.log(dataArr)
            let filtered = dataArr.filter(obj => obj.id !== Number(id));
            console.log(filtered);
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(filtered));
            console.log(`Se elimino el objeto con el siguiente ID: ${id}`);
        } catch (error) {
            console.log(`No se ha podido eliminar el objeto: ${error}`);
        }
    }
    async deleteProdById(id, id_prod){
        try {
            let data  = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let dataArr = JSON.parse(data);
            const indexCart = dataArr.findIndex(c => c.id === Number(id));
            dataArr[indexCart].productos = dataArr[indexCart].productos.filter(p => p.id !== Number(id_prod))
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(dataArr));
            console.log(`Se elimino el objeto con el siguiente ID: ${id_prod} del carrito con ID: ${id}`);
        } catch (error){
            console.log(`No se ha podido eliminar el objeto: ${error}`);
        }
    }
}

module.exports = Contenedor;