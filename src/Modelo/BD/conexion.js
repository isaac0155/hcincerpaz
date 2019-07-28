var mysql = require('mysql');
var database = "hcincerpaz";
var datosConexion =
  {
      host: "localhost",
      database: database,
      user: "root",
      password: ""
  }
var conexion = mysql.createConnection(datosConexion);
conexion.connect((err)=>
{
  if(err)
  {
    console.log("Error conectando a la base de datos:",err);
    return;
  }
  else {
    console.log("conexion exitosa a la base de datos",database,"con el id:",conexion.threadId);
  }
});
module.exports = conexion;
