const path = require("path");
const express = require('express');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

var app = express();

var puerto = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"/public")));

app.use(cookieParser());


var MySQLStore = require('express-mysql-session')(session);

var options = {
    host: 'localhost',
    user:'root',
    password:'',
    database: 'hcincerpaz'
};

//var connection = mysql.createConnection(options); // or mysql.createPool(options);
var sessionStore = new MySQLStore(options);

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  rolling: true,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 'COOKIE_TIMEOUT',
    maxAge: 1000 * 60 * 60 *24 * 365
  },
  maxAge: 1000 * 60 * 60 *24 * 365,
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

require('./Modelo/Autenticacion/local.js')(passport);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.confirm = req.flash("confirmacion");
  app.locals.error = req.flash("error");
  app.locals.nombre = "hcincerpaz";
  app.locals.usuario = req.user;

  //console.log(app.locals)
  next();
});

app.set("views", path.join(__dirname, "Vista"));
app.set("view engine", "ejs");

var rutas = require('./Modelo/Rutas/index.js');
app.use(rutas(passport));
app.listen(puerto, ()=>
{
  console.log("Servidor lanzado en el puerto:",puerto);
  /*bd.cruds.crudCliente.leer();
  bd.cruds.crudCliente.ingresar({edad: 28});
  bd.cruds.crudCliente.leer();*/
});
