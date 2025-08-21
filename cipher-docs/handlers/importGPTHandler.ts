import * as vscode from 'vscode';

import { displayGuitarAnalysis, displayVocalAnalysis } from '../../shared/displayUtils';
import { ensureDirectoryExists, getBrainInterface } from '../../shared/utils';

export async function importGPTHandler(): Promise<void> {
    try {
        const brainInterface = getBrainInterface();
        if (!brainInterface) {
            vscode.window.showErrorMessage('🧠 Brain interface not available');
            return;
        }
        
        const gptText = await vscode.window.showInputBox({
            prompt: 'Paste GPT conversation or specifications',
            placeHolder: 'Paste your GPT conversation here...',
            ignoreFocusOut: true
        });

        if (!gptText?.trim()) {
            return;
        }

        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }

        // 🧠 Enhanced parallel brain analysis of GPT content
        const [brainAnalysis, musicElements, guitarSpecs, vocalSpecs] = await Promise.all([
            brainInterface.analyzeGPTContent?.(gptText) || analyzeGPTContentFallback(gptText),
            brainInterface.extractMusicElements?.(gptText) || extractMusicElementsFallback(gptText),
            brainInterface.extractGuitarSpecs?.(gptText) || extractGuitarSpecsFallback(gptText),
            brainInterface.extractVocalSpecs?.(gptText) || extractVocalSpecsFallback(gptText)
        ]);

        // Enhanced processing and saving with brain enhancement
        const inputDir = vscode.Uri.joinPath(workspaceFolder.uri, 'cipher-gpt-sync', 'input');
        await ensureDirectoryExists(inputDir);

        const timestamp = Date.now();
        const inputFile = vscode.Uri.joinPath(inputDir, `brain-gpt-import-${timestamp}.md`);

        const processedContent = `# 🧠 Brain-Enhanced GPT Import - ${new Date().toLocaleString()}

## 🧠 Brain Analysis Summary:
- **Confidence:** ${brainAnalysis.confidence}%
- **Music Elements Detected:** ${musicElements.length}
- **Guitar Context:** ${guitarSpecs.detected ? '✅ Found' : '❌ None'}
- **Vocal Context:** ${vocalSpecs.detected ? '✅ Found' : '❌ None'}
- **Content Type:** ${brainAnalysis.contentType || 'Mixed'}
- **Complexity:** ${brainAnalysis.complexity || 'Medium'}

## 📄 Original Content:
\`\`\`
${gptText}
\`\`\`

## 🧠 Brain-Extracted Specifications:
${await brainInterface.extractSpecifications?.(gptText) || extractSpecificationsFallback(gptText)}

## 🎵 Music-Specific Elements:
${musicElements.length > 0 
  ? musicElements.map((element: any) => `- **${element.type}:** ${element.description}`).join('\n')
  : '- No music-specific elements detected'}

## 🎸 Guitar Specifications:
${guitarSpecs.detected 
  ? guitarSpecs.specs.map((spec: any) => `- ${spec}`).join('\n') 
  : '- No guitar specifications detected'}

## 🎤 Vocal Specifications:
${vocalSpecs.detected 
  ? vocalSpecs.specs.map((spec: any) => `- ${spec}`).join('\n') 
  : '- No vocal specifications detected'}

## 🧠 Brain-Generated Action Items:
${await brainInterface.generateActionItems?.(gptText) || extractActionItemsFallback(gptText).join('\n')}

## 🎯 Brain Recommendations:
${brainAnalysis.recommendations?.map((rec: string) => `- ${rec}`).join('\n') || '- Continue with current development approach'}

---
*🧠 Brain-Enhanced Import by Cipher GPT Sync*
*Confidence: ${brainAnalysis.confidence}% | Generated: ${new Date().toISOString()}*`;

        await vscode.workspace.fs.writeFile(inputFile, Buffer.from(processedContent));

        // 🧠 Enhanced learning from import action
        await brainInterface.learnFromAnalysis('gpt-import', {
            success: true,
            confidence: brainAnalysis.confidence,
            musicElements: musicElements.length,
            hasGuitar: guitarSpecs.detected,
            hasVocal: vocalSpecs.detected,
            textLength: gptText.length,
            timestamp: new Date().toISOString()
        });

        // Open the imported file
        const doc = await vscode.workspace.openTextDocument(inputFile);
        await vscode.window.showTextDocument(doc);

        // Enhanced success notification with actionable options
        const action = await vscode.window.showInformationMessage(
            `📥 Brain-enhanced GPT import complete!\n🧠 Confidence: ${brainAnalysis.confidence}%\n🎵 Music elements: ${musicElements.length}`,
            'Music Analysis',
            'Generate Components',
            'Create Action Plan',
            'OK'
        );
        
        if (action === 'Music Analysis') {
            if (guitarSpecs.detected) {
                const guitarAnalysis = await brainInterface.analyzeGuitar();
                await displayGuitarAnalysis(guitarAnalysis);
            }
            if (vocalSpecs.detected) {
                const vocalAnalysis = await brainInterface.analyzeVocal();
                await displayVocalAnalysis(vocalAnalysis);
            }
        } else if (action === 'Generate Components') {
            vscode.window.showInformationMessage('🏗️ Component generation feature coming soon!');
        } else if (action === 'Create Action Plan') {
            vscode.window.showInformationMessage('📋 Action plan feature coming soon!');
        }
        
    } catch (error) {
        const brainInterface = getBrainInterface();
        if (brainInterface) {
            await brainInterface.learnFromAnalysis('gpt-import', {
                success: false,
                error: error?.toString(),
                timestamp: new Date().toISOString()
            });
        }
        vscode.window.showErrorMessage(`🧠 Brain import failed: ${error}`);
    }
}

