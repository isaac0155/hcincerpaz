module.exports = new crud();

function crud() {
  this.conexion;
  this.conectar = (conexion)=>
  {
    this.conexion = conexion;
  }
  var tabla = "tipo";
  this.leerSoloTipos = (callback)=>
  {
    this.conexion.query("call ver_tipo(0,2);", (err, respuesta, fields)=>
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
  this.leer = (callback)=>
  {
    this.conexion.query("call ver_tipo(0,2);", (err, res, fields)=>
    {
      if(!err)
      {
    //    console.log(res);
        var respuesta = res[0];
        this.conexion.query("call ver_categoria(1,1);",(err,categorias,fields)=>
        {
          var tipos=[];
          for (var i = 0; i < respuesta.length; i++) {
            tipos.push({nombre:respuesta[i].nombre_tipo,id:respuesta[i].id_tipo_producto,cat:[]});
            for (var o = 0; o < categorias[0].length; o++) {
              if(categorias[0][o].id_tipo_producto==respuesta[i].id_tipo_producto)
              {
                tipos[i].cat.push({nombre:categorias[0][o].nombre_categoria,id:categorias[0][o].id_categoria_producto});
              }
            }
          }
          /*for (var i = 0; i < tipos.length; i++) {
            for (var o = 0; o < tipos[i].length; o++) {
              console.log("i:",i,"o:",o,"val:",tipos[i,o]);
            }
          }*/
          console.log("respuesta tipos y categorias", tipos);
          callback(tipos);
        });
        return respuesta;
      }
      else {
        console.log("Error al leer datos de la tabla "+tabla+":", err);
      }
    });
  }
  this.eliminar = (id, callback)=>
  {
    this.conexion.query("SELECT eliminarTipo("+id+");", (err, respuesta, fields)=>
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
  this.ingresar = (datos)=>
  {
    var consulta = "SELECT ingresarTipoProducto(";
    const coma = ",";
    var strings = [1];
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
  this.leerID = (id, callback)=>
  {
    this.conexion.query("call ver_tipo("+id+",1);", (err, respuesta, fields)=>
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
  this.actualizar = (datos)=>
  {
    var consulta = "SELECT modificarTipoProducto(";
    const coma = ",";
    var strings = [0,1];
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
