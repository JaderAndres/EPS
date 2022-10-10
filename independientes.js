//IDEPENDIENTE

document.getElementById("formulario").addEventListener("submit", crear)

leer();

function crear(e){
    debugger;
    let tipo = document.getElementById("tipoid").value;
    let numero = document.getElementById("numero").value;
    let nombre = document.getElementById("nombre").value;
    let ciudad = document.getElementById("ciudad").value;
    let direccion = document.getElementById("direccion").value;
    let correo = document.getElementById("correo").value;
    let barrio = document.getElementById("barrio").value;
    let sede = document.getElementById("sede").value;
    let deacuerdo = document.getElementById("deacuerdo");

    if(deacuerdo.checked == true)
    {
        deacuerdo = "Si";
    }
    else
    {
        deacuerdo = "No";
    }

    let independiente =  {
        tipo, numero, nombre, ciudad, direccion, correo, barrio, sede, deacuerdo
    }

    console.log(independiente);
   if(localStorage.getItem("Independientes") === null)
   {
        let independientes = [];
        independientes.push(independiente);
        localStorage.setItem("Independientes", JSON.stringify(independientes));
   }
   else
   {        
        let independientes = JSON.parse(localStorage.getItem("Independientes"));
        let dato = independientes.filter(elemento => elemento.numero == numero.trim());
        console.log(dato);
        if(dato.length == 0)
        {
            independientes.push(independiente);
            localStorage.setItem("Independientes", JSON.stringify(independientes));
            
            leer();

            document.getElementById("formulario").reset();
            e.preventDefault();
            
            alert("El independiente con número " + numero.trim() +  " ha sido guardado exitosamente");
        }
        else
        {
            e.preventDefault();

            alert("El independiente con número " + numero.trim() + " no se puede crear porque ya exite!. Debe ingresar otro.");
        }
   }
    
   
}

function leer()
{
    let independientes = JSON.parse(localStorage.getItem("Independientes"));
    document.getElementById("tbody").innerHTML ="";
    for(let i=0; i<independientes.length; i++)
    {
        let tipo = independientes[i].tipo;
        let numero = independientes[i].numero;
        let nombre = independientes[i].nombre;
        let ciudad = independientes[i].ciudad;
        let direcion = independientes[i].direccion;
        let correo  = independientes[i].correo;
        let barrio = independientes[i].barrio;
        let sede  = independientes[i].sede;
        let deacuerdo = independientes[i].deacuerdo;        

        document.getElementById("tbody").innerHTML +=
        `<tr>
            <td>${tipo}</td>
            <td>${numero}</td>
            <td>${nombre}</td>
            <td>${ciudad}</td>
            <td>${direcion}</td>
            <td>${correo}</td>
            <td>${barrio}</td>
            <td>${sede}</td>
            <td>${deacuerdo}</td>
            <td><button class="btn btnMostrar" onclick="mostrar('${numero}')">Mostrar</button></td>
        </tr>       
        `
    }
}



function mostrar(parNumero)
{
    let tipo = document.getElementById("tipoid");
    let numero = document.getElementById("numero");
    let nombre = document.getElementById("nombre");
    let ciudad = document.getElementById("ciudad");
    let direccion = document.getElementById("direccion");
    let correo = document.getElementById("correo");
    let barrio = document.getElementById("barrio");
    let sede = document.getElementById("sede");
    let deacuerdo = document.getElementById("deacuerdo");

    tipo.disabled = true;
    numero.disabled = true; 

    let independientes = JSON.parse(localStorage.getItem("Independientes"));
    let dato = independientes.filter(elemento => elemento.numero == parNumero.trim());
    tipo.value = dato[0]["tipo"].trim();
    numero.value = dato[0]["numero"].trim();
    nombre.value = dato[0]["nombre"].trim();
    ciudad.value = dato[0]["ciudad"].trim();
    direccion.value = dato[0]["direccion"].trim();
    correo.value = dato[0]["correo"].trim();
    barrio.value = dato[0]["barrio"].trim();
    sede.value = dato[0]["sede"].trim();
    if (dato[0]["deacuerdo"] == "Si")
    {
        deacuerdo.checked = true;
    }
    else
    {
        deacuerdo.checked = false;
    }
    
}

function actualizar(i)
{  
    
    let tipo = document.getElementById("tipoid");
    let numero = document.getElementById("numero");
    let nombre = document.getElementById("nombre");
    let ciudad = document.getElementById("ciudad");
    let direccion = document.getElementById("direccion");
    let correo = document.getElementById("correo");
    let barrio = document.getElementById("barrio");
    let sede = document.getElementById("sede");
    let deacuerdo = document.getElementById("deacuerdo");

    if(numero.value.trim() != "")
    {
        let independientes = JSON.parse(localStorage.getItem("Independientes"));
        let dato = independientes.filter(elemento => elemento.numero == numero.value.trim());
        if(dato.length != 0)
        {
            console.log(dato);
            dato[0]["tipo"].tipo = tipo.value;
            dato[0]["numero"] = numero.value.trim();
            dato[0]["nombre"] = nombre.value.trim();
            dato[0]["ciudad"] = ciudad.value.trim();
            dato[0]["direccion"] = direccion.value.trim();
            dato[0]["correo"] = correo.value.trim();
            dato[0]["barrio"] = barrio.value.trim();
            dato[0]["sede"] = sede.value.trim();
            
            if(deacuerdo.checked == true)
            {
                dato[0]["deacuerdo"] = "Si";
            }
            else
            {
                dato[0]["deacuerdo"] = "No";
            }

            localStorage.setItem("Independientes", JSON.stringify(independientes));

            alert("El independiente con número " + numero.value.trim() +  " ha sido actualizado exitosamente");

            limpiar();

            leer();
        }
        else
        {
            alert("No existe el registro " + numero.value.trim() + " No se puede realizar una actualización!");
        }
    }
    else
    {
        alert("Debe seleccionar un registro de la tabla para actualizar!");
    }
}

//Eliminar
function eliminar()
{ 
    let numero = document.getElementById("numero");

    if(numero.value.trim() != "")
    {
        let independientes = JSON.parse(localStorage.getItem("Independientes"));
        let index = independientes.findIndex(x => x.numero == numero.value.trim());
        
        if(index != -1)
        {        
            independientes.splice(index,1);
            console.log(independientes);

            localStorage.setItem("Independientes", JSON.stringify(independientes));
        
            alert("El independiente con número " + numero.value.trim() + " ha sido eliminado exitosamente");

            limpiar();
            leer();
        }
        else
        {
            alert("El registro no existe!");
        }   
    }  
    else
    {
        alert("Debe seleccionar un registro de la tabla para eliminar!");
    }     
}

function limpiar()
{
    let tipo = document.getElementById("tipoid");
    let numero = document.getElementById("numero");
    let nombre = document.getElementById("nombre");
    let ciudad = document.getElementById("ciudad");
    let direccion = document.getElementById("direccion");
    let correo = document.getElementById("correo");
    let barrio = document.getElementById("barrio");
    let sede = document.getElementById("sede");
    let deacuerdo = document.getElementById("deacuerdo");

    tipo.value = "";
    numero.value = "";
    nombre.value = "";
    ciudad.value = "";
    direccion.value = "";
    correo.value = "";
    barrio.value = "";
    sede.value = "";
    deacuerdo.checked = false;
    
    tipo.disabled = false;
    numero.disabled = false; 
}

