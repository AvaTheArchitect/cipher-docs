// 🧠 Enhanced Personalized Suggestions Handler - Brain-Powered Intelligence
// .vscode-extension/cipher-autonomous-dev/src/handlers/getPersonalizedSuggestionsHandler.ts

import * as vscode from 'vscode';
import { displayBrainSuggestions } from '../../shared/displayUtils';
import { getBrainInterface, isBrainConnected } from '../../shared/utils';

/**
 * 🧠 BRAIN-POWERED PERSONALIZED SUGGESTIONS
 * Uses dual brain system to provide intelligent, context-aware suggestions
 */
export async function getPersonalizedSuggestionsHandler(): Promise<void> {
    try {
        vscode.window.showInformationMessage('🧠 Analyzing your patterns for personalized suggestions...');

        const brainInterface = getBrainInterface();
        if (!brainInterface || !isBrainConnected()) {
            vscode.window.showErrorMessage('🧠 Brain system not available');
            return;
        }

        // Create simple context from current editor
        const editor = vscode.window.activeTextEditor;
        const context = {
            currentFile: editor?.document.fileName,
            fileType: editor?.document.languageId,
            projectSize: 10, // Simple fallback
            complexity: 5,   // Simple fallback
            recentActions: ['get-suggestions'],
            preferences: new Map()
        };
        
        // Get personalized suggestions from brain
        const suggestions = await brainInterface.getPersonalizedSuggestions(context);

        // Display suggestions using existing brain display utility
        await displayBrainSuggestions(suggestions);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`🧠 Failed to get personalized suggestions: ${errorMessage}`);
    }
}