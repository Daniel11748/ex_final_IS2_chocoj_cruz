document.querySelector('#buscarUsuario').addEventListener('click', obtenerDatos);

function obtenerDatos() {
    const usuario = document.querySelector('#github_usuario').value;
    const url = `https://api.github.com/users/${usuario}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            document.getElementById('user_nombre').value = resultado.name || 'Nombre no encontrado';
        })
        .catch(error => console.log('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    const paisSelect = document.getElementById('user_pais');

    // Función para obtener países y llenar el select
    const cargarPaises = async () => {
        try {
            const respuesta = await fetch('https://restcountries.com/v3.1/all');
            if (!respuesta.ok) {
                throw new Error(`HTTP error! status: ${respuesta.status}`);
            }
            const paises = await respuesta.json();

            paises.forEach(pais => {
                const option = document.createElement('option');
                option.value = pais.cca2; // Código del país
                option.textContent = pais.name.common; // Nombre del país
                paisSelect.appendChild(option);
            });

        } catch (error) {
            console.error('Error al cargar países:', error);
        }
    };

    cargarPaises();
});

document.getElementById('user_pais').addEventListener('change', async (event) => {
    const codigoPais = event.target.value;
    const telefonoInput = document.getElementById('user_codigo');

    if (codigoPais) {
        try {
            const respuesta = await fetch('https://restcountries.com/v3.1/all');
            if (!respuesta.ok) {
                throw new Error(`HTTP error! status: ${respuesta.status}`);
            }
            const paises = await respuesta.json();
            const paisSeleccionado = paises.find(pais => pais.cca2 === codigoPais);
            
            if (paisSeleccionado && paisSeleccionado.idd) {
                const codigoMarcacion = paisSeleccionado.idd.root;
                const sufijos = paisSeleccionado.idd.suffixes.join(', '); 

                telefonoInput.value = `${codigoMarcacion}${sufijos ? ' ' + sufijos : ''} `;
            } else {
                telefonoInput.value = telefonoInput.value; 
            }
        } catch (error) {
            console.error('Error al obtener el código de marcación:', error);
        }
    }
});




const btnGuardar = document.getElementById('btnGuardar')
const btnBuscar = document.getElementById('btnBuscar')
const tablaUsuarios = document.getElementById('tablaUsuarios')
const formulario = document.querySelector('form')


const getUsuarios = async (alerta = 'si',) => {
    const nombre = formulario.user_nombre.value
    const telefono = formulario.user_telefono.value
    const correo = formulario.user_correo.value
    const url = `/ex_final_IS2/controllers/usuarios/index.php?user_nombre=${nombre}&user_telefono=${telefono}&user_correo=${correo}`
    const config = {
        method: 'GET'
    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
//        console.log(data);


        tablaUsuarios.tBodies[0].innerHTML = ''
        const fragment = document.createDocumentFragment()
        let contador = 1;
        if (respuesta.status == 200) {
            if (alerta == 'si') {
                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: "success",
                    title: 'Usuarios encontrados',
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire();
            }

            if (data.length > 0) {
                data.forEach(usuario => {
                    const tr = document.createElement('tr')
                    const celda1 = document.createElement('td')
                    const celda2 = document.createElement('td')
                    const celda3 = document.createElement('td')
                    const celda4 = document.createElement('td')

                    celda1.innerText = contador;
                    celda2.innerText = usuario.user_nombre;
                    celda3.innerText = usuario.user_telefono;
                    celda4.innerText = usuario.user_correo;


                    tr.appendChild(celda1)
                    tr.appendChild(celda2)
                    tr.appendChild(celda3)
                    tr.appendChild(celda4)
                    fragment.appendChild(tr);

                    contador++
                });

            } else {
                const tr = document.createElement('tr')
                const td = document.createElement('td')
                td.innerText = 'Usuario Inexistente'
                td.colSpan = 4;

                tr.appendChild(td)
                fragment.appendChild(tr)
            }
        } else {
            console.log('Error al buscar los datos');
        }

        tablaUsuarios.tBodies[0].appendChild(fragment)
    } catch (error) {
        console.log(error);
    }
}
getUsuarios();


const guardarUsuarios = async (e) => {
    e.preventDefault();
    btnGuardar.disabled = true;

    const url = '/ex_final_IS2/controllers/usuarios/index.php';
    const formData = new FormData(formulario);
    formData.append('tipo', 1); 
    formData.delete('user_id'); 
    const config = {
        method: 'POST',
        body: formData
    };

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { mensaje, codigo, detalle } = data;

        Swal.mixin({
            toast: true,
            position: "top-start",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "success",
            title: mensaje,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();

        if (codigo == 1 && respuesta.status == 200) {
            // Acción si se guarda correctamente
        } else {
            console.log(detalle);
        }

    } catch (error) {
        console.log(error);
    }

    getUsuarios(); 
    formulario.reset();
    btnGuardar.disabled = false;
};

const llenardatos = (usuario) => {
    formulario.user_id.value = usuario.user_id
    formulario.user_nombre.value = usuario.user_nombre
    formulario.user_telefono.value = usuario.user_telefono
    formulario.user_correo.value = usuario.user_correo
    btnGuardar.parentElement.style.display = 'none'
}


btnGuardar.addEventListener('click', guardarUsuarios)
