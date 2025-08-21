import * as path from 'path';
import * as vscode from 'vscode';
import { displayGuitarAnalysis, displayVocalAnalysis } from '../../shared/displayUtils';
import { generateTestContent } from '../../shared/templateGenerators';
import { analyzeFileQuality, ensureDirectoryExists, getBrainInterface } from '../../shared/utils';

export async function generateTestsHandler(): Promise<void> {
    try {
        const brainInterface = getBrainInterface();
        const editor = vscode.window.activeTextEditor;
        
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
            return;
        }

        if (!brainInterface) {
            vscode.window.showErrorMessage('🧠 Brain interface not available');
            return;
        }

        const fileName = path.basename(editor.document.fileName).replace(/\.(tsx?|jsx?)$/, '') || 'Component';

        // 🧠 Enhanced parallel analysis
        const [fileAnalysis, brainSuggestions, musicContext] = await Promise.all([
            analyzeFileQuality(editor),
            brainInterface.analyzeComponentForTesting?.(editor.document.getText()) || getDefaultTestSuggestions(),
            brainInterface.getMusicContext?.(fileName) || getDefaultMusicContext(fileName)
        ]);

        const isGuitarComponent = musicContext.type === 'guitar' || fileName.toLowerCase().includes('guitar');
        const isVocalComponent = musicContext.type === 'vocal' || fileName.toLowerCase().includes('vocal');

        // Enhanced test type selection with brain recommendations
        const testType = await vscode.window.showQuickPick([
            { 
                label: '🧪 Unit Tests', 
                value: 'unit',
                description: `Brain confidence: ${brainSuggestions.unitTestConfidence || 85}%`,
                detail: isGuitarComponent ? '🎸 Guitar-optimized tests' : isVocalComponent ? '🎤 Vocal-optimized tests' : 'Standard unit tests'
            },
            { 
                label: '🔄 Integration Tests', 
                value: 'integration',
                description: `Brain confidence: ${brainSuggestions.integrationTestConfidence || 70}%`,
                detail: 'Component interaction testing'
            },
            { 
                label: '📱 E2E Tests', 
                value: 'e2e',
                description: 'End-to-end user journey testing',
                detail: 'Full application flow testing'
            },
            { 
                label: '🎯 Brain-Optimized All Tests', 
                value: 'all',
                description: `🧠 Recommended for maximum coverage`,
                detail: 'Complete test suite with brain optimizations'
            },
            {
                label: '🎵 Music-Specific Tests',
                value: 'music',
                description: `${isGuitarComponent ? '🎸 Guitar' : isVocalComponent ? '🎤 Vocal' : '🎵 Audio'} component testing`,
                detail: 'Specialized tests for music functionality'
            }
        ], { 
            placeHolder: 'Select test type - Brain recommendations included'
        });

        if (!testType) return;

        // 🧠 Generate enhanced test content
        const testContext = {
            fileAnalysis,
            brainSuggestions,
            isGuitar: isGuitarComponent,
            isVocal: isVocalComponent,
            musicContext,
            fileName,
            testType: testType.value,
            timestamp: new Date().toISOString()
        };

        const testContent = await generateTestContent(fileName, testType.value);

        // Create test file
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (workspaceFolder) {
            const testDir = vscode.Uri.joinPath(workspaceFolder.uri, 'tests');
            await ensureDirectoryExists(testDir);

            const testFileName = `${fileName}.brain-${testType.value}.test.tsx`;
            const testFile = vscode.Uri.joinPath(testDir, testFileName);
            
            await vscode.workspace.fs.writeFile(testFile, Buffer.from(testContent));

            // Open the test file
            const doc = await vscode.workspace.openTextDocument(testFile);
            await vscode.window.showTextDocument(doc);
        }

        // 🧠 Enhanced learning from test generation
        await brainInterface.learnFromAnalysis('test-generation', {
            success: true,
            fileName,
            testType: testType.value,
            isGuitar: isGuitarComponent,
            isVocal: isVocalComponent,
            confidence: brainSuggestions.overallConfidence || 80,
            timestamp: new Date().toISOString()
        });

        // Enhanced success notification
        const action = await vscode.window.showInformationMessage(
            `🧪 ${testType.label} generated for ${fileName}!\n🧠 Brain confidence: ${brainSuggestions.overallConfidence || 80}%\n${isGuitarComponent ? '🎸 Guitar-optimized' : isVocalComponent ? '🎤 Vocal-optimized' : '🎵 Music-aware'} tests created`,
            'Run Tests',
            'Generate More',
            'Music Analysis',
            'OK'
        );
        
        if (action === 'Run Tests') {
            const terminal = vscode.window.createTerminal('Cipher Tests');
            terminal.sendText(`npm test ${fileName}`);
            terminal.show();
        } else if (action === 'Generate More') {
            await generateTestsHandler(); // Recursive call for more tests
        } else if (action === 'Music Analysis') {
            if (isGuitarComponent) {
                const guitarAnalysis = await brainInterface.analyzeGuitar();
                await displayGuitarAnalysis(guitarAnalysis);
            } else if (isVocalComponent) {
                const vocalAnalysis = await brainInterface.analyzeVocal();
                await displayVocalAnalysis(vocalAnalysis);
            }
        }

    } catch (error) {
        const brainInterface = getBrainInterface();
        if (brainInterface) {
            await brainInterface.learnFromAnalysis('test-generation', {
                success: false,
                error: error?.toString(),
                timestamp: new Date().toISOString()
            });
        }
        vscode.window.showErrorMessage(`🧠 Brain test generation failed: ${error}`);
    }
}

// Helper functions
function getDefaultTestSuggestions(): any {
    return {
        unitTestConfidence: 85,
        integrationTestConfidence: 70,
        overallConfidence: 80,
        suggestions: ['Add unit tests', 'Include edge cases', 'Test error handling']
    };
}

function getDefaultMusicContext(fileName: string): any {
    const type = fileName.toLowerCase().includes('guitar') ? 'guitar' :
                 fileName.toLowerCase().includes('vocal') ? 'vocal' : 'general';
    
    return {
        type,
        confidence: 75,
        elements: [],
        suggestions: [`Add ${type}-specific functionality`]
    };
}