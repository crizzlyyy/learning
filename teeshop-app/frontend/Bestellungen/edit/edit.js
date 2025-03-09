
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
let bestellungAbgeschlossen = document.getElementById("bestellungAbgeschlossen");
let preis = document.getElementById("preis");
let kundenNummer = document.getElementById("kundenNummer");

document.addEventListener("DOMContentLoaded", () => {
    let bestandIdParam = new URLSearchParams(window.location.search);
    const artikelNr = bestandIdParam.get("id");

    fetch(`http://127.0.0.1:8000/bestellungen/${artikelNr}`, {

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
    
        id.value = data.bestellNr;
    
        bestellungAbgeschlossen.value = data.bestellungAbgeschlossen ? "true" : "false";
    
        preis.value = data.preis.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
    
        kundenNummer.value = data.kundenNummer;
    
    })
    
    .catch(error => {
    
        console.error("Fehler beim Abrufen der Daten:", error);
    
        alert("Fehler beim Laden der Artikel!");
    
    });
    
});

function edit() {
    newData = {
      bestellNr: id.value,
      bestellungAbgeschlossen: bestellungAbgeschlossen.value === "true",
      preis: preis.value.replace(/[.€\s]/g, "").replace(",", "."),
      kundenNummer: kundenNummer.value,
    };
   
    fetch(`http://127.0.0.1:8000/bestellungen/${newData.bestellNr}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Bestellung ${newData.bestellNr} erfolgreich bearbeitet`);
        window.location.href = "../bestellungen.html";
      });
   
    return false;
  }
  

  async function fetchKundennummern(selectedKundennummer = null) {
    const ACCESSKEY = localStorage.getItem("access");
    const select = document.getElementById("kundenNummer");  // Ensure this ID matches your HTML

    try {
        let response = await fetch("http://127.0.0.1:8000/kunden/getKundennummern", {
            headers: {
                "Authorization": `Bearer ${ACCESSKEY}`,
            }
        });

        if (!response.ok) throw new Error("Fehler beim Abrufen der Kundennummern.");

        let kundennummern = await response.json();
        select.innerHTML = "";  // Clear previous entries

        if (!kundennummern.length) {
            let option = document.createElement("option");
            option.value = "";
            option.textContent = "Keine Kundennummern verfügbar";
            select.appendChild(option);
            return;
        }

        kundennummern.forEach(num => {
            let option = document.createElement("option");
            option.value = num;
            option.textContent = `Kundennummer: ${num}`;

            if (num === selectedKundennummer) {
                option.selected = true;  // Preselect if editing
            }

            select.appendChild(option);
        });

    } catch (error) {
        console.error("Fehler beim Laden der Kundennummern:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => fetchKundennummern());
