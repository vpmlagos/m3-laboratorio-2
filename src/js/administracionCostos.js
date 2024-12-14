class Doctor {
    constructor(id, nombre, anoEgreso, comuna, especialidad, anoEspecialidad, areaAtencion, tarifaBase, disponibilidad, jornadaLaboral, contacto) {
        this.id = id;
        this.nombre = nombre;
        this.anoEgreso = anoEgreso;
        this.comuna = comuna;
        this.especialidad = especialidad;
        this.anoEspecialidad = anoEspecialidad;
        this.areaAtencion = areaAtencion;
        this.tarifaBase = tarifaBase;
        this.disponibilidad = disponibilidad;
        this.jornadaLaboral = jornadaLaboral;
        this.contacto = contacto;

        // Atributo privado
        let anosExperiencia = new Date().getFullYear() - this.anoEgreso;

        // Getter y setter para años de experiencia
        this.getAnosExperiencia = () => anosExperiencia;
        this.setAnosExperiencia = (nuevoAnoEgreso) => {
            anosExperiencia = new Date().getFullYear() - nuevoAnoEgreso;
        };
    }

    // Método para mostrar la información del doctor
    mostrarInfo() {
        return `
            Nombre: ${this.nombre}<br>
            Especialidad: ${this.especialidad}<br>
            Área de Atención: ${this.areaAtencion}<br>
            Año de Egreso: ${this.anoEgreso}<br>
            Años de Experiencia: ${this.getAnosExperiencia()}<br>
            Tarifa Base: $${this.tarifaBase}<br>
            Disponibilidad: ${this.disponibilidad.join(", ")}<br>
            Jornada Laboral: ${this.jornadaLaboral}<br>
            Contacto: ${this.contacto.celular} / ${this.contacto.emailCorporativo}
        `;
    }

    // Método para calcular el total de pacientes por doctor
    static calcularTotalPacientes(citas, doctorId) {
        return citas.filter(cita => cita.doctorId === doctorId).length;
    }
}

async function costos() {
    const [doctoresResponse, citasResponse] = await Promise.all([
        fetch("./src/js/medicos.json"),
        fetch("./src/js/citas.json")
    ]);

    if (!doctoresResponse.ok || !citasResponse.ok) {
        throw new Error("Error al obtener los datos del servidor");
    }

    const doctoresData = await doctoresResponse.json();
    const citas = await citasResponse.json();

    // Mapear los doctores con la nueva clase
    const doctores = doctoresData.map(doctorData => new Doctor(
        doctorData.Id, doctorData.nombre, doctorData.anoEgreso, doctorData.comuna,
        doctorData.especialidad, doctorData.anoEspecialidad, doctorData.areaAtencion,
        doctorData.tarifaBase, doctorData.disponibilidad, doctorData.jornadaLaboral, doctorData.contacto
    ));

    const calcularCostoTotal = (precioPorConsulta, unidades) => {
        let costoTotal = 0;
        for (let i = 0; i < unidades; i++) {
            const descuento = i > 0 ? 0.2 : 0; // Aplicar 20% de descuento a partir de la segunda unidad
            costoTotal += precioPorConsulta * (1 - descuento);
        }
        return costoTotal;
    };

    let resultadoHTML = "<h2 class='mb-4'>Costos de Citas:</h2>";

    // Procesar cada cita para calcular el costo total basado en las unidades
    citas.citas.forEach((cita) => {
        const doctor = doctores.find((d) => d.id === cita.doctorId);

        if (!doctor) {
            resultadoHTML += `<div class='alert alert-warning'>No se encontró el doctor para la cita ID: ${cita.id}</div>`;
            return;
        }

        const costoTotal = calcularCostoTotal(doctor.tarifaBase, cita.unidad);

        resultadoHTML += `
            <div class='card mb-3'>
                <div class='card-body'>
                    <h5 class='card-title'>Cita ID: ${cita.id}</h5>
                    <p class='card-text'>
                        <strong>Paciente ID:</strong> ${cita.pacienteId}<br>
                        <strong>Doctor:</strong> ${doctor.nombre}<br>
                        <strong>Unidades:</strong> ${cita.unidad}<br>
                        <strong>Costo Total:</strong> $${costoTotal.toFixed(2)}
                    </p>
                    ${cita.unidad > 1 ? `<p class='text-success'>Se aplicó un descuento del 20% en las unidades adicionales.</p>` : ""}
                </div>
            </div>
        `;
    });

    document.getElementById("resultado").innerHTML = resultadoHTML;
}

document.getElementById("calcularBtn").addEventListener("click", () => {
    costos().catch(error => {
        document.getElementById("resultado").innerHTML = `<div class='alert alert-danger'>${error.message}</div>`;
    });
});

const calcularPromedioEspera = (tiemposDeEspera) => {
    if (tiemposDeEspera.length === 0) {
        throw new Error("El array de tiempos de espera no puede estar vacío.");
    }

    const sumaTiempos = tiemposDeEspera.reduce((acumulado, tiempo) => acumulado + tiempo, 0);
    const promedio = sumaTiempos / tiemposDeEspera.length;
    return promedio;
};

const obtenerYCalcularPromedioEspera = async () => {
    try {
        const citasResponse = await fetch("./src/js/citas.json");
        const citas = await citasResponse.json();

        const tiemposDeEspera = citas.citas.map(cita => cita.duracion);

        const promedioEspera = calcularPromedioEspera(tiemposDeEspera);

        console.log(`El promedio de espera es: ${promedioEspera} minutos`);

        document.getElementById("resultadoTiempos").innerHTML = `<div class='alert alert-info'>El promedio de espera es: ${promedioEspera} minutos</div>`;
    } catch (error) {
        console.error(error);
        document.getElementById("resultadoTiempos").innerHTML = `<div class='alert alert-danger'>Error: ${error.message}</div>`;
    }
};

document.getElementById("calcularTiemposBtn").addEventListener("click", obtenerYCalcularPromedioEspera);

const calcularTiempoTotalConsultaRecursivo = (citas, index = 0, total = 0) => {
    if (index === citas.length) {
        return total / 60;
    }

    return calcularTiempoTotalConsultaRecursivo(citas, index + 1, total + citas[index].duracion);
};

const obtenerYCalcularTiempoTotalConsulta = async () => {
    try {
        const citasResponse = await fetch("./src/js/citas.json");
        const citas = await citasResponse.json();

        const tiempoTotalConsulta = calcularTiempoTotalConsultaRecursivo(citas.citas);

        console.log(`El tiempo total de consulta es: ${tiempoTotalConsulta.toFixed(2)} horas`);

        document.getElementById("resultadoTiempoTotal").innerHTML = `<div class='alert alert-primary'>El tiempo total de consulta es: ${tiempoTotalConsulta.toFixed(2)} horas</div>`;
    } catch (error) {
        console.error(error);
        document.getElementById("resultadoTiempoTotal").innerHTML = `<div class='alert alert-danger'>Error: ${error.message}</div>`;
    }
};

document.getElementById("calcularTiempoTotalBtn").addEventListener("click", obtenerYCalcularTiempoTotalConsulta);
