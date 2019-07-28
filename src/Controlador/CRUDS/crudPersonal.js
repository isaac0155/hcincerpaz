module.exports = new crud();
function crud()
{
  this.conexion;
  this.conectar = (conexion)=>
  {
    this.conexion = conexion;
  }
  var tabla = "personal";
  this.actualizarActividad = (datos,callback)=>
  {
    var consulta = "SELECT actividadPersonal(";
    const coma = ",";
    var strings = [0,0];
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
        callback(respuesta);
      }
      else {
        console.log("Error al modificar datos de la tabla "+tabla+":", err);
      }
    });
  }
  this.eliminar = (id, callback)=>
  {
    this.conexion.query("SELECT eliminarPersonal("+id+");", (err, respuesta, fields)=>
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
  this.ingresar = (datos,callback)=>
  {
    var consulta = "SELECT ingresarPersonal(";
    const coma = ",";
    var strings = [1,1,0,1,1,1,1,0,0,1];
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
        callback(respuesta);
      }
      else {
        console.log("Error al ingresar datos de la tabla "+tabla+":", err);
      }
    });
  }
  this.actualizar = (datos,callback)=>
  {
    var consulta = "SELECT modificarPersonal(";
    const coma = ",";
    var strings = [0,1,1,0,1,1,1,1,0,0,1];
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
        callback(respuesta);
      }
      else {
        console.log("Error al ingresar datos de la tabla "+tabla+":", err);
      }
    });
  }
  this.leer = (callback)=>//muestra todos los cliente
  {
    this.conexion.query("call ver_personal(1,2);", (err, respuesta, fields)=>
    {
      if(!err)
      {
        //console.log(respuesta);
        callback(respuesta);
        return respuesta;
      }
      else {
        console.log("Error al leer datos de la tabla "+tabla+":", err);
      }
    });
  }
  this.leerID = (ci,callback)=>//muestra un cliente en especifico por su ID
  {
    this.conexion.query("call ver_personal("+ci+",1);", (err, respuesta, fields)=>
    {
      if(!err)
      {
        //console.log("respuesta leer id personal",respuesta);
        callback(respuesta);

        return respuesta;
      }
      else {
        console.log("Error al leer datos de la tabla "+tabla+":", err);
      }
    });
  }
}
