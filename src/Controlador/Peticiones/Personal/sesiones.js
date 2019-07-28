module.exports = new peticion();

function peticion() {
  this.rutas;
  this.iniciar = (rutas,bd,passport)=>
  {
    this.rutas = rutas;
    this.funciones(bd,passport);
  }
  this.funciones = (bd,passport)=>
  {
    require('./../../../Modelo/Autenticacion/local.js');
    this.rutas.post('/registrarPersonal',passport.authenticate("local-signup",
    {
      successRedirect: '/',
      failureRedirect: '/Usuarios/Registrar',
      failureFlash: true
    }));
    this.rutas.post("/iniciarSesion",passport.authenticate("local-login",
    {
      successRedirect: '/',
      failureRedirect: '/Usuarios/IniciarSesion',
      failureFlash: true
    }));
  }
}
