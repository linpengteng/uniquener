module.exports = {
  types: [
    { value: 'fix', name: 'fix:      A bug fix' },
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'begin', name: 'begin:    Begin new repository' },
    { value: 'docs', name: 'docs:     Documentation only changes' },
    { value: 'style', name: 'style:    Changes that do not affect the meaning of the code' },
    { value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature' },
    { value: 'chore', name: 'chore:    Changes to the build process or auxiliary tools and libraries such as documentation generation' },
    { value: 'perf', name: 'perf:     A code change that improves performance' },
    { value: 'test', name: 'test:     Adding missing tests' },
    { value: 'merge', name: 'merge:    Merge from branches' },
    { value: 'revert', name: 'revert:   Revert to a commit' },
    { value: 'wip', name: 'wip:      Work in progress' }
  ],
  
  messages: {
    type: "Select the type of change that you're committing:",
    scope: 'Denote the SCOPE of this change (optional):',
    customScope: 'Denote the CUSTOM SCOPE of this change (optional):',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  },

  allowBreakingChanges: ['feat', 'fix'],
  allowCustomScopes: true,
  allowEmptyScopes: true,
  subjectLimit: 72
}
