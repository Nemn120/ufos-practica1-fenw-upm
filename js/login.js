

const saveButton = document.getElementById("formLogin");
console.log(saveButton);
saveButton.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
  
    if (user && password) {
      loginUser(user, password);
    } else {
      alert('Complete fields please.');
    }
  });

  function loginUser(username, password) {
    const url = `http://wd.etsisi.upm.es:10000/users/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    fetch(url, {
        method: 'GET'
    })
        .then(response => {
            if (response.ok) {
                const authToken = response.headers.get('Authorization');
                return response.json().then(data => {
                    if (authToken || data.token) {
                        localStorage.setItem('authToken', authToken || data.token);
                        console.log('Inicio de sesión exitoso. Token almacenado:', authToken || data.token);
                        alert('User loggedin.');
                        window.location.href = "preferences.html";
                    } else {
                        throw new Error('No se recibió un token de seguridad.');
                    }
                });
            } else {
                return response.json().then(data => {
                    throw new Error(data.message || 'Error de inicio de sesión.');
                });
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error.message);
            alert(error.message);
        });
}

  