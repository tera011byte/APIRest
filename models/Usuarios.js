const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  imagen: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
