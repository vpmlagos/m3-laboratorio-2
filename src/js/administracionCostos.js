async function costos() {
    const [doctoresResponse, citasResponse] = await Promise.all([
        fetch("./src/js/medicos.json"),
        fetch("./src/js/citas.json")
    ]);

    if (!doctoresResponse.ok || !citasResponse.ok) {
        throw new Error("Error al obtener los datos del servidor");
    }

    const doctores = await doctoresResponse.json();
    const citas = await citasResponse.json();

    const calcularCostoTotal = (precioPorConsulta) => (unidades) =>
        precioPorConsulta * unidades;

    let resultadoHTML = "<h2>Costos de Citas:</h2>";

    citas.citas.forEach((cita) => {
        const doctor = doctores.find((d) => d.Id === cita.doctorId);

        if (!doctor) {
            resultadoHTML += `<p>No se encontró el doctor para la cita ID: ${cita.id}</p>`;
            return;
        }

        const costoConsulta = calcularCostoTotal(doctor.tarifaBase)(cita.unidad);

        resultadoHTML += `
            <p>Cita ID: ${cita.id}, Paciente ID: ${cita.pacienteId}, 
            Doctor: ${doctor.nombre}, Costo Total: $${costoConsulta}</p>
        `;
    });

    document.getElementById("resultado").innerHTML = resultadoHTML;
}

document.getElementById("calcularBtn").addEventListener("click", () => {
    costos().catch(error => {
        document.getElementById("resultado").innerHTML = `<p style="color: red;">${error.message}</p>`;
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
  
      document.getElementById("resultadoTiempos").innerHTML = `El promedio de espera es: ${promedioEspera} minutos`;
    } catch (error) {
      console.error(error);
      document.getElementById("resultadoTiempos").innerHTML = `Error: ${error.message}`;
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
      
      document.getElementById("resultadoTiempoTotal").innerHTML = `El tiempo total de consulta es: ${tiempoTotalConsulta.toFixed(2)} horas`;
    } catch (error) {
      console.error(error);
      document.getElementById("resultadoTiempoTotal").innerHTML = `Error: ${error.message}`;
    }
};
  
document.getElementById("calcularTiempoTotalBtn").addEventListener("click", obtenerYCalcularTiempoTotalConsulta);
