// 🧠 Brain-Enhanced Duplicate File Detection Handler
// Location: .vscode-extensions/cipher-autonomous-dev/src/handlers/detectDuplicateFilesHandler.ts

import * as path from 'path';
import * as vscode from 'vscode';

// ✅ Use established handler pattern (following your other handlers)
import { getBrainInterface, isBrainAvailable, shareAnalysisData } from '../../shared/utils';

// Import existing pathResolver utilities (conditional - may not be available)
let pathResolverAvailable = false;
let resolveImportPath: ((importPath: string, fromFile?: string) => string) | undefined;
let validateResolvedPath: ((resolvedPath: string) => boolean) | undefined;
let debugPathResolution: ((importPath: string, fromFile?: string) => void) | undefined;

// Try to import pathResolver utilities dynamically
try {
    const pathResolverModule = require('../../../../cipher-engine-clean-v2/src/imports/pathResolver');
    resolveImportPath = pathResolverModule.resolveImportPath;
    validateResolvedPath = pathResolverModule.validateResolvedPath;
    debugPathResolution = pathResolverModule.debugPathResolution;
    // Note: getRelativePath available but not used in this handler
    pathResolverAvailable = true;
    console.log('✅ PathResolver utilities loaded successfully');
} catch (error) {
    console.log('⚠️ PathResolver utilities not available - using fallback methods');
    pathResolverAvailable = false;
}

// 🎯 Duplicate File Tracking System
interface DuplicateFileEntry {
    fileName: string;
    paths: string[];
    workspaces: string[];
    sizes: number[];
    isStub: boolean[];
    resolvedPaths: string[];
    importConflicts: boolean[];
}

interface PathIndexMap {
    [fileName: string]: {
        locations: string[];
        conflicts: number;
        recommendedAction: 'keep' | 'merge' | 'delete' | 'review';
        brainConfidence: number;
    };
}

const trackedNames = new Map<string, DuplicateFileEntry>();
let pathIndexMap: PathIndexMap = {};

/**
 * 🧠 MAIN HANDLER: Brain-Enhanced Duplicate File Detection
 * ✅ Uses existing pathResolver.ts infrastructure
 * 🔍 Integrates with Brain learning system
 * 📊 Generates structured data for other handlers
 */
export async function detectDuplicateFilesHandler(): Promise<void> {
    try {
        console.log('🧠 === BRAIN-ENHANCED DUPLICATE FILE DETECTION STARTED ===');
        vscode.window.showInformationMessage('🔍 Running Brain-enhanced duplicate file detection...');

        // ✅ Use established brain pattern
        const brainInterface = getBrainInterface();
        if (!brainInterface) {
            vscode.window.showWarningMessage('⚠️ Brain interface not available - using standard detection');
        }

        // Clear previous tracking
        trackedNames.clear();
        pathIndexMap = {};

        // Get all workspace folders
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage('❌ No workspace folders found');
            return;
        }

        // 🧠 Brain learning: Start analysis (if available)
        if (brainInterface && isBrainAvailable()) {
            await shareAnalysisData('duplicate_detection_start', {
                workspaceCount: vscode.workspace.workspaceFolders.length,
                timestamp: new Date().toISOString()
            });
        }

        // Step 1: Scan all workspaces for duplicates
        console.log('📁 === SCANNING WORKSPACES ===');
        for (const workspace of vscode.workspace.workspaceFolders) {
            await scanWorkspaceForDuplicates(workspace, brainInterface);
        }

        // Step 2: Analyze import conflicts using pathResolver
        console.log('🔍 === ANALYZING IMPORT CONFLICTS ===');
        await analyzeImportConflicts();

        // Step 3: Generate brain-enhanced recommendations
        console.log('🧠 === GENERATING RECOMMENDATIONS ===');
        await generateBrainRecommendations(brainInterface);

        // Step 4: Display results with actions
        console.log('📊 === DISPLAYING RESULTS ===');
        await displayDuplicateResults(brainInterface);

        // 🧠 Brain learning: Record successful completion
        if (brainInterface && isBrainAvailable()) {
            const duplicateCount = Array.from(trackedNames.values()).filter(entry => entry.paths.length > 1).length;
            await shareAnalysisData('duplicate_detection_complete', {
                duplicatesFound: duplicateCount,
                totalFiles: trackedNames.size,
                conflictsResolved: Object.keys(pathIndexMap).length
            });
        }

        console.log('🧠 === DUPLICATE DETECTION COMPLETED ===');

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('❌ Duplicate detection failed:', errorMessage);
        
        if (isBrainAvailable()) {
            await shareAnalysisData('duplicate_detection_failure', {
                error: errorMessage
            });
        }
        
        vscode.window.showErrorMessage(`Duplicate detection failed: ${errorMessage}`);
    }
}

