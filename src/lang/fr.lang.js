module.exports = {
  weekdays: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  aqi: {
    1: "Qualité de l'air: bonne",
    2: "Qualité de l'air: passable",
    3: "Qualité de l'air: modérée",
    4: "Qualité de l'air: médiocre",
    5: "Qualité de l'air: très mauvaise",
  },
  pictures: {
    success: (place) => `Photos locales de ${place}`,
    fail: (place) => `Il n'y a pas de photos trouvées pour ${place}`,
  },
  notFoundMessages: {
    h1: 'Oops!',
    h2: 'Page non retrouvée',
    details:
      'Désolé, une erreur est survenue ou la page demandée est introuvable.',
    actions: "Page d'accueil",
  },
  tour: {
    map: '"Interagissez avec la carte. Vous pouvez cliquer sur les marqueurs et voir les cartes météo de chaque ville. Faites un clic droit sur deux marqueurs pour révéler un lien de directions. Faites également glisser le «controleur des jours» pour voir comment la température sera dans les prochains jours. "',
    cards:
      '"Vous pouvez glisser des cartes vers la zone de comparaison. Les cartes colorées reflètent la température maximale et minimale en une journée. Cliquez sur min-max pour simplifier visuellement les comparaisons."',
    comparision:
      '"Dans la zone de comparaison Vous pouvez voir des cartes de différents jours et de différentes villes aussi. Pour les appareils Android et sur Google Chrome uniquement, vous pouvez également partager n importe quelle carte avec d autres personnes."',
    gallery: '"Une belle galerie locale de photos de la ville principale."',
  },
};
