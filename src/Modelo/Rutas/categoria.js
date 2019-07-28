var cat=function categoria(rutas,bd)
{
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
        },
        confirmaciones: req.flash("confirmacion")
      });
    }
    var productos = bd.cruds.crudCat.leerTipo(req.params.id,callback);
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
              tipos,
              confirmaciones: req.flash("confirmacion")
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

}
module.exports=cat;
