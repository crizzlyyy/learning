
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


document.getElementById('newArtikelForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const ACCESSKEY = localStorage.getItem("access");
    
    const newArtikel = {
      artikel: document.getElementById('artikel').value,
      beschreibung: document.getElementById('beschreibung').value,
      preis : document.getElementById('preis').value.replace(".","").replace("€", "").trim().replace(",", "."),
    };
    
    console.log(ACCESSKEY)

    fetch("http://127.0.0.1:8000/produktkatalog/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${ACCESSKEY}`,
      },
      body: JSON.stringify(newArtikel),
    })
    .then(response => {
      if (response.ok) {
        alert("Neuer Artikel erfolgreich hinzugefügt!");
        window.location.href = "../produktkatalog.html"; // Redirect after success
      } else {
        alert("Fehler beim Hinzufügen des Artikel.");
      }
    })
    .catch(error => console.error("Fehler:", error));
  });
  