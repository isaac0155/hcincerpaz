module.exports = new peticiones();
function peticiones() {
  this.rutas;
  this.peticionInicio;
  this.peticionProducto;

  this.iniciar = (rutas,bd,passport)=>
  {
    this.rutas = rutas;
    this.peticionInicio = require('./Inicio');
    this.peticionProducto = require('./Producto/peticiones');
    this.peticionTipoYcategoria = require('./Producto/tiposYcategorias');
    this.peticionesSesiones = require('./Personal/sesiones.js');

    this.peticionInicio.iniciar(rutas,bd,passport);
    this.peticionProducto.iniciar(rutas,bd,passport);
    this.peticionTipoYcategoria.iniciar(rutas,bd,passport);
    this.peticionesSesiones.iniciar(rutas,bd,passport);
  }

}
