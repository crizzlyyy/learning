
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
      menge: document.getElementById('menge').value,
      minBestand: document.getElementById('minBestand').value,
    };
    
    console.log(newArtikel.artikel)
    console.log(newArtikel.menge)
    console.log(newArtikel.minBestand)
    
    fetch("http://127.0.0.1:8000/lagerbestand/create", {
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
        window.location.href = "../lagerbestand.html"; // Redirect after success
      } else {
        alert("Fehler beim Hinzufügen des Artikel.");
      }
    })
    .catch(error => console.error("Fehler:", error));
  });
  

  async function fetchArtikel() {

    const ACCESSKEY = localStorage.getItem("access");

    try {
      let response = await fetch("http://127.0.0.1:8000/produktkatalog/fetchArtikel", {
          headers: {
              "authorization": `Bearer ${ACCESSKEY}`,
          }
      });

      if (!response.ok) throw new Error("Fehler beim Abrufen der Kundennummern.");

        let artikel = await response.json();

        let select = document.getElementById("artikel");
        select.innerHTML = "";

        artikel.forEach(num => {
            let option = document.createElement("option");
            option.value = num;
            option.textContent = num;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Fehler beim Laden der Kundennummern:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchArtikel);

