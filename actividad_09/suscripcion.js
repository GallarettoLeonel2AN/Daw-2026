
const formulario = document.getElementById('form-suscripcion');
const tituloHola = document.getElementById('titulo-hola');


const inputNombre = document.getElementById('nombre');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputRepetirPassword = document.getElementById('repetir-password');
const inputEdad = document.getElementById('edad');
const inputTelefono = document.getElementById('telefono');
const inputDireccion = document.getElementById('direccion');
const inputCiudad = document.getElementById('ciudad');
const inputCodigoP = document.getElementById('codigo-postal');
const inputDni = document.getElementById('dni');



function validarNombre() {
    const valor = inputNombre.value.trim();
    if (valor.length <= 6 || !valor.includes(' ')) {
        return "El nombre debe tener más de 6 letras y al menos un espacio.";
    }
    return "";
}

function validarEmail() {
    const valor = inputEmail.value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(valor)) {
        return "Debe ingresar un formato de email válido.";
    }
    return "";
}

function validarPassword() {
    const valor = inputPassword.value;
    const tieneLetras = /[a-zA-Z]/.test(valor);
    const tieneNumeros = /[0-9]/.test(valor);
    if (valor.length < 8 || !tieneLetras || !tieneNumeros) {
        return "La contraseña debe tener al menos 8 caracteres, formados por letras y números.";
    }
    return "";
}

function validarRepetirPassword() {
    if (inputRepetirPassword.value !== inputPassword.value) {
        return "Las contraseñas no coinciden.";
    }
    if (inputRepetirPassword.value === "") {
        return "Debe repetir la contraseña.";
    }
    return "";
}

function validarEdad() {
    const valor = parseInt(inputEdad.value);
    if (isNaN(valor) || valor < 18 || !Number.isInteger(Number(inputEdad.value))) {
        return "La edad debe ser un número entero mayor o igual a 18.";
    }
    return "";
}

function validarTelefono() {
    const valor = inputTelefono.value;
    
    const regexTelefono = /^\d{7,}$/;
    if (!regexTelefono.test(valor)) {
        return "El teléfono debe tener al menos 7 dígitos, sin espacios, guiones ni paréntesis.";
    }
    return "";
}

function validarDireccion() {
    const valor = inputDireccion.value.trim();
    const tieneLetras = /[a-zA-Z]/.test(valor);
    const tieneNumeros = /[0-9]/.test(valor);
    const tieneEspacio = valor.includes(' ');
    
    if (valor.length < 5 || !tieneLetras || !tieneNumeros || !tieneEspacio) {
        return "La dirección debe tener al menos 5 caracteres, con letras, números y un espacio.";
    }
    return "";
}

function validarCiudad() {
    if (inputCiudad.value.trim().length < 3) {
        return "La ciudad debe tener al menos 3 caracteres.";
    }
    return "";
}

function validarCodigoPostal() {
    if (inputCodigoP.value.trim().length < 3) {
        return "El código postal debe tener al menos 3 caracteres.";
    }
    return "";
}

function validarDni() {
    const valor = inputDni.value.trim();
    const regexDni = /^\d{7,8}$/;
    if (!regexDni.test(valor)) {
        return "El DNI debe ser un número de 7 u 8 dígitos.";
    }
    return "";
}


function gestionarError(inputElement, funcionValidacion) {
    const spanError = document.getElementById(`error-${inputElement.id}`);
    const mensajeError = funcionValidacion();
    
    if (mensajeError) {
        spanError.textContent = mensajeError;
        spanError.style.display = 'block';
        return false; 
    } else {
        spanError.textContent = "";
        spanError.style.display = 'none';
        return true; 
    }
}

const campos = [
    { input: inputNombre, validador: validarNombre },
    { input: inputEmail, validador: validarEmail },
    { input: inputPassword, validador: validarPassword },
    { input: inputRepetirPassword, validador: validarRepetirPassword },
    { input: inputEdad, validador: validarEdad },
    { input: inputTelefono, validador: validarTelefono },
    { input: inputDireccion, validador: validarDireccion },
    { input: inputCiudad, validador: validarCiudad },
    { input: inputCodigoP, validador: validarCodigoPostal },
    { input: inputDni, validador: validarDni }
];


campos.forEach(campo => {

    campo.input.addEventListener('blur', () => {
        gestionarError(campo.input, campo.validador);
    });


    campo.input.addEventListener('focus', () => {
        const spanError = document.getElementById(`error-${campo.input.id}`);
        spanError.style.display = 'none';
    });
});


inputNombre.addEventListener('keyup', () => {
    const textoIngresado = inputNombre.value.trim();
    if (textoIngresado === "") {
        tituloHola.textContent = "HOLA";
    } else {
        tituloHola.textContent = `HOLA ${textoIngresado.toUpperCase()}`;
    }
});


formulario.addEventListener('submit', (evento) => {
    
    evento.preventDefault();

    let hayErrores = false;
    let listaErrores = [];
    let datosCargados = [];

    
    campos.forEach(campo => {
        const esValido = gestionarError(campo.input, campo.validador);
        
        if (!esValido) {
            hayErrores = true;
            listaErrores.push(campo.validador());
        } else {
    
            if (campo.input.id !== 'password' && campo.input.id !== 'repetir-password') {
                datosCargados.push(`${campo.input.id}: ${campo.input.value}`);
            }
        }
    });

    
    if (hayErrores) {
        alert("El formulario tiene los siguientes errores:\n\n" + listaErrores.join("\n"));
    } else {
        alert("¡Suscripción exitosa!\n\nDatos enviados:\n" + datosCargados.join("\n"));
        formulario.reset();
        
        tituloHola.textContent = "HOLA";
    }
});