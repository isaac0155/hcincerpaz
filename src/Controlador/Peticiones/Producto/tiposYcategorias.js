module.exports = new peticion();
function peticion() {
  this.rutas;
  this.iniciar = (rutas,bd)=>
  {
    this.rutas = rutas;
    this.funciones(bd);
  }
  this.funciones = (bd)=>
  {
    this.rutas.post("/Tipos/Anadir",(req,res)=>
    {
          var nombre = req.body.nombre;
        //  console.log("req.body",req.body);

          var datos = [nombre];
          //console.log(req.file);
          bd.cruds.crudTipo.ingresar(datos);
        //  console.log("Tipo ingresado",nombre);
          req.flash("confirmacion","Tipo "+ nombre + " ingresado");
          res.redirect("/Productos/Anadir");
    });
    this.rutas.post("/Tipos/Anadir/:id",(req,res)=>
    {
          var nombre = req.body.nombre;
        //  console.log("req.body",req.body);
          var id = req.params.id;
          var datos = [nombre];
          //console.log(req.file);
          bd.cruds.crudTipo.ingresar(datos);
        //  console.log("Tipo ingresado",nombre);
          req.flash("confirmacion","Tipo "+ nombre + " ingresado");
          if(id=="tipo")
          {
            res.redirect("/Tipos/Ver");
          }
          else
          {
            res.redirect("/Productos/Modificar/"+id);
          }
    });
    this.rutas.post("/Categorias/Anadir",(req,res)=>
    {
          var nombre = req.body.nombre;
          var tipo = req.body.tipo;

          var datos = [nombre,tipo];
          //console.log(req.file);
          bd.cruds.crudCat.ingresar(datos);
          req.flash("confirmacion","Categoria "+ nombre + " ingresado");
        //  console.log("Categoria ingresada",nombre);
          res.redirect("/Productos/Anadir");
    });
    this.rutas.post("/Categorias/Anadir/:id/:cat",(req,res)=>
    {
          var nombre = req.body.nombre;
          var tipo = req.body.tipo;
          var id = req.params.id;
          var datos = [nombre,tipo];
          //console.log(req.file);
          bd.cruds.crudCat.ingresar(datos);
        //  console.log("Categoria ingresada",nombre);
        //  console.log("id de la categoria:",(id=="cat"));
          req.flash("confirmacion","Categoria "+ nombre + " ingresado");
          if(id=="cat")
          {
            res.redirect("/Categorias/Ver/"+req.params.cat);
          }
          else
          {
            res.redirect("/Productos/Modificar/"+id);
          }
    });
    this.rutas.post("/Tipos/Actualizar/:id",(req,res)=>
    {
          var nombre_tipo = req.body.nombre;
          var id = req.params.id;
          var datos = [id,nombre_tipo];

          bd.cruds.crudTipo.actualizar(datos);

          //console.log("Tipo actualizado",nombre_tipo);
          //console.log("Tipo actualizado con id",id);
          req.flash("confirmacion","Tipo "+ nombre_tipo + " actualizado");
          res.redirect("/Tipos/Ver/");
    });
    this.rutas.post("/Categorias/Actualizar/:id",(req,res)=>
    {
          var id = req.params.id;
          var nombre_categoria = req.body.nombre;
          var id_tipo_producto = req.body.tipo;
          var datos = [id,nombre_categoria,id_tipo_producto];

          bd.cruds.crudCat.actualizar(datos);

          //console.log("Categoria actualizada",nombre_categoria);
          //console.log("Categoria actualizada con id",id);
          req.flash("confirmacion","Categoria "+ nombre_categoria + " actualizado");
          res.redirect("/Categorias/Ver/"+id_tipo_producto);
    });
  }
}
