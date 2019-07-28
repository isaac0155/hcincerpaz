module.exports = new peticion();
function peticion() {
  this.rutas;
  this.iniciar = (rutas)=>
  {
    this.rutas = rutas;
    this.rutas.post("/",(req,res)=>
    {
      var nombre = req.body.nombre;
      console.log("peticion en la pagina de inicio:",nombre);
      res.redirect("/");
    });
  }
}
