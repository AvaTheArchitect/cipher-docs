// 🤖 Self-Generating Handler System with Brain Intelligence - FIXED
// Location: .vscode-extensions/cipher-autonomous-dev/src/handlers/createHandlerStubHandler.ts

import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

// ===== ✅ UNIFIED ARCHITECTURE IMPORTS =====
import { displayBrainSuggestions } from '../../shared/displayUtils';
import {
    generateMusicComponentWithBrain,
    getBrainInterface,
    isBrainAvailable,
    shareAnalysisData
} from '../../shared/utils';

// Import template generators
import {
    generateAdvancedHandlerTemplate,
    generateHandlerTemplate,
    generateLyricsHandlerTemplate,
    generateMusicHandlerTemplate
} from '../../shared/templateGenerators';

export async function createHandlerStubHandler(): Promise<void> {
    try {
        // 🎯 Get handler type and name
        const handlerType = await vscode.window.showQuickPick([
            {
                label: '🔧 Basic Handler',
                description: 'Simple handler stub',
                detail: 'Creates a basic handler with standard functionality',
                type: 'basic'
            },
            {
                label: '🎵 Music Handler',
                description: 'Music-specific handler with brain intelligence',
                detail: 'Guitar, vocal, audio, or theory focused handler',
                type: 'music'
            },
            {
                label: '🎤 Lyrics Handler',
                description: 'Advanced lyrics component handler',
                detail: 'Complete lyrics analysis and generation system',
                type: 'lyrics'
            },
            {
                label: '🧠 Brain-Powered Handler',
                description: 'AI-enhanced handler with learning',
                detail: 'Advanced handler with brain intelligence integration',
                type: 'brain'
            },
            {
                label: '🤖 Auto-Generated Handler',
                description: 'Let Cipher design the handler',
                detail: 'Brain analyzes needs and creates optimal handler',
                type: 'auto'
            }
        ], {
            placeHolder: 'Choose handler type to generate',
            title: '🤖 Cipher Handler Generator'
        });

        if (!handlerType) {
            vscode.window.showWarningMessage('Handler creation canceled.');
            return;
        }

        // Get handler name
        const name = await vscode.window.showInputBox({
            prompt: `Enter the ${handlerType.label} name (without Handler)`,
            placeHolder: 'example: createLyricsComponent, analyzeGuitarChords, generateVocalExercise',
            validateInput: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'Handler name is required';
                }
                if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(value.trim())) {
                    return 'Handler name must start with a letter and contain only letters and numbers';
                }
                return null;
            }
        });

        if (!name) {
            vscode.window.showWarningMessage('Handler creation canceled.');
            return;
        }

        const workspace = vscode.workspace.workspaceFolders?.[0];
        if (!workspace) {
            vscode.window.showErrorMessage('No workspace folder found.');
            return;
        }

        // 🧠 Brain-enhanced handler generation
        await generateHandler(handlerType.type as string, name.trim(), workspace.uri.fsPath);

        // 🎯 Show completion message with next steps
        await showHandlerCreationComplete(handlerType.type as string, name.trim());

    } catch (error) {
        vscode.window.showErrorMessage(`Handler generation failed: ${error}`);

        // Learn from errors
        if (isBrainAvailable()) {
            await shareAnalysisData('handler-generation-error', {
                error: error?.toString(),
                timestamp: Date.now()
            });
        }
    }
}

// =============================================================================
// 🏗️ HANDLER GENERATION ENGINE
// =============================================================================

