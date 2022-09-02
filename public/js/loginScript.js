
window.addEventListener("load", function () {


    let formulario = document.querySelector("#formLogin")

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        const errors = []
        // input email
        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        const test = emailRegex.test(formulario.email.value)
        if (formulario.email.value == "") {
            errors.push("Este campo no puede estar vacio entendes")
            formulario.email.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
        }
        else if (!test) {
            errors.push("Debe ser un correo electronico valido")
            formulario.email.parentElement.querySelector(".error").innerHTML = ("Debe ser un correo electronico valido")
        }

        //////////////////////////// FALTA  VERIFICAR QUE EL CORREO EXISTA EN DB ////////////////////////////////////////////

        // input password 
        if (formulario.password.value == "") {
            errors.push("Este campo no puede estar vacio")
            formulario.password.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
        }
       //////////////////////////// FALTA  VERIFICAR QUE LA PASSWORD SEA LA MISMA QUE LA DE DB ////////////////////////////////////////////
        if (errors.length == 0) {
            formulario.submit();
        }
    })
})