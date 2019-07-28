module.exports = new bd();

function bd() {
  this.conexion;
  this.cruds;
  this.iniciar = ()=>
  {
    this.conexion = require('./conexion.js');
    this.cruds = require('./../../Controlador/CRUDS/index.js');
    this.cruds.iniciar();
    this.cruds.conectar(this.conexion);
  }
}
