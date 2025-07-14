
const prereqs = {'Anatomía y Embriología Veterinaria II': ['Anatomía y Embriología Veterinaria I'], 'Bioquímica Veterinaria I': ['Química Orgánica'], 'Histología Organográfica Veterinaria': ['Citología e Histología Veterinaria'], 'Fisiología Veterinaria I': ['Bioquímica Veterinaria I'], 'Inmunología Veterinaria': ['Histología Organográfica Veterinaria'], 'Fisiología Veterinaria II': ['Fisiología Veterinaria I'], 'Fisiopatología': ['Fisiología Veterinaria II'], 'Anatomía Patológica Especial': ['Anatomía Patológica General'], 'Farmacología Veterinaria y Toxicología': ['Farmacología Veterinaria'], 'Medicina Interna I': ['Propedéutica y Biopatología Clínica'], 'Medicina Interna II': ['Propedéutica y Biopatología Clínica'], 'Patología Infecciosa I': ['Microbiología Veterinaria I', 'Microbiología Veterinaria II'], 'Patología Infecciosa II': ['Microbiología Veterinaria I', 'Microbiología Veterinaria II'], 'Metodología de la Investigación II': ['Metodología de la Investigación I'], 'Patología Quirúrgica II': ['Patología Quirúrgica I'], 'Reproducción y Obstetricia': ['Reproducción'], 'Salud Pública Veterinaria': ['Patología Infecciosa I', 'Patología Infecciosa II']};

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
  const info = "Haz clic para marcar como aprobada. Se desbloquearán las siguientes materias si esta es prerrequisito.";
  document.getElementById("courseInfo").innerText = nombre + ": " + info;
  document.getElementById("infoBox").classList.remove("hidden");
}

function closeInfo() {
  document.getElementById("infoBox").classList.add("hidden");
}

window.onload = updateUI;
