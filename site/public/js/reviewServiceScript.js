

window.addEventListener("load", function(){ 

    let satisfactionReview = document.querySelector(".satisfactionReview")
    let commentReview = document.querySelector(".commentReview")


    const errors = []

    satisfactionReview.addEventListener('blur', function(){
        if(satisfactionReview.value == "") {
          errors.push("Este campo no puede estar vacio")
          satisfactionReview.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
          console.log(errors);
        }
    
    })

    commentReview.addEventListener('blur', function(){
        if(commentReview.value == "") {
            errors.push("Este campo no puede estar vacio")
            commentReview.parentElement.querySelector(".error").innerHTML = ("Este campo no puede estar vacio")
            console.log(errors);
        }else if (commentReview.value.length < 20) {
            errors.push("Debe tener al menos 20 caracteres")
            commentReview.parentElement.querySelector(".error").innerHTML = ("Debe tener al menos 20 caracteres")
        }
    })

})