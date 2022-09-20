
window.addEventListener("load", function(){ 

    let date = document.querySelector(".date")
    let time = document.querySelector(".time")


    const errors = []

    date.addEventListener('blur', function(){
        if(date.value == "") {
          errors.push("Este campo no puede estar vacio")
          date.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
          console.log(errors);
        }else {
            date.parentElement.querySelector(".error").innerHTML = ("")
          }
    
    })

    time.addEventListener('blur', function(){
        if(time.value == "") {
            errors.push("Este campo no puede estar vacio")
            time.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
            console.log(errors);
        }else {
            time.parentElement.querySelector(".error").innerHTML = ("")
          }
    })

})

