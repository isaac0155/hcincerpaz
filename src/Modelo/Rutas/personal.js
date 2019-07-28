
/*
int suma = 0;
Console.WriteLine("Ejercicio2");
Console.WriteLine("Ingresa un numero");
string num = Console.ReadLine();
string[] numeros = new string[num.Length];
for(int i=0;i<num.Length;i++)
{
numeros[i] = num[i].ToString();
}
for(int i=0;i<numeros.Length;i++)
{
string text=numeros[i];
if(i!=numeros.length-1)
{
text += "+";
}
else {
text += "=";
}
Console.Write(text);
}
for(int o=0;o<numeros.Length;o++)
{
suma = suma + Convert.ToInt32(numeros[o]);
}
Console.Write(suma);



Console.WriteLine("Ingrese el largo del arreglo");
int largo = Convert.toInt32(Console.ReadLine());

int[] n = new int[largo];
int p = 0, n = 0, c = 0;

Random r = new Random();
for(int i=0; i<n.length; i++)
{
int num = r.next(-100,100);
n[i] = num;
Console.Write(n[i] + " ");
if(num==0)
{
c++;
}
if(num<0)
{
n++;
}
if(num>0)
{
p++;
}

}
console.WriteLine("numeros positivos: "+p);
console.WriteLine("numeros negativos: "+n);
console.WriteLine("numeros ceros: "+c);

string[] c = new string[7];
console.WriteLine("ingrese 7 ciudades");
for(int i=0; i<c.length; i++){
c[i] = console.ReadLine();
}
for(int i=0; i<c.length; i++){
console.WriteLine("Ciudad:" + i + c[i]);
}
console.WriteLine("La ciudad con el indice " + i + " es:" + c[i]);


console.WriteLine("Ingrese la cantidad de números que desea");
int cantidad = Convert.toInt32(console.ReadLine());

int[] numeros = new int[cantidad];
int positivos = 0;
int negativos = 0;
int ceros = 0;

Random rnd = new Random();
console.WriteLine("los números son:");
for(int i=0; i<cantidad; i++)
{
  numeros[i] = rnd.next(-100,100);
  console.WriteLine(numeros[i] + " , ");
  if(numeros[i]>0)
  {
    positivos++;
  }
  else
  {
    if(numeros<0)
    {
      negativos++;
    }
    else
    {
      ceros++;
    }
  }
}
console.WriteLine("positivos: "+positivos+" , negativos: "+ negativos + "y ceros: "+ceros);



Console.WriteLine("Ingrese un numero:");
int numero = Convert.toInt32(Console.ReadLine());
int sum = 0;
int aux = 0;
while(numero>0){
aux = Convert.toInt32(numero%10);
suma+= aux;
numero = numero/10;
Console.Write(aux);
if(numero<10)
{
Console.Write("=");
}
else {
Console.Write("+");
}
}
Console.Write(suma);


namespace Harold_Baptista
{
class Program
{
static void Main(string[] args)
{


int pregunta;
do
{

Console.WriteLine("**");
Console.WriteLine("Seleccione una pregunta del 1 al 3");
Console.WriteLine("*");
Console.WriteLine("Presione 0 para salir");
Console.WriteLine("**");
Console.WriteLine("Seleccione una pregunta");
pregunta = Convert.ToInt32(Console.ReadLine());
switch (pregunta)

{
case 1:
{
string[] c = new string[7];
Console.WriteLine("ingrese 7 ciudades");
for (int i = 0; i < c.Length; i++)
{
c[i] = Console.ReadLine();
}
for (int i = 0; i < c.Length; i++)
{
Console.WriteLine("Ciudad:" + i + c[i]);
}
Console.ReadLine();
}
break;
case 2:
{
Console.WriteLine("Ingrese un numero:");
string num = (Console.ReadLine());
int suma = 0;
for (int i = 0; i < num.Length; i++)
{
suma += Convert.ToInt32(num[i].ToString());
}
Console.WriteLine("La suma de los digitos es: " + suma);

Console.ReadLine();
}
break;

case 3:
{
Console.WriteLine("Ingrese el largo del arreglo");
int largo = Convert.ToInt32(Console.ReadLine());

int[] n = new int[largo];
int p = 0, N = 0, C = 0;

Random r = new Random();
for (int i = 0; i < n.Length; i++)
{
int NUM = r.Next(-100, 100);
n[i] = NUM;
Console.Write(n[i] + " ");
if (NUM == 0)
{
C++;
}
if (NUM < 0)
{
N++;
}
if (NUM > 0)
{
p++;
}

}
Console.WriteLine("numeros positivos: " + p);
Console.WriteLine("numeros negativos: " + n);
Console.WriteLine("numeros ceros: " + c);
}
break;
}
}
}
*/

var personal = (rutas,bd,ver)=>
{
  rutas.get("/Usuarios/Registrar",(req,res)=>
  {
    res.render("Paginas/Personal/Registrar",{
      confirmaciones: req.flash("confirmacion")
    });
  });
  rutas.get("/Usuarios/IniciarSesion",(req,res)=>
  {
    res.render("Paginas/Personal/iniciarSesion",{
      confirmaciones: req.flash("confirmacion")
    });
  });
  rutas.get("/Usuarios/Cuenta",ver.verificar,(req,res)=>
  {
    res.render("Paginas/Personal/Cuenta");
  });
}

module.exports = personal;
