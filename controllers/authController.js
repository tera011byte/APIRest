const Usuario = require("../models/Usuarios");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

exports.login = async (req, res) => {
  Usuario.findOne({ email: req.body.email })
    .then((datos) => {
      if (datos) {
        const passwordvalidate = bcrypt.compareSync(
          req.body.password,
          datos.password
        );
        if (!passwordvalidate) {
          return res.status(400).json({
            error: "ok",
            msg: "Usuario o contraseña incorrecta.",
          });
        }
        const jwtoken = jwt.sign(
          {
            data: { _id: datos._id, nombre: datos.nombre, email: datos.email },
          },
          process.env.SEED,
          { expiresIn: process.env.EXPIRE }
        );
        res.json({
          usuario: {
            _id: datos._id,
            nombre: datos.nombre,
            email: datos.email,
          },
          jwtoken,
        });
      } else {
        res.status(400).json({
          error: "ok",
          msg: "Usuario o contraseña incorrecta.",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: "ok",
        msg: "Error en el Servicio" + err,
      });
    });
};