async function generateHandler(type: string, name: string, workspacePath: string): Promise<void> {
    const handlerName = `${name}Handler`;
    const filePath = path.join(workspacePath, 'src', 'handlers', `${handlerName}.ts`);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
        const overwrite = await vscode.window.showWarningMessage(
            `Handler ${handlerName}.ts already exists. Overwrite?`,
            'Yes', 'No'
        );

        if (overwrite !== 'Yes') {
            vscode.window.showInformationMessage('Handler creation canceled.');
            return;
        }
    }

    let contents: string;

    switch (type) {
        case 'basic':
            // ✅ FIXED: Provide both required parameters
            contents = generateHandlerTemplate('generic', name);
            break;
        case 'music':
            contents = await generateMusicHandlerWithBrain(name);
            break;
        case 'lyrics':
            contents = await generateLyricsHandlerWithBrain(name);
            break;
        case 'brain':
            contents = await generateBrainPoweredHandler(name);
            break;
        case 'auto':
            contents = await generateAutoHandler(name);
            break;
        default:
            // ✅ FIXED: Provide both required parameters
            contents = generateHandlerTemplate('generic', name);
    }

    // Write the file
    fs.writeFileSync(filePath, contents, 'utf8');

    // 🧠 Learn from handler creation
    if (isBrainAvailable()) {
        await shareAnalysisData('handler-created', {
            type,
            name: handlerName,
            timestamp: Date.now(),
            brainGenerated: type === 'auto' || type === 'brain'
        });
    }

    // Open the created file
    const document = await vscode.workspace.openTextDocument(filePath);
    await vscode.window.showTextDocument(document);

    vscode.window.showInformationMessage(`✅ Created ${type} handler: ${handlerName}.ts`);
}

// =============================================================================
// 🎵 MUSIC HANDLER GENERATION WITH BRAIN
// =============================================================================

async function generateMusicHandlerWithBrain(name: string): Promise<string> {
    // Determine music type from name
    const musicType = detectMusicType(name);

    if (isBrainAvailable()) {
        try {
            // ✅ FIXED: Only use brain for component generation, not template parameters
            await generateMusicComponentWithBrain(musicType);
            // Brain data is used internally, just generate the template
            return generateMusicHandlerTemplate(name);
        } catch (error) {
            console.warn('🧠 Brain generation failed, using template:', error);
        }
    }

    // ✅ FIXED: Only pass name parameter
    return generateMusicHandlerTemplate(name);
}

async function generateLyricsHandlerWithBrain(name: string): Promise<string> {
    if (isBrainAvailable()) {
        try {
            const brainInterface = getBrainInterface();
            if (!brainInterface) {
                return generateLyricsHandlerTemplate(name);
            }
            
            // ✅ FIXED: Add null safety check
            const suggestions = await brainInterface.getPersonalizedSuggestions();

            // Use suggestions internally for brain learning, but don't pass to template
            await shareAnalysisData('lyrics-suggestions', {
                suggestions: suggestions.filter(s =>
                    s.toLowerCase().includes('lyric') ||
                    s.toLowerCase().includes('song') ||
                    s.toLowerCase().includes('verse') ||
                    s.toLowerCase().includes('chorus')
                ),
                timestamp: Date.now()
            });

            // ✅ FIXED: Only pass name parameter
            return generateLyricsHandlerTemplate(name);
        } catch (error) {
            console.warn('🧠 Brain lyrics generation failed, using template:', error);
        }
    }

    return generateLyricsHandlerTemplate(name);
}

async function generateBrainPoweredHandler(name: string): Promise<string> {
    if (!isBrainAvailable()) {
        vscode.window.showWarningMessage('🧠 Brain not available, creating enhanced template instead.');
        return generateAdvancedHandlerTemplate(name);
    }

    try {
        const brainInterface = getBrainInterface();
        if (!brainInterface) {
            return generateAdvancedHandlerTemplate(name);
        }
        
        // ✅ FIXED: Add null safety checks
        const status = await brainInterface.getStatus();
        const suggestions = await brainInterface.getPersonalizedSuggestions();

        // Use brain data for learning, but don't pass to template
        await shareAnalysisData('brain-handler-creation', {
            status,
            suggestions,
            capabilities: Object.keys(status.capabilities || {}).filter(key =>
                (status.capabilities as any)[key] === true
            ),
            timestamp: Date.now()
        });

        // ✅ FIXED: Only pass name parameter
        return generateAdvancedHandlerTemplate(name);
    } catch (error) {
        console.warn('🧠 Brain-powered generation failed:', error);
        return generateAdvancedHandlerTemplate(name);
    }
}

