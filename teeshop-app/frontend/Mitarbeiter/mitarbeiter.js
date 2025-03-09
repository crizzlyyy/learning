
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
const artikelNr = urlParams.get('id');


fetch("http://127.0.0.1:8000/mitarbeiter/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESSKEY}`,
    },
})

.then((response) => response.json())
.then((data) => {
    data.forEach((mitarbeiter) => {
      let tableRow = document.createElement("tr");
      tableRow.classList.add("table-row");

      let tableDataID = document.createElement("td");
      tableDataID.classList.add("table-cell", "table-id");

      let tableDatanachname = document.createElement("td");
      tableDatanachname.classList.add("table-cell", "table-nachname");

      let tableDatavorname = document.createElement("td");
      tableDatavorname.classList.add("table-cell", "table-vorname");

      let tableDatastrasse = document.createElement("td");
      tableDatastrasse.classList.add("table-cell", "table-strasse");

      let tableDatahausNr = document.createElement("td");
      tableDatahausNr.classList.add("table-cell", "table-hausNr");

      let tableDataort = document.createElement("td");
      tableDataort.classList.add("table-cell", "table-ort");
      
      let tableDataplz = document.createElement("td");
      tableDataplz.classList.add("table-cell", "table-plz");
      
      let tableDatatelefonNr = document.createElement("td");
      tableDatatelefonNr.classList.add("table-cell", "table-telefonNr");
      
      let tableDatagehalt = document.createElement("td");
      tableDatagehalt.classList.add("table-cell", "table-gehalt");
      
      let tableDatavertragSeit = document.createElement("td");
      tableDatavertragSeit.classList.add("table-cell", "table-vertragSeit");
      
      let tableDatavertragBis = document.createElement("td");
      tableDatavertragBis.classList.add("table-cell", "table-vertragBis");

      let tableDataEdit = document.createElement("td");
      tableDataEdit.classList.add("table-cell", "table-edit");

      let tableDataDelete = document.createElement("td");
      tableDataDelete.classList.add("table-cell", "table-delete");

        tableDataID.innerHTML = `${mitarbeiter.mitarbeiterId}`;
        tableDatanachname.innerHTML = `${mitarbeiter.nachname}`;
        tableDatavorname.innerHTML = `${mitarbeiter.vorname}`;
        tableDatastrasse.innerHTML = `${mitarbeiter.strasse}`;
        tableDatahausNr.innerHTML = `${mitarbeiter.hausNr}`;
        tableDataort.innerHTML = `${mitarbeiter.ort}`;
        tableDataplz.innerHTML = `${mitarbeiter.plz}`;
        tableDatatelefonNr.innerHTML = `${mitarbeiter.telefonNr}`;
        tableDatagehalt.innerHTML = `${mitarbeiter.gehalt.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
        tableDatavertragSeit.innerHTML = `${mitarbeiter.vertragSeit}`;
        tableDatavertragBis.innerHTML = `${mitarbeiter.vertragBis}`;
        tableDataEdit.innerHTML = `<button class="button" onclick="edit(${mitarbeiter.mitarbeiterId})">Bearbeiten</button>`;
        tableDataDelete.innerHTML = `<button class="button" onclick="deleteEntry(${mitarbeiter.mitarbeiterId})">Löschen</button>`;

        tableBody.appendChild(tableRow);

        tableRow.appendChild(tableDataID);
        tableRow.appendChild(tableDatanachname);
        tableRow.appendChild(tableDatavorname);
        tableRow.appendChild(tableDatastrasse);
        tableRow.appendChild(tableDatahausNr);
        tableRow.appendChild(tableDataort);
        tableRow.appendChild(tableDataplz);
        tableRow.appendChild(tableDatatelefonNr);
        tableRow.appendChild(tableDatagehalt);
        tableRow.appendChild(tableDatavertragSeit);
        tableRow.appendChild(tableDatavertragBis);
        tableRow.appendChild(tableDataEdit);
        tableRow.appendChild(tableDataDelete);

    });
}) 


function edit(mitarbeiterId){
    window.location.href = `./edit/edit.html?id=${mitarbeiterId}`
};

function deleteEntry(mitarbeiterId) {
    if (mitarbeiterId) {
        const ACCESSKEY = localStorage.getItem("access");
    
        fetch(`http://127.0.0.1:8000/mitarbeiter/${mitarbeiterId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ACCESSKEY}`,
          },
        })
        .then(response => {
          if (response.ok) {
            alert("Mitarbeiter erfolgreich gelöscht!");
            location.reload();
          } else {
            alert("Fehler beim Löschen des Mitarbeiters.");
          }
        })
        .catch(error => console.error("Fehler:", error));
      } else {
        alert("Keine Mitarbeiter Nummer gefunden.");
      }
}

function newEntry(){

  window.location.href = "./new/new.html"
}
