document.getElementById("formulario").addEventListener("submit", crearEmpleador)

leer();

function crearEmpleador(e){
    let tipo = document.getElementById("tipoid").value;
    let numero = document.getElementById("numero").value;
    let empresa = document.getElementById("empresa").value;
    let ciudad = document.getElementById("ciudad").value;
    let direccion = document.getElementById("direccion").value;
    let correo = document.getElementById("correo").value;
    let codigopostal = document.getElementById("codigopostal").value;
    let regimen = document.getElementById("regimen").value;
    let deacuerdo = document.getElementById("deacuerdo");

    if(deacuerdo.checked == true)
    {
        deacuerdo = "Si";
    }
    else
    {
        deacuerdo = "No";
    }

    let empleador =  {
        tipo, numero, empresa, ciudad, direccion, correo, codigopostal, regimen, deacuerdo
    }
 
   if(localStorage.getItem("Empleadores") === null)
   {
        // alert("Por el if al crear");
        let empleadores = [];
        empleadores.push(empleador);
        localStorage.setItem("Empleadores", JSON.stringify(empleadores));
   }
   else
   {        
        // alert("Por el else al crear");
        //debugger;
        let empleadores = JSON.parse(localStorage.getItem("Empleadores"));
        let dato = empleadores.filter(elemento => elemento.numero == numero.trim());
        // alert(dato.length);
        console.log(dato);
        if(dato.length == 0)
        {
            empleadores.push(empleador);
            localStorage.setItem("Empleadores", JSON.stringify(empleadores));
            
            leer();

            document.getElementById("formulario").reset();
            e.preventDefault();
            
            alert("El empleador con número " + numero.trim() +  " ha sido guardado exitosamente");
        }
        else
        {
            e.preventDefault();

            alert("El empleador con número " + numero.trim() + " no se puede crear porque ya exite!. Debe ingresar otro.");
        }
   }
    
   
}

function leer()
{
    let empleador = JSON.parse(localStorage.getItem("Empleadores"));
    document.getElementById("tbody").innerHTML ="";
    for(let i=0; i<empleador.length; i++)
    {
        let tipo = empleador[i].tipo;
        let numero = empleador[i].numero;
        let empresa = empleador[i].empresa;
        let ciudad = empleador[i].ciudad;
        let direcion = empleador[i].direccion;
        let correo  = empleador[i].correo;
        let codigopostal = empleador[i].codigopostal;
        let regimen  = empleador[i].regimen;
        let deacuerdo = empleador[i].deacuerdo;        

        document.getElementById("tbody").innerHTML +=
        `<tr>
            <td>${tipo}</td>
            <td>${numero}</td>
            <td>${empresa}</td>
            <td>${regimen}</td>
            <td>${direcion}</td>
            <td>${ciudad}</td>
            <td>${correo}</td>
            <td>${codigopostal}</td>
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
    let empresa = document.getElementById("empresa");
    let ciudad = document.getElementById("ciudad");
    let direccion = document.getElementById("direccion");
    let correo = document.getElementById("correo");
    let codigopostal = document.getElementById("codigopostal");
    let regimen = document.getElementById("regimen");
    let deacuerdo = document.getElementById("deacuerdo");

    tipo.disabled = true;
    numero.disabled = true; 

    let empleadores = JSON.parse(localStorage.getItem("Empleadores"));
    let dato = empleadores.filter(elemento => elemento.numero == parNumero.trim());
    tipo.value = dato[0]["tipo"].trim();
    numero.value = dato[0]["numero"].trim();
    empresa.value = dato[0]["empresa"].trim();
    ciudad.value = dato[0]["ciudad"].trim();
    direccion.value = dato[0]["direccion"].trim();
    correo.value = dato[0]["correo"].trim();
    codigopostal.value = dato[0]["codigopostal"].trim();
    regimen.value = dato[0]["regimen"].trim();
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
    let empresa = document.getElementById("empresa");
    let ciudad = document.getElementById("ciudad");
    let direccion = document.getElementById("direccion");
    let correo = document.getElementById("correo");
    let codigopostal = document.getElementById("codigopostal");
    let regimen = document.getElementById("regimen");
    let deacuerdo = document.getElementById("deacuerdo");  

    if(numero.value.trim() != "")
    {
        let empleadores = JSON.parse(localStorage.getItem("Empleadores"));
        let dato = empleadores.filter(elemento => elemento.numero == numero.value.trim());
        if(dato.length != 0)
        {
            console.log(dato);
            dato[0]["tipo"].tipo = tipo.value;
            dato[0]["numero"] = numero.value.trim();
            dato[0]["empresa"] = empresa.value.trim();
            dato[0]["ciudad"] = ciudad.value.trim();
            dato[0]["direccion"] = direccion.value.trim();
            dato[0]["correo"] = correo.value.trim();
            dato[0]["codigopostal"] = codigopostal.value.trim();
            dato[0]["regimen"] = regimen.value.trim();
            
            if(deacuerdo.checked == true)
            {
                dato[0]["deacuerdo"] = "Si";
            }
            else
            {
                dato[0]["deacuerdo"] = "No";
            }

            localStorage.setItem("Empleadores", JSON.stringify(empleadores));

            alert("El empleador con número " + numero.value.trim() +  " ha sido actualizado exitosamente");

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
        let empleadores = JSON.parse(localStorage.getItem("Empleadores"));
        let index = empleadores.findIndex(x => x.numero == numero.value.trim());
        
        if(index != -1)
        {        
            empleadores.splice(index,1);
            console.log(empleadores);

            localStorage.setItem("Empleadores", JSON.stringify(empleadores));
        
            alert("El empleador con número " + numero.value.trim() + " ha sido eliminado exitosamente");

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
    let empresa = document.getElementById("empresa");
    let ciudad = document.getElementById("ciudad");
    let direccion = document.getElementById("direccion");
    let correo = document.getElementById("correo");
    let codigopostal = document.getElementById("codigopostal");
    let regimen = document.getElementById("regimen");
    let deacuerdo = document.getElementById("deacuerdo");

    tipo.value = "";
    numero.value = "";
    empresa.value = "";
    ciudad.value = "";
    direccion.value = "";
    correo.value = "";
    codigopostal.value = "";
    regimen.value = "";
    deacuerdo.checked = false;
    
    tipo.disabled = false;
    numero.disabled = false; 
}

