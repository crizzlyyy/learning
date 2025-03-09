
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

function logOut() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "../index.html";
  }


  async function fetchMinBestandSoon() {
    const ACCESSKEY = localStorage.getItem("access");
  
    try {
      let response = await fetch("http://127.0.0.1:8000/lagerbestand/minBestandSoon", {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${ACCESSKEY}`,
        }
      });
  
      if (!response.ok) throw new Error("Fehler beim Abrufen der Daten");
  
      let data = (await response.json()).minBestandSoon; // JSON-Daten holen
  
      const tableBody = document.getElementById("table-body");
      tableBody.innerHTML = ""; // Tabelle leeren, um doppelte Einträge zu vermeiden
  
      data.forEach(minBestandSoon => {
        let tableRow = document.createElement("tr");
        tableRow.classList.add("table-row");
  
        let tableDataArtikelNr = document.createElement("td");
        tableDataArtikelNr.classList.add("table-cell", "table-bestell-id");
        tableDataArtikelNr.textContent = minBestandSoon.artikelNr;
  
        let tableDataArtikel = document.createElement("td");
        tableDataArtikel.classList.add("table-cell", "table-bestellung-abgeschlossen");
        tableDataArtikel.textContent = minBestandSoon.artikel;
  
        let tableDataMenge = document.createElement("td");
        tableDataMenge.classList.add("table-cell", "table-preis");
        tableDataMenge.textContent = minBestandSoon.menge;
  
        let tableDataMinBestand = document.createElement("td");
        tableDataMinBestand.classList.add("table-cell", "table-kunden-nr");
        tableDataMinBestand.textContent = minBestandSoon.minBestand;
  
  
        tableRow.appendChild(tableDataArtikelNr);
        tableRow.appendChild(tableDataArtikel);
        tableRow.appendChild(tableDataMenge);
        tableRow.appendChild(tableDataMinBestand);
  
        tableBody.appendChild(tableRow);
      });
  
    } catch (error) {
      console.error("Fehler beim Laden der Bestellungen:", error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", fetchMinBestandSoon);  


  document.addEventListener("DOMContentLoaded", function() {
    fetch('http://127.0.0.1:8000/bestellungen/dashboard/')  // API-URL aus Django abrufen
    .then(response => response.json())
    .then(data => {

      document.getElementById('gesamtUmsatz').innerText = data.umsatz_gesamt.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
      document.getElementById('umsatzProMitarbeiter').innerText = data.umsatz_mitarbeiter.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
      document.getElementById('offeneBestellungen').innerText = data.offene_bestellungen;
      document.getElementById('gesamteBestellungen').innerText = data.bestellung_gesamt;

        
      const tableBody = document.getElementById('table-body-middle2')
      data.beste_kunden_data.forEach( kundennummern => {
      
      const row = document.createElement('tr');
      row.classList.add("table-row");

      const cellkundenNummer = document.createElement('td');
      cellkundenNummer.classList.add("table-cell", "cellkundenNummer");
      cellkundenNummer.textContent = kundennummern.kundennummer;
      row.appendChild(cellkundenNummer);
  
      const cellgesamtUmsatz = document.createElement('td');
      cellgesamtUmsatz.classList.add("table-cell", "cellgesamtUmsatz");
      cellgesamtUmsatz.textContent = kundennummern.gesamtumsatz.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
      row.appendChild(cellgesamtUmsatz);
  
      const cellanzahlBestellungen = document.createElement('td');
      cellanzahlBestellungen.classList.add("table-cell", "cellanzahlBestellungen");
      cellanzahlBestellungen.textContent = kundennummern.anzahl_bestellungen;
      row.appendChild(cellanzahlBestellungen);

      const celldurchschnittUmsatz = document.createElement('td');
      celldurchschnittUmsatz.classList.add("table-cell", "celldurchschnittUmsatz");
      celldurchschnittUmsatz.textContent = kundennummern.umsatz_pro_bestellung.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })  + " €";
      row.appendChild(celldurchschnittUmsatz);
  
        // Füge die erstellte Zeile in den Tabellenkörper ein
      tableBody.appendChild(row);


      });
                


    })
    .catch(error => console.error('Fehler beim Laden der Dashboard-Daten:', error));
});