// Fallback analysis functions
function analyzeGPTContentFallback(text: string): any {
    const confidence = Math.min(90, Math.max(60, 100 - (text.length / 10000) * 10));
    const hasCode = text.includes('function') || text.includes('const') || text.includes('class');
    const hasMusic = text.toLowerCase().includes('music') || text.toLowerCase().includes('guitar') || text.toLowerCase().includes('vocal');
    
    return {
        confidence: Math.round(confidence),
        contentType: hasCode ? 'code' : hasMusic ? 'music' : 'general',
        complexity: text.length > 5000 ? 'high' : text.length > 1000 ? 'medium' : 'low',
        recommendations: [
            'Review extracted specifications',
            'Validate action items',
            hasMusic ? 'Focus on music-specific implementations' : 'Consider UI/UX improvements'
        ]
    };
}

function extractMusicElementsFallback(text: string): any[] {
    const musicKeywords = {
        guitar: ['guitar', 'chord', 'fret', 'string', 'pick', 'strum', 'tab'],
        vocal: ['vocal', 'voice', 'sing', 'pitch', 'harmony', 'melody', 'breath'],
        audio: ['audio', 'sound', 'music', 'frequency', 'volume', 'recording']
    };
    
    const elements: any[] = [];
    const lowerText = text.toLowerCase();
    
    Object.entries(musicKeywords).forEach(([category, keywords]) => {
        keywords.forEach(keyword => {
            if (lowerText.includes(keyword)) {
                elements.push({
                    type: category,
                    keyword: keyword,
                    description: `${keyword} functionality mentioned in GPT content`
                });
            }
        });
    });
    
    return elements;
}

function extractGuitarSpecsFallback(text: string): any {
    const guitarKeywords = ['guitar', 'chord', 'fret', 'string', 'tuning', 'tab', 'pick'];
    const lowerText = text.toLowerCase();
    
    const detected = guitarKeywords.some(keyword => lowerText.includes(keyword));
    const specs: string[] = [];
    
    if (detected) {
        if (lowerText.includes('chord')) specs.push('Chord progression functionality');
        if (lowerText.includes('tuning')) specs.push('Guitar tuning feature');
        if (lowerText.includes('tab')) specs.push('Tablature display and editing');
        if (lowerText.includes('fret')) specs.push('Fretboard visualization');
    }
    
    return { detected, specs };
}

function extractVocalSpecsFallback(text: string): any {
    const vocalKeywords = ['vocal', 'voice', 'sing', 'pitch', 'harmony', 'melody', 'breath'];
    const lowerText = text.toLowerCase();
    
    const detected = vocalKeywords.some(keyword => lowerText.includes(keyword));
    const specs: string[] = [];
    
    if (detected) {
        if (lowerText.includes('pitch')) specs.push('Pitch detection and analysis');
        if (lowerText.includes('harmony')) specs.push('Harmony training exercises');
        if (lowerText.includes('breath')) specs.push('Breathing technique guidance');
        if (lowerText.includes('melody')) specs.push('Melody composition tools');
    }
    
    return { detected, specs };
}

function extractSpecificationsFallback(text: string): string {
    const specKeywords = ['requirement', 'feature', 'functionality', 'should', 'must', 'need'];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 15);
    const specs: string[] = [];
    
    sentences.forEach(sentence => {
        const lowerSentence = sentence.toLowerCase();
        if (specKeywords.some(keyword => lowerSentence.includes(keyword))) {
            specs.push(`- ${sentence.trim()}`);
        }
    });
    
    if (specs.length === 0) {
        return '- No specific specifications detected in the content\n- Manual review recommended';
    }
    
    return specs.join('\n');
}

function extractActionItemsFallback(text: string): string[] {
    const actionKeywords = [
        'implement', 'create', 'build', 'add', 'develop', 'design',
        'fix', 'update', 'improve', 'optimize', 'test', 'deploy'
    ];
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const actionItems: string[] = [];
    
    sentences.forEach(sentence => {
        const lowerSentence = sentence.toLowerCase();
        if (actionKeywords.some(keyword => lowerSentence.includes(keyword))) {
            actionItems.push(`- ${sentence.trim()}`);
        }
    });
    
    // Add default action items if none found
    if (actionItems.length === 0) {
        actionItems.push(
            '- Review and analyze the imported content',
            '- Identify key requirements and specifications',
            '- Plan implementation approach',
            '- Begin development of core features'
        );
    }
    
    return actionItems;
}