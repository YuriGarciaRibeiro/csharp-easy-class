import * as vscode from 'vscode';
import * as path from 'path';
import { Utils } from './utils';

// Função principal de ativação
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('csharp-easy-class.pasteClass', async (uri: vscode.Uri) => {
        const clipboardText = await Utils.readClipboardText();
        const className = Utils.extractClassName(clipboardText);
        if (!className) {
            vscode.window.showInformationMessage('Clipboard does not contain a valid C# class.');
            return;
        }

        const workspacePath = vscode.workspace.getWorkspaceFolder(uri)?.uri.fsPath;
        if (!workspacePath) {
            vscode.window.showInformationMessage('No workspace found.');
            return;
        }

        var namespace = '';

        if(!Utils.verifyNamespace(clipboardText)) {
            namespace = Utils.generateNamespaceFromCsproj(uri.fsPath); 
        }

        const filePath = path.join(uri.fsPath, `${className}.cs`);

        const fileContent = Utils.createFileContent(namespace, clipboardText);
        Utils.writeFile(filePath, fileContent);
        
        const document = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(document);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}