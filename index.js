const express = require("express");
const conectarDB = require("./config/db");

//creamos srvidor
const app = express();

//conectar DB
conectarDB();

//middleware
app.use(express.json());

app.use("/api/productos", require("./routes/prodcuto"));
app.use("/api/users", require("./routes/usuario"));
app.use("/api/auth", require("./routes/auth"));

app.listen(4000, () => {
  console.log("Sevidor arriba");
});
