const hopital = {
  nom: "Hôpital Régional de Tunis",
  services: [
    {
      id: 1, nom: "Cardiologie", chef: "Dr. Ben Ali",
      equipements: [
        {
          id: 101, nom: "Électrocardiographe (ECG)",
          date_achat: "2020-03-15", frequence_maintenance: 90,
          derniere_maintenance: "2024-10-01", statut: "Opérationnel",
          pannes: [
            { date: "2021-05-10", type: "Curative", description: "Arrêt soudain de l'appareil", solution: "Remplacement du module d'alimentation" },
            { date: "2022-11-20", type: "Palliative", description: "Tracé ECG illisible", solution: "Nettoyage et recalibrage des électrodes" },
            { date: "2024-01-15", type: "Systématique", description: "Vérification périodique", solution: "Mise à jour du firmware et contrôle général" }
          ]
        },
        {
          id: 102, nom: "Moniteur cardiaque",
          date_achat: "2021-06-10", frequence_maintenance: 60,
          derniere_maintenance: "2024-11-05", statut: "Opérationnel",
          pannes: [
            { date: "2022-08-15", type: "Curative", description: "Écran noir au démarrage", solution: "Remplacement de l'écran LCD" }
          ]
        }
      ]
    },
    {
      id: 2, nom: "Urgences", chef: "Dr. Chaabane",
      equipements: [
        {
          id: 201, nom: "Défibrillateur",
          date_achat: "2018-01-10", frequence_maintenance: 30,
          derniere_maintenance: "2024-11-01", statut: "Alerte",
          pannes: [
            { date: "2019-06-15", type: "Curative", description: "Batterie défaillante", solution: "Remplacement de la batterie" },
            { date: "2021-02-20", type: "Palliative", description: "Choc électrique insuffisant", solution: "Recalibrage de l'énergie de décharge" },
            { date: "2022-09-05", type: "Systématique", description: "Inspection annuelle", solution: "Vérification des électrodes et test de décharge" },
            { date: "2024-03-10", type: "Curative", description: "Alarme sonore défectueuse", solution: "Remplacement du buzzer interne" }
          ]
        },
        {
          id: 202, nom: "Tensiomètre automatique",
          date_achat: "2019-07-20", frequence_maintenance: 60,
          derniere_maintenance: "2024-09-15", statut: "Opérationnel",
          pannes: [
            { date: "2020-03-05", type: "Curative", description: "Mesures incorrectes", solution: "Remplacement du capteur de pression" },
            { date: "2023-08-10", type: "Conditionnelle", description: "Contrôle de précision", solution: "Recalibrage et nettoyage du brassard" }
          ]
        }
      ]
    },
    {
      id: 3, nom: "Réanimation", chef: "Dr. Trabelsi",
      equipements: [
        {
          id: 301, nom: "Respirateur artificiel",
          date_achat: "2017-11-05", frequence_maintenance: 30,
          derniere_maintenance: "2024-10-15", statut: "Critique",
          pannes: [
            { date: "2018-07-20", type: "Curative", description: "Fuite dans le circuit respiratoire", solution: "Remplacement des joints d'étanchéité" },
            { date: "2020-04-10", type: "Palliative", description: "Alarme de pression non fonctionnelle", solution: "Remplacement du capteur d'alarme" },
            { date: "2021-12-05", type: "Systématique", description: "Maintenance complète", solution: "Révision générale et remplacement des filtres" },
            { date: "2023-05-18", type: "Conditionnelle", description: "Débit d'air irrégulier", solution: "Nettoyage et remplacement de la turbine" },
            { date: "2024-02-25", type: "Prévisionnelle", description: "Écran de contrôle figé", solution: "Réinitialisation du système et mise à jour logicielle" }
          ]
        },
        {
          id: 302, nom: "Moniteur multiparamétrique",
          date_achat: "2019-09-30", frequence_maintenance: 90,
          derniere_maintenance: "2024-09-01", statut: "Opérationnel",
          pannes: [
            { date: "2021-01-15", type: "Curative", description: "Module SpO2 défaillant", solution: "Remplacement du capteur SpO2" },
            { date: "2023-06-20", type: "Systématique", description: "Vérification annuelle", solution: "Contrôle de tous les modules et mise à jour" }
          ]
        }
      ]
    },
    {
      id: 4, nom: "Radiologie", chef: "Dr. Mansouri",
      equipements: [
        {
          id: 401, nom: "Échographe",
          date_achat: "2021-05-25", frequence_maintenance: 120,
          derniere_maintenance: "2024-08-20", statut: "Opérationnel",
          pannes: [
            { date: "2022-10-30", type: "Curative", description: "Image floue et artefacts", solution: "Remplacement de la sonde échographique" }
          ]
        },
        {
          id: 402, nom: "Appareil de radiographie",
          date_achat: "2018-09-12", frequence_maintenance: 90,
          derniere_maintenance: "2024-07-15", statut: "Opérationnel",
          pannes: [
            { date: "2020-02-18", type: "Curative", description: "Tube radiogène défectueux", solution: "Remplacement du tube radiogène" },
            { date: "2022-05-22", type: "Conditionnelle", description: "Contrôle de radioprotection", solution: "Vérification des blindages et calibrage de la dose" }
          ]
        }
      ]
    },
    {
      id: 5, nom: "Pédiatrie", chef: "Dr. Slama",
      equipements: [
        {
          id: 501, nom: "Pompe à perfusion",
          date_achat: "2022-02-14", frequence_maintenance: 60,
          derniere_maintenance: "2024-11-10", statut: "Opérationnel",
          pannes: []
        },
        {
          id: 502, nom: "Incubateur néonatal",
          date_achat: "2020-08-05", frequence_maintenance: 60,
          derniere_maintenance: "2024-10-25", statut: "Opérationnel",
          pannes: [
            { date: "2021-11-30", type: "Curative", description: "Régulation de température instable", solution: "Remplacement du thermostat et recalibrage" },
            { date: "2023-04-12", type: "Systématique", description: "Révision semestrielle", solution: "Nettoyage, désinfection et vérification des capteurs" }
          ]
        }
      ]
    },
    {
      id: 6, nom: "Bloc opératoire", chef: "Dr. Gharbi",
      equipements: [
        {
          id: 601, nom: "Lampe scialytique",
          date_achat: "2016-06-18", frequence_maintenance: 60,
          derniere_maintenance: "2024-10-20", statut: "Alerte",
          pannes: [
            { date: "2018-03-10", type: "Curative", description: "Ampoule principale grillée", solution: "Remplacement de l'ampoule halogène" },
            { date: "2020-07-25", type: "Palliative", description: "Bras articulé bloqué", solution: "Lubrification et remplacement du joint du bras" },
            { date: "2022-11-30", type: "Systématique", description: "Maintenance préventive", solution: "Vérification électrique et mécanique complète" },
            { date: "2024-04-05", type: "Curative", description: "Chute accidentelle", solution: "Réparation du support et remplacement du réflecteur" }
          ]
        },
        {
          id: 602, nom: "Bistouri électrique",
          date_achat: "2019-04-22", frequence_maintenance: 90,
          derniere_maintenance: "2024-09-10", statut: "Opérationnel",
          pannes: [
            { date: "2021-06-18", type: "Conditionnelle", description: "Puissance de coupe insuffisante", solution: "Recalibrage du générateur haute fréquence" },
            { date: "2023-02-14", type: "Prévisionnelle", description: "Contrôle annuel", solution: "Test de sécurité électrique et vérification des câbles" }
          ]
        }
      ]
    }
  ]
};

// ── Gestion des équipements ajoutés dynamiquement ──────────────────────────
function sauvegarderDonnees() {
  localStorage.setItem("hopital_data", JSON.stringify(hopital));
}

function chargerDonnees() {
  const data = localStorage.getItem("hopital_data");
  if (data) {
    const saved = JSON.parse(data);
    saved.services.forEach(savedService => {
      const service = hopital.services.find(s => s.id === savedService.id);
      if (service) service.equipements = savedService.equipements;
    });
  }
}

chargerDonnees();