var foto = document.getElementById("foto");
foto.addEventListener("change",()=>
{
  if (foto.files && foto.files[0])
  {
    var reader = new FileReader();
    document.getElementById("lblfoto").innerHTML = foto.files[0].name;
    reader.onload = (e)=>
    {
      document.getElementById("preVisualizar").src = e.target.result;
    }

    reader.readAsDataURL(foto.files[0]);

  }
});
