import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export class Utils {
    static async readClipboardText(): Promise<string> {
        return await vscode.env.clipboard.readText();
    }

    static extractClassName(clipboardText: string): string | null {
        const match = clipboardText.match(/(?:class|interface|record|struct|enum)\s+(\w+)/);
        return match ? match[1] : null;
    }

    static findProjectFile(workspacePath: string): string | undefined {
        const projectFiles = fs.readdirSync(workspacePath);
        return projectFiles.find((file) => file.endsWith('.csproj'));
    }

    static verifyNamespace(content: string): string {
        // verifica se no conteúdo do clipboard já existe um namespace
        const match = content.match(/namespace\s+(\w+)/);
        return match ? match[1] : '';
    }

    static generateNamespaceFromCsproj(newFilePath: string): string {
        let currentPath = newFilePath;
        
        while (currentPath !== path.dirname(currentPath)) {
            const projectFile = Utils.findProjectFile(currentPath);
            if (projectFile) {
                const projectFolder = currentPath.split('/').pop();
                const relativeFilePath = newFilePath.split(projectFolder + '/').pop();
                let namespaces = relativeFilePath?.replace(/\//g, '.');
                namespaces = projectFolder + '.' + namespaces;
                return namespaces;
            }
            currentPath = path.dirname(currentPath);
        }
        
        vscode.window.showInformationMessage('No .csproj file found in the workspace.');
        return '';
    }

    static createFileContent(namespace: string, clipboardText: string): string {
        if (namespace){
            namespace = `namespace ${namespace};\n\n`;
        }
        return namespace + clipboardText;
    }

    static writeFile(filePath: string, content: string): void {
        fs.writeFileSync(filePath, content);
    }
}