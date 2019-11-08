module.exports = {
  name: 'erp',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/erp',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
