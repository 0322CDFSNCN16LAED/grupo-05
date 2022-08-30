
window.addEventListener("load", function(){
  
  
  let formulario = document.querySelector("#formRegister")   
  
  formulario.addEventListener("submit",function(e){
    e.preventDefault();

    const errors = []
    // input Nombre completo
    if(formulario.fullname.value == "") {
      errors.push("Este campo no puede estar vacio")
    formulario.fullname.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
      }else if(formulario.fullname.value.length <= 2){
        errors.push("Este campo debe tener mas de 2 caracteres")
    formulario.fullname.parentElement.querySelector(".error").innerHTML = ("Este campo debe tener mas de 2 caracteres")
      }
      // input email
     const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      const test = emailRegex.test(formulario.email.value)
      if(formulario.email.value == ""){
        errors.push("Este campo no puede estar vacio")
        formulario.email.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
      }
      else if(!test){
        errors.push("Debe ser un correo electronico valido")
        formulario.email.parentElement.querySelector(".error").innerHTML = ("Debe ser un correo electronico valido")
      }
     
      //////////////////////////// FALTA  VERIFICAR QUE EL NO CORREO EXISTA EN DB ////////////////////////////////////////////

      // input Contraceña 
      let passRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
      let testpassword = passRegex.test(formulario.password.value)

     
      if(formulario.password.value == ""){
        errors.push("Este campo no puede estar vacio")
        formulario.password.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
      }else if (formulario.password.value.length <= 8){
        errors.push("La contraceña debe terner al menos 8 caracteres")
        formulario.password.parentElement.querySelector(".error").innerHTML = ("La contraceña debe terner al menos 8 caracteres")
      }else if(!testpassword){
        errors.push("La contraseña debe tener * numeros,caracteres especiales,mayusculas y minusculas")
        formulario.password.parentElement.querySelector(".error").innerHTML = ("La contraseña debe tener * numeros,caracteres especiales,mayusculas y minusculas")
      }

      // input Imagen
      let extencion = /(.PNG|.JPG|.JPEG|.GIF)/i;
      if(!extencion.exec(formulario.imagen.value)){
        errors.push("Formato de imagen no permitido")
        formulario.imagen.parentElement.querySelector(".error").innerHTML = ("Formato de imagen no permitido")
      }

      // input Telefono
    if (formulario.phone.value == "") {
      errors.push("Este campo no puede estar vacio")
      formulario.phone.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
    }
      // input Localidad

      // input Barrio

      // input Direccion
    if (formulario.direccion.value == "") {
      errors.push("Este campo no puede estar vacio")
      formulario.direccion.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
    }

      //
      if(errors.length == 0){
        formulario.submit();
      }
    })
})