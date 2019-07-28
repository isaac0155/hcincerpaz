module.exports = (passport)=>
{
  var bcrypt = require('bcryptjs');

  var bd = require('./../BD/bd.js');
  bd.iniciar();

    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user,done)=>
    {
    //  console.log("serializando usuario",user);
      done(null, user.ci);
    });
    passport.deserializeUser((id, done) => {
      console.log(id);
      bd.cruds.crudPersonal.leerID(id,(usuario)=>
      {
      //  console.log("desearializando",usuario[0][0]);
        done(null, usuario[0][0]);
      });
    });
    passport.use("local-signup", new LocalStrategy({
      usernameField: 'ci',
      passwordField: 'contra',
      passReqToCallback: true
    },(req,ci,contra,done)=>
    {
      console.log("hoooolaes");
      bd.conexion.query("select * from personal where ci = "+ci,(err,rows)=>
      {
        if(rows.length>0)
        {
          return done(null, false, req.flash('confirmacion', 'Este carnet ya fue registrado'));
        }
        else
        {
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(contra, salt, function(err, hash) {
              var datos = [
                req.body.nombre,
                req.body.apellido,
                ci,
                req.body.correo,
                req.body.tel,
                req.body.dir,
                req.body.fena,
                req.body.cargo,
                req.body.actividad,
                hash
              ];
              var usuario =
              {
                nombre:req.body.nombre,
                apellidos:req.body.apellido,
                ci:ci,
                correo:req.body.correo,
                telefono:req.body.tel,
                direccion:req.body.dir,
                fecha_nacimiento:req.body.fena,
                cargo:req.body.cargo,
                actividad:req.body.actividad,
                contra:contra
              }
              bd.conexion.query("insert into personal (nombre, apellidos, ci, correo, telefono, direccion, fecha_nacimiento, id_cargo, actividad, contra) values (?,?,?,?,?,?,?,?,?,?);",datos,(err,rows)=>
              {
                usuario.id = rows.insertId;
                return done(null,usuario);
              });
            });
          });
        }
      });
    }));

    passport.use('local-login', new LocalStrategy({
       usernameField : 'ci',
       passwordField: 'contra',
       passReqToCallback: true
     }, (req, ci, contra, done)=> {
       bd.cruds.crudPersonal.leerID(ci, (usuario)=>{
        if(!(usuario[0].length>0)){
         return done(null, false, req.flash('confirmacion', 'Usuario no encontrado'));
        }
        else
        {
          bcrypt.compare(contra, usuario[0][0].contra, function(err, resp) {
            if(err) console.log(err);
              if(resp==true)
              {
                req.session.usuario = usuario[0][0];
                //console.log("session nueva",req.session);
                return done(null, usuario[0][0], req.flash("confirmacion","Bienvenido de nuevo "+ usuario[0][0].nombre+" "+usuario[0][0].apellidos));
              }
              else
              {
                return done(null, false, req.flash('confirmacion', 'Contraseña incorrecta'));
              }
          });
        }
       });
      })
    );
  

}
