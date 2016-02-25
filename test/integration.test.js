/* global suite, test */

const
  assert = require('assert'),
  vscode = require('vscode'),
  myExtension = require('../extension');

suite('Integration test', function () {
  test('Translate text', function (done) {
    const textEditor = vscode.window.activeTextEditor;

    textEditor
      .edit(edit => {
        edit.insert(new vscode.Position(0, 0), '虛偽歎息');
      })
      .then(() => vscode.commands.executeCommand('chineseTranslation.hongKongToSimplified'))
      .then(() => {
        assert(
          '虚伪叹息',
          textEditor.document.getText(new vscode.Range(0, 0, 0, Infinity))
        );
      })
      .then(() => done());
  });
});