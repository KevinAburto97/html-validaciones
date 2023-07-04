export function valida(input){
    const tipoInput = input.dataset.tipo
    if(validadores[tipoInput])
        validadores[tipoInput](input)

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }
    else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput, input)
    }
}

const mensajeError = {
    nombre : {
        valueMissing : "El campo nombre no puede estar vacío"
    },
    email : {
        valueMissing : "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password:{
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento:{
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad."
    },
    numero:{
        valueMissing : "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números"
    },
    direccion:{
        valueMissing : "Este campo no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres."
    },
    ciudad:{
        valueMissing : "Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres."
    },
    estado:{
        valueMissing : "Este campo no puede estar vacío",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres."
    }
}

const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const validadores = {
    nacimiento: (input)  => validarNacimiento(input)
}

function mostrarMensajeError(tipoInput, input){
    let mensaje = ""
    tipoErrores.forEach( error => {
        if(input.validity[error])
            mensaje = mensajeError[tipoInput][error]
    })

    return mensaje
}

function validarNacimiento(input){
    const date = new Date(input.value)
    let message = ""
    if(!mayorEdad(date))
        message = "Debes tener al menos 18 años de edad."

    input.setCustomValidity(message)
}

function mayorEdad(date){
    const currentDate = new Date(),
            compareDateTo = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate())
    return compareDateTo <= currentDate
}