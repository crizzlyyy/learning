document.getElementById('newArtikelForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const ACCESSKEY = localStorage.getItem("access");
    
    const newArtikel = {
      nachname: document.getElementById('nachname').value,
      vorname: document.getElementById('vorname').value,
      strasse : document.getElementById('strasse').value,
      hausNr : document.getElementById('hausNr').value,
      ort : document.getElementById('ort').value,
      plz : document.getElementById('plz').value,
      telefonNr : document.getElementById('telefonNr').value,
      gehalt : document.getElementById('gehalt').value,
      vertragSeit : document.getElementById('vertragSeit').value,
      vertragBis : document.getElementById('vertragBis').value,
    };
    
    console.log(ACCESSKEY)

    fetch("http://127.0.0.1:8000/mitarbeiter/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${ACCESSKEY}`,
      },
      body: JSON.stringify(newArtikel),
    })
    .then(response => {
      if (response.ok) {
        alert("Neuer Mitarbeiter erfolgreich hinzugefügt!");
        window.location.href = "../mitarbeiter.html"; // Redirect after success
      } else {
        alert("Fehler beim Hinzufügen des Mitarbeiters.");
      }
    })
    .catch(error => console.error("Fehler:", error));
  });
  