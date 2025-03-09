
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

document.getElementById('newBestellungForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const ACCESSKEY = localStorage.getItem("access");
    
    const newArtikel = {
      bestellungAbgeschlossen: document.getElementById('bestellungAbgeschlossen').value,
      preis: document.getElementById('preis').value.replace(".","").replace("€", "").trim().replace(",", "."),
      kundenNummer: document.getElementById('kundenNummer').value,
    };
    
    console.log(ACCESSKEY)

    fetch("http://127.0.0.1:8000/bestellungen/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${ACCESSKEY}`,
      },
      body: JSON.stringify(newArtikel),
    })
    .then(response => {
      if (response.ok) {
        alert("Neue Bestellung erfolgreich hinzugefügt!");
        window.location.href = "../bestellungen.html"; // Redirect after success
      } else {
        alert("Fehler beim Hinzufügen der Bestellung.");
      }
    })
    .catch(error => console.error("Fehler:", error));
  });
  

  async function fetchKundennummern() {

    const ACCESSKEY = localStorage.getItem("access");

    try {
      let response = await fetch("http://127.0.0.1:8000/kunden/getKundennummern", {
          headers: {
              "authorization": `Bearer ${ACCESSKEY}`,
          }
      });

      if (!response.ok) throw new Error("Fehler beim Abrufen der Kundennummern.");

        let kundennummern = await response.json();

        let select = document.getElementById("kundenNummer");
        select.innerHTML = "";

        kundennummern.forEach(num => {
            let option = document.createElement("option");
            option.value = num;
            option.textContent = `Kundennummer: ${num}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Fehler beim Laden der Kundennummern:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchKundennummern);