async function generateAutoHandler(name: string): Promise<string> {
    if (!isBrainAvailable()) {
        vscode.window.showWarningMessage('🧠 Brain required for auto-generation. Creating smart template instead.');
        return generateAdvancedHandlerTemplate(name);
    }

    try {
        // 🤖 Let Cipher analyze and decide what type of handler to create
        const brainInterface = getBrainInterface();
        if (!brainInterface) {
            return generateAdvancedHandlerTemplate(name);
        }

        // Analyze the name to determine intent
        const analysis = analyzeFunctionName(name);

        // ✅ FIXED: Add null safety check
        const suggestions = await brainInterface.getPersonalizedSuggestions();

        // Use analysis for learning
        await shareAnalysisData('auto-handler-analysis', {
            name,
            analysis,
            suggestions,
            timestamp: Date.now()
        });

        // Generate based on brain analysis
        if (analysis.isMusic) {
            return await generateMusicHandlerWithBrain(name);
        } else if (analysis.isLyrics) {
            return await generateLyricsHandlerWithBrain(name);
        } else if (analysis.isComplex) {
            return await generateBrainPoweredHandler(name);
        } else {
            // ✅ FIXED: Only pass name parameter
            return generateAdvancedHandlerTemplate(name);
        }

    } catch (error) {
        console.warn('🤖 Auto-generation failed:', error);
        return generateAdvancedHandlerTemplate(name);
    }
}

// =============================================================================
// 🧠 INTELLIGENCE HELPERS
// =============================================================================

function detectMusicType(name: string): 'guitar' | 'vocal' | 'audio' | 'theory' {
    const nameLower = name.toLowerCase();

    if (nameLower.includes('guitar') || nameLower.includes('chord') || nameLower.includes('fret')) {
        return 'guitar';
    } else if (nameLower.includes('vocal') || nameLower.includes('voice') || nameLower.includes('sing')) {
        return 'vocal';
    } else if (nameLower.includes('audio') || nameLower.includes('sound') || nameLower.includes('record')) {
        return 'audio';
    } else if (nameLower.includes('theory') || nameLower.includes('scale') || nameLower.includes('harmony')) {
        return 'theory';
    }

    return 'audio'; // Default
}

function analyzeFunctionName(name: string): {
    isMusic: boolean;
    isLyrics: boolean;
    isComplex: boolean;
    suggestedType: string;
    confidence: number;
} {
    const nameLower = name.toLowerCase();

    const musicKeywords = ['guitar', 'vocal', 'audio', 'music', 'chord', 'note', 'scale', 'sound'];
    const lyricsKeywords = ['lyric', 'song', 'verse', 'chorus', 'rhyme', 'poem'];
    const complexKeywords = ['analyze', 'generate', 'optimize', 'enhance', 'process', 'transform'];

    const isMusic = musicKeywords.some(keyword => nameLower.includes(keyword));
    const isLyrics = lyricsKeywords.some(keyword => nameLower.includes(keyword));
    const isComplex = complexKeywords.some(keyword => nameLower.includes(keyword));

    let suggestedType = 'basic';
    let confidence = 50;

    if (isLyrics) {
        suggestedType = 'lyrics';
        confidence = 90;
    } else if (isMusic) {
        suggestedType = 'music';
        confidence = 85;
    } else if (isComplex) {
        suggestedType = 'brain';
        confidence = 75;
    }

    return { isMusic, isLyrics, isComplex, suggestedType, confidence };
}

// =============================================================================
// 🎯 COMPLETION & NEXT STEPS
// =============================================================================

