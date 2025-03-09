
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
const Id = urlParams.get('id');


fetch("http://127.0.0.1:8000/kunden/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESSKEY}`,
    },
})

.then((response) => response.json())
.then((data) => {
    data.forEach((kunden) => {
      let tableRow = document.createElement("tr");
      tableRow.classList.add("table-row");

      let tableDatakundenNr = document.createElement("td");
      tableDatakundenNr.classList.add("table-cell", "table-id");

      let tableDatavorname = document.createElement("td");
      tableDatavorname.classList.add("table-cell", "table-vorname");

      let tableDatanachname = document.createElement("td");
      tableDatanachname.classList.add("table-cell", "table-nachname");

      let tableDatastrasse = document.createElement("td");
      tableDatastrasse.classList.add("table-cell", "table-strasse");

      let tableDatahausNr = document.createElement("td");
      tableDatahausNr.classList.add("table-cell", "table-hausNr");

      let tableDataort = document.createElement("td");
      tableDataort.classList.add("table-cell", "table-ort");
      
      let tableDataplz = document.createElement("td");
      tableDataplz.classList.add("table-cell", "table-plz");
      
      let tableDatamailadresse = document.createElement("td");
      tableDatamailadresse.classList.add("table-cell", "table-mail");
      
      let tableDataEdit = document.createElement("td");
      tableDataEdit.classList.add("table-cell", "table-edit");

      let tableDataDelete = document.createElement("td");
      tableDataDelete.classList.add("table-cell", "table-delete");

        tableDatakundenNr.innerHTML = `${kunden.kundenNummer}`;
        tableDatavorname.innerHTML = `${kunden.vorname}`;
        tableDatanachname.innerHTML = `${kunden.nachname}`;
        tableDatastrasse.innerHTML = `${kunden.strasse}`;
        tableDatahausNr.innerHTML = `${kunden.hausNr}`;
        tableDataort.innerHTML = `${kunden.ort}`;
        tableDataplz.innerHTML = `${kunden.plz}`;
        tableDatamailadresse.innerHTML = `${kunden.mailadresse}`;
        
        tableDataEdit.innerHTML = `<button class="button" onclick="edit(${kunden.kundenNummer})">Bearbeiten</button>`;
        tableDataDelete.innerHTML = `<button class="button" onclick="deleteEntry(${kunden.kundenNummer})">Löschen</button>`;

        tableBody.appendChild(tableRow);

        tableRow.appendChild(tableDatakundenNr);
        tableRow.appendChild(tableDatavorname);
        tableRow.appendChild(tableDatanachname);
        tableRow.appendChild(tableDatastrasse);
        tableRow.appendChild(tableDatahausNr);
        tableRow.appendChild(tableDataort);
        tableRow.appendChild(tableDataplz);
        tableRow.appendChild(tableDatamailadresse);
        tableRow.appendChild(tableDataEdit);
        tableRow.appendChild(tableDataDelete);

    });
}) 


function edit(id){
    window.location.href = `./edit/edit.html?id=${id}`
};

function deleteEntry(id) {
    if (id) {
        const ACCESSKEY = localStorage.getItem("access");
    
        fetch(`http://127.0.0.1:8000/kunden/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ACCESSKEY}`,
          },
        })
        .then(response => {
          if (response.ok) {
            alert("Kunden erfolgreich gelöscht!");
            location.reload();
          } else {
            alert("Fehler beim Löschen des Kunden.");
          }
        })
        .catch(error => console.error("Fehler:", error));
      } else {
        alert("Keine Kunden Nummer gefunden.");
      }
}

function newEntry(){

  window.location.href = "./new/new.html"
}
