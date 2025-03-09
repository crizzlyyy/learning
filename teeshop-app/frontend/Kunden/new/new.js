
async function fetchData() {
  const access = localStorage.getItem("access");

  let response = await fetch(`http://127.0.0.1:8000/protected-endpoint`, {
      method: "GET",
      headers: {
          "Authorization": `Bearer ${access}`
      }
  });

  if (response.status === 401) {  // Falls unautorisiert (Token abgelaufen)
      window.location.href = "../../index.html";
      alert("Sie wurden aus Sicherheitsgründen automatisch ausgeloggt.\nBitte erneut einloggen.")
  } else {
      let data = await response.json();
      console.log(data);
  }
}

setInterval(fetchData, 10 * 1000); // Alle 30 Sekunden prüfen

document.getElementById('newKundenForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const ACCESSKEY = localStorage.getItem("access");
    
    const newKunden = {
      vorname: document.getElementById('vorname').value,
      nachname: document.getElementById('nachname').value,
      strasse : document.getElementById('strasse').value,
      hausNr : document.getElementById('hausNr').value,
      ort : document.getElementById('ort').value,
      plz : document.getElementById('plz').value,
      mailadresse : document.getElementById('mailAdresse').value,
    };
    
    

    fetch("http://127.0.0.1:8000/kunden/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${ACCESSKEY}`,
      },
      body: JSON.stringify(newKunden),
    })
    .then(response => {
      if (response.ok) {
        alert("Neuer Kunde erfolgreich hinzugefügt!");
        window.location.href = "../kunden.html"; // Redirect after success
      } else {
        alert("Fehler beim Hinzufügen des Kunden.");
      }
    })
    .catch(error => console.error("Fehler:", error));
  });
  