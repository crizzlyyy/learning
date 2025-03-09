const accessToken = localStorage.getItem("access");
let id = document.getElementById("id");
let nachname= document.getElementById('nachname');
let vorname= document.getElementById('vorname');
let strasse = document.getElementById('strasse');
let hausNr = document.getElementById('hausNr');
let ort = document.getElementById('ort');
let plz = document.getElementById('plz');
let telefonNr = document.getElementById('telefonNr');
let gehalt = document.getElementById('gehalt');
let vertragSeit = document.getElementById('vertragSeit');
let vertragBis = document.getElementById('vertragBis');

document.addEventListener("DOMContentLoaded", () => {
    let mitarbeiterIdParam = new URLSearchParams(window.location.search);
    const MAid = mitarbeiterIdParam.get("id");

    fetch(`http://127.0.0.1:8000/mitarbeiter/${MAid}`, {

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
    
        id.value = data.mitarbeiterId;
    
        nachname.value = data.nachname;
    
        vorname.value = data.vorname;
    
        strasse.value = data.strasse;
    
        hausNr.value = data.hausNr;
    
        ort.value = data.ort;
    
        plz.value = data.plz;
    
        telefonNr.value = data.telefonNr;
    
        gehalt.value = data.gehalt;
    
        vertragSeit.value = data.vertragSeit;
    
        vertragBis.value = data.vertragBis;
    
    })
    
    .catch(error => {
    
        console.error("Fehler beim Abrufen der Daten:", error);
    
        alert("Fehler beim Laden der Mitarbeiter!");
    
    });
    
});

function edit() {
    newData = {
        id: id.value,
    
        nachname: nachname.value,
    
        vorname: vorname.value,
    
        strasse: strasse.value,
    
        hausNr: hausNr.value,
    
        ort: ort.value,
    
        plz: plz.value,
    
        telefonNr: telefonNr.value,
    
        gehalt: gehalt.value,
    
        vertragSeit: vertragSeit.value,
    
        vertragBis: vertragBis.value,
    };
   
    fetch(`http://127.0.0.1:8000/mitarbeiter/${newData.id}`, {
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
        window.location.href = "../mitarbeiter.html";
      });
   
    return false;
  }
   