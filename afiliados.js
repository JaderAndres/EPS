// AFILIADOS

document.getElementById("formularioCitas").addEventListener("submit", crear)

leer();

function crear(e){
    let tipo = document.getElementById("tipoid").value;
    let numero = document.getElementById("numero").value;
    let paciente = document.getElementById("paciente").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let especialidad = document.getElementById("especialidad").value;        

    let cita =  {
        tipo, numero, paciente, fecha, hora, especialidad
    }
 
   if(localStorage.getItem("Citas") === null)
   {
        let citas = [];
        citas.push(cita);
        localStorage.setItem("Citas", JSON.stringify(citas));
   }
   else
   {        
        let citas = JSON.parse(localStorage.getItem("Citas"));
        let dato = citas.filter(elemento => elemento.numero == numero.trim());
        console.log(dato);
        if(dato.length == 0)
        {
            citas.push(cita);
            localStorage.setItem("Citas", JSON.stringify(citas));
            
            leer();

            document.getElementById("formularioCitas").reset();
            e.preventDefault();
            
            alert("El cita del paciente con número " + numero.trim() +  " ha sido guardado exitosamente");
        }
        else
        {
            e.preventDefault();

            alert("El cita del paciente con número " + numero.trim() + " no se puede crear porque ya exite!. Debe ingresar otro.");
        }
   }
    
   
}

function leer()
{
    let cita = JSON.parse(localStorage.getItem("Citas"));
    document.getElementById("tbody").innerHTML ="";
    for(let i=0; i<cita.length; i++)
    {
        let tipo = cita[i].tipo;
        let numero = cita[i].numero;
        let paciente = cita[i].paciente;
        let fecha = cita[i].fecha;
        let hora = cita[i].hora;
        let especialidad  = cita[i].especialidad;

        document.getElementById("tbody").innerHTML +=
        `<tr>
            <td>${tipo}</td>
            <td>${numero}</td>
            <td>${paciente}</td>
            <td>${fecha}</td>
            <td>${hora}</td>
            <td>${especialidad}</td>
            <td><button class="btn btnMostrar" onclick="mostrar('${numero}')">Mostrar</button></td>
        </tr>       
        `
    }
}



function mostrar(parNumero)
{
    let tipo = document.getElementById("tipoid");
    let numero = document.getElementById("numero");
    let paciente = document.getElementById("paciente");
    let fecha = document.getElementById("fecha");
    let hora = document.getElementById("hora");
    let especialidad = document.getElementById("especialidad");      

    tipo.disabled = true;
    numero.disabled = true; 

    let citas = JSON.parse(localStorage.getItem("Citas"));
    let dato = citas.filter(elemento => elemento.numero == parNumero.trim());
    tipo.value = dato[0]["tipo"].trim();
    numero.value = dato[0]["numero"].trim();
    paciente.value = dato[0]["paciente"].trim();
    fecha.value = dato[0]["fecha"].trim();
    hora.value = dato[0]["hora"].trim();
    especialidad.value = dato[0]["especialidad"].trim();
    
}

function actualizar(i)
{  
    
    let tipo = document.getElementById("tipoid");
    let numero = document.getElementById("numero");
    let paciente = document.getElementById("paciente");
    let fecha = document.getElementById("fecha");
    let hora = document.getElementById("hora");
    let especialidad = document.getElementById("especialidad");      

    if(numero.value.trim() != "")
    {
        let citas = JSON.parse(localStorage.getItem("Citas"));
        let dato = citas.filter(elemento => elemento.numero == numero.value.trim());
        if(dato.length != 0)
        {
            console.log(dato);
            dato[0]["tipo"].tipo = tipo.value;
            dato[0]["numero"] = numero.value.trim();
            dato[0]["paciente"] = paciente.value.trim();
            dato[0]["fecha"] = fecha.value.trim();
            dato[0]["hora"] = hora.value.trim();
            dato[0]["especialidad"] = especialidad.value.trim();
            
            localStorage.setItem("Citas", JSON.stringify(citas));

            alert("La cita del paciente de número " + numero.value.trim() +  " ha sido actualizado exitosamente");

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
        let citas = JSON.parse(localStorage.getItem("Citas"));
        let index = citas.findIndex(x => x.numero == numero.value.trim());
        
        if(index != -1)
        {        
            citas.splice(index,1);
            console.log(citas);

            localStorage.setItem("Citas", JSON.stringify(citas));
        
            alert("La cita del paciente de número " + numero.value.trim() + " ha sido eliminado exitosamente");

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
    let paciente = document.getElementById("paciente");
    let fecha = document.getElementById("fecha");
    let hora = document.getElementById("hora");
    let especialidad = document.getElementById("especialidad");   

    tipo.value = "";
    numero.value = "";
    paciente.value = "";
    fecha.value = "";
    hora.value = "";
    especialidad.value = "";
    
    tipo.disabled = false;
    numero.disabled = false; 
}

function validarFechaHoraCita(fechaAnterior, horaAnterior)
{
    let valida = false;

    let nuevaFecha = document.getElementById("fecha");
    let nuevaHora = document.getElementById("hora");

    let fechas = new Date();


    return valida;
}