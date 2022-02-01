const Producto = require("../models/Producto");

exports.createProducto = async (req, res) => {
  try {
    let producto;
    // creamos nuestro producto

    producto = new Producto(req.body);
    await producto.save();

    res.send(producto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un erro");
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarProductos = async (req, res) => {
  try {
    const { producto, price, stock, description } = req.body;
    let productos = await Producto.findById(req.params.id);

    if (!productos) {
      res.status(404).json({ msg: "No existeb el producto" });
    }
    productos.producto = producto;
    productos.price = price;
    productos.stock = stock;
    productos.description = description;

    productos = await Producto.findOneAndUpdate(
      { _id: req.params.id },
      productos,
      { new: true }
    );
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerProducto = async (req, res) => {
  try {
    let productos = await Producto.findById(req.params.id);

    if (!productos) {
      res.status(404).json({ msg: "No existeb el producto" });
    }

    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    let productos = await Producto.findById(req.params.id);

    if (!productos) {
      res.status(404).json({ msg: "No existeb el producto" });
    }
    await Producto.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Producto Eliminado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
