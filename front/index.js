const API_URL = "https://localhost:3000/api/equipos";

async function obtenerEquipos() {
    const res = await fetch(API_URL);
    const equipos = await res.json();
    return equipos;
}

async function crearEquipos(data) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

async function actualizarEquipos(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}


async function eliminarEquipos(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    return await res.json();
}

//Referencias a los elementos del DOM
const contenedorCard = document.getElementById('contenedorCard');
const templateCard = document.getElementById('templateCard');
const datoForm = document.getElementById('datoForm');
const nombre = document.getElementById('nombre');
const btnCancelar = document.getElementById('btnCancelar');

//Mostrar equiós al cargar la pagina en el template
async function mostrarEquipos() {
    contenedorCard.innerHTML = '';
    const equipos = await obtenerEquipos();
    equipos.forEach(equipo => {
        const clone = templateCard.contentEditable.cloneNode(true);
        clone.querySelector('.nombreEquipos').textContent = equipo.nombre_equipo;
        clone.querySelector('.btn-editar').onclick = () => cargarEquipoParaEditar(equipo);
        clone.querySelector('btn-eliminar').onclick = () => eliminarEquipoHandler(equipo.id_equipo);
        contenedorCard.appendChild(clone);
    })
}

//Guardar o Acualizar Equipos
datoForm.onsubmit = async (e) => {
    e.preventDefault();
    const data = {nombre_equipo: nombre.value};
    if (id_equipo.value) {
        await actualizarEquipos(id_equipo.value, data);
    }else{
        await crearEquipo(data);
    }
    datoForm.reset();
    id_equipo.value = '';
    await mostrarEquipos();
}

//Cancelar edicion
btnCancelar.onclick = () => {
    datoForm.reset();
    id_equipo.value = '';
}

//Cargar equipo para  editar
function cargarEquipoParaEditar(equipo) {
    id_equipo.value = equipo.id_equipo;
    nombre.value = equipo.nombre_equipo;
}

//Eliminar Equipo
async function eliminarEquipoHandler(id) {
    if (confirm('¿Estas seguro de eliminar este equipo?')) {
        await eliminarEquipos(id);
    }
}
mostrarEquipos();