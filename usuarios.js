// USUARIOS

//document.getElementById("formularioCitas").addEventListener("submit", crear)

//leer();

function ingresoUsuario()
{
    let user = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contra").value;

    let usuarios = JSON.parse(localStorage.getItem("Usuarios"));
    if(usuarios != null)
    {
        //Valida credenciales
        let dato = usuarios.filter(elemento => elemento.usu == user.trim());        
        if(dato.length != 0)
        {
            if(dato[0]["contrasena"].trim() == contrasena.trim())
            {                
                alert("Bienvenido");
                location.href = "home.html";
            }
            else
            {
                alert("Contraseña inválida!");
            }
        }
        else
        {
            alert("El usuario ingresado no está registrado!");
        }
    }
    else
    {
        //Por aqui viene cuando usuarios está null.
        alert("No hay usuarios registrados!");
    }
}

function crear(){
        
        let tipoIdenti = document.getElementById("tipoid").value;
        let identiUsuario = document.getElementById("numeroid").value;
        let nombreCompleto = document.getElementById("nombreCompletoUsuario").value;
        let correoUsuario = document.getElementById("correoUsuario").value;
        let usu =  document.getElementById("usu").value;
        let contrasena = document.getElementById("contrasena").value;
        alert("Contraseña: " + contrasena);
        if(tipoIdenti.trim() == null || tipoIdenti.trim() == "")
        {
            alert("Ingrese el tipo de identidad para continuar");
            return;
        }            
        else if((identiUsuario.trim() == null || identiUsuario.trim() == ""))
        {
            alert("Ingrese número para continuar");
            return false;
        }
        else if ((nombreCompleto.trim() == null || nombreCompleto.trim() == ""))
        {
            alert("Ingrese el nombre completo para continuar");
            return false;
        }
        else if ((correoUsuario.trim() == null || correoUsuario.trim() == ""))
        {
            alert("Ingrese el correo para continuar");
            return false;
        }
        else if ((usu.trim() == null || usu.trim() == ""))
        {
            alert("Ingrese el usuario para continuar");
            return false;
        }
        else if ((contrasena.trim() == null || contrasena.trim() == ""))
        {
            alert("Ingrese la contraseña para continuar");
            return false;
        }


        let usuario =  {
            tipoIdenti, identiUsuario, nombreCompleto, correoUsuario, usu, contrasena
        }
        
        if(localStorage.getItem("Usuarios") === null)
        {
            let usuarios = [];
            usuarios.push(usuario);
            localStorage.setItem("Usuarios", JSON.stringify(usuarios));            
        }
        else
        {
            let usuarios = JSON.parse(localStorage.getItem("Usuarios"));
            let dato = usuarios.filter(elemento => elemento.identiUsuario == identiUsuario.trim());
            if(dato.length == 0)
            {
                usuarios.push(usuario)
                localStorage.setItem("Usuarios", JSON.stringify(usuarios))
                
                leer();

                alert("El usuario con número " + identiUsuario.trim() +  " ha sido guardado exitosamente");
            }
            else
            {
                alert("El usuario con número " + identiUsuario.trim() + " no se puede crear porque ya exite!. Debe ingresar otro.");
            }
        }
        
   
    
}

// leer();

function leer()
{
    let usuarios = JSON.parse(localStorage.getItem("Usuarios"));
    console.log(usuarios);
    if(usuarios.length != 0)
    {
        // debugger;
        document.getElementById("tbody").innerHTML = "";
        for(let i=0; i<usuarios.length; i++)
        {
            
            let tipoIdenti = usuarios[i].tipoIdenti;
            let identiUsuario = usuarios[i].identiUsuario;
            let nombreCompleto = usuarios[i].nombreCompleto;
            let correoUsuario = usuarios[i].correoUsuario;
            let usu = usuarios[i].usu;
            let contrasena  = usuarios[i].contrasena;

            document.getElementById("tbody").innerHTML +=
            `<tr>
                <td>${tipoIdenti}</td>
                <td>${identiUsuario}</td>
                <td>${nombreCompleto}</td>
                <td>${correoUsuario}</td>
                <td>${usu}</td>
                <td>${contrasena}</td>
                <td><button class="btn btnMostrar" onclick="mostrar('${identiUsuario}')">Mostrar</button></td>
            </tr>       
            `
        }
    }
}

