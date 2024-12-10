// Disparar un evento personalizado para simular la llegada de un nuevo paciente
function nuevoPaciente() {
    const eventoPaciente = new CustomEvent('nuevoPaciente', {
        detail: {
            nombre: 'Juan Pérez',
            mensaje: 'Un nuevo paciente ha llegado.'
        }
    });

    // Disparar el evento
    document.dispatchEvent(eventoPaciente);
}

// Escuchar el evento personalizado y mostrar una notificación
document.addEventListener('nuevoPaciente', function(event) {
    const notificacion = document.createElement('div');
    notificacion.classList.add('alert', 'alert-info');
    notificacion.textContent = `Notificación: ${event.detail.mensaje}`;
    document.body.appendChild(notificacion);
    
    // Eliminar la notificación después de 5 segundos
    setTimeout(() => {
        notificacion.remove();
    }, 5000);
});

// Simulación de una llamada a una API REST para obtener los datos de los doctores
async function obtenerDoctores() {
    try {
        // Simulando una llamada a una API REST usando setTimeout y Promise
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                const exito = Math.random() > 0.5; // 50% de probabilidad de éxito
                if (exito) {
                    resolve([{ nombre: 'Dr. Juan', especialidad: 'Cardiología' }, { nombre: 'Dra. Marta', especialidad: 'Dermatología' }]);
                } else {
                    reject('Error: No se pudieron obtener los doctores');
                }
            }, 2000);
        });

        // Mostrar los datos de los doctores
        console.log('Doctores:', response);
        mostrarDoctores(response);
    } catch (error) {
        console.error(error);
        mostrarError(error);
    }
}

// Función para mostrar los doctores en la página
function mostrarDoctores(doctores) {
    const listaDoctores = document.createElement('ul');
    doctores.forEach(doctor => {
        const item = document.createElement('li');
        item.textContent = `${doctor.nombre} - ${doctor.especialidad}`;
        listaDoctores.appendChild(item);
    });
    document.body.appendChild(listaDoctores);
}

// Función para mostrar un mensaje de error
function mostrarError(mensaje) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('alert', 'alert-danger');
    errorDiv.textContent = mensaje;
    document.body.appendChild(errorDiv);
    
    // Eliminar el mensaje de error después de 5 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Disparar el evento de nuevo paciente después de 3 segundos
setTimeout(nuevoPaciente, 3000);

// Llamar a la función obtenerDoctores cuando se cargue la página
document.addEventListener('DOMContentLoaded', obtenerDoctores);