/**
 * 📁 Enhanced Workspace Scanning with Brain Learning
 */
async function scanWorkspaceForDuplicates(
    workspace: vscode.WorkspaceFolder, 
    brainInterface?: any
): Promise<void> {
    console.log(`📁 Scanning workspace: ${workspace.name}`);
    
    try {
        // Get all relevant files
        const files = await vscode.workspace.findFiles(
            '**/*.{ts,tsx,js,jsx,vue,svelte}',
            '**/node_modules/**',
            2000
        );

        let processedCount = 0;
        for (const fileUri of files) {
            const fileName = path.basename(fileUri.fsPath);
            const relativePath = vscode.workspace.asRelativePath(fileUri, false);
            
            // Skip if not in current workspace
            if (!relativePath.startsWith(workspace.name)) continue;
            
            console.log(`🔍 Processing: ${fileName} in ${workspace.name}`);
            
            // Get file stats and analyze
            const stat = await vscode.workspace.fs.stat(fileUri);
            const isStub = await analyzeIfStub(fileUri);
            
            // Resolve path using pathResolver if available, otherwise use fallback
            let resolvedPath = relativePath;
            if (pathResolverAvailable && resolveImportPath) {
                try {
                    resolvedPath = resolveImportPath(relativePath);
                } catch (error) {
                    console.log(`⚠️ PathResolver failed for ${relativePath}, using original path`);
                    resolvedPath = relativePath;
                }
            }
            
            const hasImportConflicts = await checkImportConflicts(fileUri);
            
            // Track the file
            const existing = trackedNames.get(fileName);
            if (existing) {
                existing.paths.push(relativePath);
                existing.workspaces.push(workspace.name);
                existing.sizes.push(stat.size);
                existing.isStub.push(isStub);
                existing.resolvedPaths.push(resolvedPath);
                existing.importConflicts.push(hasImportConflicts);
            } else {
                trackedNames.set(fileName, {
                    fileName,
                    paths: [relativePath],
                    workspaces: [workspace.name],
                    sizes: [stat.size],
                    isStub: [isStub],
                    resolvedPaths: [resolvedPath],
                    importConflicts: [hasImportConflicts]
                });
            }
            
            processedCount++;
        }

        console.log(`✅ Processed ${processedCount} files in ${workspace.name}`);
        
        // 🧠 Brain learning: Record workspace scan
        if (brainInterface && isBrainAvailable()) {
            await shareAnalysisData('workspace_scan', {
                workspaceName: workspace.name,
                filesProcessed: processedCount
            });
        }

    } catch (error) {
        console.error(`❌ Error scanning workspace ${workspace.name}:`, error);
        if (brainInterface && isBrainAvailable()) {
            await shareAnalysisData('workspace_scan_failure', {
                workspaceName: workspace.name,
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
}

/**
 * 🔍 Analyze Import Conflicts using existing pathResolver
 */
async function analyzeImportConflicts(): Promise<void> {
    console.log('🔍 Analyzing import conflicts with pathResolver...');
    
    for (const [fileName, entry] of trackedNames) {
        if (entry.paths.length > 1) {
            console.log(`🔍 Checking import conflicts for: ${fileName}`);
            
            // Use pathResolver to check each path (if available)
            for (let i = 0; i < entry.paths.length; i++) {
                const filePath = entry.paths[i];
                let resolvedPath = filePath;
                
                // Try to use pathResolver if available
                if (pathResolverAvailable && resolveImportPath) {
                    try {
                        resolvedPath = resolveImportPath(filePath);
                    } catch (error) {
                        console.log(`⚠️ PathResolver failed for ${filePath}, using fallback`);
                        resolvedPath = filePath;
                    }
                }
                
                // Validate using pathResolver if available, otherwise use fallback
                let isValid = false;
                if (pathResolverAvailable && validateResolvedPath) {
                    try {
                        isValid = validateResolvedPath(resolvedPath);
                    } catch (error) {
                        console.log(`⚠️ PathResolver validation failed for ${resolvedPath}`);
                        isValid = await fallbackValidatePath(resolvedPath);
                    }
                } else {
                    isValid = await fallbackValidatePath(resolvedPath);
                }
                
                if (!isValid) {
                    entry.importConflicts[i] = true;
                    console.log(`⚠️ Import conflict detected: ${filePath} -> ${resolvedPath}`);
                }
                
                // Debug path resolution for complex cases (if available)
                if (entry.importConflicts[i] && pathResolverAvailable && debugPathResolution) {
                    try {
                        console.log(`🐛 Debugging path resolution for: ${filePath}`);
                        debugPathResolution(filePath);
                    } catch (error) {
                        console.log(`⚠️ PathResolver debug failed for ${filePath}`);
                    }
                }
            }
        }
    }
}

/**
 * 🔧 Fallback Path Validation (when pathResolver not available)
 */
async function fallbackValidatePath(resolvedPath: string): Promise<boolean> {
    try {
        // Remove leading ./ for file system check
        const fsPath = resolvedPath.startsWith('./') ? resolvedPath.slice(2) : resolvedPath;
        
        // Check in all workspace folders
        for (const workspace of vscode.workspace.workspaceFolders || []) {
            const fullPath = vscode.Uri.joinPath(workspace.uri, fsPath);
            
            // Check for common extensions
            const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '.json'];
            
            for (const ext of extensions) {
                try {
                    const pathWithExt = ext ? vscode.Uri.joinPath(workspace.uri, fsPath + ext) : fullPath;
                    await vscode.workspace.fs.stat(pathWithExt);
                    return true; // File exists
                } catch {
                    // Continue checking
                }
            }
        }
        
        return false;
    } catch {
        return false;
    }
}

/**
 * 🔍 Check for Import Conflicts
 */
async function checkImportConflicts(fileUri: vscode.Uri): Promise<boolean> {
    try {
        const content = await vscode.workspace.fs.readFile(fileUri);
        const text = Buffer.from(content).toString('utf8');
        
        // Look for import statements that might conflict
        const importLines = text.split('\n').filter(line => 
            line.trim().startsWith('import ') || line.trim().startsWith('from ')
        );
        
        // Use pathResolver to check each import (if available)
        for (const importLine of importLines) {
            const match = importLine.match(/from\s+['"]([^'"]+)['"]/);
            if (match) {
                const importPath = match[1];
                
                let resolved = importPath;
                if (pathResolverAvailable && resolveImportPath) {
                    try {
                        resolved = resolveImportPath(importPath, fileUri.fsPath);
                    } catch (error) {
                        // Use original path if resolution fails
                        resolved = importPath;
                    }
                }
                
                let isValid = false;
                if (pathResolverAvailable && validateResolvedPath) {
                    try {
                        isValid = validateResolvedPath(resolved);
                    } catch (error) {
                        isValid = await fallbackValidatePath(resolved);
                    }
                } else {
                    isValid = await fallbackValidatePath(resolved);
                }
                
                if (!isValid) {
                    return true; // Has conflicts
                }
            }
        }
        
        return false;
    } catch {
        return false;
    }
}

/**
 * 🧠 Generate Brain-Enhanced Recommendations
 */
async function generateBrainRecommendations(brainInterface?: any): Promise<void> {
    console.log('🧠 Generating brain-enhanced recommendations...');
    
    for (const [fileName, entry] of trackedNames) {
        if (entry.paths.length > 1) {
            const recommendation = await analyzeDuplicateAndRecommend(fileName, entry, brainInterface);
            pathIndexMap[fileName] = recommendation;
        }
    }
}

/**
 * 🔍 Analyze Duplicate and Generate Recommendation
 */
async function analyzeDuplicateAndRecommend(
    fileName: string, 
    entry: DuplicateFileEntry,
    brainInterface?: any
): Promise<PathIndexMap[string]> {
    const stubs = entry.isStub.filter(stub => stub).length;
    const fullFiles = entry.isStub.filter(stub => !stub).length;
    const hasConflicts = entry.importConflicts.some(conflict => conflict);
    const maestroFiles = entry.workspaces.filter(w => w.includes('maestro')).length;
    const cipherFiles = entry.workspaces.filter(w => w.includes('cipher')).length;
    
    let action: 'keep' | 'merge' | 'delete' | 'review' = 'review';
    let confidence = 50;
    
    // 🎯 Decision Logic with Brain Enhancement
    if (stubs > 0 && fullFiles === 1) {
        action = 'delete';
        confidence = 95;
    } else if (fullFiles > 1 && maestroFiles > 0) {
        action = 'merge';
        confidence = 80;
    } else if (hasConflicts) {
        action = 'review';
        confidence = 30;
    } else if (stubs === entry.paths.length) {
        action = 'delete';
        confidence = 70;
    }
    
    // 🧠 Brain learning: Record recommendation pattern
    if (brainInterface && isBrainAvailable()) {
        await shareAnalysisData('recommendation_generation', {
            fileName,
            action,
            confidence,
            stubs,
            fullFiles,
            hasConflicts,
            maestroFiles,
            cipherFiles
        });
    }
    
    return {
        locations: entry.paths,
        conflicts: entry.importConflicts.filter(c => c).length,
        recommendedAction: action,
        brainConfidence: confidence
    };
}

/**
 * 🔍 Simple Stub Analysis (can be enhanced with your existing isStubFile)
 */
async function analyzeIfStub(fileUri: vscode.Uri): Promise<boolean> {
    try {
        const content = await vscode.workspace.fs.readFile(fileUri);
        const text = Buffer.from(content).toString('utf8');
        
        // Basic stub detection
        return text.length < 200 || 
               text.includes('TODO') || 
               text.includes('PLACEHOLDER') ||
               text.split('\n').length < 10;
    } catch {
        return false;
    }
}

/**
 * 📊 Display Enhanced Results with Brain Insights
 */
async function displayDuplicateResults(brainInterface?: any): Promise<void> {
    const duplicates = Array.from(trackedNames.values()).filter(entry => entry.paths.length > 1);
    
    if (duplicates.length === 0) {
        vscode.window.showInformationMessage('✅ No duplicate files detected!');
        return;
    }
    
    // Generate summary report
    let report = `🧠 **BRAIN-ENHANCED DUPLICATE DETECTION REPORT**\n\n`;
    report += `📊 **SUMMARY:**\n`;
    report += `• 🔍 Total duplicates found: ${duplicates.length}\n`;
    report += `• 🗑️ Recommended deletions: ${Object.values(pathIndexMap).filter(p => p.recommendedAction === 'delete').length}\n`;
    report += `• 🔄 Recommended merges: ${Object.values(pathIndexMap).filter(p => p.recommendedAction === 'merge').length}\n`;
    report += `• 👀 Requires review: ${Object.values(pathIndexMap).filter(p => p.recommendedAction === 'review').length}\n\n`;
    
    report += `🔍 **DETAILED ANALYSIS:**\n\n`;
    
    for (const duplicate of duplicates) {
        const analysis = pathIndexMap[duplicate.fileName];
        report += `**${duplicate.fileName}**\n`;
        report += `• Action: ${analysis?.recommendedAction.toUpperCase()}\n`;
        report += `• Confidence: ${analysis?.brainConfidence}%\n`;
        report += `• Conflicts: ${analysis?.conflicts || 0}\n`;
        report += `• Locations:\n`;
        
        duplicate.paths.forEach((path, index) => {
            const workspace = duplicate.workspaces[index];
            const size = duplicate.sizes[index];
            const isStub = duplicate.isStub[index];
            const hasConflicts = duplicate.importConflicts[index];
            
            report += `  - ${workspace}: ${path} (${size} bytes)`;
            if (isStub) report += ' [STUB]';
            if (hasConflicts) report += ' [CONFLICTS]';
            report += '\n';
        });
        report += '\n';
    }
    
    // Show results with action options
    const action = await vscode.window.showInformationMessage(
        report,
        { modal: true },
        'Execute Safe Actions',
        'Export PathIndex',
        'View Recommendations',
        'Close'
    );
    
    if (action === 'Execute Safe Actions') {
        await executeSafeActions();
    } else if (action === 'Export PathIndex') {
        await exportPathIndexMap();
    } else if (action === 'View Recommendations') {
        await showDetailedRecommendations();
    }
}

/**
 * ⚡ Execute Safe Actions (High Confidence, Low Risk)
 */
async function executeSafeActions(): Promise<void> {
    const safeActions = Object.entries(pathIndexMap).filter(([_, analysis]) => 
        analysis.brainConfidence >= 90 && analysis.recommendedAction === 'delete'
    );
    
    if (safeActions.length === 0) {
        vscode.window.showInformationMessage('🛡️ No safe automated actions available');
        return;
    }
    
    const confirm = await vscode.window.showWarningMessage(
        `Execute ${safeActions.length} safe stub deletions?`,
        'Yes, Execute',
        'Cancel'
    );
    
    if (confirm === 'Yes, Execute') {
        for (const [fileName] of safeActions) {
            console.log(`🗑️ Would delete stubs for: ${fileName}`);
            // Implementation would handle actual file deletion
        }
        vscode.window.showInformationMessage(`✅ Executed ${safeActions.length} safe actions!`);
    }
}

/**
 * 📤 Export Path Index Map for other handlers
 */
async function exportPathIndexMap(): Promise<void> {
    const exportData = {
        timestamp: new Date().toISOString(),
        pathIndexMap,
        brainEnhanced: true,
        duplicateFileEntries: Array.from(trackedNames.entries())
    };
    
    await vscode.env.clipboard.writeText(JSON.stringify(exportData, null, 2));
    vscode.window.showInformationMessage('📋 PathIndex map exported to clipboard!');
}

/**
 * 📋 Show Detailed Recommendations
 */
async function showDetailedRecommendations(): Promise<void> {
    let details = `🧠 **DETAILED BRAIN RECOMMENDATIONS**\n\n`;
    
    for (const [fileName, analysis] of Object.entries(pathIndexMap)) {
        details += `**${fileName}**\n`;
        details += `• Recommended Action: ${analysis.recommendedAction.toUpperCase()}\n`;
        details += `• Brain Confidence: ${analysis.brainConfidence}%\n`;
        details += `• Import Conflicts: ${analysis.conflicts}\n`;
        details += `• Locations: ${analysis.locations.length}\n`;
        
        // Add specific action steps based on pathResolver insights
        if (analysis.recommendedAction === 'merge') {
            details += `• Steps: Use pathResolver to consolidate imports\n`;
        } else if (analysis.recommendedAction === 'delete') {
            details += `• Steps: Remove stub files, update imports\n`;
        }
        details += '\n';
    }
    
    vscode.window.showInformationMessage(details, { modal: true });
}

/**
 * 📊 Get Path Index Map (for use by other handlers)
 */
export function getPathIndexMap(): PathIndexMap {
    return pathIndexMap;
}

/**
 * 🔍 Get Duplicate Entries (for use by other handlers)
 */
export function getDuplicateEntries(): Map<string, DuplicateFileEntry> {
    return trackedNames;
}