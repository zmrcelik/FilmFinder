const STORAGE_KEY = "merkliste";

// Hilfsfunktionen für localStorage
function leseMerkliste() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function speichereMerkliste(liste) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(liste));
}

// Merkliste laden und anzeigen
function ladeMerkliste() {
  const gespeicherte = leseMerkliste();

  const merklisteDiv = document.getElementById("merkliste");
  if (!merklisteDiv) return;
  merklisteDiv.innerHTML = "";

  if (gespeicherte.length === 0) {
    merklisteDiv.innerHTML = "<p>Du hast noch keine Filme in deiner Merkliste.</p>";
    return;
  }

  gespeicherte.forEach((film) => {
    const filmEl = document.createElement("div");
    filmEl.className = "filmkarte";
    filmEl.innerHTML = `
      <img src="${film.Poster}" alt="${film.Titel}" class="poster">
      <h3>${film.Titel}</h3>
      <a href="${film.Trailer}" target="_blank">▶️ Trailer ansehen</a><br>
      <button class="entfernen-btn" data-id="${film.id}">❌ Entfernen</button>
    `;
    merklisteDiv.appendChild(filmEl);
  });

  document.querySelectorAll(".entfernen-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.getAttribute("data-id");
      if (!id) {
        alert("Fehler: Keine ID gefunden.");
        return;
      }
      const neueListe = leseMerkliste().filter((f) => String(f.id) !== id);
      speichereMerkliste(neueListe);
      ladeMerkliste();
    });
  });
}

// Film hinzufügen
function filmHinzufügen(titel, poster, trailer) {
  if (!titel || !poster || !trailer) {
    alert("Bitte alle Felder ausfüllen!");
    return;
  }

  const liste = leseMerkliste();
  liste.push({
    id: Date.now(), // eindeutige ID
    Titel: titel,
    Poster: poster,
    Trailer: trailer,
  });
  speichereMerkliste(liste);

  alert("Film hinzugefügt!");
  ladeMerkliste();
}

// Beim Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
  ladeMerkliste();

  const addBtn = document.getElementById("filmHinzufuegenBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const titel = document.getElementById("titel").value;
      const poster = document.getElementById("poster").value;
      const trailer = document.getElementById("trailer").value;
      filmHinzufügen(titel, poster, trailer);
    });
  }
});