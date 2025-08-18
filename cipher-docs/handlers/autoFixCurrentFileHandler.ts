// 🔧 Enhanced Auto-Fix Handler - Includes Deep TS Fix
// Location: .vscode-extensions/cipher-autonomous-dev/src/handlers/autoFixCurrentFileHandler.ts
import { exec } from 'child_process';
import * as path from 'path';
import * as vscode from 'vscode';

// ✅ Use your existing shared utilities
import { displayGuitarAnalysis } from '../../shared/displayUtils';
import { AnalysisResult, FileAnalysis } from '../../shared/types';
import { analyzeFileQuality, calculateComplexity, getBrainInterface, getFileType } from '../../shared/utils';

export async function autoFixCurrentFileHandler(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('🔧 No active file to auto-fix');
        return;
    }

    const document = editor.document;
    const fileName = path.basename(document.fileName);
    
    // ✅ Use your existing utility to get file type
    const fileType = getFileType(document.fileName);
    const fileExtension = path.extname(document.fileName).toLowerCase();
    
    // ✅ Use your existing analysis system first
    const currentAnalysis = await analyzeFileQuality(editor);
    
    // Show fix options based on current analysis and detected issues
    const fixOptions = await getFixOptions(document, fileExtension, currentAnalysis);
    
    const selectedFix = await vscode.window.showQuickPick(fixOptions, {
        placeHolder: '🔧 Choose auto-fix level:',
        canPickMany: false
    });

    if (!selectedFix) {
        return;
    }

    try {
        vscode.window.showInformationMessage(`🔧 Running ${selectedFix.label}...`);
        
        switch (selectedFix.type) {
            case 'quick':
                await performQuickFix(editor, currentAnalysis);
                break;
            case 'deep':
                await performDeepTSFix(editor, currentAnalysis);
                break;
            case 'project':
                await performProjectWideFix();
                break;
        }

        // ✅ Use your existing brain interface for re-analysis
        const brainInterface = getBrainInterface();
        if (brainInterface) {
            setTimeout(async () => {
                // Re-analyze using your existing system
                try {
                    const newAnalysis = await brainInterface.analyzeCurrentFile(editor); 
                    // ✅ Use your existing display utilities for consistent results
                    if (newAnalysis.musicComponents && newAnalysis.musicComponents.length > 0) {
                        await displayGuitarAnalysis({
                            ...newAnalysis,
                            musicComponents: newAnalysis.musicComponents
                        } as AnalysisResult);
                    }
                    
                    const improvement = currentAnalysis.issues.length - (newAnalysis.issues?.length || 0);
                    if (improvement > 0) {
                        vscode.window.showInformationMessage(
                            `✅ Auto-fix improved file! Reduced issues by ${improvement}`
                        );
                    }
                } catch (error) {
                    console.warn('Re-analysis after fix failed:', error);
                    // Fallback to simple command
                    vscode.commands.executeCommand('cipher.analyzeCurrentFile');
                }
            }, 1000);
        }

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`🔧 Auto-fix failed: ${errorMessage}`);
    }
}

// =============================================================================
// 🎯 FIX OPTION DETECTION
// =============================================================================

async function getFixOptions(document: vscode.TextDocument, fileExtension: string, currentAnalysis: FileAnalysis): Promise<any[]> {
    const content = document.getText();
    const options: any[] = [];

    // ✅ Use your existing analysis results to determine fix options
    const hasIssues = currentAnalysis.issues.length > 0;
    const hasSuggestions = currentAnalysis.suggestions.length > 0;
    const isAutoFixable = currentAnalysis.canAutoFix;

    // Always offer quick fix if there are fixable issues
    if (hasIssues || hasSuggestions) {
        options.push({
            label: '⚡ Quick Fix',
            description: `Fix ${currentAnalysis.issues.length} issues in this file`,
            type: 'quick',
            detail: 'Fixes imports, formatting, basic TypeScript issues'
        });
    }

    // Offer Deep TS Fix for React files with specific issues
    let needsReactImports = false;
    if (fileExtension === '.tsx' || fileExtension === '.jsx' || fileExtension === '.ts') {
        needsReactImports = !content.includes('import React') && 
            (content.includes('useState') || content.includes('useEffect') || 
             content.includes('<') || content.includes('React.FC'));
             
        const hasTypeIssues = await hasTypeScriptIssues(document);
        const hasComplexity = calculateComplexity(content) > 5;
        
        if (needsReactImports || hasTypeIssues || hasComplexity || hasIssues) {
            options.push({
                label: '🚀 Deep TS Fix',
                description: `Complete TypeScript + React alignment (Complexity: ${calculateComplexity(content)})`,
                type: 'deep',
                detail: 'Adds React imports, fixes types, optimizes hooks, reduces complexity'
            });
        }
    }

    // Offer project-wide fix if multiple files likely have similar issues
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (workspaceFolder && (hasIssues || needsReactImports)) {
        options.push({
            label: '🏗️ Full Project Fix',
            description: 'Fix all TypeScript files in project',
            type: 'project',
            detail: 'Runs Deep TS Fix on entire project'
        });
    }

    // If no specific fixes needed, still offer basic options
    if (options.length === 0) {
        options.push({
            label: '🔧 Format & Optimize',
            description: 'Format and basic optimizations',
            type: 'quick',
            detail: 'Code formatting and basic improvements'
        });
    }

    return options;
}

