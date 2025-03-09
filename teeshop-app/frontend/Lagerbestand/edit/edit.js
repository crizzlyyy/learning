
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
  } else {
      let data = await response.json();
      console.log(data);
  }
}

setInterval(fetchData, 30 * 1000); // Alle 30 Sekunden prüfen

const accessToken = localStorage.getItem("access");
let id = document.getElementById("id");
let artikel = document.getElementById("artikel");
let menge = document.getElementById("menge");
let minBestand = document.getElementById("minBestand");

document.addEventListener("DOMContentLoaded", () => {
    let bestandIdParam = new URLSearchParams(window.location.search);
    const artikelNr = bestandIdParam.get("id");

    fetch(`http://127.0.0.1:8000/lagerbestand/${artikelNr}`, {

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
    
        menge.value = data.menge;
    
        minBestand.value = data.minBestand;
    
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
      menge: menge.value,
      minBestand: minBestand.value,
    };
   
    fetch(`http://127.0.0.1:8000/lagerbestand/${newData.id}`, {
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
        window.location.href = "../lagerbestand.html";
      });
   
    return false;
  }
  

  async function fetchArtikel() {

    const ACCESSKEY = localStorage.getItem("access");

    try {
      let response = await fetch("http://127.0.0.1:8000/produktkatalog/fetchArtikel", {
          headers: {
              "authorization": `Bearer ${ACCESSKEY}`,
          }
      });

      if (!response.ok) throw new Error("Fehler beim Abrufen der Kundennummern.");

        let artikel = await response.json();

        let select = document.getElementById("artikel");
        select.innerHTML = "";

        artikel.forEach(num => {
            let option = document.createElement("option");
            option.value = num;
            option.textContent = num;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Fehler beim Laden der Kundennummern:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchArtikel);