function mostrar(parNumero)
{    
    let tipoIdenti = document.getElementById("tipoid");
    let identiUsuario = document.getElementById("numeroid");
    let nombreCompleto = document.getElementById("nombreCompletoUsuario");
    let correoUsuario = document.getElementById("correoUsuario");
    let usu =  document.getElementById("usu");
    let contrasena = document.getElementById("contrasena");

    tipoIdenti.disabled = true;
    identiUsuario.disabled = true; 

    let usuarios = JSON.parse(localStorage.getItem("Usuarios"));    
    let dato = usuarios.filter(elemento => elemento.identiUsuario == parNumero.trim());
    console.log(dato);
    tipoIdenti.value = dato[0]["tipoIdenti"].trim();
    identiUsuario.value = dato[0]["identiUsuario"].trim();
    nombreCompleto.value = dato[0]["nombreCompleto"].trim();
    correoUsuario.value = dato[0]["correoUsuario"].trim();
    usu.value = dato[0]["usu"].trim();
    contrasena.value = dato[0]["contrasena"].trim();
    
}

function actualizar(i)
{  
    
    let tipoIdenti = document.getElementById("tipoid");
    let identiUsuario = document.getElementById("numeroid");
    let nombreCompleto = document.getElementById("nombreCompletoUsuario");
    let correoUsuario = document.getElementById("correoUsuario");
    let usu =  document.getElementById("usu");
    let contrasena = document.getElementById("contrasena"); 

    if(identiUsuario.value.trim() != "")
    {
        let usuarios = JSON.parse(localStorage.getItem("Usuarios"));
        let dato = usuarios.filter(elemento => elemento.identiUsuario == identiUsuario.value.trim());
        if(dato.length != 0)
        {
            console.log(dato);
            dato[0]["tipoIdenti"] = tipoIdenti.value;
            dato[0]["identiUsuario"] = identiUsuario.value.trim();
            dato[0]["nombreCompleto"] = nombreCompleto.value.trim();
            dato[0]["correoUsuario"] = correoUsuario.value.trim();
            dato[0]["usu"] = usu.value.trim();
            dato[0]["contrasena"] = contrasena.value.trim();
            
            localStorage.setItem("Usuarios", JSON.stringify(usuarios));

            alert("El usuario con número " + identiUsuario.value.trim() +  " ha sido actualizado exitosamente");

            limpiar();

            leer();
        }
        else
        {
            alert("No existe el registro " + identiUsuario.value.trim() + " No se puede realizar una actualización!");
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
    let identiUsuario = document.getElementById("numeroid");

    if(identiUsuario.value.trim() != "")
    {
        let usuarios = JSON.parse(localStorage.getItem("Usuarios"));
        let index = usuarios.findIndex(x => x.identiUsuario == identiUsuario.value.trim());
        
        if(index != -1)
        {        
            usuarios.splice(index,1);

            localStorage.setItem("Usuarios", JSON.stringify(usuarios));
        
            alert("El usuario con de número " + identiUsuario.value.trim() + " ha sido eliminado exitosamente");

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
    let tipoIdenti = document.getElementById("tipoid");
    let identiUsuario = document.getElementById("numeroid");
    let nombreCompleto = document.getElementById("nombreCompletoUsuario");
    let correoUsuario = document.getElementById("correoUsuario");
    let usu =  document.getElementById("usu");
    let contrasena = document.getElementById("contrasena");  

    tipoIdenti.value = "";
    identiUsuario.value = "";
    nombreCompleto.value = "";
    correoUsuario.value = "";
    usu.value = "";
    contrasena.value = "";
    
    tipoIdenti.disabled = false;
    identiUsuario.disabled = false; 
}

function validarEntradas()
{
    let tipoIdenti = document.getElementById("tipoid");
    let identiUsuario = document.getElementById("numeroid");
    let nombreCompleto = document.getElementById("nombreCompletoUsuario");
    let correoUsuario = document.getElementById("correoUsuario");
    let usu =  document.getElementById("usu");
    let contrasena = document.getElementById("contrasena");
    debugger;
    alert(identiUsuario.value);
    if(tipoIdenti.value = "")
    {
        alert("Ingrese el tipo de identidad para continuar");
        return false;
    }
    else if(identiUsuario.value.trim() = "")
    {
        alert("Ingrese número para continuar");
        return false;
    }
    else if(nombreCompleto.value = "")
    {
        alert("Ingrese el nombre completo para continuar");
        return false;
    }
    else if(correoUsuario.value = "")
    {
        alert("Ingrese el correo para continuar");
        return false;
    }
    else if(usu.value = "")
    {
        alert("Ingrese el usuario para continuar");
        return false;
    }
    else if(contrasena.value = "")
    {
        alert("Ingrese la contraseña para continuar");
        return false;
    }
    else
    {
        return true;
    }
    
}