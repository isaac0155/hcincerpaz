




function MostrarFecha(fecha)
{
var nombres_dias = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
var nombres_meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
var fecha_actual = fecha;

dia_mes = fecha_actual.getDate() //dia del mes
dia_semana = fecha_actual.getDay() //dia de la semana
mes = fecha_actual.getMonth() + 1
anio = fecha_actual.getFullYear()

var fechaHora = new Date();
var horas = fechaHora.getHours();
var minutos = fechaHora.getMinutes();
var segundos = fechaHora.getSeconds();
var sufijo = 'AM';

if(horas > 12) {
horas = horas - 12;
sufijo = "PM";
}

if(horas < 10) { horas = "0" + horas; }
if(minutos < 10) { minutos = "0" + minutos; }
if(segundos < 10) { segundos = "0" + segundos; }

//escribe en pagina
var ret = (nombres_dias[dia_semana] + ", " + dia_mes + " de " + nombres_meses[mes - 1] + " de " + anio + ", "+ horas + ":"+minutos +":"+segundos+ " " + sufijo);

return ret;
}












/*

var fecha = new Date("2018-04-01");
var actual = new Date();
var string = actual.toString();
var otro = new Date("1998","9","14","12","43","9")

console.log("fecha ejemplo",fecha);
console.log("actual",actual);
console.log("actualString", string);
console.log("fecha todate string", actual.toUTCString());
var fechaDesdeString = new Date(string);

console.log(fechaDesdeString.toString());
console.log(otro);
console.log("fecha de la funcion", MostrarFecha(otro));
*/
setInterval(()=>
{
  var act = new Date();
  var mostrar = act.toUTCString();
  document.getElementById("reloj").innerHTML=MostrarFecha(new Date(mostrar));
},1000);
