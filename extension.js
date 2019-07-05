const opencc = require('node-opencc'),
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
			vscode.commands.registerCommand(
				`chineseTranslation.${name}`,
				() => (translate(name))
			)
		);
	})
}

function translate(name) {
	try {
		let editor = vscode.window.activeTextEditor,
			selection = editor.selection,
			text = editor.document.getText(selection),
			result = opencc[name](text),
			snippet = new vscode.SnippetString(result);
		editor.insertSnippet(snippet);
	} catch (err) {
		vscode.window.showErrorMessage(`Failed to translate Chinese text due to ${err.message}`)
	}
}

exports.activate = activate;

function deactivate() { }

module.exports = {
	activate,
	deactivate
}