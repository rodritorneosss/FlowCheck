const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Servir los archivos estáticos de tu frontend
app.use(express.static(path.join(__dirname, '')));

// Definir un endpoint para la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Servir cualquier otro archivo estático necesario
app.get('/css/*', (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
});
app.get('/js/*', (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});