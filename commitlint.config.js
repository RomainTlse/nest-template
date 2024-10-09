module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 72]
  },
  prompt: {
    messages: {
      type: 'Select the type of change that you\'re committing:',
      scope: 'Denote the SCOPE of this change (optional):',
      customScope: 'Denote the CUSTOM SCOPE of this change:',
      subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
      body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
      confirmCommit: 'Are you sure you want to proceed with the commit above?'
    },
    questions: {
      type: {
        description: 'Select the emoji for the commit type:',
        enumerator: {
          feat: ':sparkles: features',
          fix: ':bug: bug fixes',
          docs: ':book: documentation',
          style: ':art: styling',
          refactor: ':recycle: refactor',
          perf: ':racehorse: performance',
          test: ':white_check_mark: tests',
          build: ':construction_worker: build',
          ci: ':wrench: continuous integration',
          chore: ':zap: chores',
          revert: ':rewind: revert'
        }
      }
    }
  }
};

