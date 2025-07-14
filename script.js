
const prereqs = {'Anatomía y Embriología Veterinaria II': ['Anatomía y Embriología Veterinaria I'], 'Bioquímica Veterinaria I': ['Química Orgánica'], 'Histología Organográfica Veterinaria': ['Citología e Histología Veterinaria'], 'Fisiología Veterinaria I': ['Bioquímica Veterinaria I'], 'Inmunología Veterinaria': ['Histología Organográfica Veterinaria'], 'Fisiología Veterinaria II': ['Fisiología Veterinaria I'], 'Fisiopatología': ['Fisiología Veterinaria II'], 'Anatomía Patológica Especial': ['Anatomía Patológica General'], 'Farmacología Veterinaria y Toxicología': ['Farmacología Veterinaria'], 'Medicina Interna I': ['Propedéutica y Biopatología Clínica'], 'Medicina Interna II': ['Propedéutica y Biopatología Clínica'], 'Patología Infecciosa I': ['Microbiología Veterinaria I', 'Microbiología Veterinaria II'], 'Patología Infecciosa II': ['Microbiología Veterinaria I', 'Microbiología Veterinaria II'], 'Metodología de la Investigación II': ['Metodología de la Investigación I'], 'Patología Quirúrgica II': ['Patología Quirúrgica I'], 'Reproducción y Obstetricia': ['Reproducción'], 'Salud Pública Veterinaria': ['Patología Infecciosa I', 'Patología Infecciosa II']};
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
  "electiva-ciclo-6": [
    "Electiva V: Apicultura Tropical",
    "Electiva V: Extensión Veterinaria",
    "Electiva V: Manejo de Fincas Integrales"
  ],
  "electiva-ciclo-7": [
    "Electiva VII: Desarrollo Rural",
    "Electiva VII: Manejo de Animales de Traspatio",
    "Electiva VII: Piscicultura"
  ],
  "electiva-ciclo-8": [
    "Electiva X: Citopatología y Técnicas de Tinción",
    "Electiva X: Manejo del Paciente Hospitalario",
    "Electiva X: Toxicología Veterinaria"
  ],
  "electiva-ciclo-9": [
    "Electiva XII: Aplicaciones de la Biología Molecular en el Diagnóstico",
    "Electiva XII: Clínica de Bovinos",
    "Electiva XII: Radiología"
  ],
  "electiva-ciclo-10": [
    "Electiva XIV: Formulación de Proyectos Pecuarios",
    "Electiva XIV: Odontología Animal"
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
    } else if (tienePrerequisitos(nombre)) {
      if (prereqs[nombre].every(req => aprobadas.includes(req))) {
        div.classList.add("disponible");
      } else {
        div.classList.add("bloqueada");
      }
    } else {
      div.classList.add("disponible");
    }
  });

  // Bloquear otras electivas si una ya fue aprobada por grupo
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

function tienePrerequisitos(nombre) {
  return prereqs.hasOwnProperty(nombre);
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
  const info = "Haz clic para marcar como aprobada. Se desbloquearán las siguientes materias si esta es prerrequisito. Para electivas, solo puedes aprobar una del mismo ciclo.";
  document.getElementById("courseInfo").innerText = nombre + ": " + info;
  document.getElementById("infoBox").classList.remove("hidden");
}

function closeInfo() {
  document.getElementById("infoBox").classList.add("hidden");
}

window.onload = updateUI;
