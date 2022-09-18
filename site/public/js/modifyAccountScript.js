

window.addEventListener("load", function(){
  
  
    let fullname = document.querySelector(".fullname")
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

        barrio.addEventListener("change", async function() {

          console.log(barrio.value)

        })
  
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