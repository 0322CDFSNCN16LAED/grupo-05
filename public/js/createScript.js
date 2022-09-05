
window.addEventListener("load", function () {


    let formulario = document.querySelector("#formCreate")
    
const errors = []

    // input Nombre completoprecio
    formulario.precio.addEventListener('blur', function () {
        if (formulario.precio.value == "") {
            errors.push("Este campo no puede estar vacio")
            formulario.precio.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
        }else {
            formulario.precio.parentElement.querySelector(".error").innerHTML = ("")
        }

    })


    formulario.imagen.addEventListener('blur', function () {
        // input Imagen
        let extencion = /(.PNG|.JPG|.JPEG|.GIF)/i;
        if (!extencion.exec(formulario.imagen.value) && formulario.imagen.value) {
            errors.push("Formato de imagen no permitido")
            formulario.imagen.parentElement.querySelector(".error").innerHTML = ("Formato de imagen no permitido")
        } else {
            formulario.imagen.parentElement.querySelector(".error").innerHTML = ("")
        }
    })

    formulario.descripcion.addEventListener('blur', function () {
        // input Telefono
        if (formulario.descripcion.value == "") {
            errors.push("Este campo no puede estar vacio")
            formulario.descripcion.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
        } else if (formulario.descripcion.value.length < 20) {
            errors.push("Debe tener al menos 20 caracteres")
            formulario.descripcion.parentElement.querySelector(".error").innerHTML = ("Debe tener al menos 20 caracteres")
        }
        else {
            formulario.descripcion.parentElement.querySelector(".error").innerHTML = ("")
        }
    })



   

})
