const express = require('express');
const rutas = express.Router();

var bd = require('./../BD/bd.js');
bd.iniciar();

rutas.get("/",(req,res)=>
{
  res.render("Paginas/Inicio")
});
rutas.get("/Productos/Anadir", (req,res)=>
{
  bd.cruds.crudTipo.leer((tipos)=>
  {
    var tip = tipos;
    console.log("tipos:",tip);
    res.render("Paginas/Productos/Añadir",
    {
      tipos: tip,
      producto:{
        id: "no"
      }
    });
  });
});
rutas.get("/Productos/Ver", (req,res)=>
{
  var callback = (prod)=> {
    var productos = prod[0];
    var keys = Object.keys(productos);
    res.render("Paginas/Productos/Ver",
    {
      productos,
      keys,
      todo:"todo"
    });
  }
  var productos = bd.cruds.crudProducto.leer(callback);
});
rutas.get("/Productos/Detalle/:id",(req,res)=>
{
  bd.cruds.crudTipo.leer((tipos)=>
  {
    var tip = tipos;
      var id = req.params.id;
      var numero = 0;
      var callback = (prod)=>
      {
        var producto = prod[0][0];
        res.render("Paginas/Productos/Detalle",
        {
          producto,
          numero,
          tipos: tip
        });
      }
      bd.cruds.crudProducto.leerID(id,callback);
  })
});
rutas.get("/Productos/Eliminar/:id",(req,res)=>
{
  var id = req.params.id;

  var cb = ()=>
  {
    var callback2 = (respuesta)=>
    {
      console.log(respuesta);
    }
    bd.cruds.crudProducto.eliminar(id,callback2);
  }
  bd.cruds.crudProducto.eliminarFoto(id,cb);
  res.redirect("/Productos/Ver");
});
rutas.get("/Productos/Modificar/:id",(req,res)=>
{
  bd.cruds.crudTipo.leer((tipos)=>
  {
    var tip = tipos;
      var id = req.params.id;
      var numero = 1;
      var callback = (prod)=>
      {
        var producto = prod[0][0];
        res.render("Paginas/Productos/Detalle",
        {
          producto,
          numero,
          tipos: tip
        });
      }
      bd.cruds.crudProducto.leerID(id,callback);
  })
});
rutas.get("/Tipos/Ver", (req,res)=>
{
  var callback = (tip)=> {
    var tipos = tip;
    res.render("Paginas/TiposYCategorias/Tipos",
    {
      tipos,
      producto:{
        id: "tipo"
      }
    });
  }
  var productos = bd.cruds.crudTipo.leer(callback);
});
rutas.get("/Categorias/Ver/:id", (req,res)=>
{
  var callback = (cate)=> {
    var cat = cate[0];
    //var categorias = prod[0];
    var keys = Object.keys(cat);
    console.log("categorias",cat);
    res.render("Paginas/TiposYCategorias/Categorias",
    {
      cat,
      keys,
      producto:{
        id: "cat",
        id_tipo_producto: req.params.id
      }
    });
  }
  var productos = bd.cruds.crudCat.leerTipo(req.params.id,callback);
});
rutas.get("/Productos/Ver/:id", (req,res)=>
{
  var id = req.params.id;
  var callback = (prod)=> {
    var productos = prod[0];
    var keys = Object.keys(productos);
    console.log("prod",productos);
    res.render("Paginas/Productos/Ver",
    {
      productos,
      keys,
      todo: undefined
    });
  }
  var productos = bd.cruds.crudProducto.leerCat(id,callback);
});
rutas.get("/Tipos/Modificar/:id",(req,res)=>
{
      var id = req.params.id;
      var callback = (tip)=>
      {
        var tipos = tip[0][0];
        res.render("Paginas/TiposYCategorias/ModificarTipo",
        {
          tipos
        });
      }
      bd.cruds.crudTipo.leerID(id,callback);
});
rutas.get("/Tipos/Eliminar/:id",(req,res)=>
{
  var id = req.params.id;
  var callback = (respuesta)=>
  {
    console.log(respuesta);
  }
  bd.cruds.crudTipo.eliminar(id,callback);
  res.redirect("/Tipos/Ver");
});

rutas.get("/Categorias/Modificar/:id",(req,res)=>
{
      var cb = (tip)=>
      {
        var tipos = tip[0];
        var id = req.params.id;
        var callback = (Cat)=>
        {
          var cat = Cat[0][0];
          console.log("las categorias recogidas son: ", Cat);
          res.render("Paginas/TiposYCategorias/ModificarCat",
          {
            cat,
            tipos
          });
        }
        bd.cruds.crudCat.leerID(id,callback);
      }
      bd.cruds.crudTipo.leerSoloTipos(cb);
});
rutas.get("/Categorias/Eliminar/:id/:tip",(req,res)=>
{
  var id = req.params.id;
  var tipo = req.params.tip;
  var callback = (respuesta)=>
  {
    console.log(respuesta);
  }
  bd.cruds.crudCat.eliminar(id,callback);
  res.redirect("/Categorias/Ver/"+tipo);
});
rutas.get("*",(req,res)=>
{
  res.render("Paginas/error");
});


var pet = require('./../../Controlador/Peticiones/index.js');
pet.iniciar(rutas,bd);

module.exports = rutas;
