import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "api-hub" is now active!');

  let disposable = vscode.commands.registerCommand('api-hub.getApi', () => {
    vscode.window.showInformationMessage('Get Api!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
