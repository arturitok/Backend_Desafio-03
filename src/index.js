const express = require('express')
const Contenedor=require("./contenedor")
const app = express();
const port = 8080

const server = app.listen(port, ()=>{
    console.log(`servidor http escuchando en el puerto ${server.address().port}`)
})

server.on('error', (error) => {console.log(`error en servidor: ${error}`)})


app.get('/productos', async (req, res) => {
	const productosArchivo = new Contenedor('./data/productos.txt');

	const productos = await productosArchivo.getAll();
	
    res.json(  productos);
});

app.get('/productoRandom', async (req, res) => {
	const productosArchivo = new Contenedor('./data/productos.txt');

	const productos = await productosArchivo.getAll();

	const random = Math.floor(Math.random() * productos.length);

	res.json(productos[random]);
});

app.get('/', (req, res) => {
    res.send( `<h2> Hola desde el home </h2>`)
})
