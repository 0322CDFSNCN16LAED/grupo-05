

window.addEventListener("load", function(){
  
  
  let formulario = document.querySelector("#formRegister")
  let fullname = document.querySelector(".fullname")
  let email = document.querySelector(".email")
  let password = document.querySelector(".password")
  let passwordConfirmation = document.querySelector(".passwordConfirmation")
  let imagen = document.querySelector(".imagen")
  let phone = document.querySelector(".phone")
  let localidad = document.querySelector(".localidad")
  let barrio = document.querySelector(".barrio")
  let direccion = document.querySelector(".direccion")
  
    const errors = []
    // input Nombre completo

    fullname.addEventListener('blur', function(){
      if(fullname.value == "") {
        errors.push("Este campo no puede estar vacio")
        fullname.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
        console.log(errors);
      }else if(fullname.value.length <= 2){
          errors.push("Este campo debe tener mas de 2 caracteres")
          fullname.parentElement.querySelector(".error").innerHTML = ("Este campo debe tener mas de 2 caracteres")
        }
        else {
          fullname.parentElement.querySelector(".error").innerHTML = ("")
        }
        
    })

    email.addEventListener('blur', function(){
        // input email
        console.log('hola')
        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        const test = emailRegex.test(email.value)
        if(email.value == ""){
          errors.push("Este campo no puede estar vacio")
          email.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
        }
        else if(!test){
          errors.push("Debe ser un correo electronico valido")
          email.parentElement.querySelector(".error").innerHTML = ("Debe ser un correo electronico valido")
        }else {
          email.parentElement.querySelector(".error").innerHTML = ("")
        }
        
    })
     
      //////////////////////////// FALTA  VERIFICAR QUE EL NO CORREO EXISTA EN DB ////////////////////////////////////////////

      password.addEventListener('blur', function(){
            // input Contraceña 
          let passRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
          let testpassword = passRegex.test(password.value)
          console.log(password)
          if(password.value == ""){
            errors.push("Este campo no puede estar vacio")
            password.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
          }else if (password.value.length < 8){
            errors.push("La contraseña debe tener al menos 8 caracteres")
            password.parentElement.querySelector(".error").innerHTML = ("La contraseña debe terner al menos 8 caracteres")
          }else if(!testpassword){
            errors.push("La contraseña debe tener * numeros,caracteres especiales,mayusculas y minusculas")
            password.parentElement.querySelector(".error").innerHTML = ("La contraseña debe tener * numeros,caracteres especiales,mayusculas y minusculas")
          }else {
            password.parentElement.querySelector(".error").innerHTML = ("")
          }
      })

      passwordConfirmation.addEventListener('blur', function(){
        if(passwordConfirmation.value != password.value){
          //errors.push("Las constraseñas deben coincidir")
          passwordConfirmation.parentElement.querySelector(".error").innerHTML = ("Las constraseñas deben coincidir")
        }else {
          passwordConfirmation.parentElement.querySelector(".error").innerHTML = ("")
        }
      })
      
      imagen.addEventListener('blur', function(){
            // input Imagen
        let extencion = /(.PNG|.JPG|.JPEG|.GIF)/i;
        if(!extencion.exec(imagen.value) && imagen.value){
          errors.push("Formato de imagen no permitido")
          imagen.parentElement.querySelector(".error").innerHTML = ("Formato de imagen no permitido")
        }else {
          imagen.parentElement.querySelector(".error").innerHTML = ("")
        }
      })
  
      phone.addEventListener('blur', function(){
            // input Telefono
            if (phone.value == "") {
              errors.push("Este campo no puede estar vacio")
              phone.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
            }else {
              phone.parentElement.querySelector(".error").innerHTML = ("")
            }
      })
    
      // input localidad y barrio

      localidad.addEventListener("change", async function() {
        const nombreLocalidad= localidad.value

          console.log(nombreLocalidad)
  
          const barriosFetch = await fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${nombreLocalidad}&campos=id,nombre&max=100`)
          const barriosJSON = await barriosFetch.json()
          const barrios = await barriosJSON.municipios

          barrio.innerHTML = "<option selected>Seleccione una opcion</option>"

          if (barrios.length > 0) {
            for (let i = 0; i < barrios.length; i ++) {
              barrio.innerHTML +=  `<option value="${barrios[i].nombre}">` + barrios[i].nombre + "</option>"
            }
          } else {
            console.log("llego aca")
            const barriosFetch = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${nombreLocalidad}&campos=nombre&max=100`)
            const barriosJSON = await barriosFetch.json()
            const barrios = await barriosJSON.localidades

            for (let i = 0; i < barrios.length; i ++) {
              barrio.innerHTML +=  `<option value="${barrios[i].nombre}">` + barrios[i].nombre + "</option>"
            }
          }
        
      })

      // input Barrio

      direccion.addEventListener('blur', function(){
            // input Direccion
          if (direccion.value == "") {
            errors.push("Este campo no puede estar vacio")
            direccion.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
          }else {
            direccion.parentElement.querySelector(".error").innerHTML = ("")
          }
      })
    
    })
