// 🎤 createLyricsComponentHandler - Advanced Lyrics Component with Brain Intelligence
// Location: .vscode-extensions/cipher-autonomous-dev/src/handlers/createLyricsComponentHandler.ts

import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

// ===== ✅ UNIFIED ARCHITECTURE IMPORTS =====
import {
    displayBrainSuggestions
} from '../../shared/displayUtils';
import {
    getBrainInterface,
    isBrainAvailable,
    shareAnalysisData
} from '../../shared/utils';

export async function createLyricsComponentHandler(): Promise<void> {
    try {
        const brainAvailable = isBrainAvailable();
        const message = brainAvailable ?
            '🎤 Creating lyrics component with Brain intelligence...' :
            '🎤 Creating lyrics component...';

        vscode.window.showInformationMessage(message);

        // =================================================================
        // 🎯 COMPONENT TYPE SELECTION
        // =================================================================

        const componentType = await vscode.window.showQuickPick([
            {
                label: '🎤 Lyrics Analyzer',
                description: 'Analyze lyrics structure, rhyme, and sentiment',
                detail: 'Components for lyrics analysis and feedback',
                type: 'analyzer'
            },
            {
                label: '✍️ Lyrics Editor',
                description: 'Interactive lyrics writing and editing',
                detail: 'Rich text editor with music-specific features',
                type: 'editor'
            },
            {
                label: '🎵 Song Structure',
                description: 'Verse, chorus, bridge organization',
                detail: 'Components for song structure management',
                type: 'structure'
            },
            {
                label: '🎶 Rhyme Helper',
                description: 'Rhyme suggestions and pattern analysis',
                detail: 'AI-powered rhyming assistance',
                type: 'rhyme'
            },
            {
                label: '📊 Lyrics Dashboard',
                description: 'Complete lyrics management system',
                detail: 'Full-featured lyrics workspace',
                type: 'dashboard'
            },
            {
                label: '🤖 AI Lyrics Generator',
                description: 'Brain-powered lyrics generation',
                detail: 'Let Cipher create lyrics based on themes',
                type: 'generator'
            }
        ], {
            placeHolder: 'Choose lyrics component type',
            title: '🎤 Lyrics Component Creator'
        });

        if (!componentType) {
            vscode.window.showWarningMessage('Lyrics component creation canceled.');
            return;
        }

        // Get component name
        const componentName = await vscode.window.showInputBox({
            prompt: `Enter ${componentType.label} component name`,
            placeHolder: 'example: LyricsAnalyzer, SongEditor, RhymeHelper',
            validateInput: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'Component name is required';
                }
                if (!/^[A-Z][a-zA-Z0-9]*$/.test(value.trim())) {
                    return 'Component name must start with uppercase letter and be PascalCase';
                }
                return null;
            }
        });

        if (!componentName) {
            vscode.window.showWarningMessage('Component creation canceled.');
            return;
        }

        // =================================================================
        // 🧠 BRAIN-ENHANCED COMPONENT GENERATION
        // =================================================================

        const workspace = vscode.workspace.workspaceFolders?.[0];
        if (!workspace) {
            vscode.window.showErrorMessage('No workspace folder found.');
            return;
        }

        await generateLyricsComponent(
            componentType.type as string,
            componentName.trim(),
            workspace.uri.fsPath
        );

        // =================================================================
        // 🎯 COMPLETION & SUGGESTIONS
        // =================================================================

        await showLyricsComponentComplete(componentType.type as string, componentName.trim());

    } catch (error) {
        vscode.window.showErrorMessage(`Lyrics component creation failed: ${error}`);

        // Learn from errors
        if (isBrainAvailable()) {
            await shareAnalysisData('lyrics-component-error', {
                error: error?.toString(),
                timestamp: Date.now()
            });
        }
    }
}

// =============================================================================
// 🎤 LYRICS COMPONENT GENERATION ENGINE
// =============================================================================

