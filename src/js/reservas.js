/**
 * obtenerMedicos()
 * Carga data de los médicos que vienen de medicos.json
 */
function obtenerMedicos() {
    console.log("[reservas][obtenerMedicos]-- Cargando los datos de los médicos...");

    // ES6 fetch para importar
    fetch('./src/js/medicos.json')
        .then(response => {
            //debugger;
            if (!response.ok) {
                throw new Error(`[reservas][obtenerMedicos]--Error al cargar el archivo JSON: ${response.statusText}`);
            }
            return response.json();
        })
        .then(doctores => {
            console.log("[reservas][obtenerMedicos]--Datos de médicos cargados exitosamente:", doctores);
            mostrarMedicos(doctores);
        })
        .catch(error => {
            //debugger;
            console.error("[reservas][obtenerMedicos]--Error al cargar los doctores:", error);
        });
}

function mostrarMedicos(doctores) {
    const listaDoctores = document.getElementById("listaDoctores");
    listaDoctores.classList.add("row");

    //recorrer y mostrar == GETALL
    doctores.forEach((
        { nombre, anoEgreso, comuna, especialidad, disponibilidad, jornadaLaboral, contacto, anoEspecialidad }
    ) => {
        const li = document.createElement("li");
        li.classList.add("col-12", "col-lg-6");
        li.innerHTML = `
        <div class="card card-doctor-list" style="width: 100%;">
            <img src="src/img/home-welcome.jpg" class="card-img-top card-doctor-list-img" alt="...">
                <div class="card-body">
                <h5 class="card-title text-start">${nombre}</h5>
                <p class="text-start"><b>Año de especialidad:</b> ${especialidad}</p>
                <p class="text-start"><b>Comuna de atención:</b> ${comuna}</p>
                <p class="text-start"><b>Disponibilidad:</b> ${disponibilidad}</p>
                <p class="text-start"><b>Jornada Laboral:</b> ${jornadaLaboral}</p>
                <p class="text-start"><b>Correo contacto:</b> ${contacto.celular}</p>
                <button id="btnReservar" class="btn btn-primary w-100" onclick="solicitarDatosUsuario('${nombre}')">Reservar
                    Cita</button>
            </div>
        </div>
        `;
        listaDoctores.appendChild(li);
    });

}






/**
 * 
 * @param {*} nombre 
 * @param {*} email 
 * @param {*} telefono 
 * @returns bool
 */
function validarDatosUsuario(nombre, email, telefono) {
    //debugger;
    if (!nombre || !email || !telefono) {
        alert(`Ingrese datos`);
        return false;
    }

    if (typeof email === 'string' && email.includes('@')) {
        console.log(`[reservas][validarDatosUsuario]-- Email ${email} válido`);
    } else {
        alert(`Email ${email} inválido`);
        return false;
    }

    if (typeof telefono === 'string' && telefono.length <= 10) {
        console.log(`[reservas][validarDatosUsuario]-- Telefono ${telefono} válido`);
    } else {
        alert(`Telefono ${telefono} inválido`);
        return false;
    }

    return true;
}

/**
 * solicitarDatosUsuario()
 * sinparams
 * 
 */
function solicitarDatosUsuario(nombreMedico) {
    try {
        let nombre = prompt("¿Cuál es tu nombre?");
        let email = prompt("¿Cuál es tu email?");
        let telefono = prompt("¿Cuál es tu teléfono?");

        if (validarDatosUsuario(nombre, email, telefono)) {
            console.log(`[reservas][solicitarDatosUsuario]-- Nueva reserva: ${nombre}, ${email}, ${telefono}, Médico: ${nombreMedico}`);
            alert(`Reserva confirmada con el ${nombreMedico}.`);
        } else {
            throw new Error("Los datos ingresados no son válidos.");
        }
    } catch (error) {
        console.error("[reservas][solicitarDatosUsuario][error]", error.message);
        alert("Ocurrió un error al procesar los datos. Por favor, intenta de nuevo.");
    } finally {
        console.log("[reservas][solicitarDatosUsuario]-- Proceso de solicitud de datos finalizado.");
        getReservas();

        //
        window.location.href = 'administracion.html';
    }
}

/**
 * manejarErrores() sin uso
 */

function manejarErrores() {
    try {
        console.log(noExistenteVariable); // Esto generará un error
    } catch (error) {
        console.error("Error detectado:", error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    obtenerMedicos();
    const btnReservar = document.getElementById('btnReservar');
    if (btnReservar) {
        btnReservar.addEventListener('click', solicitarDatosUsuario);
    }
});


async function fetchDatos() {
    try {
        // Fetch para obtener los datos de doctores y citas
        const [doctoresResponse, citasResponse] = await Promise.all([
            fetch("./src/js/medicos.json"),
            fetch("./src/js/citas.json")
        ]);

        if (!doctoresResponse.ok || !citasResponse.ok) {
            throw new Error("Error al obtener los datos del servidor");
        }

        // Convertir las respuestas a JSON
        const doctores = await doctoresResponse.json();
        const citas = await citasResponse.json();

        // Agregar un nuevo doctor
        const medicoAgregar = {
            "Id": 18,
            "nombre": "Dr. Mario Rosales",
            "anoEgreso": 1995,
            "comuna": "Chillán",
            "especialidad": "Cirugía General",
            "anoEspecialidad": 2013,
            "areaAtencion": "Hospitalización",
            "disponibilidad": [
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes"
            ],
            "jornadaLaboral": "09:00 - 17:00",
            "contacto": {
                "celular": "+56912745829",
                "emailCorporativo": "mrosales@clinicahofel.cl"
            }
        };
        const doctoresClonados = JSON.parse(JSON.stringify(doctores));
        doctoresClonados.push(medicoAgregar);

        console.log("[reservas][fetchDatos] Doctores", doctores);
        console.log("[reservas][fetchDatos] Doctores editado", doctoresClonados);

       
        const citasExtendidas = citas.citas.map((cita) => {
            const doctor = doctores.find((doc) => doc.Id === cita.IdMedico);
            return {
                ...cita,
                nombreMedico: doctor ? doctor.nombre : "Desconocido",
                especialidad: doctor ? doctor.especialidad : "Desconocida"
            };
        });

        const informacionCombinada = {
            Idlocal: citas.Idlocal,
            citas: citasExtendidas
        };

        console.log("[reservas][fetchDatos] Combinado doctores y citas:", informacionCombinada);

        doctores.forEach((doctor) => {
            console.log(`ID: ${doctor.Id}, Nombre: ${doctor.nombre}, Especialidad: ${doctor.especialidad}`);
        });

        // Recorrido y mostrar las citas en la consola
        console.log("[reservas][fetchDatos] Lista de doctores disponibles:");
        citasExtendidas.forEach((cita) => {
            console.log(`ID Médico: ${cita.IdMedico}, Nombre Médico: ${cita.nombreMedico}, Especialidad: ${cita.especialidad}, Día: ${cita.dia}, Hora: ${cita.hora}`);
        });

        // Convertir doctores a JSON string y mostrar en consola
        const doctoresJSON = JSON.stringify(doctores, null, 2);
        
        // Asignar los resultados a variables
        return {
            doctoresOriginal: doctores,
            doctoresClonados,
            informacionCombinada,
            doctoresJSON
        };
    } catch (error) {
        console.error("[reservas][fetchDatos] Errores---", error.message);
    }
}



function getReservas() {
    fetchDatos().then((datos) => {
        if (datos) {
            console.log("[reservas][getReservas] Datos:", datos);
        }
    });


}