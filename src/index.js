// Importar bibliotecas

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Arrancar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port <http://localhost:${port}>`);
});


// Primer endpoint
app.get('/categorias', function (req, res) {

    const results = [];
    const numOfElements = results.length;

    res.json(
        {
            info: { "count": numOfElements },
            results: results,
        }
    );
});