module.exports = {
  types: [
    { value: 'feat', name: 'feat:     Une nouvelle fonctionnalité' },
    { value: 'fix', name: 'fix:      Correction d\'un bug' },
    { value: 'docs', name: 'docs:     Documentation' },
    { value: 'style', name: 'style:    Modifications de formatage (pas de code fonctionnel)' },
    { value: 'refactor', name: 'refactor: Refactoring de code' },
    { value: 'perf', name: 'perf:     Amélioration des performances' },
    { value: 'test', name: 'test:     Ajout de tests' },
    { value: 'chore', name: 'chore:    Modifications mineures (outils, configuration)' },
    { value: 'revert', name: 'revert:   Revertir un commit précédent' }
  ],
  messages: {
    type: "Quel type de changement avez-vous effectué ?",
    subject: "Quelle est la portée de votre changement ?"
  }
};