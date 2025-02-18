import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const classRegex = /^\s*(?:(?:public|private|internal|protected)\s+)?(?:(?:abstract|sealed|static|readonly|partial)\s+)?(?:class|interface|record|struct|enum)\s+\w+\s*(?:<\s*\w+(?:\s*,\s*\w+)*\s*>)?\s*(?::\s*\w+(?:\s*,\s*\w+)*)?\s*(?:where\s+\w+\s*:\s*\w+(?:\s*,\s*\w+)*)?\s*[{\;]/;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('csharp-easy-class.pasteClass', async (uri: vscode.Uri) => {
    const clipboardText = await vscode.env.clipboard.readText();
    const match = clipboardText.match(classRegex);

    if (!match) {
      vscode.window.showInformationMessage('O conteúdo da área de transferência não é uma classe C# válida.');
      return;
    }

    const classNameMatch = clipboardText.match(/(?:class|interface|record|struct|enum)\s+(\w+)/);
    if (!classNameMatch) {
      vscode.window.showInformationMessage('Não foi possível encontrar o nome da classe no conteúdo da área de transferência.');
      return;
    }
    const className = classNameMatch[1];
    const filePath = path.join(uri.fsPath, `${className}.cs`);

    fs.writeFileSync(filePath, clipboardText);

    const document = await vscode.workspace.openTextDocument(filePath);
    await vscode.window.showTextDocument(document);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}