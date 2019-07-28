module.exports = new obj();
function obj()
{
  this.verificar = (req, res, next)=>{
    if(req.isAuthenticated())
    {
      console.log("usuario actual: ",req.user);
      return next();
    }
    else
    {
      req.flash("error","primero es necesario iniciar sesion")
      res.redirect('/');
    }
  }
  this.verificarAdmin = (req, res, next)=>{
    if(req.isAuthenticated())
    {
      if(req.user.cargo!="Administrador")
      {
        return next();
      }
      else
      {
        req.flash("error","primero es necesario iniciar sesion como Administrador");
        res.redirect('/');
      }
      return next();
    }
    else
    {
      req.flash("error","primero es necesario iniciar sesion")
      res.redirect('/');
    }
  }

}
