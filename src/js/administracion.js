// 1. Arreglo para gestionar los doctores
class Doctor {
    constructor(Id, nombre, especialidad) {
        this.Id = Id;
        this.nombre = nombre;
        this.especialidad = especialidad;
    }
}

class Hospital {
    constructor() {
        this.doctores = []; // Arreglo para almacenar los doctores
    }

    // Agregar un nuevo doctor
    agregarDoctor(doctor) {
        this.doctores.push(doctor);
        console.log(`Doctor ${doctor.nombre} agregado.`);
    }

    // Eliminar un doctor por su ID
    eliminarDoctor(id) {
        const index = this.doctores.findIndex(doctor => doctor.Id === id);
        if (index !== -1) {
            const removedDoctor = this.doctores.splice(index, 1);
            console.log(`Doctor ${removedDoctor[0].nombre} eliminado.`);
        } else {
            console.log("Doctor no encontrado.");
        }
    }

    // Buscar un doctor por ID
    buscarDoctor(id) {
        const doctor = this.doctores.find(doctor => doctor.Id === id);
        if (doctor) {
            console.log(`Doctor encontrado: ${doctor.nombre}, Especialidad: ${doctor.especialidad}`);
        } else {
            console.log("Doctor no encontrado.");
        }
    }

    // Mostrar todos los doctores
    listarDoctores() {
        this.doctores.forEach(doctor => {
            console.log(`ID: ${doctor.Id}, Nombre: ${doctor.nombre}, Especialidad: ${doctor.especialidad}`);
        });
    }
}

// 2. Pila para gestionar citas de pacientes
class PilaCitas {
    constructor() {
        this.citas = [];
    }

    // Agregar cita a la pila
    agregarCita(cita) {
        this.citas.push(cita);
        console.log(`Cita para el médico ${cita.nombreMedico} agregada.`);
    }

    // Eliminar la última cita (LIFO)
    atenderCita() {
        if (this.citas.length > 0) {
            const citaAtendida = this.citas.pop();
            console.log(`Cita atendida para el médico ${citaAtendida.nombreMedico}.`);
        } else {
            console.log("No hay citas pendientes.");
        }
    }

    // Mostrar todas las citas pendientes
    mostrarCitas() {
        this.citas.forEach(cita => {
            console.log(`Médico: ${cita.nombreMedico}, Día: ${cita.dia}, Hora: ${cita.hora}`);
        });
    }
}

// 3. Cola para simular el orden de llegada de los pacientes
class ColaPacientes {
    constructor() {
        this.pacientes = [];
    }

    // Agregar paciente a la cola
    agregarPaciente(paciente) {
        this.pacientes.push(paciente);
        console.log(`Paciente ${paciente.nombre} agregado a la cola.`);
    }

    // Atender al primer paciente (FIFO)
    atenderPaciente() {
        if (this.pacientes.length > 0) {
            const pacienteAtendido = this.pacientes.shift();
            console.log(`Paciente ${pacienteAtendido.nombre} atendido.`);
        } else {
            console.log("No hay pacientes en espera.");
        }
    }

    // Mostrar todos los pacientes en la cola
    mostrarPacientes() {
        this.pacientes.forEach(paciente => {
            console.log(`Paciente: ${paciente.nombre}, Edad: ${paciente.edad}`);
        });
    }
}

// Ejemplo de uso:

// Crear el hospital
const hospital = new Hospital();

// Agregar doctores
hospital.agregarDoctor(new Doctor(1, "Dr. Juan Pérez", "Cardiología"));
hospital.agregarDoctor(new Doctor(2, "Dr. Ana Gómez", "Pediatría"));
hospital.agregarDoctor(new Doctor(3, "Dr. Mario Rosales", "Cirugía General"));

// Eliminar un doctor
hospital.eliminarDoctor(2);

// Buscar un doctor
hospital.buscarDoctor(1);

// Listar todos los doctores
hospital.listarDoctores();

// Crear pila de citas
const pilaCitas = new PilaCitas();

// Agregar citas a la pila
pilaCitas.agregarCita({ nombreMedico: "Dr. Juan Pérez", dia: "2024-12-10", hora: "09:00" });
pilaCitas.agregarCita({ nombreMedico: "Dr. Ana Gómez", dia: "2024-12-10", hora: "11:00" });

// Atender una cita
pilaCitas.atenderCita();

// Mostrar citas pendientes
pilaCitas.mostrarCitas();

// Crear cola de pacientes
const colaPacientes = new ColaPacientes();

// Agregar pacientes a la cola
colaPacientes.agregarPaciente({ nombre: "Pedro Díaz", edad: 45 });
colaPacientes.agregarPaciente({ nombre: "Laura López", edad: 32 });

// Atender al primer paciente
colaPacientes.atenderPaciente();

// Mostrar pacientes en la cola
colaPacientes.mostrarPacientes();
