var activadores = document.getElementsByClassName("modalActivar");
for (var i = 0; i < activadores.length; i++) {
  activadores[i].addEventListener("click",(e)=>
  {
    //document.getElementById("modal"+e.target.id.toString().substring(3)).style.opacity = "0";
    document.getElementById("modal"+e.target.id.toString().substring(3)).style.display = "flex";
    /*
    console.log("antes",document.getElementById("modal"+e.target.id.toString().substring(3)).offsetHeight);
    console.log("deberia",document.body.offsetHeight);
    document.getElementById("modal"+e.target.id.toString().substring(3)).offsetHeight = document.body.offsetHeight;
    console.log("despues",document.getElementById("modal"+e.target.id.toString().substring(3)).offsetHeight);
    console.log("deberia",document.body.offsetHeight);*/
    //$("modal"+e.target.id.toString().substring(3)).fadeIn(2000,"linear");
  });
}

var desactivadores = document.getElementsByClassName("modalCerrar");
for (var i = 0; i < desactivadores.length; i++) {

  desactivadores[i].addEventListener("click",(e)=>
  {
    //console.log(e.target);
    document.getElementById("modal"+e.target.id.toString().substring(3)).style.display = "none";
    /*$("modal"+e.target.id.toString().substring(3)).fadeOut(500,"linear",()=>
    {
      document.getElementById("modal"+e.target.id.toString().substring(3)).style.display = "none";
    });*/
  });
}
