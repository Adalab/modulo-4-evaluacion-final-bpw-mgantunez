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


// Primer endpoint
app.get('/categorias', async (req, res) => {
    try {

        // Obtener conexión
        const conn = await getConnection();

        // Ejecutar la consulta
        const [results] = await conn.query(`SELECT * FROM categorias;`);

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
        res.status(500).json({ error: 'Hubo un problema al obtener las categorías.' });
    }
});