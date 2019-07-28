module.exports = new crud();

function crud() {
  this.conexion;
  this.conectar = (conexion)=>
  {
    this.conexion = conexion;
  }
  var tabla = "producto";
  this.leer = (callback)=>
  {
    this.conexion.query("call ver_producto(0,2);", (err, respuesta, fields)=>
    {
      if(!err)
      {
      //  console.log(respuesta);
        callback(respuesta);
        return respuesta;
      }
      else {
        console.log("Error al leer datos de la tabla "+tabla+":", err);
      }
    });
  }
  this.leerCat = (id,callback)=>
  {
    this.conexion.query("call ver_producto("+id+",3);", (err, respuesta, fields)=>
    {
      if(!err)
      {
      //  console.log(respuesta);
        callback(respuesta);
        return respuesta;
      }
      else {
        console.log("Error al leer datos de la tabla "+tabla+":", err);
      }
    });
  }
  this.leerID = (id, callback)=>
  {
    this.conexion.query("call ver_producto("+id+",1);", (err, respuesta, fields)=>
    {
      if(!err)
      {
    //    console.log(respuesta);
        callback(respuesta);
        return respuesta;
      }
      else {
        console.log("Error al leer datos de la tabla "+tabla+":", err);
      }
    });
  }
  this.eliminar = (id, callback)=>
  {
    this.conexion.query("SELECT eliminarProducto("+id+");", (err, respuesta, fields)=>
    {
      if(!err)
      {
      //  console.log(respuesta);
        callback(respuesta);
        return respuesta;
      }
      else {
        console.log("Error al borrar datos de la tabla "+tabla+":", err);
      }
    });
  }
  this.eliminarFoto = (id,cb)=>
  {
    var callback = (respuesta)=>
    {
      var producto = respuesta[0][0];
      const fs = require('fs');
      const path = require("path");
    //  console.log("nombre foto:", producto.nombre_foto);
      fs.unlink(path.join(__dirname,'../../public/fotos/Productos/'+producto.nombre_foto), (err) => {
        if (err) console.log(err);;
        console.log('Foto eliminada del producto',producto.nombre_producto);
      });
      cb();
    }
    this.leerID(id,callback);
  }
  this.ingresar = (datos)=>
  {
    var consulta = "SELECT ingresarProducto(";
    const coma = ",";
    var strings = [0,0,0,0,0,1,1];
    for (var i = 0; i < datos.length-1; i++) {
      if(strings[i]==0)
      {
        consulta+=datos[i]+coma;
      }
      else
      {
        consulta+="'"+datos[i]+"'"+coma;
      }
    }
    if(strings[i]==0)
    {
      consulta+=datos[datos.length-1];
    }
    else
    {
      consulta+="'"+datos[datos.length-1]+"'";
    }

    consulta+=");"
    this.conexion.query(consulta,(err, respuesta, fields)=>
    {
      if(!err)
      {
        console.log(tabla+ " Ingresado Correctamente");
      }
      else {
        console.log("Error al ingresar datos de la tabla "+tabla+":", err);
      }
    });
  }
  this.actualizar = (datos)=>
  {
    var consulta = "SELECT modificarProducto(";
    const coma = ",";
    var strings = [0,0,0,0,0,0,1,1];
    for (var i = 0; i < datos.length-1; i++) {
      if(strings[i]==0)
      {
        consulta+=datos[i]+coma;
      }
      else
      {
        consulta+="'"+datos[i]+"'"+coma;
      }
    }
    if(strings[i]==0)
    {
      consulta+=datos[datos.length-1];
    }
    else
    {
      consulta+="'"+datos[datos.length-1]+"'";
    }

    consulta+=");"
    this.conexion.query(consulta,(err, respuesta, fields)=>
    {
      if(!err)
      {
        console.log(tabla+ " Modificado Correctamente con id de ",datos[0]);
      }
      else {
        console.log("Error al modificar datos de la tabla "+tabla+":", err);
      }
    });
  }
}
