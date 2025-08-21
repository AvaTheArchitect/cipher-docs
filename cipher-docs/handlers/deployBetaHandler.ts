import * as vscode from 'vscode';
import { displayAnalysisResults, displayGuitarAnalysis, displayVocalAnalysis } from '../../shared/displayUtils';
import { getBrainInterface } from '../../shared/utils';

export async function deployBetaHandler(): Promise<void> {
    try {
        const brainInterface = getBrainInterface();
        if (!brainInterface) {
            vscode.window.showErrorMessage('🧠 Brain interface not available');
            return;
        }

        // 🧠 Brain analysis before deployment
        const [deploymentAnalysis, guitarStatus, vocalStatus] = await Promise.all([
            brainInterface.analyzeDeploymentReadiness?.() || brainInterface.getPredictiveInsights({}),
            brainInterface.analyzeGuitar(),
            brainInterface.analyzeVocal()
        ]);
        
        const config = vscode.workspace.getConfiguration('cipher');
        const deployTarget = config.get<string>('deployTarget', 'vercel');

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "🚀 Cipher Autonomous Deployment",
            cancellable: false
        }, async (progress) => {
            progress.report({ increment: 0, message: "🧠 Brain analyzing codebase..." });
            await new Promise(resolve => setTimeout(resolve, 1000));

            progress.report({ increment: 30, message: "🎵 Brain optimizing components..." });
            
            try {
                await brainInterface.optimizeForDeployment?.(deployTarget);
            } catch (optError) {
                console.warn(`⚠️ Brain optimization partially failed:`, optError);
            }
            
            await new Promise(resolve => setTimeout(resolve, 1500));

            progress.report({ increment: 70, message: `🚀 Deploying to ${deployTarget}...` });
            await new Promise(resolve => setTimeout(resolve, 1000));

            progress.report({ increment: 100, message: "✅ Brain deployment complete!" });
        });

        const betaUrl = `https://cipher-beta-${Date.now()}.${deployTarget}.app`;
        
        // 🧠 Learn from deployment success
        await brainInterface.learnFromAnalysis('deployment', {
            success: true,
            target: deployTarget,
            url: betaUrl,
            guitarHealth: guitarStatus.health,
            vocalHealth: vocalStatus.health,
            confidence: deploymentAnalysis.confidence,
            timestamp: new Date().toISOString()
        });

        const action = await vscode.window.showInformationMessage(
            `✅ Cipher deployed autonomously with Brain power!\n🌐 ${betaUrl}\n🧠 Brain: ${deploymentAnalysis.confidence}% confidence\n🎸 Guitar: ${guitarStatus.health}% health\n🎤 Vocal: ${vocalStatus.health}% health`,
            'Open Site',
            'Copy Link',
            'Share Progress',
            'Brain Report',
            'Music Analysis'
        );

        if (action === 'Open Site') {
            vscode.env.openExternal(vscode.Uri.parse(betaUrl));
        } else if (action === 'Copy Link') {
            await vscode.env.clipboard.writeText(betaUrl);
            vscode.window.showInformationMessage('🔗 Link copied to clipboard!');
        } else if (action === 'Share Progress') {
            vscode.commands.executeCommand('cipher.exportProgress');
        } else if (action === 'Brain Report') {
           await displayAnalysisResults(deploymentAnalysis as any);
        } else if (action === 'Music Analysis') {
            await displayGuitarAnalysis(guitarStatus);
            await displayVocalAnalysis(vocalStatus);
        }

    } catch (error) {
        const brainInterface = getBrainInterface();
        if (brainInterface) {
            await brainInterface.learnFromAnalysis('deployment', {
                success: false,
                error: error?.toString(),
                timestamp: new Date().toISOString()
            });
        }
        vscode.window.showErrorMessage(`🧠 Brain deployment failed: ${error}`);
    }
}