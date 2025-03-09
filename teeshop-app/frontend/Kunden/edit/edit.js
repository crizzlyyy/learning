
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
let nachname= document.getElementById('vorname');
let vorname= document.getElementById('nachname');
let strasse = document.getElementById('strasse');
let hausNr = document.getElementById('hausNr');
let ort = document.getElementById('ort');
let plz = document.getElementById('plz');
let mailadresse = document.getElementById('mailAdresse');

document.addEventListener("DOMContentLoaded", () => {
    let kundenIdParam = new URLSearchParams(window.location.search);
    const Id = kundenIdParam.get("id");

    fetch(`http://127.0.0.1:8000/kunden/${Id}`, {

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
    
        id.value = data.kundenNummer;
    
        vorname.value = data.vorname;
    
        nachname.value = data.nachname;
    
        strasse.value = data.strasse;
    
        hausNr.value = data.hausNr;
    
        ort.value = data.ort;
    
        plz.value = data.plz;
    
        mailadresse.value = data.mailadresse;
    })
    
    .catch(error => {
    
        console.error("Fehler beim Abrufen der Daten:", error);
    
        alert("Fehler beim Laden der Mitarbeiter!");
    
    });
    
});

function edit() {
    newData = {
        id: id.value,
    
        vorname: vorname.value,
    
        nachname: nachname.value,
    
        strasse: strasse.value,
    
        hausNr: hausNr.value,
    
        ort: ort.value,
    
        plz: plz.value,
    
        mailadresse: mailadresse.value,
    };
   
    fetch(`http://127.0.0.1:8000/kunden/${newData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Kunde ${newData.id} erfolgreich bearbeitet`);
        window.location.href = "../kunden.html";
      });
   
    return false;
  }
   