// ── SYSTÈME DE NOTIFICATIONS MEDIMAINT ────────────────────────────────────

function getNotificationsLues() {
  try { return JSON.parse(localStorage.getItem("medimaint_notifs_lues") || "[]"); }
  catch { return []; }
}

function marquerToutesLues() {
  const toutes = genererNotifications().map(n => n.id);
  localStorage.setItem("medimaint_notifs_lues", JSON.stringify(toutes));
  renderNotifications();
  updateBadge();
}

// ── Recommandation du type de maintenance ─────────────────────────────────
function recommanderTypeMaintenance(eq) {
  const pannes = eq.pannes || [];
  const score = calculerScoreRisque(pannes);
  const nbCurative = pannes.filter(p => p.type === "Curative").length;
  const nbPalliative = pannes.filter(p => p.type === "Palliative").length;
  const nbRecentes = pannes.filter(p => {
    const diff = (new Date() - new Date(p.date)) / (1000 * 60 * 60 * 24);
    return diff <= 365;
  }).length;

  if (eq.statut === "Critique" || score >= 90)
    return { label: "Curative", badge: "curative", desc: "Intervention corrective immédiate requise", icon: "🔧" };
  if (eq.statut === "Alerte" || (nbCurative >= 2 && nbRecentes >= 2))
    return { label: "Palliative", badge: "palliative", desc: "Remise en état provisoire recommandée", icon: "🩹" };
  if (score >= 70 || nbRecentes >= 2)
    return { label: "Conditionnelle", badge: "conditionnelle", desc: "Maintenance selon état détecté", icon: "🔍" };
  if (score >= 40)
    return { label: "Systématique", badge: "systematique", desc: "Maintenance périodique planifiée", icon: "📋" };
  return { label: "Prévisionnelle", badge: "previsionnelle", desc: "Surveillance prédictive suffisante", icon: "🔮" };
}

// ── Génération des notifications ──────────────────────────────────────────
function genererNotifications() {
  const notifs = [];
  hopital.services.forEach(service => {
    service.equipements.forEach(eq => {
      const j = joursRestants(eq.derniere_maintenance, eq.frequence_maintenance);
      const prochaine = calculerProchaineMaintenance(eq.derniere_maintenance, eq.frequence_maintenance);
      const typeRec = recommanderTypeMaintenance(eq);

      if (j < 0) {
        notifs.push({ id: `retard-${eq.id}`, niveau: "critique", icon: "🚨",
          titre: `Maintenance en retard — ${eq.nom}`,
          message: `${service.nom} · Retard de ${Math.abs(j)} jour(s) · Type recommandé : ${typeRec.label}`,
          eqId: eq.id, serviceId: service.id });
      } else if (j === 0) {
        notifs.push({ id: `today-${eq.id}`, niveau: "critique", icon: "🔔",
          titre: `Maintenance aujourd'hui — ${eq.nom}`,
          message: `${service.nom} · Type recommandé : ${typeRec.label}`,
          eqId: eq.id, serviceId: service.id });
      } else if (j <= 7) {
        notifs.push({ id: `urgent-${eq.id}`, niveau: "alerte", icon: "⚠️",
          titre: `Maintenance urgente — ${eq.nom}`,
          message: `${service.nom} · Dans ${j} jour(s) · Type recommandé : ${typeRec.label}`,
          eqId: eq.id, serviceId: service.id });
      } else if (j <= 30) {
        notifs.push({ id: `soon-${eq.id}`, niveau: "info", icon: "📅",
          titre: `Maintenance à planifier — ${eq.nom}`,
          message: `${service.nom} · Dans ${j} jour(s) · Type recommandé : ${typeRec.label}`,
          eqId: eq.id, serviceId: service.id });
      }

      if (eq.statut === "Critique") {
        notifs.push({ id: `crit-${eq.id}`, niveau: "critique", icon: "🔴",
          titre: `Équipement critique — ${eq.nom}`,
          message: `${service.nom} · Intervention immédiate requise`,
          eqId: eq.id, serviceId: service.id });
      } else if (eq.statut === "Alerte") {
        notifs.push({ id: `alert-${eq.id}`, niveau: "alerte", icon: "🟡",
          titre: `Équipement en alerte — ${eq.nom}`,
          message: `${service.nom} · Surveillance recommandée`,
          eqId: eq.id, serviceId: service.id });
      }
    });
  });

  notifs.sort((a, b) => {
    const ordre = { critique: 0, alerte: 1, info: 2 };
    return ordre[a.niveau] - ordre[b.niveau];
  });

  return notifs;
}