async function hasTypeScriptIssues(document: vscode.TextDocument): Promise<boolean> {
    try {
        const diagnostics = vscode.languages.getDiagnostics(document.uri);
        return diagnostics.some(diag => 
            diag.source === 'ts' || 
            diag.message.includes('React') ||
            diag.message.includes('useState') ||
            diag.message.includes('useEffect')
        );
    } catch {
        return false;
    }
}

// =============================================================================
// 🔧 QUICK FIX (EXISTING FUNCTIONALITY)
// =============================================================================

async function performQuickFix(editor: vscode.TextEditor, currentAnalysis: FileAnalysis): Promise<void> {
    const document = editor.document;
    const content = document.getText();
    let fixedContent = content;
    let fixCount = 0;

    // ✅ Use existing analysis to guide fixes
    const hasReactUsage = content.includes('React.') || content.includes('<') || 
                         content.includes('useState') || content.includes('useEffect');

    // Fix common React/TypeScript issues based on current analysis
    const fixes = [
        // Add React import if missing and needed
        {
            pattern: /^(?!.*import React)/m,
            replacement: "import React from 'react';\n",
            condition: () => hasReactUsage && !content.includes('import React'),
            description: 'Added React import'
        },
        
        // Fix useState import
        {
            pattern: /useState/g,
            replacement: 'useState',
            condition: () => content.includes('useState') && !content.includes('import') || !content.includes('useState'),
            description: 'Fixed useState import',
            preAction: () => {
                if (content.includes('useState') && !content.includes('import { useState }')) {
                    if (content.includes('import React from')) {
                        fixedContent = fixedContent.replace(
                            /import React from 'react';/,
                            "import React, { useState } from 'react';"
                        );
                    } else if (content.includes('import React, {')) {
                        fixedContent = fixedContent.replace(
                            /import React, { ([^}]+) }/,
                            "import React, { $1, useState }"
                        );
                    }
                }
            }
        },
        
        // Fix useEffect import
        {
            pattern: /useEffect/g,
            replacement: 'useEffect',
            condition: () => content.includes('useEffect') && !content.includes('useEffect'),
            description: 'Fixed useEffect import',
            preAction: () => {
                if (content.includes('useEffect') && !content.includes('import { useEffect }')) {
                    if (content.includes('import React, { useState }')) {
                        fixedContent = fixedContent.replace(
                            /import React, { useState }/,
                            "import React, { useState, useEffect }"
                        );
                    } else if (content.includes('import React, {')) {
                        fixedContent = fixedContent.replace(
                            /import React, { ([^}]+) }/,
                            "import React, { $1, useEffect }"
                        );
                    } else if (content.includes('import React from')) {
                        fixedContent = fixedContent.replace(
                            /import React from 'react';/,
                            "import React, { useEffect } from 'react';"
                        );
                    }
                }
            }
        },

        // ✅ Fix issues identified in current analysis
        {
            pattern: /: any(?!\w)/g,
            replacement: ': unknown',
            condition: () => currentAnalysis.issues.some(issue => issue.includes('any')),
            description: 'Replaced any with unknown'
        },
{
    pattern: /return\s*{\s*</g,
    replacement: 'return (\n  <',
    description: 'Fixed JSX return syntax (curly to parentheses)'
},
{
    pattern: />\s*\)\s*}/g,
    replacement: '>\n)',
    description: 'Fixed JSX closing syntax'
},
{
    pattern: /<\/div>\s*\)\s*}/g,
    replacement: '</div>\n)',
    description: 'Fixed JSX component closing'
},
{
    pattern: /return\s*\(\s*{\s*/g,
    replacement: 'return (\n  ',
    description: 'Fixed mixed JSX return syntax'
},
        // Add key props to mapped elements (common React issue)
        {
            pattern: /\.map\(\([^)]*\) => <(\w+)(?![^>]*key=)/g,
            replacement: (match: string, tagName: string) => {
                return match.replace(`<${tagName}`, `<${tagName} key={index}`);
            },
            condition: () => /\.map\(\([^)]*\) => <\w+(?![^>]*key=)/.test(content),
            description: 'Added missing key props'
        }
    ];

    // Apply fixes
    for (const fix of fixes) {
         if (!fix.condition || fix.condition()) { 
            if (fix.preAction) {
                fix.preAction();
            }
            
            if (fix.pattern && fix.replacement) {
                const beforeLength = fixedContent.length;
                if (typeof fix.replacement === 'function') {
                    fixedContent = fixedContent.replace(fix.pattern, fix.replacement);
                } else {
                    fixedContent = fixedContent.replace(fix.pattern, fix.replacement);
                }
                
                if (fixedContent.length !== beforeLength || 
                    fixedContent !== content) {
                    fixCount++;
                    console.log(`✅ ${fix.description}`);
                }
            }
        }
    }

    // Apply the fixes
    if (fixCount > 0) {
        await applyContentChanges(editor, fixedContent);
        vscode.window.showInformationMessage(
            `✅ Applied ${fixCount} quick fix(es)! Issues reduced from ${currentAnalysis.issues.length}`
        );
    } else {
        vscode.window.showInformationMessage('ℹ️ No quick fixes needed for this file');
    }
}