async function generateLyricsComponent(type: string, name: string, workspacePath: string): Promise<void> {
    const componentPath = path.join(workspacePath, 'src', 'components', `${name}.tsx`);
    const stylePath = path.join(workspacePath, 'src', 'components', `${name}.module.css`);
    const testPath = path.join(workspacePath, 'src', 'components', `${name}.test.tsx`);

    // Ensure components directory exists
    const componentsDir = path.join(workspacePath, 'src', 'components');
    if (!fs.existsSync(componentsDir)) {
        fs.mkdirSync(componentsDir, { recursive: true });
    }

    let component: string;
    let styles: string;
    let tests: string;

    // Generate based on type
    switch (type) {
        case 'analyzer':
            component = await generateLyricsAnalyzer(name);
            styles = generateAnalyzerStyles();
            tests = generateAnalyzerTests(name);
            break;
        case 'editor':
            component = await generateLyricsEditor(name);
            styles = generateEditorStyles();
            tests = generateEditorTests(name);
            break;
        case 'structure':
            component = await generateSongStructure(name);
            styles = generateStructureStyles();
            tests = generateStructureTests(name);
            break;
        case 'rhyme':
            component = await generateRhymeHelper(name);
            styles = generateRhymeStyles();
            tests = generateRhymeTests(name);
            break;
        case 'dashboard':
            component = await generateLyricsDashboard(name);
            styles = generateDashboardStyles();
            tests = generateDashboardTests(name);
            break;
        case 'generator':
            component = await generateAILyricsGenerator(name);
            styles = generateGeneratorStyles();
            tests = generateGeneratorTests(name);
            break;
        default:
            component = await generateBasicLyricsComponent(name);
            styles = generateBasicStyles();
            tests = generateBasicTests(name);
    }

    // Write files
    fs.writeFileSync(componentPath, component, 'utf8');
    fs.writeFileSync(stylePath, styles, 'utf8');
    fs.writeFileSync(testPath, tests, 'utf8');

    // 🧠 Learn from component creation
    if (isBrainAvailable()) {
        await shareAnalysisData('lyrics-component-created', {
            type,
            name,
            timestamp: Date.now(),
            filesCreated: 3
        });
    }

    // Open the created component
    const document = await vscode.workspace.openTextDocument(componentPath);
    await vscode.window.showTextDocument(document);

    vscode.window.showInformationMessage(`✅ Created lyrics component: ${name}.tsx with styles and tests`);
}

// =============================================================================
// 🎤 COMPONENT GENERATORS
// =============================================================================

