// Importar bibliotecas

const express = require('express');
const cors = require('cors');
require("dotenv").config();
const mysql = require('mysql2/promise');

async function getConnection() {
    const connectionData = {
        host: process.env["MYSQL_HOST"],
        port: process.env["MYSQL_PORT"],
        user: process.env["MYSQL_USER"],
        password: process.env["MYSQL_PASS"],
        database: process.env["MYSQL_SCHEMA"],
    };

    const connection = await mysql.createConnection(connectionData);
    await connection.connect();

    return connection;
}

// Configuración del servidor
const app = express();

app.use(cors());
app.use(express.json());

// Arrancar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port <http://localhost:${port}>`);
});




// Insertar una entrada en la entidad principal

app.post('/productos', async (req, res) => {

    console.log(req.body);

    // Datos para recibir en la solicitud
    const { nombre, descripcion, precio, imagen_url, id_categorias } = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (!nombre || !descripcion || !precio || !imagen_url || !id_categorias) {
        return res.status(400).json({ error: 'Faltan datos requeridos (nombre, descripcion, precio, imagen_url, id_categorias).' });
    }

    try {
        // Conexión a la base de datos
        const conn = await getConnection();

        // Ejecutar la consulta para insertar un nuevo producto
        const result = await conn.query(
            'INSERT INTO productos (nombre, descripcion, precio, imagen_url, id_categorias) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, imagen_url, id_categorias]
        );

        // Cerrar la conexión
        await conn.end();

        // Mensaje de éxito y ID del producto insertado
        res.status(201).json({
            message: 'Producto insertado correctamente.',
            id: result.insertId
        });

    } catch (error) {
        console.error(error); // Error en el servidor
        res.status(500).json({ error: 'Hubo un problema al insertar el producto.' });
    }
});


// Leer/Listar todos los productos
app.get('/productos', async (req, res) => {
    try {

        // Obtener conexión
        const conn = await getConnection();

        // Ejecutar la consulta
        const [results] = await conn.query(`SELECT * FROM productos;`);

        // Calcular la cantidad de elementos
        const numOfElements = results.length;

        // Cerrar la conexión después de la consulta
        await conn.end();

        // Responder con los resultados y el número de elementos
        res.json({
            info: { count: numOfElements },
            results: results,
        });
    } catch (error) {
        console.error(error); // Log de error
        res.status(500).json({ error: 'Hubo un problema al obtener los productos.' });
    }
});

// Obtener una única entrada (producto) usando parámetros
app.get('/productos/:id', async (req, res) => {
    // Recuperar el ID del producto de los parámetros de la URL
    const { id } = req.params;

    try {
        // Obtener conexión
        const conn = await getConnection();

        // Consultar el producto con el ID
        const [results] = await conn.query('SELECT * FROM productos WHERE id_productos = ?', [id]);

        // Cerrar la conexión
        await conn.end();

        // Si no se encuentra el producto, devolver un error 404
        if (results.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        // Si se encuentra el producto, devolver la respuesta con los detalles
        res.status(200).json({
            result: results[0] // Solo un producto (el primero), ya que id_producto es único
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un problema al obtener el producto.' });
    }
});