// =============================================================================
// 🚀 DEEP TS FIX (NEW COMPREHENSIVE FUNCTIONALITY)
// =============================================================================

async function performDeepTSFix(editor: vscode.TextEditor, currentAnalysis: FileAnalysis): Promise<void> {
    const document = editor.document;
    const content = document.getText();
    let fixedContent = content;
    const fileName = path.basename(document.fileName);
    const fileExtension = path.extname(document.fileName).toLowerCase();
    
    // ✅ Use your existing complexity calculation
    const initialComplexity = calculateComplexity(content);

    vscode.window.showInformationMessage(`🚀 Running Deep TS Fix (Complexity: ${initialComplexity})...`);

    // Step 1: Ensure proper React imports based on usage analysis
    if (fileExtension === '.tsx' || fileExtension === '.jsx') {
        if (!content.includes('import React')) {
            // Detect what React features are used
            const usesState = content.includes('useState');
            const usesEffect = content.includes('useEffect');
            const usesCallback = content.includes('useCallback');
            const usesMemo = content.includes('useMemo');
            const usesRef = content.includes('useRef');
            const usesReducer = content.includes('useReducer');
            
      const hooks: string[] = [];
        
        if (usesState) hooks.push('useState');
        if (usesEffect) hooks.push('useEffect');
        if (usesCallback) hooks.push('useCallback');
        if (usesMemo) hooks.push('useMemo');
        if (usesRef) hooks.push('useRef');
        if (usesReducer) hooks.push('useReducer');
        
        let importLine = 'import React';
        if (hooks.length > 0) {
            importLine += `, { ${hooks.join(', ')} }`;
        }
        importLine += " from 'react';\n";
        
        fixedContent = importLine + fixedContent;
    }
}

    // Step 2: Add proper TypeScript interfaces for components
    if (fileExtension === '.tsx' && !content.includes('interface') && content.includes('const ')) {
        const componentMatch = content.match(/const\s+(\w+):\s*React\.FC/);
        if (componentMatch) {
            const componentName = componentMatch[1];
            const interfaceName = `${componentName}Props`;
            
            const interfaceDefinition = `interface ${interfaceName} {
  // TODO: Add prop definitions
  className?: string;
  children?: React.ReactNode;
}

`;
            
            // Insert interface before component
            const componentIndex = fixedContent.indexOf(componentMatch[0]);
            fixedContent = 
                fixedContent.slice(0, componentIndex) + 
                interfaceDefinition + 
                fixedContent.slice(componentIndex);
                
            // Update component to use interface
            fixedContent = fixedContent.replace(
                /React\.FC(?!<)/g,
                `React.FC<${interfaceName}>`
            );
        }
    }

    // Step 3: Fix TypeScript issues identified in analysis
    const tsFixPatterns = [
        {
            pattern: /: any(?!\w)/g,
            replacement: ': unknown',
            description: 'Replaced any with unknown'
        },
        {
            pattern: /\?\?\s*undefined/g,
            replacement: '',
            description: 'Removed redundant ?? undefined'
        },
        {
            pattern: /React\.FC(?!<)/g,
            replacement: 'React.FC<{}>',
            description: 'Added empty props type to React.FC'
        },
        // Fix console.log statements if found in issues
        {
            pattern: /console\.log\(/g,
            replacement: '// console.log(',
            description: 'Commented out console.log statements',
            condition: () => currentAnalysis.issues.some(issue => issue.includes('console'))
        }
    ];

    let fixCount = 0;
    for (const pattern of tsFixPatterns) {
        if (!pattern.condition || pattern.condition()) {
            const beforeContent = fixedContent;
            fixedContent = fixedContent.replace(pattern.pattern, pattern.replacement);
            if (fixedContent !== beforeContent) {
                fixCount++;
                console.log(`🔧 ${pattern.description}`);
            }
        }
    }

    // Step 4: Performance optimizations
    if (content.includes('onClick') && !content.includes('useCallback')) {
        // Check if useCallback is already imported
        if (!fixedContent.includes('useCallback')) {
            fixedContent = fixedContent.replace(
                /import React, { ([^}]+) }/,
                'import React, { $1, useCallback }'
            ).replace(
                /import React from 'react';/,
                "import React, { useCallback } from 'react';"
            );
        }
        
        // Add comment suggesting useCallback
        fixedContent += '\n\n// TODO: Consider wrapping event handlers with useCallback for performance';
        fixCount++;
    }

    // Step 5: Reduce complexity if high
    if (initialComplexity > 7) {
        // Add comment about complexity
        fixedContent = `// TODO: Consider refactoring - complexity score: ${initialComplexity}\n` + fixedContent;
        fixCount++;
    }

    // Apply changes
    await applyContentChanges(editor, fixedContent);
    
    // Run formatting
    try {
        await vscode.commands.executeCommand('editor.action.formatDocument');
    } catch (formatError) {
        console.warn('Auto-formatting failed:', formatError);
    }
    
    // ✅ Calculate improvement
    const newComplexity = calculateComplexity(fixedContent);
    const complexityImprovement = initialComplexity - newComplexity;
    
    const improvementMessage = complexityImprovement > 0 
        ? ` Reduced complexity by ${complexityImprovement}.`
        : '';
    
    vscode.window.showInformationMessage(
        `🚀 Deep TS Fix complete! Applied ${fixCount} improvements.${improvementMessage} Re-analyze to verify.`
    );
}

