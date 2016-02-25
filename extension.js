'use strict';

const
  opencc = require('node-opencc'),
  vscode = require('vscode');

function activate(context) {
  [
    'hongKongToSimplified',
    'simplifiedToHongKong',
    'simplifiedToTraditional',
    'simplifiedToTaiwan',
    'simplifiedToTaiwanWithPhrases',
    'traditionalToHongKong',
    'traditionalToSimplified',
    'traditionalToTaiwan',
    'taiwanToSimplified',
    'taiwanToSimplifiedWithPhrases'
  ].map(name => {
    context.subscriptions.push(
      vscode.commands.registerTextEditorCommand(
        `chineseTranslation.${name}`,
        (textEditor, edit) => translate(name, textEditor, edit)
      )
    );
  });
}

function getSelectionOrCurrentLine(textEditor) {
  let selection = textEditor.selection;

  const
    start = selection.start,
    end = selection.end;

  if (start.line === end.line && start.character === end.character) {
    selection = new vscode.Range(start.line, 0, start.line, Infinity);

    const line = textEditor.document.getText(selection);

    selection = new vscode.Range(start.line, 0, start.line, line.length);
  }

  return selection;
}

function translate(name, textEditor, edit) {
  const selection = getSelectionOrCurrentLine(textEditor);

  return opencc[name](textEditor.document.getText(selection)).then(translated =>
    textEditor.edit(edit =>
      edit.replace(selection, translated)
    )
  ).catch(err => vscode.window.showErrorMessage(`Failed to translate Chinese text due to ${err.message}`));
}

exports.activate = activate;

function deactivate() {
}

exports.deactivate = deactivate;