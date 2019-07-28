module.exports = new cruds();

function cruds() {
  this.crudCliente;
  this.crudProducto;
  this.iniciar = ()=>
  {
    this.crudProducto = require('./crudproducto.js');
    this.crudCliente = require('./crudcliente.js');
    this.crudTipo = require('./crudTipo.js');
    this.crudCat = require('./crudCat.js');
    this.crudPersonal = require('./crudPersonal.js');
  }
  this.conectar = (conexion)=>
  {
    this.crudCliente.conectar(conexion);
    this.crudProducto.conectar(conexion);
    this.crudTipo.conectar(conexion);
    this.crudCat.conectar(conexion);
    this.crudPersonal.conectar(conexion);
  }
}
