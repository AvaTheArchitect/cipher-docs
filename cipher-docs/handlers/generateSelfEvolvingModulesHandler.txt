/**
 * 🤖 Generate Self-Evolving Modules Handler
 * ==========================================
 * Command interface for Cipher's autonomous evolution system
 */

import * as vscode from 'vscode';
import { selfGenerationSystem } from '../../brain/SelfGenerationSystem';

export async function generateSelfEvolvingModulesHandler(): Promise<void> {
    try {
        // Show evolution options to user
        const evolutionType = await vscode.window.showQuickPick([
            {
                label: '🤖 Full Evolution',
                description: 'Complete autonomous evolution cycle',
                detail: 'Self-heal, expand, rewire, compile, and learn',
                type: 'full'
            },
            {
                label: '🔧 Self-Healing Only',
                description: 'Create missing handlers',
                detail: 'Scan for missing handlers and create them',
                type: 'healing'
            },
            {
                label: '🚀 Self-Expansion Only',
                description: 'Generate new intelligent handlers',
                detail: 'Create new handlers based on brain analysis',
                type: 'expansion'
            },
            {
                label: '⚙️ Configure Evolution',
                description: 'Set evolution preferences',
                detail: 'Configure auto-compile, auto-register, etc.',
                type: 'configure'
            },
            {
                label: '📊 Evolution Status',
                description: 'View current evolution status',
                detail: 'Check brain connectivity and configuration',
                type: 'status'
            }
        ], {
            placeHolder: 'Choose evolution mode',
            title: '🤖 Cipher Autonomous Evolution'
        });

        if (!evolutionType) {
            vscode.window.showInformationMessage('Evolution canceled.');
            return;
        }

        switch (evolutionType.type) {
            case 'full':
                await runFullEvolution();
                break;
            case 'healing':
                await runSelfHealing();
                break;
            case 'expansion':
                await runSelfExpansion();
                break;
            case 'configure':
                await configureEvolution();
                break;
            case 'status':
                await showEvolutionStatus();
                break;
        }

    } catch (error) {
        vscode.window.showErrorMessage(`Evolution failed: ${error}`);
        console.error('Evolution error:', error);
    }
}

// =============================================================================
// 🚀 EVOLUTION MODES
// =============================================================================

async function runFullEvolution(): Promise<void> {
    const confirm = await vscode.window.showWarningMessage(
        '🤖 Full Evolution will:\n\n' +
        '• Create missing handlers\n' +
        '• Generate new intelligent handlers\n' +
        '• Update extension.ts and package.json\n' +
        '• Compile TypeScript\n' +
        '• Learn from results\n\n' +
        'This may modify multiple files. Continue?',
        'Yes, Evolve!', 'Cancel'
    );

    if (confirm !== 'Yes, Evolve!') {
        vscode.window.showInformationMessage('Evolution canceled.');
        return;
    }

    vscode.window.showInformationMessage('🤖 Starting full evolution...');
    
    const result = await selfGenerationSystem.runFullEvolution();
    
    if (result.created.length > 0 || result.modified.length > 0) {
        vscode.window.showInformationMessage(
            `✅ Evolution complete! Created ${result.created.length} handlers, modified ${result.modified.length} files.`
        );
    }
}

async function runSelfHealing(): Promise<void> {
    vscode.window.showInformationMessage('🔧 Starting self-healing...');
    
    const result = await selfGenerationSystem.runSelfHealing();
    
    if (result.created.length > 0) {
        vscode.window.showInformationMessage(
            `🔧 Self-healing complete! Created ${result.created.length} missing handlers.`
        );
    } else {
        vscode.window.showInformationMessage('🎯 All handlers present! No healing needed.');
    }
}

async function runSelfExpansion(): Promise<void> {
    vscode.window.showInformationMessage('🚀 Starting self-expansion...');
    
    const result = await selfGenerationSystem.runSelfExpansion();
    
    if (result.created.length > 0) {
        vscode.window.showInformationMessage(
            `🚀 Self-expansion complete! Created ${result.created.length} intelligent handlers.`
        );
    } else {
        vscode.window.showInformationMessage('🎯 No expansion opportunities detected.');
    }
}

// =============================================================================
// ⚙️ CONFIGURATION
// =============================================================================

async function configureEvolution(): Promise<void> {
    const currentStatus = selfGenerationSystem.getStatus();
    const config = currentStatus.config;

    const options = [
        {
            label: `${config.autoHeal ? '✅' : '❌'} Auto-Healing`,
            description: 'Automatically create missing handlers',
            key: 'autoHeal'
        },
        {
            label: `${config.autoExpand ? '✅' : '❌'} Auto-Expansion`,
            description: 'Generate new intelligent handlers',
            key: 'autoExpand'
        },
        {
            label: `${config.autoRegister ? '✅' : '❌'} Auto-Registration`,
            description: 'Automatically register commands',
            key: 'autoRegister'
        },
        {
            label: `${config.autoCompile ? '✅' : '❌'} Auto-Compilation`,
            description: 'Automatically compile TypeScript',
            key: 'autoCompile'
        },
        {
            label: `${config.autoReload ? '✅' : '❌'} Auto-Reload`,
            description: 'Automatically reload VS Code',
            key: 'autoReload'
        },
        {
            label: `${config.brainLearning ? '✅' : '❌'} Brain Learning`,
            description: 'Enable brain learning from evolution',
            key: 'brainLearning'
        }
    ];

    const selection = await vscode.window.showQuickPick(options, {
        placeHolder: 'Select option to toggle',
        title: '⚙️ Evolution Configuration'
    });

    if (selection) {
        const newValue = !config[selection.key as keyof typeof config];
        await selfGenerationSystem.configure({ [selection.key]: newValue });
        
        vscode.window.showInformationMessage(
            `✅ ${selection.key} ${newValue ? 'enabled' : 'disabled'}`
        );
        
        // Show updated configuration
        await configureEvolution();
    }
}

// =============================================================================
// 📊 STATUS DISPLAY
// =============================================================================

async function showEvolutionStatus(): Promise<void> {
    const status = selfGenerationSystem.getStatus();
    
    const statusMessage = `🤖 Cipher Evolution Status

🔧 Configuration:
  • Auto-Healing: ${status.config.autoHeal ? '✅ Enabled' : '❌ Disabled'}
  • Auto-Expansion: ${status.config.autoExpansion ? '✅ Enabled' : '❌ Disabled'}
  • Auto-Registration: ${status.config.autoRegister ? '✅ Enabled' : '❌ Disabled'}
  • Auto-Compilation: ${status.config.autoCompile ? '✅ Enabled' : '❌ Disabled'}
  • Auto-Reload: ${status.config.autoReload ? '✅ Enabled' : '❌ Disabled'}
  • Brain Learning: ${status.config.brainLearning ? '✅ Enabled' : '❌ Disabled'}

🧠 Brain Status:
  • Connected: ${status.brainConnected ? '✅ Yes' : '❌ No'}
  • Running: ${status.isRunning ? '🔄 Yes' : '⏸️ No'}

📂 Workspace:
  • Path: ${status.workspacePath || 'Not found'}`;

    const actions = ['Configure', 'Run Evolution', 'OK'];
    
    const action = await vscode.window.showInformationMessage(statusMessage, ...actions);
    
    if (action === 'Configure') {
        await configureEvolution();
    } else if (action === 'Run Evolution') {
        await runFullEvolution();
    }
}

export default generateSelfEvolvingModulesHandler;