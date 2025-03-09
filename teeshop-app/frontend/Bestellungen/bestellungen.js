
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

let tableBody = document.getElementById("table-body");

const ACCESSKEY = localStorage.getItem("access");

const urlParams = new URLSearchParams(window.location.search);
const bestellId = urlParams.get('id');


fetch("http://127.0.0.1:8000/bestellungen/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESSKEY}`,
    },
})

.then((response) => response.json())
.then((data) => {
    data.forEach((bestellungen) => {
      let tableRow = document.createElement("tr");
      tableRow.classList.add("table-row");

      let tableDataBestellNr = document.createElement("td");
      tableDataBestellNr.classList.add("table-cell", "table-bestell-id");

      let tableDataBestellungAbgeschlossen = document.createElement("td");
      tableDataBestellungAbgeschlossen.classList.add("table-cell", "table-bestellung-abgeschlossen");

      let tableDataPreis = document.createElement("td");
      tableDataPreis.classList.add("table-cell", "table-preis");

      let tableDataKundenNummer = document.createElement("td");
      tableDataKundenNummer.classList.add("table-cell", "table-kunden-nr");

      let tableDataEdit = document.createElement("td");
      tableDataEdit.classList.add("table-cell", "table-edit");

      let tableDataDelete = document.createElement("td");
      tableDataDelete.classList.add("table-cell", "table-delete");

        tableDataBestellNr.innerHTML = `${bestellungen.bestellNr}`;
        tableDataBestellungAbgeschlossen.innerHTML = `${bestellungen.bestellungAbgeschlossen ? "Ja" : "Nein"}`;
        tableDataPreis.innerHTML = `${bestellungen.preis.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
        tableDataKundenNummer.innerHTML = `${bestellungen.kundenNummer}`;
        tableDataEdit.innerHTML = `<button class="button" onclick="edit(${bestellungen.bestellNr})">Bearbeiten</button>`;
        tableDataDelete.innerHTML = `<button class="button" onclick="deleteEntry(${bestellungen.bestellNr})">Löschen</button>`;

        tableBody.appendChild(tableRow);

        tableRow.appendChild(tableDataBestellNr);
        tableRow.appendChild(tableDataBestellungAbgeschlossen);
        tableRow.appendChild(tableDataPreis);
        tableRow.appendChild(tableDataKundenNummer);
        tableRow.appendChild(tableDataEdit);
        tableRow.appendChild(tableDataDelete);

    });
}) 


function edit(bestellId){
    window.location.href = `./edit/edit.html?id=${bestellId}`
};

function deleteEntry(bestellId) {
    if (bestellId) {
        const ACCESSKEY = localStorage.getItem("access");
    
        fetch(`http://127.0.0.1:8000/bestellungen/${bestellId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ACCESSKEY}`,
          },
        })
        .then(response => {
          if (response.ok) {
            alert("Bestellung erfolgreich gelöscht!");
            location.reload();
          } else {
            alert("Fehler beim Löschen der Bestellung.");
          }
        })
        .catch(error => console.error("Fehler:", error));
      } else {
        alert("Keine Bestellnummer gefunden.");
      }
}

function newEntry(){

  window.location.href = "./new/new.html"
}