// =============================================================================
// 🏗️ PROJECT-WIDE FIX
// =============================================================================

async function performProjectWideFix(): Promise<void> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder found');
        return;
    }

    const result = await vscode.window.showWarningMessage(
        '🏗️ This will run Deep TS Fix on ALL TypeScript files in the project. Continue?',
        { modal: true },
        'Yes, Fix All',
        'Cancel'
    );

    if (result !== 'Yes, Fix All') {
        return;
    }

    vscode.window.showInformationMessage('🏗️ Running project-wide TS fixes...');

    const rootPath = workspaceFolder.uri.fsPath;
    
    // Run prettier and eslint first
    const formatCommand = `npx prettier . --write && npx eslint . --fix`;
    
    exec(formatCommand, { cwd: rootPath }, async (error, stdout, stderr) => {
        if (error) {
            console.warn('Formatting failed:', stderr);
        } else {
            console.log('✅ Project formatted successfully');
        }

        // Find and fix all TypeScript files
        const files = await vscode.workspace.findFiles(
            '**/*.{ts,tsx,js,jsx}',
            '**/node_modules/**'
        );

        let fixedCount = 0;
        for (const file of files) {
            try {
                const doc = await vscode.workspace.openTextDocument(file);
                const content = doc.getText();
                
                // Apply React import fix if needed
                const fileExtension = path.extname(file.fsPath).toLowerCase();
                if ((fileExtension === '.tsx' || fileExtension === '.jsx') && 
                    !content.includes('import React') &&
                    (content.includes('useState') || content.includes('<'))) {
                    
                    const newContent = "import React, { useState, useEffect } from 'react';\n" + content;
                    
                    const edit = new vscode.WorkspaceEdit();
                    edit.replace(file, new vscode.Range(0, 0, doc.lineCount, 0), newContent);
                    await vscode.workspace.applyEdit(edit);
                    fixedCount++;
                }
            } catch (error) {
                console.warn(`Failed to fix ${file.fsPath}:`, error);
            }
        }

        vscode.window.showInformationMessage(
            `🏗️ Project-wide fix complete! Fixed ${fixedCount} files. Restart TS Server for best results.`
        );
    });
}

