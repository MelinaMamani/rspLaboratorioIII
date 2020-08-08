namespace Personas
{
    window.addEventListener("load", function () {
        (<HTMLInputElement>document.getElementById("btnGuardar")).addEventListener("click",guardar);
        (<HTMLInputElement>document.getElementById("filtroHorario")).addEventListener("change",filtrador);
        (<HTMLInputElement>document.getElementById("btnPromedio")).addEventListener("click",promedio);
        (<HTMLInputElement>document.getElementById("btnMostrar")).addEventListener("click",mostrarNA);
    })

    var listaPersonas:Array<Persona> = new Array<Persona>();

    export function guardar() 
    {
        var inputNombre = (<HTMLInputElement>document.getElementById("nombre")).value;
        var nombreMayus = inputNombre.charAt(0).toUpperCase() + inputNombre.slice(1);

        var inputApellido = (<HTMLInputElement>document.getElementById("apellido")).value;
        var apellidoMayus = inputApellido.charAt(0).toUpperCase() + inputApellido.slice(1);

        var inputEdad : number = parseInt((<HTMLInputElement>document.getElementById("edad")).value);
        var inputLegajo : number = parseInt((<HTMLInputElement>document.getElementById("legajo")).value);
        var inputHorario = (<HTMLInputElement>document.getElementById("horario")).value;
        var id :number;

        if (listaPersonas.length == 0) {
            id = 1;
        }
        else {
            var listaPersonasAux = listaPersonas;
            id = listaPersonasAux.reduce(function (maximo, persona) {
                if (persona.getId() >= maximo) {
                    return persona.getId() + 1;
                }
                return maximo;
            }, 0);
        }
        
        var nuevoEmpleado:Empleado = new Empleado(id,nombreMayus,apellidoMayus,inputEdad,inputLegajo,inputHorario);
        listaPersonas.push(nuevoEmpleado);
        crearTabla(listaPersonas);
    }


    export function mostrarNA() 
    {
        var tCuerpoNA = (<HTMLTableElement>document.getElementById("tCuerpoNA"));

        while(tCuerpoNA.rows.length > 0){
            tCuerpoNA.removeChild(tCuerpoNA.childNodes[0]);
        }

        listaPersonas.map(function(personas) {
            var tr = document.createElement("tr");

            var tdNombre = document.createElement("td");
            var nodoTexto = document.createTextNode(personas.nombre);
            tdNombre.appendChild(nodoTexto);
            tr.appendChild(tdNombre);

            var tdApellido = document.createElement("td");
            var nodoTexto = document.createTextNode(personas.apellido);
            tdApellido.appendChild(nodoTexto);
            tr.appendChild(tdApellido);

            (<HTMLElement>tCuerpoNA).appendChild(tr);
        });
        
    }

    export function crearTabla(lista:Array<Persona>){
        var tCuerpo = (<HTMLTableElement>document.getElementById("tCuerpo"));

        while(tCuerpo.rows.length > 0){
            tCuerpo.removeChild(tCuerpo.childNodes[0]);
        }
        
        lista.forEach(persona => {
            var id : any = persona.getId();
            var nombre : string = persona.getNombre();
            var apellido : string = persona.getApellido();
            var edad : any = persona.getEdad(); 
            var legajo: any = persona.getLegajo();
            var horario: string = persona.getHorario();

            var tr = document.createElement("tr");

            var tdNombre = document.createElement("td");
            var nodoTexto = document.createTextNode(nombre);
            tdNombre.appendChild(nodoTexto);
            tr.appendChild(tdNombre);

            var tdApellido = document.createElement("td");
            var nodoTexto = document.createTextNode(apellido);
            tdApellido.appendChild(nodoTexto);
            tr.appendChild(tdApellido);

            var tdEdad = document.createElement("td");
            var nodoTexto = document.createTextNode(edad);
            tdEdad.appendChild(nodoTexto);
            tr.appendChild(tdEdad);

            var tdLegajo = document.createElement("td");
            var nodoTexto = document.createTextNode(legajo);
            tdLegajo.appendChild(nodoTexto);
            tr.appendChild(tdLegajo);

            var tdHorario = document.createElement("td");
            var nodoTexto = document.createTextNode(horario);
            tdHorario.appendChild(nodoTexto);
            tr.appendChild(tdHorario);

            var tdAccion = document.createElement("td");
            var btnEliminar = document.createElement("input");
            btnEliminar.type = "button";
            btnEliminar.className = "eliminar"
            btnEliminar.id = "eliminar" + id;
            btnEliminar.value = "Eliminar";
            btnEliminar.addEventListener("click",getPosition)
            btnEliminar.onclick = function(){eliminar(lista.indexOf(persona))};
            tdAccion.appendChild(btnEliminar);
            tr.appendChild(tdAccion);

            (<HTMLElement>tCuerpo).appendChild(tr);
        })
    }

    function getPosition(event:any){
        var position = event.target.parentNode.parentNode.rowIndex;
        console.log(position);
    }
    
    export function eliminar(position:any) {

        listaPersonas.splice(position,1);
        crearTabla(listaPersonas);

    }

    var listaFiltradaGlobal:Array<Persona> = new Array<Persona>();

    function borrarTabla()
    {
        let tCuerpo = document.getElementById("tCuerpo");
        (<HTMLInputElement>tCuerpo).innerHTML = "";
    }

    function rearmarTabla(filterVehiculo:Array<Persona>){
        filterVehiculo.forEach(x => {
            if((<Empleado>x).horario == "Mañana")
            {
                crearTabla(filterVehiculo);
            }else if((<Empleado>x).horario == "Tarde")
            {
                crearTabla(filterVehiculo);
            }
            else
            {
                crearTabla(filterVehiculo);
            }
            
        });
    }

    export function filtrador()
    {
        if((<HTMLInputElement>document.getElementById("filtroHorario")).value == "Mañana")
        {
           var searchInput =  "Mañana";
        }else if((<HTMLInputElement>document.getElementById("filtroHorario")).value == "Tarde")
        {
            var searchInput = "Tarde";
        }
        else{
            var searchInput = "Noche";
        }
        var filterPersona:Array<Persona> = listaPersonas.filter(x=> (<Empleado>x).horario == searchInput);
        listaFiltradaGlobal = filterPersona;
        borrarTabla();
        rearmarTabla(filterPersona);
    }

    export function promedio(){
        var listaEdad:Array<number>;
        var promedio:number;
        if(listaFiltradaGlobal.length > 0)
        {
            listaEdad = listaFiltradaGlobal.map(x => (<Empleado>x).edad);
            promedio = listaEdad.reduce(function(total, num){
                total += num;
                return total;
            },0);
        }else
        {
            listaEdad = listaPersonas.map(x => (<Empleado>x).edad);
            promedio = listaEdad.reduce(function(total, num){
                total += num;
                return total;
            },0);
        }
        (<HTMLInputElement>document.getElementById("promedio")).value = (promedio/listaEdad.length).toString();
    }
}