// ── Rendu du panneau notifications ────────────────────────────────────────
function renderNotifications() {
  const lues = getNotificationsLues();
  const notifs = genererNotifications();
  const panel = document.getElementById("notif-panel");
  if (!panel) return;

  if (notifs.length === 0) {
    panel.querySelector(".notif-list").innerHTML = `
      <div style="text-align:center;padding:48px 24px;color:#94a3b8">
        <div style="font-size:40px;margin-bottom:12px">✅</div>
        <p style="font-size:14px">Aucune notification</p>
      </div>`;
    return;
  }

  const colorMap = { critique: "#ef4444", alerte: "#f59e0b", info: "#3b82f6" };
  const bgMap = { critique: "#fee2e2", alerte: "#fef3c7", info: "#eff6ff" };

  panel.querySelector(".notif-list").innerHTML = notifs.map(n => {
    const lue = lues.includes(n.id);
    return `
      <div class="notif-item ${lue ? 'lue' : ''}" 
           style="border-left:4px solid ${lue ? '#e2e8f0' : colorMap[n.niveau]};background:${lue ? 'white' : bgMap[n.niveau]}"
           onclick="window.location='fiche.html?id=${n.eqId}&service=${n.serviceId}';marquerLue_('${n.id}')">
        <div style="display:flex;gap:10px;align-items:flex-start">
          <span style="font-size:20px">${n.icon}</span>
          <div style="flex:1">
            <p style="font-size:13px;font-weight:700;color:#0f172a;margin-bottom:3px">${n.titre}</p>
            <p style="font-size:12px;color:#64748b">${n.message}</p>
          </div>
          ${!lue ? `<span style="width:8px;height:8px;border-radius:50%;background:${colorMap[n.niveau]};flex-shrink:0;margin-top:4px;display:block"></span>` : ''}
        </div>
      </div>`;
  }).join("");
}

function marquerLue_(id) {
  const lues = getNotificationsLues();
  if (!lues.includes(id)) {
    lues.push(id);
    localStorage.setItem("medimaint_notifs_lues", JSON.stringify(lues));
  }
}

function updateBadge() {
  const lues = getNotificationsLues();
  const notifs = genererNotifications();
  const nonLues = notifs.filter(n => !lues.includes(n.id)).length;
  const badge = document.getElementById("notif-badge");
  if (!badge) return;
  if (nonLues > 0) {
    badge.textContent = nonLues > 9 ? "9+" : nonLues;
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
  }
}

// ── Injection du bouton cloche dans la navbar ─────────────────────────────
function injecterNotifications() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  // Bouton cloche
  const btn = document.createElement("div");
  btn.style.cssText = "position:relative;cursor:pointer;margin-left:8px";
  btn.innerHTML = `
    <button id="notif-btn" onclick="toggleNotifPanel()" style="
      background:rgba(255,255,255,0.15);border:none;color:white;
      width:40px;height:40px;border-radius:10px;font-size:18px;
      cursor:pointer;display:flex;align-items:center;justify-content:center;
      transition:background 0.2s;position:relative
    ">🔔
      <span id="notif-badge" style="
        display:none;position:absolute;top:-4px;right:-4px;
        background:#ef4444;color:white;font-size:10px;font-weight:700;
        width:18px;height:18px;border-radius:50%;
        align-items:center;justify-content:center;
        border:2px solid #1e40af
      "></span>
    </button>`;
  nav.querySelector("ul").after(btn);

  // Panneau
  const panel = document.createElement("div");
  panel.id = "notif-panel";
  panel.style.cssText = `
    display:none;position:fixed;top:72px;right:16px;
    width:380px;max-height:520px;background:white;
    border-radius:16px;box-shadow:0 16px 48px rgba(0,0,0,0.18);
    border:1px solid #e2e8f0;z-index:9999;overflow:hidden;
    flex-direction:column
  `;
  panel.innerHTML = `
    <div style="padding:16px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between">
      <p style="font-weight:700;font-size:15px;color:#0f172a">🔔 Notifications</p>
      <button onclick="marquerToutesLues()" style="font-size:11px;color:#2563eb;background:none;border:none;cursor:pointer;font-weight:600">Tout marquer lu</button>
    </div>
    <div class="notif-list" style="overflow-y:auto;max-height:430px;padding:8px"></div>`;
  document.body.appendChild(panel);

  // Fermer au clic extérieur
  document.addEventListener("click", e => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) {
      panel.style.display = "none";
    }
  });

  renderNotifications();
  updateBadge();
}

function toggleNotifPanel() {
  const panel = document.getElementById("notif-panel");
  if (!panel) return;
  const visible = panel.style.display === "flex";
  panel.style.display = visible ? "none" : "flex";
  panel.style.flexDirection = "column";
  if (!visible) { renderNotifications(); updateBadge(); }
}

// CSS des items notification
const styleNotif = document.createElement("style");
styleNotif.textContent = `
  .notif-item {
    padding: 12px 14px; border-radius: 10px; margin-bottom: 6px;
    cursor: pointer; transition: opacity 0.2s, transform 0.15s;
  }
  .notif-item:hover { transform: translateX(3px); opacity: 0.92; }
  .notif-item.lue { opacity: 0.6; }
  #notif-btn:hover { background: rgba(255,255,255,0.25) !important; }
`;
document.head.appendChild(styleNotif);

// Lancer après chargement du DOM
document.addEventListener("DOMContentLoaded", injecterNotifications);