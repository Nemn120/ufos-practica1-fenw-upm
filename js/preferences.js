
const saveButton = document.getElementById("formPreference");
console.log(saveButton);
saveButton.addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    const numberUfos = document.getElementById('numberUfos').value;
    const timeGame = document.getElementById('timeGame').value;
  
    if (numberUfos && timeGame) {
      localStorage.setItem('numberUfos', numberUfos);
      localStorage.setItem('timeGame', timeGame);
      console.log(timeGame);
      alert('Preferencias guardadas correctamente.');
      window.location.href = "play.html";
    } else {
      alert('Por favor completa todos los campos.');
    }
  });
  