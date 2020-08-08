var Personas;
(function (Personas) {
    window.addEventListener("load", function () {
        document.getElementById("btnGuardar").addEventListener("click", guardar);
        document.getElementById("filtroHorario").addEventListener("change", filtrador);
        document.getElementById("btnPromedio").addEventListener("click", promedio);
        document.getElementById("btnMostrar").addEventListener("click", mostrarNA);
    });
    var listaPersonas = new Array();
    function guardar() {
        var inputNombre = document.getElementById("nombre").value;
        var nombreMayus = inputNombre.charAt(0).toUpperCase() + inputNombre.slice(1);
        var inputApellido = document.getElementById("apellido").value;
        var apellidoMayus = inputApellido.charAt(0).toUpperCase() + inputApellido.slice(1);
        var inputEdad = parseInt(document.getElementById("edad").value);
        var inputLegajo = parseInt(document.getElementById("legajo").value);
        var inputHorario = document.getElementById("horario").value;
        var id;
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
        var nuevoEmpleado = new Personas.Empleado(id, nombreMayus, apellidoMayus, inputEdad, inputLegajo, inputHorario);
        listaPersonas.push(nuevoEmpleado);
        crearTabla(listaPersonas);
    }
    Personas.guardar = guardar;
    function mostrarNA() {
        var tCuerpoNA = document.getElementById("tCuerpoNA");
        while (tCuerpoNA.rows.length > 0) {
            tCuerpoNA.removeChild(tCuerpoNA.childNodes[0]);
        }
        listaPersonas.map(function (personas) {
            var tr = document.createElement("tr");
            var tdNombre = document.createElement("td");
            var nodoTexto = document.createTextNode(personas.nombre);
            tdNombre.appendChild(nodoTexto);
            tr.appendChild(tdNombre);
            var tdApellido = document.createElement("td");
            var nodoTexto = document.createTextNode(personas.apellido);
            tdApellido.appendChild(nodoTexto);
            tr.appendChild(tdApellido);
            tCuerpoNA.appendChild(tr);
        });
    }
    Personas.mostrarNA = mostrarNA;
    function crearTabla(lista) {
        var tCuerpo = document.getElementById("tCuerpo");
        while (tCuerpo.rows.length > 0) {
            tCuerpo.removeChild(tCuerpo.childNodes[0]);
        }
        lista.forEach(function (persona) {
            var id = persona.getId();
            var nombre = persona.getNombre();
            var apellido = persona.getApellido();
            var edad = persona.getEdad();
            var legajo = persona.getLegajo();
            var horario = persona.getHorario();
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
            btnEliminar.className = "eliminar";
            btnEliminar.id = "eliminar" + id;
            btnEliminar.value = "Eliminar";
            btnEliminar.addEventListener("click", getPosition);
            btnEliminar.onclick = function () { eliminar(lista.indexOf(persona)); };
            tdAccion.appendChild(btnEliminar);
            tr.appendChild(tdAccion);
            tCuerpo.appendChild(tr);
        });
    }
    Personas.crearTabla = crearTabla;
    function getPosition(event) {
        var position = event.target.parentNode.parentNode.rowIndex;
        console.log(position);
    }
    function eliminar(position) {
        listaPersonas.splice(position, 1);
        crearTabla(listaPersonas);
    }
    Personas.eliminar = eliminar;
    var listaFiltradaGlobal = new Array();
    function borrarTabla() {
        var tCuerpo = document.getElementById("tCuerpo");
        tCuerpo.innerHTML = "";
    }
    function rearmarTabla(filterVehiculo) {
        filterVehiculo.forEach(function (x) {
            if (x.horario == "Mañana") {
                crearTabla(filterVehiculo);
            }
            else if (x.horario == "Tarde") {
                crearTabla(filterVehiculo);
            }
            else {
                crearTabla(filterVehiculo);
            }
        });
    }
    function filtrador() {
        if (document.getElementById("filtroHorario").value == "Mañana") {
            var searchInput = "Mañana";
        }
        else if (document.getElementById("filtroHorario").value == "Tarde") {
            var searchInput = "Tarde";
        }
        else {
            var searchInput = "Noche";
        }
        var filterPersona = listaPersonas.filter(function (x) { return x.horario == searchInput; });
        listaFiltradaGlobal = filterPersona;
        borrarTabla();
        rearmarTabla(filterPersona);
    }
    Personas.filtrador = filtrador;
    function promedio() {
        var listaEdad;
        var promedio;
        if (listaFiltradaGlobal.length > 0) {
            listaEdad = listaFiltradaGlobal.map(function (x) { return x.edad; });
            promedio = listaEdad.reduce(function (total, num) {
                total += num;
                return total;
            }, 0);
        }
        else {
            listaEdad = listaPersonas.map(function (x) { return x.edad; });
            promedio = listaEdad.reduce(function (total, num) {
                total += num;
                return total;
            }, 0);
        }
        document.getElementById("promedio").value = (promedio / listaEdad.length).toString();
    }
    Personas.promedio = promedio;
})(Personas || (Personas = {}));
