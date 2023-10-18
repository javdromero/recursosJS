
//============================================================================
// AUXILIARES
//============================================================================
const sweetAlertPopupClass = "animate__animated animate__fadeIn animate__faster";

//============================================================================
// FUNCIONES
//============================================================================
function PrevenirMenuContextual() {
    document.oncontextmenu = document.body.oncontextmenu = function () { return false; }
}

function PrevenitCutCopyPaste() {
    $('.form-control').on("cut copy paste", function (e) {
        e.preventDefault();
    });
}

function PrevenirDevTools() {
    $(document).keydown(function (event) {
        if (event.keyCode == 123) { // Prevenir F12
            return false;
        } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevenir Ctrl+Shift+I        
            return false;
        }
    });
}

function EmailValido(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

function ClaseSweetAlertButton(icono) {
    let classButton = "btn font-weight-bold btn-";

    switch (icono) {
        case "success":
            classButton += "success"
            break;
        case "error":
            classButton += "danger"
            break;
        case "warning":
            classButton += "primary"
            break;
        case "info":
            classButton += "info"
            break;
        case "question":
            classButton += "primary"
            break;
        default:
            classButton += "primary"
            break;
    }

    return classButton;
}

function SweetAlert(titulo, texto, icono, ancho = '36em') {

    let text = "Error al procesar su solicitud, por favor intente nuevamente en unos minutos.";

    if (texto == "" || texto == null)
        texto = text;

    Swal.fire({
        title: titulo,
        html: texto,
        icon: icono,
        width: ancho,
        footer: FechaHoraNow(),
        heightAuto: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        buttonsStyling: false,
        confirmButtonText: "Ok, entendido",
        customClass: {
            confirmButton: ClaseSweetAlertButton(icono)
        },
        showClass: { popup: sweetAlertPopupClass },
    });
}

function SweetAlertRedirect(titulo, texto, icono, link, ancho = '36em') {

    let text = "Error al procesar su solicitud, por favor intente nuevamente en unos minutos.";

    if (texto == "" || texto == null)
        texto = text;

    Swal.fire({
        title: titulo,
        html: texto,
        icon: icono,
        width: ancho,
        footer: FechaHoraNow(),
        heightAuto: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        buttonsStyling: false,
        confirmButtonText: "Ok, entendido",
        customClass: {
            confirmButton: ClaseSweetAlertButton(icono)
        },
        showClass: { popup: sweetAlertPopupClass },
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace(link);
        }
    });
}

function SweetAlertLogout(titulo, texto) {
    Swal.fire({
        title: titulo,
        html: texto,
        icon: "error",
        footer: FechaHoraNow(),
        heightAuto: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        buttonsStyling: false,
        confirmButtonText: "Ok, entendido",
        customClass: {
            confirmButton: ClaseSweetAlertButton("error")
        },
        showClass: { popup: sweetAlertPopupClass },
    }).then((result) => {
        if (result.isConfirmed) {
            CerrarSesion();
        }
    });

}

function SweetAlertSimple(titulo, texto, icono) {

    let text = "Error al procesar su solicitud, por favor intente nuevamente en unos minutos.";

    if (texto == "" || texto == null)
        texto = text;

    Swal.fire({
        title: titulo,
        html: texto,
        icon: icono,
        footer: FechaHoraNow(),
        heightAuto: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        showClass: { popup: sweetAlertPopupClass },
    });
}

function SweetAlertToast(titulo, texto, icono, posicion = 'bottom', tiempo = 3000) {

    let Toast = Swal.mixin({
        toast: true,
        position: posicion,
        showConfirmButton: false,
        timer: tiempo,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icono,
        title: titulo,
        text: texto,
        background: '#f5f5f5'
    })
}

function RegexLetrasNum(input) {
    $(input).on('input', function () {
        var c = this.selectionStart,
            r = /[^a-z0-9]/gi,
            v = $(this).val();
        if (r.test(v)) {
            $(this).val(v.replace(r, ''));
            c--;
        }
        this.setSelectionRange(c, c);
    });
}

function RegexLetras(input) {
    $(input).on('input', function () {
        var c = this.selectionStart,
            r = /[^a-zA-Z\sñÑ]+/gi,
            v = $(this).val();
        if (r.test(v)) {
            $(this).val(v.replace(r, ''));
            c--;
        }
        this.setSelectionRange(c, c);
    });
}

function BlockUI() {

    $.blockUI.defaults.css = {};

    $.blockUI({
        message: '<div style="display: absolute; left: 50%; right: 50%; margin: 10px; padding: 10px;"><span class="fas fa-cog fa-spin fa-3x" style="vertical-align: middle;"></span>&nbsp;&nbsp;<span>Procesando, un momento por favor...</span></div>',
        centerX: true,
        centerY: true,
        bindEvents: true,
        ignoreIfBlocked: true,
        baseZ: 5000,
        css: {
            left: '50%',
            top: '40%',
            transform: 'translate(-50%, 0)',
            padding: 0,
            margin: 0,
            textAlign: 'center',
            color: '#000',
            border: '1px solid #aaa',
            borderRadius: '5px',
            backgroundColor: '#fff',
            cursor: 'wait'
        },
    });
}

function unBlockUI() {
    $.unblockUI();
}

function FechaHoraNow() {
    return luxon.DateTime.now().setLocale('ec').toLocaleString(luxon.DateTime.DATETIME_FULL_WITH_SECONDS, { locale: 'es-ES' });
}

function TogglePassword(input, claseIcono) {
    let togglePassword = document.querySelector("." + claseIcono + "");
    let password = document.querySelector("#" + input + "");

    togglePassword.addEventListener("click", function () {
        let type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        this.classList.toggle('bi-eye-fill');
        this.classList.toggle('bi-eye-slash-fill');
    });
}
