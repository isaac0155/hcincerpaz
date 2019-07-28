function ordenarFichas(marh,marv,contenedor,clase)
{
  var fichas = document.getElementsByClassName(clase);
  var ancho = fichas[0].offsetWidth;
  var alto = fichas[0].offsetHeight;
  var ancont = contenedor.offsetWidth;
  var cant = Math.floor(ancont/(ancho+(marh*2)));
  var izq = contenedor.getBoundingClientRect().left;
  for (var i = 0; i < fichas.length; i++) {
    fichas[i].style.position = "absolute";
    fichas[i].style.zIndex = "1";
    var leftIdeal = (marh+((i%cant)*(ancho+marh*2)));
    var leftInicial = izq+(ancont-((ancho+marh*2)*cant))/2;
    fichas[i].style.left = (leftInicial+leftIdeal).toString()+"px";
    fichas[i].style.top = (marv + Math.floor(i/cant)*(alto+marv*2)+cont.offsetTop).toString() + "px";
  }
  document.getElementById("piePagina").style.position = "absolute";
  if((fichas.length%cant)==0)
  {
    cont.style.height = ((alto+marv*2)*(Math.floor(fichas.length/cant))).toString()+"px";
  }
  else
  {
    cont.style.height = ((alto+marv*2)*(Math.floor(fichas.length/cant)+1)).toString()+"px";
  }
  document.getElementById("contenido").style.height = cont.offsetHeight.toString()+"px";
  //document.getElementById("piePagina").offsetTop = cont.style.height+"px 0 0 0";
}

var cont = document.getElementsByClassName("Productos")[0];

window.addEventListener("resize", ()=>
{
  ordenarFichas(20,20,cont,"ficha");
})
setTimeout(()=>{ordenarFichas(20,20,cont,"ficha");},100)
