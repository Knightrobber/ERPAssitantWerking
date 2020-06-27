firebase.auth().onAuthStateChanged(function(user){
    if(user){
        username = user.email;
        
    }
    else{
        console.log("no user signed in")
    }

})

function login(){
    var email = document.getElementById("emailStudent").value
    var password = document.getElementById('passwordStudent').value;
    var emailTeacher = document.getElementById("emailTeacher").value
    var passwordTeacher = document.getElementById('passwordTeacher').value;
    console.log(emailTeacher + " " + passwordTeacher)
    console.log(email + " " + password)
    
    if(email!='' && password !=''){
    firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
if(user){
    console.log(user.email);
    window.location.href = "student/add_course.html"
}


    }).catch(function(error){
        window.alert("Error: " + error.message);
    });
    }
    else if(emailTeacher!='' && passwordTeacher!=''){
        firebase.auth().signInWithEmailAndPassword(emailTeacher,passwordTeacher).then(function(user){
            if(user){
                console.log(user.emailTeacher);
                window.location.href = "faculty/add_timetable.html"
            }
            
            
                }).catch(function(error){
                    window.alert("Error: " + error.message);
                });
    }
    
    
}

function signUp(){
    var email = document.getElementById("emailSignStudent").value
    var password = document.getElementById('passwordSignStudent').value;
    var emailTeacher = document.getElementById("emailSignTeacher").value
    var passwordTeacher = document.getElementById('passwordSignTeacher').value;
if(email!='' && password!=''){
    firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
        firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
            if(user){
                console.log(user.email)
                window.location.href = "student/add_course.html"
            }
        }).catch(function(error){
            window.alert("Error: " + error.message);
        })
    }).catch(function(error){
        window.alert("Error: " + error.message);
    })
}
else if(emailTeacher!='' && passwordTeacher!=''){
    firebase.auth().createUserWithEmailAndPassword(emailTeacher,passwordTeacher).then(function(){
        firebase.auth().signInWithEmailAndPassword(emailTeacher,passwordTeacher).then(function(user){
            if(user){
                console.log(user.emailTeacher)
                window.location.href = "faculty/add_timetable.html"
            }
        }).catch(function(error){
            window.alert("Error: " + error.message);
        })
    }).catch(function(error){
        window.alert("Error: " + error.message);
    })
}
}


