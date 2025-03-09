
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


fetch("http://127.0.0.1:8000/produktkatalog/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESSKEY}`,
    },
})

.then((response) => response.json())
.then((data) => {
    data.forEach((katalog) => {
      let tableRow = document.createElement("tr");
      tableRow.classList.add("table-row");

      let tableDataID = document.createElement("td");
      tableDataID.classList.add("table-cell", "table-id");

      let tableDataArtikel = document.createElement("td");
      tableDataArtikel.classList.add("table-cell", "table-artikel");

      let tableDataMenge = document.createElement("td");
      tableDataMenge.classList.add("table-cell", "table-menge");

      let tableDataMinBes = document.createElement("td");
      tableDataMinBes.classList.add("table-cell", "table-min-bes");

      let tableDataEdit = document.createElement("td");
      tableDataEdit.classList.add("table-cell", "table-edit");

      let tableDataDelete = document.createElement("td");
      tableDataDelete.classList.add("table-cell", "table-delete");

        tableDataID.innerHTML = `${katalog.artikelNr}`;
        tableDataArtikel.innerHTML = `${katalog.artikel}`;
        tableDataMenge.innerHTML = `${katalog.beschreibung}`;
        tableDataMinBes.innerHTML = `${katalog.preis.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
        tableDataEdit.innerHTML = `<button class="button" onclick="edit(${katalog.artikelNr})">Bearbeiten</button>`;
        tableDataDelete.innerHTML = `<button class="button" onclick="deleteEntry(${katalog.artikelNr})">Löschen</button>`;

        tableBody.appendChild(tableRow);

        tableRow.appendChild(tableDataID);
        tableRow.appendChild(tableDataArtikel);
        tableRow.appendChild(tableDataMenge);
        tableRow.appendChild(tableDataMinBes);
        tableRow.appendChild(tableDataEdit);
        tableRow.appendChild(tableDataDelete);

    });
}) 


function edit(artikelNr){
    window.location.href = `./edit/edit.html?id=${artikelNr}`
};

function deleteEntry(artikelNr) {
    if (artikelNr) {
        const ACCESSKEY = localStorage.getItem("access");
    
        fetch(`http://127.0.0.1:8000/produktkatalog/${artikelNr}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ACCESSKEY}`,
          },
        })
        .then(response => {
          if (response.ok) {
            alert("Artikel erfolgreich gelöscht!");
            location.reload();
          } else {
            alert("Fehler beim Löschen des Artikels.");
          }
        })
        .catch(error => console.error("Fehler:", error));
      } else {
        alert("Keine Artikel Nummer gefunden.");
      }
}

function newEntry(){

  window.location.href = "./new/new.html"
}
