const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/bienvenida", (req, res) => {
    res.send("<p style='color:blue'>Bienvenidos</p>");
});

app.get("/usuario", (req, res) => {
    res.json({nombre: "David", usuario: "116370794", pais: "Costa Rica"});
});

app.listen(PORT, () => console.log("Server running on port " + PORT));