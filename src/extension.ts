import * as vscode from 'vscode';
import { apis } from './apis';
import { Api } from './types';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "api-hub" is now active!');

  let disposable = vscode.commands.registerCommand('api-hub.getApi', () => {
    vscode.window.showInformationMessage('Get Api!');

    const quickPick = vscode.window.createQuickPick();
    quickPick.items = apis.map((api: Api) => ({ label: api.label }));

    // when item os selected
    quickPick.onDidChangeSelection(([item]) => {
      if (item) {
        vscode.window.showInformationMessage(item.label);

        quickPick.dispose();
      }
    });

    quickPick.onDidHide(() => quickPick.dispose());

    quickPick.show();
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
