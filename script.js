
function showInfo(courseName) {
  const descriptions = {
    "default": "Información aún no disponible. Esta materia forma parte del plan 2019 de Medicina Veterinaria en la UNAN-León."
  };

  document.getElementById('courseInfo').innerText = descriptions[courseName] || descriptions["default"];
  document.getElementById('infoBox').classList.remove('hidden');
}

function closeInfo() {
  document.getElementById('infoBox').classList.add('hidden');
}
