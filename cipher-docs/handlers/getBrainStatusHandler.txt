import * as vscode from 'vscode';
import { displayBrainStatus } from '../../shared/displayUtils';
import { getBrainInterface } from '../../shared/utils';

export async function getBrainStatusHandler(): Promise<void> {
    try {
        const brainInterface = getBrainInterface();
        if (!brainInterface) {
            vscode.window.showWarningMessage('Brain interface not available');
            return;
        }
        const status = brainInterface.getStatus();
        await displayBrainStatus(status);

    } catch (error) {
        vscode.window.showErrorMessage(`Brain status check failed: ${error}`);
    }
}