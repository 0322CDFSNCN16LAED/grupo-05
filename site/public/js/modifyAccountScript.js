

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
          const localidadId = localidad.value
  
          const barriosFetch = await fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${localidadId}&campos=id,nombre&max=100`)
          const barriosJSON = await barriosFetch.json()
          const barrios = await barriosJSON.municipios
  
          for (let i = 0; i < barrios.length; i ++) {
            barrio.innerHTML +=  `<option value=${barrios[i].id}>` + barrios[i].nombre + "</option>"
          }


          const provinciasFetch = await fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre")
          const provinciasJSON = await provinciasFetch.json()
          const provincias = provinciasJSON.provincias
  
          let provinciaSeleccionada = ""
          for (let i = 0; i < provincias.length; i ++) {
            if (provincias[i].id == localidadId) {
              provinciaSeleccionada = provincias[i].nombre
            }
          }
          localidad.value = provinciaSeleccionada
          localidad.innerHTML = "<option selected>" + provinciaSeleccionada + "</option>"

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