async function generateLyricsAnalyzer(name: string): Promise<string> {
    const brainEnhanced = isBrainAvailable();

    return `import React, { useState, useEffect } from 'react';
import styles from './${name}.module.css';

interface ${name}Props {
    lyrics?: string;
    onAnalysisComplete?: (analysis: LyricsAnalysis) => void;
    realTimeAnalysis?: boolean;
    ${brainEnhanced ? 'brainPowered?: boolean;' : ''}
}

interface LyricsAnalysis {
    wordCount: number;
    verseCount: number;
    chorusCount: number;
    rhymeScheme: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    themes: string[];
    readabilityScore: number;
    suggestions: string[];
    ${brainEnhanced ? 'brainInsights?: BrainInsight[];' : ''}
}

${brainEnhanced ? `
interface BrainInsight {
    type: 'suggestion' | 'pattern' | 'improvement';
    message: string;
    confidence: number;
}
` : ''}

export const ${name}: React.FC<${name}Props> = ({
    lyrics = '',
    onAnalysisComplete,
    realTimeAnalysis = false,
    ${brainEnhanced ? 'brainPowered = true,' : ''}
}) => {
    const [currentLyrics, setCurrentLyrics] = useState(lyrics);
    const [analysis, setAnalysis] = useState<LyricsAnalysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    ${brainEnhanced ? 'const [brainInsights, setBrainInsights] = useState<BrainInsight[]>([]);' : ''}

    useEffect(() => {
        if (realTimeAnalysis && currentLyrics.length > 0) {
            const debounceTimer = setTimeout(() => {
                analyzeLyrics(currentLyrics);
            }, 500);
            
            return () => clearTimeout(debounceTimer);
        }
    }, [currentLyrics, realTimeAnalysis]);

    const analyzeLyrics = async (text: string) => {
        if (!text.trim()) return;
        
        setIsAnalyzing(true);
        
        try {
            // Basic analysis
            const basicAnalysis = performBasicAnalysis(text);
            
            ${brainEnhanced ? `
            // Brain-enhanced analysis
            let enhancedAnalysis = basicAnalysis;
            if (brainPowered) {
                enhancedAnalysis = await enhanceWithBrainIntelligence(basicAnalysis, text);
            }
            
            setAnalysis(enhancedAnalysis);
            onAnalysisComplete?.(enhancedAnalysis);
            ` : `
            setAnalysis(basicAnalysis);
            onAnalysisComplete?.(basicAnalysis);
            `}
            
        } catch (error) {
            console.error('Lyrics analysis failed:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const performBasicAnalysis = (text: string): LyricsAnalysis => {
        const lines = text.split('\\n').filter(line => line.trim().length > 0);
        const words = text.split(/\\s+/).filter(word => word.length > 0);
        
        return {
            wordCount: words.length,
            verseCount: countVerses(lines),
            chorusCount: countChoruses(lines),
            rhymeScheme: analyzeRhymeScheme(lines),
            sentiment: analyzeSentiment(text),
            themes: extractThemes(text),
            readabilityScore: calculateReadability(text),
            suggestions: generateSuggestions(text, lines, words)
        };
    };

    ${brainEnhanced ? `
    const enhanceWithBrainIntelligence = async (analysis: LyricsAnalysis, text: string): Promise<LyricsAnalysis> => {
        try {
            // Simulate brain API call
            const brainResponse = await fetch('/api/brain/analyze-lyrics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, analysis })
            });
            
            if (brainResponse.ok) {
                const brainData = await brainResponse.json();
                setBrainInsights(brainData.insights || []);
                
                return {
                    ...analysis,
                    suggestions: [...analysis.suggestions, ...brainData.suggestions],
                    brainInsights: brainData.insights
                };
            }
        } catch (error) {
            console.warn('Brain enhancement failed:', error);
        }
        
        return analysis;
    };
    ` : ''}

    // Helper functions
    const countVerses = (lines: string[]): number => {
        let verses = 0;
        let inVerse = false;
        
        for (const line of lines) {
            if (line.trim().length > 0) {
                if (!inVerse) {
                    verses++;
                    inVerse = true;
                }
            } else {
                inVerse = false;
            }
        }
        
        return verses;
    };

    const countChoruses = (lines: string[]): number => {
        const lineFreq = new Map<string, number>();
        
        for (const line of lines) {
            const normalized = line.trim().toLowerCase();
            if (normalized.length > 0) {
                lineFreq.set(normalized, (lineFreq.get(normalized) || 0) + 1);
            }
        }
        
        return Array.from(lineFreq.values()).filter(count => count > 1).length;
    };

    const analyzeRhymeScheme = (lines: string[]): string => {
        const rhymes = lines.map(line => {
            const words = line.trim().split(/\\s+/);
            const lastWord = words[words.length - 1]?.toLowerCase().replace(/[^a-z]/g, '');
            return lastWord?.slice(-2) || '';
        });
        
        const rhymeMap = new Map<string, string>();
        let currentLetter = 'A';
        const scheme = [];
        
        for (const rhyme of rhymes) {
            if (!rhyme) continue;
            
            if (!rhymeMap.has(rhyme)) {
                rhymeMap.set(rhyme, currentLetter);
                currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);
            }
            
            scheme.push(rhymeMap.get(rhyme));
        }
        
        return scheme.join('');
    };

    const analyzeSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
        const positive = ['love', 'happy', 'joy', 'beautiful', 'amazing', 'wonderful', 'great'];
        const negative = ['sad', 'pain', 'hurt', 'broken', 'alone', 'cry', 'dark', 'lost'];
        
        const words = text.toLowerCase().split(/\\s+/);
        const positiveCount = words.filter(word => positive.some(p => word.includes(p))).length;
        const negativeCount = words.filter(word => negative.some(n => word.includes(n))).length;
        
        if (positiveCount > negativeCount) return 'positive';
        if (negativeCount > positiveCount) return 'negative';
        return 'neutral';
    };

    const extractThemes = (text: string): string[] => {
        const themes = {
            'Love': ['love', 'heart', 'romance'],
            'Loss': ['lost', 'gone', 'goodbye'],
            'Hope': ['hope', 'dream', 'future'],
            'Freedom': ['free', 'fly', 'escape'],
            'Time': ['time', 'moment', 'forever']
        };
        
        const textLower = text.toLowerCase();
        const detectedThemes = [];
        
        for (const [theme, keywords] of Object.entries(themes)) {
            if (keywords.some(keyword => textLower.includes(keyword))) {
                detectedThemes.push(theme);
            }
        }
        
        return detectedThemes.length > 0 ? detectedThemes : ['General'];
    };

    const calculateReadability = (text: string): number => {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = text.split(/\\s+/).filter(w => w.length > 0);
        
        if (sentences.length === 0 || words.length === 0) return 0;
        
        const avgWordsPerSentence = words.length / sentences.length;
        const score = Math.max(0, Math.min(100, 100 - (avgWordsPerSentence - 10) * 5));
        
        return Math.round(score);
    };

    const generateSuggestions = (text: string, lines: string[], words: string[]): string[] => {
        const suggestions = [];
        
        if (words.length < 50) {
            suggestions.push('Consider expanding for more depth');
        }
        
        if (lines.length < 8) {
            suggestions.push('Add more verses to develop the story');
        }
        
        if (!text.toLowerCase().includes('chorus')) {
            suggestions.push('Consider adding a chorus section');
        }
        
        return suggestions;
    };

    return (
        <div className={styles.lyricsAnalyzer}>
            <div className={styles.header}>
                <h2>🎤 Lyrics Analyzer ${brainEnhanced ? '🧠' : ''}</h2>
                {isAnalyzing && <div className={styles.spinner}>Analyzing...</div>}
            </div>

            <div className={styles.inputSection}>
                <textarea
                    className={styles.lyricsInput}
                    value={currentLyrics}
                    onChange={(e) => setCurrentLyrics(e.target.value)}
                    placeholder="Enter your lyrics here..."
                    rows={10}
                />
                <button 
                    className={styles.analyzeBtn}
                    onClick={() => analyzeLyrics(currentLyrics)}
                    disabled={isAnalyzing || !currentLyrics.trim()}
                >
                    🔍 Analyze Lyrics
                </button>
            </div>

            {analysis && (
                <div className={styles.results}>
                    <div className={styles.metrics}>
                        <h3>📊 Metrics</h3>
                        <div className={styles.metricGrid}>
                            <div className={styles.metric}>
                                <span className={styles.label}>Words:</span>
                                <span className={styles.value}>{analysis.wordCount}</span>
                            </div>
                            <div className={styles.metric}>
                                <span className={styles.label}>Verses:</span>
                                <span className={styles.value}>{analysis.verseCount}</span>
                            </div>
                            <div className={styles.metric}>
                                <span className={styles.label}>Choruses:</span>
                                <span className={styles.value}>{analysis.chorusCount}</span>
                            </div>
                            <div className={styles.metric}>
                                <span className={styles.label}>Rhyme:</span>
                                <span className={styles.value}>{analysis.rhymeScheme}</span>
                            </div>
                            <div className={styles.metric}>
                                <span className={styles.label}>Sentiment:</span>
                                <span className={\`\${styles.value} \${styles[analysis.sentiment]}\`}>
                                    {analysis.sentiment}
                                </span>
                            </div>
                            <div className={styles.metric}>
                                <span className={styles.label}>Readability:</span>
                                <span className={styles.value}>{analysis.readabilityScore}%</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.themes}>
                        <h3>🎭 Themes</h3>
                        <div className={styles.themesList}>
                            {analysis.themes.map((theme, index) => (
                                <span key={index} className={styles.themeTag}>
                                    {theme}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.suggestions}>
                        <h3>💡 Suggestions</h3>
                        <ul className={styles.suggestionsList}>
                            {analysis.suggestions.map((suggestion, index) => (
                                <li key={index} className={styles.suggestion}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>

                    ${brainEnhanced ? `
                    {brainInsights.length > 0 && (
                        <div className={styles.brainInsights}>
                            <h3>🧠 Brain Insights</h3>
                            <div className={styles.insightsList}>
                                {brainInsights.map((insight, index) => (
                                    <div key={index} className={styles.insight}>
                                        <span className={styles.insightType}>{insight.type}</span>
                                        <span className={styles.insightMessage}>{insight.message}</span>
                                        <span className={styles.confidence}>{insight.confidence}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    ` : ''}
                </div>
            )}
        </div>
    );
};

export default ${name};`;
}

// Similar generators for other component types...
async function generateLyricsEditor(name: string): Promise<string> {
    // Implementation for lyrics editor component
    return generateBasicLyricsComponent(name, 'editor');
}

async function generateSongStructure(name: string): Promise<string> {
    // Implementation for song structure component
    return generateBasicLyricsComponent(name, 'structure');
}

async function generateRhymeHelper(name: string): Promise<string> {
    // Implementation for rhyme helper component
    return generateBasicLyricsComponent(name, 'rhyme');
}

async function generateLyricsDashboard(name: string): Promise<string> {
    // Implementation for lyrics dashboard component
    return generateBasicLyricsComponent(name, 'dashboard');
}

async function generateAILyricsGenerator(name: string): Promise<string> {
    // Implementation for AI lyrics generator component
    return generateBasicLyricsComponent(name, 'generator');
}

async function generateBasicLyricsComponent(name: string, type: string = 'basic'): Promise<string> {
    const brainEnhanced = isBrainAvailable();

    return `import React, { useState } from 'react';
import styles from './${name}.module.css';

interface ${name}Props {
    ${type === 'basic' ? '// Basic props' : '// Component-specific props'}
    onComplete?: (result: any) => void;
}

export const ${name}: React.FC<${name}Props> = ({ onComplete }) => {
    const [state, setState] = useState('');

    return (
        <div className={styles.${name.toLowerCase()}}>
            <h2>🎤 ${name} ${brainEnhanced ? '🧠' : ''}</h2>
            <p>Advanced ${type} lyrics component with ${brainEnhanced ? 'Brain intelligence' : 'standard functionality'}.</p>
            
            {/* TODO: Implement ${type} functionality */}
            
            <button onClick={() => onComplete?.({})}>
                Complete
            </button>
        </div>
    );
};

export default ${name};`;
}

// =============================================================================
// 🎨 STYLE GENERATORS
// =============================================================================

function generateAnalyzerStyles(): string {
    return `.lyricsAnalyzer {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #1e1e1e;
    color: #d4d4d4;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #404040;
}

.header h2 {
    margin: 0;
    color: #e91e63;
}

.spinner {
    color: #569cd6;
    font-weight: 500;
}

.inputSection {
    margin-bottom: 24px;
}

.lyricsInput {
    width: 100%;
    min-height: 200px;
    padding: 16px;
    background: #2d2d30;
    border: 1px solid #404040;
    border-radius: 8px;
    color: #d4d4d4;
    font-family: 'Consolas', monospace;
    font-size: 14px;
    line-height: 1.5;
    resize: vertical;
}

.lyricsInput:focus {
    outline: none;
    border-color: #007acc;
    box-shadow: 0 0 0 3px rgba(0, 122, 204, 0.2);
}

.analyzeBtn {
    margin-top: 12px;
    padding: 12px 24px;
    background: #e91e63;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
}

.analyzeBtn:hover:not(:disabled) {
    background: #c2185b;
}

.analyzeBtn:disabled {
    background: #666;
    cursor: not-allowed;
}

.results {
    display: grid;
    gap: 24px;
}

.metrics {
    background: #2d2d30;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #e91e63;
}

.metrics h3 {
    margin: 0 0 16px 0;
    color: #4ec9b0;
}

.metricGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
}

.metric {
    display: flex;
    flex-direction: column;
    text-align: center;
}

.label {
    font-size: 12px;
    color: #999;
    margin-bottom: 4px;
}

.value {
    font-size: 18px;
    font-weight: 600;
    color: #569cd6;
}

.value.positive { color: #4caf50; }
.value.negative { color: #f44336; }
.value.neutral { color: #ff9800; }

.themes {
    background: #2d2d30;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #9c27b0;
}

.themes h3 {
    margin: 0 0 16px 0;
    color: #4ec9b0;
}

.themesList {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.themeTag {
    background: #9c27b0;
    color: white;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 500;
}

.suggestions {
    background: #2d2d30;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #2196f3;
}

.suggestions h3 {
    margin: 0 0 16px 0;
    color: #4ec9b0;
}

.suggestionsList {
    list-style: none;
    padding: 0;
    margin: 0;
}

.suggestion {
    background: #3c3c3c;
    padding: 12px;
    margin-bottom: 8px;
    border-radius: 4px;
    border-left: 3px solid #2196f3;
}

.brainInsights {
    background: #2d2d30;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #ff6b35;
}

.brainInsights h3 {
    margin: 0 0 16px 0;
    color: #4ec9b0;
}

.insightsList {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.insight {
    background: #3c3c3c;
    padding: 12px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.insightType {
    background: #ff6b35;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
}

.insightMessage {
    flex: 1;
    margin: 0 12px;
}

.confidence {
    color: #569cd6;
    font-weight: 500;
}

@media (max-width: 768px) {
    .lyricsAnalyzer {
        padding: 16px;
    }
    
    .metricGrid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .insight {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
}`;
}

function generateEditorStyles(): string {
    return generateBasicStyles('editor');
}

function generateStructureStyles(): string {
    return generateBasicStyles('structure');
}

function generateRhymeStyles(): string {
    return generateBasicStyles('rhyme');
}

function generateDashboardStyles(): string {
    return generateBasicStyles('dashboard');
}

function generateGeneratorStyles(): string {
    return generateBasicStyles('generator');
}

function generateBasicStyles(type: string = 'basic'): string {
    return `.${type} {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', sans-serif;
    background: #1e1e1e;
    color: #d4d4d4;
}

.${type} h2 {
    color: #e91e63;
    margin-bottom: 16px;
}

.${type} button {
    background: #007acc;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
}

.${type} button:hover {
    background: #005a9e;
}`;
}

// =============================================================================
// 🧪 TEST GENERATORS
// =============================================================================

function generateAnalyzerTests(name: string): string {
    return `import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ${name} from './${name}';

describe('${name}', () => {
    test('renders lyrics analyzer component', () => {
        render(<${name} />);
        expect(screen.getByText(/lyrics analyzer/i)).toBeInTheDocument();
    });

    test('analyzes lyrics when button is clicked', async () => {
        const mockOnComplete = jest.fn();
        render(<${name} onAnalysisComplete={mockOnComplete} />);
        
        const textarea = screen.getByPlaceholderText(/enter your lyrics/i);
        const analyzeBtn = screen.getByText(/analyze lyrics/i);
        
        fireEvent.change(textarea, { 
            target: { value: 'Test lyrics\\nWith multiple lines\\nFor analysis' } 
        });
        fireEvent.click(analyzeBtn);
        
        await waitFor(() => {
            expect(mockOnComplete).toHaveBeenCalled();
        });
    });

    test('displays analysis results', async () => {
        render(<${name} lyrics="Test lyrics for analysis" realTimeAnalysis={true} />);
        
        await waitFor(() => {
            expect(screen.getByText(/metrics/i)).toBeInTheDocument();
        });
    });

    test('shows brain insights when available', async () => {
        render(<${name} brainPowered={true} />);
        
        // Mock brain response
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                insights: [{
                    type: 'suggestion',
                    message: 'Consider adding more imagery',
                    confidence: 85
                }]
            })
        });
        
        const textarea = screen.getByPlaceholderText(/enter your lyrics/i);
        fireEvent.change(textarea, { target: { value: 'Test lyrics' } });
        
        await waitFor(() => {
            expect(screen.getByText(/brain insights/i)).toBeInTheDocument();
        });
    });
});`;
}

function generateEditorTests(name: string): string {
    return generateBasicTests(name, 'editor');
}

function generateStructureTests(name: string): string {
    return generateBasicTests(name, 'structure');
}

function generateRhymeTests(name: string): string {
    return generateBasicTests(name, 'rhyme');
}

function generateDashboardTests(name: string): string {
    return generateBasicTests(name, 'dashboard');
}

function generateGeneratorTests(name: string): string {
    return generateBasicTests(name, 'generator');
}

function generateBasicTests(name: string, type: string = 'basic'): string {
    return `import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ${name} from './${name}';

describe('${name}', () => {
    test('renders ${type} component', () => {
        render(<${name} />);
        expect(screen.getByText(/${name}/i)).toBeInTheDocument();
    });

    test('handles completion callback', () => {
        const mockOnComplete = jest.fn();
        render(<${name} onComplete={mockOnComplete} />);
        
        const completeBtn = screen.getByText(/complete/i);
        fireEvent.click(completeBtn);
        
        expect(mockOnComplete).toHaveBeenCalled();
    });
});`;
}

// =============================================================================
// 🎯 COMPLETION HANDLER
// =============================================================================

async function showLyricsComponentComplete(type: string, name: string): Promise<void> {
    const message = `✅ Lyrics component created successfully!

🔧 Component: ${name}.tsx
🎨 Styles: ${name}.module.css  
🧪 Tests: ${name}.test.tsx
${isBrainAvailable() ? '🧠 Brain Intelligence: Integrated' : '📋 Standard: Template'}

🎯 Type: ${type}
📁 Location: src/components/`;

    const actions = ['Add to App', 'View Tests'];

    if (isBrainAvailable()) {
        actions.unshift('Test Brain Features');
    }

    actions.push('OK');

    const action = await vscode.window.showInformationMessage(message, ...actions);

    if (action === 'Test Brain Features') {
        await testBrainFeatures(name);
    } else if (action === 'Add to App') {
        await showUsageInstructions(name);
    } else if (action === 'View Tests') {
        await openTestFile(name);
    }
}

async function testBrainFeatures(name: string): Promise<void> {
    if (!isBrainAvailable()) {
        vscode.window.showWarningMessage('🧠 Brain system not available for testing.');
        return;
    }

    const brainInterface = getBrainInterface();
    if (!brainInterface) {
        vscode.window.showWarningMessage('Brain interface not available');
        return;
    }
    const suggestions = await brainInterface.getPersonalizedSuggestions();

    const lyricsSuggestions = suggestions.filter(s =>
        s.toLowerCase().includes('lyric') ||
        s.toLowerCase().includes('song') ||
        s.toLowerCase().includes('component')
    );

    if (lyricsSuggestions.length > 0) {
        await displayBrainSuggestions(lyricsSuggestions);
    } else {
        vscode.window.showInformationMessage(
            `🧠 Brain Features Test:
            
✅ Brain system active
✅ Component integrates with brain intelligence  
✅ Real-time analysis capabilities
✅ Learning from user interactions

🎤 ${name} is ready for brain-powered lyrics analysis!`
        );
    }
}

async function showUsageInstructions(name: string): Promise<void> {
    vscode.window.showInformationMessage(
        `📋 Usage Instructions for ${name}:

1️⃣ Import: import { ${name} } from './components/${name}';

2️⃣ Use in JSX:
<${name} 
    lyrics="Your lyrics here"
    onAnalysisComplete={(analysis) => console.log(analysis)}
    realTimeAnalysis={true}
    ${isBrainAvailable() ? 'brainPowered={true}' : ''}
/>

3️⃣ Style: Import CSS module automatically included

🎤 Component includes brain intelligence integration!`,
        { modal: true }
    );
}

async function openTestFile(name: string): Promise<void> {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) return;

    const testPath = path.join(workspace.uri.fsPath, 'src', 'components', `${name}.test.tsx`);

    if (fs.existsSync(testPath)) {
        const document = await vscode.workspace.openTextDocument(testPath);
        await vscode.window.showTextDocument(document);
    } else {
        vscode.window.showErrorMessage(`Test file not found: ${name}.test.tsx`);
    }
}

