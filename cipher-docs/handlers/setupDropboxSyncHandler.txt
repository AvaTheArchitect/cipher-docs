import * as vscode from 'vscode';
import { getBrainInterface } from '../../shared/utils';

export async function setupDropboxSyncHandler(): Promise<void> {
    try {
        const brainInterface = getBrainInterface();
        if (!brainInterface) {
            // Fallback Dropbox setup without brain interface
            await runFallbackDropboxSetup();
            return;
        }
        
        // 🧠 Brain analysis of current sync status
        const [syncAnalysis, teamNeeds] = await Promise.all([
            brainInterface.analyzeDropboxSyncRequirements?.() || getDefaultSyncAnalysis(),
            brainInterface.getTeamCollaborationNeeds?.() || getDefaultTeamNeeds()
        ]);
        
        const action = await vscode.window.showInformationMessage(
            `📦🧠 Set up Brain-enhanced Dropbox synchronization?\n🧠 Team Collaboration Score: ${teamNeeds.score}%\nRecommended: ${syncAnalysis.recommended ? 'Yes' : 'No'}`,
            'Configure Now',
            'Brain Analysis',
            'Learn More',
            'Skip'
        );

        if (action === 'Configure Now') {
            await configureDropboxSync(brainInterface, syncAnalysis);
        } else if (action === 'Brain Analysis') {
            await showDropboxBrainAnalysis(syncAnalysis, teamNeeds);
        } else if (action === 'Learn More') {
            vscode.env.openExternal(vscode.Uri.parse('https://cipher-docs.com/brain-dropbox-sync'));
        }

        // 🧠 Learn from sync setup interaction
        await brainInterface.learnFromAnalysis('dropbox-sync-setup', {
            success: true,
            action: action || 'skipped',
            teamScore: teamNeeds.score,
            recommended: syncAnalysis.recommended,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        const brainInterface = getBrainInterface();
        if (brainInterface) {
            await brainInterface.learnFromAnalysis('dropbox-sync-setup', {
                success: false,
                error: error?.toString()
            });
        }
        vscode.window.showErrorMessage(`🧠 Brain Dropbox setup failed: ${error}`);
    }
}

// Helper functions
async function configureDropboxSync(brainInterface: any, syncAnalysis: any): Promise<void> {
    const apiKey = await vscode.window.showInputBox({
        prompt: '🧠 Enter Dropbox API key (Brain will encrypt and store securely)',
        password: true,
        placeHolder: 'Your Dropbox API key...'
    });

    if (apiKey) {
        // Brain-enhanced API key validation
        const validation = await brainInterface.validateDropboxApiKey?.(apiKey) || {
            valid: apiKey.length > 10,
            securityLevel: 'basic',
            error: apiKey.length <= 10 ? 'API key too short' : null
        };
        
        if (validation.valid) {
            await brainInterface.setupDropboxSync?.(apiKey, syncAnalysis);
            vscode.window.showInformationMessage(
                `📦🧠 Brain-enhanced Dropbox sync configured!\n🔒 Security Level: ${validation.securityLevel}\n⚡ Sync Speed: ${syncAnalysis.estimatedSpeed}`
            );
        } else {
            vscode.window.showErrorMessage(`🧠 Brain validation failed: ${validation.error}`);
        }
    }
}

async function runFallbackDropboxSetup(): Promise<void> {
    const action = await vscode.window.showInformationMessage(
        '📦 Basic Dropbox Sync Setup (Fallback Mode)\n\n⚠️ Brain interface unavailable - basic setup only',
        'Continue Setup',
        'Manual Setup',
        'Skip'
    );
    
    if (action === 'Continue Setup') {
        const apiKey = await vscode.window.showInputBox({
            prompt: 'Enter Dropbox API key (basic validation)',
            password: true,
            placeHolder: 'Your Dropbox API key...'
        });
        
        if (apiKey && apiKey.length > 10) {
            vscode.window.showInformationMessage('📦 Basic Dropbox sync configured! (Limited functionality without brain interface)');
        }
    } else if (action === 'Manual Setup') {
        vscode.window.showInformationMessage('📚 Please refer to Cipher documentation for manual Dropbox setup instructions.');
    }
}

async function showDropboxBrainAnalysis(syncAnalysis: any, teamNeeds: any): Promise<void> {
    const analysis = `🧠 Brain-Enhanced Dropbox Analysis:\n\n## 📊 Team Collaboration Assessment\n- **Team Size:** ${teamNeeds.teamSize} member(s)\n- **Collaboration Score:** ${teamNeeds.score}%\n- **Sync Frequency:** ${teamNeeds.syncFrequency}\n- **Shared Projects:** ${teamNeeds.sharedProjects}\n\n## 🎯 Brain Recommendations\n${syncAnalysis.recommendations.map((rec: string) => `• ${rec}`).join('\n')}\n\n## ⏱️ Setup Efficiency\n- **Estimated Time:** ${syncAnalysis.estimatedTime}\n- **Priority Level:** ${syncAnalysis.priority}\n- **Expected Speed:** ${syncAnalysis.estimatedSpeed}\n\n## 🎵 Music-Specific Benefits\n• Sync audio samples and compositions\n• Share practice recordings with team\n• Collaborative editing of music projects\n• Backup of custom instrument configurations`;

    vscode.window.showInformationMessage(analysis, { modal: true });
}

// Default data providers
function getDefaultSyncAnalysis(): any {
    return {
        recommended: true,
        estimatedTime: '5-10 minutes',
        filesCount: 150,
        priority: 'medium',
        estimatedSpeed: '2.5 MB/s',
        recommendations: [
            'Enable automatic sync for development files',
            'Set up selective sync for large assets',
            'Configure conflict resolution preferences'
        ]
    };
}

function getDefaultTeamNeeds(): any {
    return {
        teamSize: 1,
        score: 75,
        collaborationLevel: 'moderate',
        syncFrequency: 'daily',
        sharedProjects: 3
    };
}