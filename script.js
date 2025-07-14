
const electivaGroups = {
  "electiva-ciclo-2": [
    "Electiva I: Base de Datos en Línea",
    "Electiva I: Bienestar Animal",
    "Electiva I: Enfermería Veterinaria"
  ],
  "electiva-ciclo-3": [
    "Electiva II: Deontología Veterinaria",
    "Electiva II: Herramientas en Línea",
    "Electiva II: Manejo de Instalaciones Pecuarias"
  ],
  "electiva-ciclo-5": [
    "Electiva III: Etología Clínica",
    "Electiva III: Mercadotecnia para Veterinarios",
    "Electiva III: Mitigación de Riesgo ante Desastres"
  ],
  "optativa-ciclo-5": ["Optativa I"],
  "optativa-ciclo-10": ["Optativa II"]
};

function loadStatus() {
  const saved = localStorage.getItem("materias_aprobadas");
  return saved ? JSON.parse(saved) : [];
}

function saveStatus(aprobadas) {
  localStorage.setItem("materias_aprobadas", JSON.stringify(aprobadas));
}

function updateUI() {
  const aprobadas = loadStatus();
  document.querySelectorAll(".course").forEach(div => {
    const nombre = div.dataset.nombre;
    div.classList.remove("aprobada", "bloqueada", "disponible");

    if (aprobadas.includes(nombre)) {
      div.classList.add("aprobada");
    } else {
      div.classList.add("disponible");
    }
  });

  for (const grupo in electivaGroups) {
    const materias = electivaGroups[grupo];
    const aprobadasGrupo = materias.filter(m => aprobadas.includes(m));
    if (aprobadasGrupo.length >= 1) {
      materias.forEach(m => {
        if (!aprobadas.includes(m)) {
          const div = document.querySelector(`.course[data-nombre="${m}"]`);
          if (div) {
            div.classList.remove("disponible");
            div.classList.add("bloqueada");
          }
        }
      });
    }
  }
}

function toggleCurso(nombre) {
  let aprobadas = loadStatus();
  if (aprobadas.includes(nombre)) {
    aprobadas = aprobadas.filter(n => n !== nombre);
  } else {
    aprobadas.push(nombre);
  }
  saveStatus(aprobadas);
  updateUI();
}

function showInfo(nombre) {
  const info = "Haz clic para marcar como aprobada. Solo puedes elegir una electiva por ciclo.";
  document.getElementById("courseInfo").innerText = nombre + ": " + info;
  document.getElementById("infoBox").classList.remove("hidden");
}

function closeInfo() {
  document.getElementById("infoBox").classList.add("hidden");
}

window.onload = updateUI;
