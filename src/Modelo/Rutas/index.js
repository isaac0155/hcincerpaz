//module.exports = rutas;
//function rutas(bd)

var ret = (passport)=> {

  var bd = require('./../BD/bd.js');
  bd.iniciar();

  const express = require('express');
  const rutas = express.Router();

  var ver = require('./../Autenticacion/verificar.js')
  require('./producto.js')(rutas,bd,ver);
  require('./tipo.js')(rutas,bd,ver);
  require('./categoria.js')(rutas,bd,ver);
  require('./personal.js')(rutas,bd,ver);
  rutas.get("/",(req,res)=>
  {
    res.render("Paginas/Inicio",
    {
      usuario: req.user,
      confirmaciones: req.flash("confirmacion")
    })
  });
  rutas.get("*",(req,res)=>
  {

    res.render("Paginas/error",
    {
      confirmaciones: req.flash("confirmacion")
    });
  });
  var pet = require('./../../Controlador/Peticiones/index.js');
  pet.iniciar(rutas,bd,passport);
  return rutas;
}

  module.exports = ret;
