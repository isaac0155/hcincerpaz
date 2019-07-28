module.exports = new crud();

var tabla = "persona";
function crud() {
  this.conexion;
  this.conectar = (conexion)=>
  {
    this.conexion = conexion;
  }
  this.leer = ()=>
  {
    this.conexion.query("select * from "+tabla, (err, respuesta, fields)=>
    {
      if(!err)
      {
        console.log("fields",fields);
        console.log("respuesta",respuesta);
        return respuesta;
      }
      else {
        console.log("Error al leer datos de la tabla "+tabla+":", err);
      }
    });
  }
  this.ingresar = (dato)=>
  {
    this.conexion.query("insert into "+tabla+
    "(edad) values ("+dato.edad+");");
  }
}