async function showHandlerCreationComplete(type: string, name: string): Promise<void> {
    const handlerName = `${name}Handler`;

    const message = `✅ ${type.charAt(0).toUpperCase() + type.slice(1)} handler created successfully!

🔧 Handler: ${handlerName}.ts
${isBrainAvailable() ? '🧠 Brain Intelligence: Active' : '📋 Template: Standard'}
🎯 Next Steps: Add command registration to extension.ts`;

    const actions = ['Open Extension.ts', 'Test Handler'];

    if (isBrainAvailable()) {
        actions.unshift('View Brain Suggestions');
    }

    actions.push('OK');

    const action = await vscode.window.showInformationMessage(message, ...actions);

    if (action === 'View Brain Suggestions') {
        const brainInterface = getBrainInterface();
        if (brainInterface) {
            // ✅ FIXED: Add null safety check
            const suggestions = await brainInterface.getPersonalizedSuggestions();
            await displayBrainSuggestions(suggestions.filter(s =>
                s.toLowerCase().includes('handler') ||
                s.toLowerCase().includes(name.toLowerCase())
            ));
        }
    } else if (action === 'Open Extension.ts') {
        await openExtensionFile();
    } else if (action === 'Test Handler') {
        await testGeneratedHandler(handlerName);
    }
}

async function openExtensionFile(): Promise<void> {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) return;

    const extensionPath = path.join(workspace.uri.fsPath, 'src', 'extension.ts');

    if (fs.existsSync(extensionPath)) {
        const document = await vscode.workspace.openTextDocument(extensionPath);
        await vscode.window.showTextDocument(document);

        vscode.window.showInformationMessage(
            '💡 Remember to add your handler import and command registration!',
            'Show Instructions'
        ).then(selection => {
            if (selection === 'Show Instructions') {
                showRegistrationInstructions();
            }
        });
    } else {
        vscode.window.showErrorMessage('extension.ts not found');
    }
}

async function testGeneratedHandler(handlerName: string): Promise<void> {
    vscode.window.showInformationMessage(
        `🧪 To test ${handlerName}:
        
1. Add to extension.ts imports
2. Register command in activate()
3. Add to package.json commands
4. Reload VS Code
5. Run command via Cmd+Shift+P`,
        { modal: true }
    );
}

function showRegistrationInstructions(): void {
    vscode.window.showInformationMessage(
        `📋 Handler Registration Instructions:

1️⃣ Import: import { yourHandler } from './handlers/yourHandler';
2️⃣ Register: vscode.commands.registerCommand('cipher.yourCommand', yourHandler)
3️⃣ Package.json: Add to contributes.commands array
4️⃣ Reload: Developer: Reload Window

🤖 Future: Cipher will do this automatically!`,
        { modal: true }
    );
}

// =============================================================================
// 🚀 FUTURE EVOLUTION HOOKS
// =============================================================================

/**
 * 🤖 Future: Auto-register handler in extension.ts
 * This would modify the extension.ts file automatically
 */
export async function autoRegisterHandler(handlerName: string): Promise<void> {
    // TODO: Implement AST modification of extension.ts
    // - Parse extension.ts with ts-morph
    // - Add import statement
    // - Add command registration
    // - Save file
    // - Trigger reload
    console.log(`🚀 Future: Auto-register ${handlerName}`);
}

/**
 * 🧠 Future: Let brain analyze missing handlers and create them
 */
export async function detectAndCreateMissingHandlers(): Promise<void> {
    // TODO: Implement brain-powered handler detection
    // - Scan extension.ts for registered commands
    // - Check handlers folder for missing files
    // - Use brain to generate missing handlers
    // - Auto-register new handlers
    console.log('🧠 Future: Brain-powered handler detection');
}

/**
 * 🔄 Future: Self-evolution cycle
 */
export async function evolveHandlerSystem(): Promise<void> {
    // TODO: Implement self-evolution
    // - Analyze usage patterns
    // - Identify gaps in functionality
    // - Generate new handlers based on needs
    // - Self-register and reload
    console.log('🔄 Future: Handler system evolution');
}