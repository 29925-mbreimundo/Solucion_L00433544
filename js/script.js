function toggleEnvio() {
    const entregaPropietario = document.getElementById('entregaPropietario').checked;
    const entregaTercero = document.getElementById('entregaTercero').checked;
    const formConfidencial = document.getElementById('formConfidencial');
    const enviarDatos = document.getElementById('enviarDatos');
    if (entregaPropietario) {
        enviarDatos.disabled = false;
        formConfidencial.style.display = 'none';
    } else if (entregaTercero) {
        formConfidencial.style.display = 'block';
        enviarDatos.disabled = false;
    } else {
        enviarDatos.disabled = true;
        formConfidencial.style.display = 'none';
    }
}

function borrarDatos() {
    document.forms['FormProducto'].reset();
}

// Deshabilita el botón, cambia el texto y envía el formulario
function enviarFormulario(button) {
    if (!button) return;
    button.disabled = true;
    // Mensaje exacto solicitado
    button.value = "Enviando datos ........";
    // Enviar el formulario
    if (button.form) button.form.submit();
}
function toggleDatosEconomicos() {
    const datosEconomicos = document.getElementById('datosEconomicos');
    const infoconfidencial = document.getElementById('infoconfidencial');
    if (infoconfidencial.checked) {
        datosEconomicos.style.display = 'block';
    } else {
        datosEconomicos.style.display = 'none';
    }
}
function validar() {
    // Implementación solicitada: obtener valores directamente
    const emailEl = document.getElementById('txtEmail');
    const telefonoEl = document.getElementById('txtTelefono');
    const email = emailEl ? emailEl.value : '';
    const telefono = telefonoEl ? telefonoEl.value : '';

    // Expresión regular solicitada
    const expresion = /^[a-z]|[\w.-]+@[\w.-]+\.[a-z]{2,5}$/i;

    // Validar email
    if (!expresion.test(email)) {
        alert('Correo electrónico no válido');
        if (emailEl) emailEl.focus();
        return false;
    }

    // Validar teléfono: exactamente 10 caracteres y solo dígitos
    if (telefono.length !== 10 || isNaN(telefono)) {
        alert('El teléfono debe tener 10 dígitos numéricos');
        if (telefonoEl) telefonoEl.focus();
        return false;
    }

    return true;
}
function validarLogin() {
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    if (usuario === "" || contrasena === "") {
        alert('Falta un campo por llenar');
        return false;
    }

    return true;
}

function handleSubmit(button) {
    // Esta función espera recibir el botón como argumento: handleSubmit(this)
    if (!button) return;
    if (!button) return;
    var form = button.form;
    if (!form) return;

    // Si el botón ya está deshabilitado, prevenir doble envío
    if (button.disabled) return;

    // Primero ejecutar la validación personalizada solicitada
    if (typeof validar === 'function' && !validar()) {
        return;
    }

    if (typeof form.checkValidity === 'function' && !form.checkValidity()) {

        if (typeof form.reportValidity === 'function') {
            form.reportValidity();
        } else {
            alert('Complete los campos requeridos correctamente.');
        }
        return;
    }

    button.disabled = true;
    button.value = 'Enviando datos ........';

    // Enviar el formulario una sola vez usando button.form.submit()
    try {
        try {
            sessionStorage.setItem('FormContacto_submitted', '1');
        } catch (e) {

        }
        button.form.submit();
    } catch (err) {
        // Por seguridad, si submit lanza, reactivar el botón y notificar
        console.error('Error al enviar el formulario:', err);
        button.disabled = false;
        button.value = 'Enviar';
        alert('No se pudo enviar el formulario. Intente de nuevo.');
    }
}

// Conectar también desde JS si se prefiere no usar onclick inline
document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('btnEnviar');
    if (btn) {

    }
    try {
        var wasSubmitted = sessionStorage.getItem('FormContacto_submitted');
        if (wasSubmitted) {
            var confirmBtn = document.getElementById('btnEnviar');
            if (confirmBtn) {
                confirmBtn.disabled = true;
                confirmBtn.value = 'Enviando datos ........';
            }
            // limpiar la marca para futuras visitas
            sessionStorage.removeItem('FormContacto_submitted');
        }
    } catch (e) {
        // ignore sessionStorage errors
    }
});
