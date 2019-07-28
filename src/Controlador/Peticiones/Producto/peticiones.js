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
    //codigo de subida de imagenes
    const multer = require('multer');
    var ruta = "./src/public/fotos/Productos";
    var storage = multer.diskStorage({
    	destination: ruta,
    	filename: function (req, file, callback) {
    		callback(null, file.fieldname + '-' + Date.now()+".png");
    	}
    });
    var upload = multer({ storage : storage }).single('foto');
// hasta aca lo de las fotos aunque sigue mas abajo

    this.rutas.post("/Productos/Anadir",(req,res)=>
    {
      upload(req,res,function(err) {

    		if(err) {
          console.log(err, 'Im in post , inside upload'+ruta);
    			return res.end('Error subiendo archivo'+ err);
    		}
        else {
          var cat = req.body.cat;
          var tip = req.body.tipo;
          var precom = req.body.precom;
          var preven = req.body.preven;
          var stock = req.body.stock;
          var foto = req.file.filename;
          var nombre = req.body.nombre;

          var datos = [cat,tip,precom,preven,stock,foto,nombre];
          //console.log(req.file);
          bd.cruds.crudProducto.ingresar(datos);

          console.log("Producto ingresado",nombre);
          req.flash("confirmacion","Producto "+nombre+" ingresado");
          res.redirect("/Productos/Ver");
        }
    	});

    });

    this.rutas.post("/Productos/Actualizar/:id",(req,res)=>
    {
      upload(req,res,function(err) {

        if(err) {
          console.log(err, 'Im in post , inside upload'+ruta);
          return res.end('Error uploading file.'+ err);
        }
        else {
          var id = req.params.id;
          var cat = req.body.cat;
          var tip = req.body.tipo;
          var precom = req.body.precom;
          var preven = req.body.preven;
          var stock = req.body.stock;
          var foto; // = req.file.filename;
          var nombre = req.body.nombre;

          if(foto == "" || req.file == undefined)
          {
            foto = req.body.rutaoriginal;
          }
          else
          {
            var foto = req.file.filename;
          }

          var datos = [id,cat,tip,precom,preven,stock,foto,nombre];
          //console.log(req.file);
          bd.cruds.crudProducto.actualizar(datos);

          console.log("Producto actualizado",nombre);
          console.log("Producto actualizado con id",id);
          res.redirect("/Productos/Detalle/"+id);
        }
      });

    });

  }
}
