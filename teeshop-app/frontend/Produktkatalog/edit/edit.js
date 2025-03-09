
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

const accessToken = localStorage.getItem("access");
let id = document.getElementById("id");
let artikel = document.getElementById("artikel");
let beschreibung = document.getElementById("beschreibung");
let preis = document.getElementById("preis");

document.addEventListener("DOMContentLoaded", () => {
    let bestandIdParam = new URLSearchParams(window.location.search);
    const artikelNr = bestandIdParam.get("id");

    fetch(`http://127.0.0.1:8000/produktkatalog/${artikelNr}`, {

        method: "GET",
    
        headers: {
    
            "Content-Type": "application/json",
    
            "Authorization": `Bearer ${accessToken}`
    
        },
    
    })
    
    .then(response => {
    
        if (!response.ok) {
    
            throw new Error(`Fehler: ${response.status} - ${response.statusText}`);
    
        }
    
        return response.json();
    
    })
    
    .then(data => {
    
        id.value = data.artikelNr;
    
        artikel.value = data.artikel;
    
        beschreibung.value = data.beschreibung;
    
        preis.value = data.preis.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
    
    })
    
    .catch(error => {
    
        console.error("Fehler beim Abrufen der Daten:", error);
    
        alert("Fehler beim Laden der Artikel!");
    
    });
    
});

function edit() {
    newData = {
      id: id.value,
      artikel: artikel.value,
      beschreibung: beschreibung.value,
      preis: preis.value.replace(".","").replace("€", "").trim().replace(",", "."),
    };
   
    fetch(`http://127.0.0.1:8000/produktkatalog/${newData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Artikel ${newData.id} erfolgreich bearbeitet`);
        window.location.href = "../produktkatalog.html";
      });
   
    return false;
  }
   