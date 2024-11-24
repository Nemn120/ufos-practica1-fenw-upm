
const saveButton = document.getElementById("formRegister");
console.log(saveButton);
saveButton.addEventListener("submit", function(event) {
    event.preventDefault();
    
    let user = document.getElementById('user').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let repeat = document.getElementById('repeat').value;
    if(user.trim() === ''){
        alert('User blank'); 
    }
    if(password != repeat){
        alert('Password incorrect'); 
    }else{
        const data = {
        username: user,
        email: email,
        password: password
        };
        fetch('http://wd.etsisi.upm.es:10000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log(response.json());
                    alert('User register succefull');
                    window.location.href = "index.html";
                } else {
                    return response.json().then(err => {
                        throw new Error(err.message || 'Error en el registro.');
                    });
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error.message);
                alert('Error en el registro: ' + error.message);
            });
        }
  });
  