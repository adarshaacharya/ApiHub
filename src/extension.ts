import * as vscode from 'vscode';
import { apis } from './apis';
import { Api } from './types';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('api-hub.getApi', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage("Editor doesn't exists!");
      return;
    }

    const quickPick = vscode.window.createQuickPick();
    const sortedApis = apis.sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { caseFirst: 'upper' })
    );

    quickPick.items = sortedApis.map((api: Api) => ({ label: api.label }));

    // select item
    quickPick.onDidChangeSelection(([item]) => {
      if (item) {
        apis.map((api) => {
          if (api.label === item.label) {
            editor.edit((edit) => {
              const position = editor.selection.active;

              edit.insert(position, api.url);
            });
            vscode.window.showInformationMessage(api.url);
          }
        });
        quickPick.dispose();
      }
    });

    quickPick.onDidHide(() => quickPick.dispose());

    quickPick.show();
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
