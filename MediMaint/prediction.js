function calculerProchaineMaintenance(derniereMaintenance, frequence) {
  const date = new Date(derniereMaintenance);
  date.setDate(date.getDate() + frequence);
  return date;
}

function joursRestants(derniereMaintenance, frequence) {
  const prochaine = calculerProchaineMaintenance(derniereMaintenance, frequence);
  return Math.ceil((prochaine - new Date()) / (1000 * 60 * 60 * 24));
}

function calculerScoreRisque(pannes) {
  const nb = pannes.length;
  if (nb === 0) return 10;
  if (nb <= 2)  return 40;
  if (nb <= 4)  return 70;
  return 90;
}

function interpreterScore(score) {
  if (score < 30) return { label: "Faible",   couleur: "#10b981" };
  if (score < 60) return { label: "Modéré",   couleur: "#f59e0b" };
  if (score < 80) return { label: "Élevé",    couleur: "#f97316" };
  return             { label: "Critique", couleur: "#ef4444" };
}

function couleurType(type) {
  if (type === "Palliative")     return { bg: "#fee2e2", color: "#b91c1c" };
  if (type === "Curative")       return { bg: "#fecaca", color: "#991b1b" };
  if (type === "Systématique")   return { bg: "#dbeafe", color: "#1d4ed8" };
  if (type === "Conditionnelle") return { bg: "#fef3c7", color: "#92400e" };
  if (type === "Prévisionnelle") return { bg: "#d1fae5", color: "#065f46" };
  return { bg: "#f1f5f9", color: "#64748b" };
}

function genererNouvelId() {
  let maxId = 0;
  hopital.services.forEach(s => {
    s.equipements.forEach(e => { if (e.id > maxId) maxId = e.id; });
  });
  return maxId + 1;
}