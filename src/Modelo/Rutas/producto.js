var prod=function producto(rutas,bd,ver)
{
  rutas.get("/Productos/Anadir", ver.verificar, (req,res)=>
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
        },
        confirmaciones: req.flash("confirmacion")
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
        todo:"todo",
        confirmaciones: req.flash("confirmacion")
      });
      //res.send();
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
            tipos: tip,
            confirmaciones: req.flash("confirmacion")
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
            tipos: tip,
            confirmaciones: req.flash("confirmacion")
          });
        }
        bd.cruds.crudProducto.leerID(id,callback);
    })
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
        todo: undefined,
        confirmaciones: req.flash("confirmacion")
      });
    }
    var productos = bd.cruds.crudProducto.leerCat(id,callback);
  });

}
module.exports=prod;
