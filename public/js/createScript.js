
window.addEventListener("load", function () {


    let formulario = document.querySelector("#formCreate")

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        const errors = []
        
        // input Precio
        if (formulario.precio.value == "") {
            errors.push("Este campo no puede estar vacio")
            formulario.precio.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")


            // input Imagen
            let extencion = /(.PNG|.JPG|.JPEG|.GIF)/i;
            if (!extencion.exec(formulario.imagen.value)) {
                errors.push("Formato de imagen no permitido")
                formulario.imagen.parentElement.querySelector(".error").innerHTML = ("Formato de imagen no permitido")
            }

            // input Descripcion
            
            if (formulario.descripcion.value < 20) {
                errors.push("Debe tener al menos 20 caracteres")
                formulario.descripcion.parentElement.querySelector(".error").innerHTML = ("Debe tener al menos 20 caracteres")
            }
        }
        if (errors.length == 0) {
            formulario.submit();
        }
    })
})