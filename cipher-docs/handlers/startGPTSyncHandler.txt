import * as vscode from 'vscode';
import { ensureDirectoryExists } from '../../shared/utils';

let gptSyncActive = false;

export async function startGPTSyncHandler(): Promise<void> {
    try {
        gptSyncActive = !gptSyncActive;

        if (gptSyncActive) {
            await initializeGPTSync();
            vscode.window.showInformationMessage('🌐 GPT Real-time Sync: ACTIVE');
        } else {
            vscode.window.showInformationMessage('🌐 GPT Real-time Sync: PAUSED');
        }

    } catch (error) {
        vscode.window.showErrorMessage(`GPT Sync failed: ${error}`);
    }
}

async function initializeGPTSync(): Promise<void> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) return;

    // Create GPT sync directories
    const syncDir = vscode.Uri.joinPath(workspaceFolder.uri, 'cipher-gpt-sync');
    const inputDir = vscode.Uri.joinPath(syncDir, 'input');
    const outputDir = vscode.Uri.joinPath(syncDir, 'output');

    await ensureDirectoryExists(syncDir);
    await ensureDirectoryExists(inputDir);
    await ensureDirectoryExists(outputDir);

    // Create sync status file
    const statusFile = vscode.Uri.joinPath(syncDir, 'sync-status.json');
    const statusData = {
        active: true,
        lastSync: new Date().toISOString(),
        sessionId: Date.now().toString(),
        stats: {
            imports: 0,
            exports: 0,
            lastActivity: new Date().toISOString()
        }
    };

    await vscode.workspace.fs.writeFile(statusFile, Buffer.from(JSON.stringify(statusData, null, 2)));
}