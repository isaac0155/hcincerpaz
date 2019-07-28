var tip=function tipo(rutas,bd)
{
  rutas.get("/Tipos/Ver", (req,res)=>
  {
    req.logout();
    
    var callback = (tip)=> {
      var tipos = tip;
      res.render("Paginas/TiposYCategorias/Tipos",
      {
        tipos,
        producto:{
          id: "tipo"
        },
        confirmaciones: req.flash("confirmacion")
      });
    }
    var productos = bd.cruds.crudTipo.leer(callback);
  });
  rutas.get("/Tipos/Modificar/:id",(req,res)=>
  {
        var id = req.params.id;
        var callback = (tip)=>
        {
          var tipos = tip[0][0];
          res.render("Paginas/TiposYCategorias/ModificarTipo",
          {
            tipos,
            confirmaciones: req.flash("confirmacion")
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

}
module.exports=tip;
