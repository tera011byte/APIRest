const Usuario = require("../models/Usuarios");
const bcrypt = require("bcrypt");

exports.createUsuario = async (req, res) => {
  try {
    let usuario;
    // creamos nuestro producto

    usuario = new Usuario({
      email: req.body.email,
      nombre: req.body.nombre,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    Usuario.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.status(400).json({ error: "Server Error" });
      }
      if (user) {
        res.status(400).json({ error: "Este Correo ya existe" });
      }
    });

    await usuario.save();

    res.json({ nombre: usuario.nombre, email: usuario.email });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un erro");
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const { nombre, password } = req.body;
    let usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      res.status(404).json({ msg: "No existe el usuario" });
    }
    usuario.nombre = nombre;
    usuario.password = password;

    usuario = await Usuario.findOneAndUpdate({ _id: req.params.id }, usuario, {
      new: true,
    });
    res.json({ nombre: usuario.nombre, email: usuario.email });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.cambiarEstadoUsuario = async (req, res) => {
  try {
    let usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      res.status(404).json({ msg: "No existe el usuario" });
    }
    usuario.estado = false;

    usuario = await Usuario.findOneAndUpdate({ _id: req.params.id }, usuario, {
      new: true,
    });
    res.json({ nombre: usuario.nombre, email: usuario.email });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({ estado: true }).select({
      nombre: 1,
      email: 1,
    });
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
