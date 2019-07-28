module.exports = new crud();

function crud() {
  this.conexion;
  this.conectar = (conexion)=>
  {
    this.conexion = conexion;
  }
  var tabla = "categoria";
  this.leerID = (id,callback)=>
  {
    this.conexion.query("call ver_categoria("+id+",2);", (err, respuesta, fields)=>
    {
      if(!err)
      {
      //  console.log(respuesta);
        //console.log("fields:",fields);
        callback(respuesta);

        return respuesta;
      }
      else {
        console.log("Error al leer datos de la tabla "+tabla+":", err);
      }
    });
  }
  this.leerTipo = (id,callback)=>
  {
    this.conexion.query("call ver_categoria("+id+",3);", (err, respuesta, fields)=>
    {
      if(!err)
      {
        //console.log(respuesta);
        //console.log("fields:",fields);
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
    this.conexion.query("SELECT eliminarCategoria("+id+");", (err, respuesta, fields)=>
    {
      if(!err)
      {
        //console.log(respuesta);
        callback(respuesta);
        return respuesta;
      }
      else {
        console.log("Error al borrar datos de la tabla "+tabla+":", err);
      }
    });
  }
  this.ingresar = (datos)=>
  {
    var consulta = "SELECT ingresarCategoriaProducto(";
    const coma = ",";
    var strings = [1,0];
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
    var consulta = "SELECT modificarCategoriaProducto(";
    const coma = ",";
    var strings = [0,1,0];
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