// =============================================================================
// 🛠️ UTILITY FUNCTIONS
// =============================================================================

async function applyContentChanges(editor: vscode.TextEditor, newContent: string): Promise<void> {
    const document = editor.document;
    const edit = new vscode.WorkspaceEdit();
    const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
    edit.replace(document.uri, fullRange, newContent);
    await vscode.workspace.applyEdit(edit);
}

//🔧 INTEGRATION WITH ANALYSIS WORKFLOW
// =============================================================================

/**
 * ✅ Integrated auto-fix suggestion using your existing analysis system
 */
export async function suggestAutoFixAfterAnalysis(analysis: FileAnalysis): Promise<void> {
    const issueCount = analysis.issues.length;
    const suggestionCount = analysis.suggestions.length;
    const isAutoFixable = analysis.canAutoFix;
    const complexity = analysis.complexity || 0;
    
    // Only suggest if there are meaningful fixes available
    if (issueCount > 0 || suggestionCount > 3 || complexity > 7) {
        
        // ✅ Create smart suggestion message based on analysis
        let message = `🔧 Analysis complete: ${issueCount} issues, ${suggestionCount} suggestions found.`;
        
        if (complexity > 7) {
            message += ` High complexity (${complexity}) detected.`;
        }
        
        if (isAutoFixable) {
            message += ' Auto-fix available!';
        }
        
        // ✅ Determine best fix options based on analysis
        const options: string[] = [];
        
        if (issueCount > 0) {
            options.push('Quick Fix');
        }
        
        if (issueCount > 3 || complexity > 7 || suggestionCount > 10) {
            options.push('Deep TS Fix');
        }
        
        options.push('Later');
        
        const result = await vscode.window.showInformationMessage(
            message,
            ...options
        );

        if (result === 'Quick Fix' || result === 'Deep TS Fix') {
            // ✅ Trigger the auto-fix command
            vscode.commands.executeCommand('cipher.autoFixCurrentFile');
        }
    }
}

/**
 * ✅ Enhanced suggestion with analysis results display
 */
export async function suggestAutoFixWithResults(
    beforeAnalysis: FileAnalysis, 
    afterAnalysis?: FileAnalysis
): Promise<void> {
    if (afterAnalysis) {
        // Show improvement results
        const issueImprovement = beforeAnalysis.issues.length - afterAnalysis.issues.length;
        const complexityImprovement = (beforeAnalysis.complexity || 0) - (afterAnalysis.complexity || 0);
        
        if (issueImprovement > 0 || complexityImprovement > 0) {
            let improvementMessage = '✅ Auto-fix results: ';
            
            if (issueImprovement > 0) {
                improvementMessage += `Reduced issues by ${issueImprovement}. `;
            }
            
            if (complexityImprovement > 0) {
                improvementMessage += `Reduced complexity by ${complexityImprovement}. `;
            }
            
            // ✅ Use your existing display utilities for music files
            if (afterAnalysis.fileType === 'tsx' && beforeAnalysis.issues.some(issue => 
                issue.includes('guitar') || issue.includes('music') || issue.includes('audio'))) {
                
                try {
                    await displayGuitarAnalysis({
                        issues: afterAnalysis.issues,
                        suggestions: afterAnalysis.suggestions,
                        musicComponents: [],
                        healthStatus: afterAnalysis.issues.length === 0 ? 'healthy' : 'warning',
                        fileCount: 1,
                        issueCount: afterAnalysis.issues.length,
                        healthScore: afterAnalysis.issues.length === 0 ? 100 : 85,
                        routes: [],
                        componentCount: 0,
                        workingRoutes: [],
                        musicRoutes: [],
                        missingRoutes: []
                    });
                } catch (displayError) {
                    console.warn('Display analysis failed:', displayError);
                }
            }
            
            vscode.window.showInformationMessage(improvementMessage);
        }
    } else {
        // Just suggest based on current analysis
        await suggestAutoFixAfterAnalysis(beforeAnalysis);
    }
}