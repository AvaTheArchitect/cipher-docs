import * as vscode from 'vscode';
import { showDetailedAnalysisView } from '../../shared/displayUtils';
import { getBrainAnalytics, isBrainAvailable, performProjectAnalysis } from '../../shared/utils';

export async function viewDetailsHandler(): Promise<void> {
    try {
        vscode.window.showInformationMessage('🔍 Generating detailed analysis...');

        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }

        // Perform comprehensive analysis
        const projectAnalysis = await performProjectAnalysis(workspaceFolder.uri, true);

        // Get brain analytics if available
        let brainAnalytics = null;
        if (isBrainAvailable()) {
            try {
                brainAnalytics = await getBrainAnalytics();
            } catch (error) {
                console.warn('Brain analytics unavailable:', error);
            }
        }

        // Combine analysis data
        const detailedAnalysis = {
            ...projectAnalysis,
            brainAnalytics,
            timestamp: Date.now(),
            workspaceName: workspaceFolder.name,
            extension: {
                status: 'Active ✅',
                autoRepair: 'Enabled ✅',
                routeAnalysis: 'Ready ✅',
                gptSync: 'Available ✅',
                brainIntelligence: isBrainAvailable() ? 'Connected 🧠' : 'Simulation Mode 🔧'
            },
            availableCommands: [
                'Component Creation',
                'Route Management',
                'Performance Optimization',
                'Self-Repair & Analysis',
                'GPT Integration',
                'Beta Deployment',
                'Brain Intelligence Features'
            ]
        };

        // Display detailed analysis view        
        await showDetailedAnalysisView(detailedAnalysis);

    } catch (error) {
        vscode.window.showErrorMessage(`Detailed analysis failed: ${error}`);

        // Fallback to basic info message
        const fallbackMessage = `
🎵 CIPHER DEVELOPMENT DETAILS

📊 Current Status:
- Extension: Active ✅
- Auto-repair: Enabled ✅
- Route Analysis: Ready ✅
- GPT Sync: Available ✅
- Brain Intelligence: ${isBrainAvailable() ? 'Connected 🧠' : 'Initializing 🔧'}

🔧 Available Commands:
- Component Creation
- Route Management  
- Performance Optimization
- Self-Repair & Analysis
- GPT Integration
- Beta Deployment
- Brain Intelligence Features

💡 Quick Actions:
Run any command from the Cipher panel or command palette.

⚠️ Note: Enhanced analysis view temporarily unavailable.
        `;

        vscode.window.showInformationMessage(fallbackMessage, { modal: true });
    }
}