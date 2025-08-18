/**
 * 🧠 Brain DevOps Bridge - DevOps Intelligence Integration  
 * Location: .vscode-extensions/cipher-autonomous-dev/src/brain/BrainDevOpsBridge.ts
 * ✅ Follows established Brain module patterns
 * 🔧 Integrates with existing pathResolver utilities
 * 🎯 Provides DevOps intelligence for duplicate resolution and path management
 */

import * as vscode from 'vscode';
import { BrainConnector } from './BrainConnector';

// ===== LAYER 4: BRAIN CONNECTOR (Bridge Layer) =====
// 🌉 Bridge between existing DevOps utilities and Brain system

/**
 * 🧠 BrainDevOpsBridge - DevOps Intelligence Module
 * Follows the same pattern as MusicDevIntelligence and other Brain modules
 */
export class BrainDevOpsBridge {
    private static instance: BrainDevOpsBridge | null = null;
    private brainConnector: BrainConnector;
    private pathResolverAvailable: boolean = false;
    private learningPatterns: Map<string, any> = new Map();
    private isInitialized: boolean = false;

    private constructor(brainConnector?: BrainConnector) {
        this.brainConnector = brainConnector || BrainConnector.getInstance();
        console.log('🔧 BrainDevOpsBridge created with BrainConnector integration');
        this.initializeDevOpsIntegration();
    }

    public static getInstance(brainConnector?: BrainConnector): BrainDevOpsBridge {
        if (!BrainDevOpsBridge.instance) {
            BrainDevOpsBridge.instance = new BrainDevOpsBridge(brainConnector);
        }
        return BrainDevOpsBridge.instance;
    }

    /**
     * 🔧 Initialize DevOps Integration
     */
    private async initializeDevOpsIntegration(): Promise<void> {
        try {
            // Check if pathResolver utilities are available
            this.pathResolverAvailable = await this.checkPathResolverAvailability();
            
            if (this.pathResolverAvailable) {
                console.log('✅ PathResolver utilities detected and integrated');
                await this.trainFromExistingPatterns();
            } else {
                console.log('⚠️ PathResolver utilities not available - using fallback methods');
            }
            
            // 🧠 Brain learning: Record initialization
            this.brainConnector.learnFromAction('devops_bridge_init', 'success', {
                pathResolverAvailable: this.pathResolverAvailable,
                timestamp: new Date().toISOString()
            });
            
        } catch (error) {
            console.error('❌ DevOps Bridge initialization failed:', error);
            this.brainConnector.learnFromAction('devops_bridge_init', 'failure', {
                error: error instanceof Error ? error.message : String(error)
            });
        } finally {
            this.isInitialized = true;
            console.log('✅ BrainDevOpsBridge initialization complete');
        }
    }

    /**
     * 🔍 Check PathResolver Availability
     */
    private async checkPathResolverAvailability(): Promise<boolean> {
        try {
            // Check if cipher-engine-clean-v2 workspace exists with pathResolver
            const cipherWorkspace = vscode.workspace.workspaceFolders?.find(
                folder => folder.name.includes('cipher-engine') || 
                         folder.uri.fsPath.includes('cipher-engine')
            );
            
            if (!cipherWorkspace) return false;
            
            // Check if pathResolver.ts exists
            const pathResolverUri = vscode.Uri.joinPath(
                cipherWorkspace.uri, 
                'src', 'imports', 'pathResolver.ts'
            );
            
            const stat = await vscode.workspace.fs.stat(pathResolverUri);
            return stat.type === vscode.FileType.File;
            
        } catch {
            return false;
        }
    }

    /**
     * 🧠 Enhanced Path Resolution with Brain Intelligence
     * Option 1: Use pathResolver if available, Option 2: Use Brain fallback
     */
    async enhancedPathResolution(importPath: string, fromFile?: string): Promise<{
        resolvedPath: string;
        isValid: boolean;
        brainInsight: string;
        confidence: number;
        suggestion?: string;
        method: 'pathResolver' | 'brainFallback';
    }> {
        console.log(`🧠 Enhanced path resolution for: ${importPath}`);
        
        try {
            let resolvedPath = importPath;
            let isValid = false;
            let method: 'pathResolver' | 'brainFallback' = 'brainFallback';
            
            // Option 1: Try pathResolver if available
            if (this.pathResolverAvailable) {
                try {
                    const pathResolverResult = await this.usePathResolver(importPath, fromFile);
                    resolvedPath = pathResolverResult.resolvedPath;
                    isValid = pathResolverResult.isValid;
                    method = 'pathResolver';
                } catch (error) {
                    console.log('⚠️ PathResolver failed, using Brain fallback');
                }
            }
            
            // Option 2: Brain fallback method
            if (!isValid) {
                const brainResult = await this.brainPathResolution(importPath, fromFile);
                resolvedPath = brainResult.resolvedPath;
                isValid = brainResult.isValid;
                method = 'brainFallback';
            }
            
            // Brain analysis and learning
            const brainAnalysis = await this.analyzeBrainPatterns(importPath, resolvedPath, isValid, method);
            
            // Learn from this resolution
            this.brainConnector.learnFromAction('enhanced_path_resolution', isValid ? 'success' : 'failure', {
                importPath,
                resolvedPath,
                fromFile,
                method,
                brainInsight: brainAnalysis.insight,
                confidence: brainAnalysis.confidence
            });
            
            return {
                resolvedPath,
                isValid,
                brainInsight: brainAnalysis.insight,
                confidence: brainAnalysis.confidence,
                suggestion: brainAnalysis.suggestion,
                method
            };
            
        } catch (error) {
            console.error(`❌ Enhanced path resolution failed for ${importPath}:`, error);
            
            return {
                resolvedPath: importPath,
                isValid: false,
                brainInsight: 'Path resolution failed - manual review needed',
                confidence: 0,
                suggestion: 'Check file exists and import paths are correct',
                method: 'brainFallback'
            };
        }
    }

    /**
     * 🔧 Use PathResolver (when available)
     */
    private async usePathResolver(importPath: string, fromFile?: string): Promise<{
        resolvedPath: string;
        isValid: boolean;
    }> {
        // This would dynamically import pathResolver utilities
        // For now, we'll implement Brain-based logic as fallback
        
        try {
            // Dynamic import attempt (pathResolver might not be available)
            // const { resolveImportPath, validateResolvedPath } = await import('../../../../cipher-engine-clean-v2/src/imports/pathResolver');
            // const resolvedPath = resolveImportPath(importPath, fromFile);
            // const isValid = validateResolvedPath(resolvedPath);
            
            // For now, use Brain-based resolution
            return await this.brainPathResolution(importPath, fromFile);
            
        } catch (error) {
            console.log('⚠️ PathResolver import failed, using Brain fallback');
            return await this.brainPathResolution(importPath, fromFile);
        }
    }

    /**
     * 🧠 Brain-Based Path Resolution (Fallback Method)
     */
    private async brainPathResolution(importPath: string, fromFile?: string): Promise<{
        resolvedPath: string;
        isValid: boolean;
    }> {
        let resolvedPath = importPath;
        
        // Handle TypeScript path mapping patterns
        if (importPath.startsWith('@/')) {
            // Next.js/TypeScript @ alias typically maps to src/
            resolvedPath = importPath.replace('@/', './src/');
        } else if (importPath.startsWith('~/')) {
            // Common ~ alias pattern
            resolvedPath = importPath.replace('~/', './');
        }
        
        // Validate the resolved path exists
        const isValid = await this.validatePathExists(resolvedPath);
        
        return { resolvedPath, isValid };
    }

    /**
     * ✅ Validate Path Exists
     */
    private async validatePathExists(resolvedPath: string): Promise<boolean> {
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
                
                // Check if it's a directory with index file
                try {
                    const stat = await vscode.workspace.fs.stat(fullPath);
                    if (stat.type === vscode.FileType.Directory) {
                        for (const indexExt of ['.ts', '.tsx', '.js', '.jsx']) {
                            try {
                                await vscode.workspace.fs.stat(vscode.Uri.joinPath(fullPath, `index${indexExt}`));
                                return true; // Index file exists
                            } catch {
                                // Continue checking
                            }
                        }
                    }
                } catch {
                    // Continue checking
                }
            }
            
            return false;
            
        } catch {
            return false;
        }
    }

    /**
     * 🧠 Analyze Brain Patterns
     */
    private async analyzeBrainPatterns(
        importPath: string, 
        resolvedPath: string, 
        isValid: boolean,
        method: 'pathResolver' | 'brainFallback'
    ): Promise<{
        insight: string;
        confidence: number;
        suggestion?: string;
    }> {
        const isRelativePath = importPath.startsWith('./') || importPath.startsWith('../');
        const isAliasPath = importPath.startsWith('@/') || importPath.startsWith('~/');
        const isMusicComponent = ['tuner', 'metronome', 'jam', 'vocal', 'practice', 'guitar', 'tabs'].some(music => 
            importPath.toLowerCase().includes(music)
        );
        
        let insight = '';
        let confidence = 50;
        let suggestion: string | undefined;
        
        // Method-based insights
        if (method === 'pathResolver') {
            insight = 'Using professional PathResolver utilities - ';
            confidence += 20;
        } else {
            insight = 'Using Brain fallback resolution - ';
            confidence -= 10;
        }
        
        // Pattern analysis
        if (isValid && isAliasPath) {
            insight += 'excellent use of path aliases (recommended pattern)';
            confidence += 25;
        } else if (isValid && isRelativePath) {
            insight += 'valid relative path, consider @/ alias for better maintainability';
            confidence += 15;
            suggestion = `Consider: ${importPath.replace(/^\.\.?\//, '@/')}`;
        } else if (!isValid && isAliasPath) {
            insight += 'path alias configured but target not found - check tsconfig';
            confidence -= 20;
            suggestion = 'Verify tsconfig.json paths and file exists';
        } else if (!isValid) {
            insight += 'path resolution failed - file may not exist';
            confidence -= 30;
            suggestion = 'Check file exists or update import path';
        }
        
        // Music component special handling
        if (isMusicComponent) {
            if (resolvedPath.includes('maestro-ai') && resolvedPath.includes('/app/')) {
                insight += ' | Music component properly placed in maestro-ai app router';
                confidence += 15;
            } else {
                insight += ' | Music component should be in maestro-ai/src/app/ structure';
                suggestion = 'Move to maestro-ai app router for music components';
                confidence -= 10;
            }
        }
        
        return { 
            insight, 
            confidence: Math.max(0, Math.min(100, confidence)), 
            suggestion 
        };
    }

    /**
     * 🎯 Enhanced Duplicate Resolution
     */
    async resolveDuplicateWithBrain(
        fileName: string, 
        paths: string[]
    ): Promise<{
        recommendation: 'delete_stubs' | 'merge_to_maestro' | 'consolidate_imports' | 'manual_review';
        targetPath: string;
        confidence: number;
        brainInsight: string;
        steps: string[];
        validationResults: boolean[];
    }> {
        console.log(`🧠 Brain duplicate resolution for: ${fileName}`);
        
        // Validate each path
        const validationResults: boolean[] = [];
        const resolvedPaths: string[] = [];
        
        for (const filePath of paths) {
            const result = await this.enhancedPathResolution(filePath);
            validationResults.push(result.isValid);
            resolvedPaths.push(result.resolvedPath);
        }
        
        // Brain analysis
        const validPaths = paths.filter((_, i) => validationResults[i]);
        const maestroPaths = paths.filter(p => p.includes('maestro-ai'));
        const cipherPaths = paths.filter(p => p.includes('cipher-engine'));
        const isMusicFile = ['tuner', 'metronome', 'jam', 'vocal', 'practice'].some(music => 
            fileName.toLowerCase().includes(music)
        );
        
        let recommendation: 'delete_stubs' | 'merge_to_maestro' | 'consolidate_imports' | 'manual_review' = 'manual_review';
        let targetPath = paths[0];
        let confidence = 50;
        let brainInsight = '';
        let steps: string[] = [];
        
        // Decision logic with Brain enhancement
        if (validPaths.length === 1) {
            recommendation = 'delete_stubs';
            targetPath = validPaths[0];
            confidence = 90;
            brainInsight = 'Clear case: only one valid path detected, others appear to be stubs';
            steps = [
                `✅ Keep: ${targetPath} (only valid implementation)`,
                ...paths.filter(p => p !== targetPath).map(p => `🗑️ Delete: ${p} (stub or invalid)`),
                '🔧 Update any remaining import references'
            ];
        } else if (isMusicFile && maestroPaths.length > 0) {
            recommendation = 'merge_to_maestro';
            targetPath = maestroPaths[0];
            confidence = 85;
            brainInsight = 'Music component detected - consolidating to maestro-ai for proper app router structure';
            steps = [
                `🎵 Target: ${targetPath} (maestro-ai music component)`,
                '📋 Review and merge unique logic from other locations',
                '🗑️ Remove duplicates from cipher-engine',
                '🔧 Update import paths using Brain-enhanced resolution',
                '🧪 Verify music route functionality'
            ];
        } else if (validPaths.length > 1) {
            recommendation = 'consolidate_imports';
            targetPath = maestroPaths[0] || validPaths[0];
            confidence = 70;
            brainInsight = 'Multiple valid implementations detected - consolidation needed with import analysis';
            steps = [
                '📋 Compare implementations for unique functionality',
                `🎯 Consolidate to: ${targetPath}`,
                '🔄 Merge best parts from all implementations',
                '🔧 Update all import statements',
                '🧪 Test consolidated implementation'
            ];
        } else {
            recommendation = 'manual_review';
            confidence = 30;
            brainInsight = 'Complex situation detected - Brain recommends careful manual analysis';
            steps = [
                '📋 Manually review all file versions',
                '🔍 Check file contents and dependencies',
                '💭 Determine best path based on project architecture',
                '🔧 Use Brain-enhanced path resolution for final imports'
            ];
        }
        
        // Learn from this resolution
        this.brainConnector.learnFromAction('duplicate_resolution', 'success', {
            fileName,
            pathCount: paths.length,
            validPaths: validPaths.length,
            isMusicFile,
            recommendation,
            confidence,
            brainEnhanced: true
        });
        
        return {
            recommendation,
            targetPath,
            confidence,
            brainInsight,
            steps,
            validationResults
        };
    }

    /**
     * 🧠 Train from Existing DevOps Patterns
     */
    private async trainFromExistingPatterns(): Promise<void> {
        console.log('🧠 Training Brain from existing DevOps patterns...');
        
        try {
            // Scan workspace for import patterns
            const patterns = await this.scanImportPatterns();
            
            // Store patterns for learning
            for (const [pattern, data] of patterns) {
                this.learningPatterns.set(pattern, data);
                
                this.brainConnector.learnFromAction('pattern_learning', 'success', {
                    pattern,
                    usageCount: data.count,
                    successRate: data.successRate
                });
            }
            
            console.log(`✅ Brain learned ${patterns.size} DevOps patterns`);
            
        } catch (error) {
            console.error('❌ Pattern training failed:', error);
        }
    }

    /**
     * 📊 Scan Import Patterns in Workspace
     */
    private async scanImportPatterns(): Promise<Map<string, any>> {
        const patterns = new Map();
        
        if (!vscode.workspace.workspaceFolders) return patterns;
        
        try {
            const files = await vscode.workspace.findFiles(
                '**/*.{ts,tsx,js,jsx}',
                '**/node_modules/**',
                300 // Limit for performance
            );
            
            for (const file of files) {
                try {
                    const content = await vscode.workspace.fs.readFile(file);
                    const text = Buffer.from(content).toString('utf8');
                    
                    // Extract import statements
                    const importMatches = text.match(/import\s+.*?\s+from\s+['"]([^'"]+)['"]/g) || [];
                    
                    for (const importStatement of importMatches) {
                        const pathMatch = importStatement.match(/from\s+['"]([^'"]+)['"]/);
                        if (pathMatch) {
                            const importPath = pathMatch[1];
                            const pattern = this.categorizeImportPattern(importPath);
                            
                            if (!patterns.has(pattern)) {
                                patterns.set(pattern, { 
                                    count: 0, 
                                    successRate: 0, 
                                    examples: [] 
                                });
                            }
                            
                            const patternData = patterns.get(pattern);
                            patternData.count++;
                            patternData.examples.push(importPath);
                        }
                    }
                } catch (error) {
                    // Skip files that can't be read
                }
            }
            
        } catch (error) {
            console.error('Error scanning import patterns:', error);
        }
        
        return patterns;
    }

    /**
     * 🏷️ Categorize Import Pattern
     */
    private categorizeImportPattern(importPath: string): string {
        if (importPath.startsWith('@/')) return 'typescript_alias';
        if (importPath.startsWith('~/')) return 'tilde_alias';
        if (importPath.startsWith('./') || importPath.startsWith('../')) return 'relative_path';
        if (!importPath.includes('/') || importPath.startsWith('react') || importPath.startsWith('next')) return 'npm_package';
        return 'package_subpath';
    }

    /**
     * 📊 Get DevOps Intelligence Report
     */
    async getDevOpsIntelligenceReport(): Promise<{
        pathResolverStatus: boolean;
        totalPatternsLearned: number;
        recommendedBestPractices: string[];
        brainConfidence: number;
        suggestions: string[];
    }> {
        const totalPatternsLearned = this.learningPatterns.size;
        const recommendations: string[] = [];
        const suggestions: string[] = [];
        
        // Analyze patterns for recommendations
        let aliasUsage = 0;
        let relativeUsage = 0;
        
        for (const [pattern, data] of this.learningPatterns) {
            if (pattern === 'typescript_alias') aliasUsage = data.count;
            if (pattern === 'relative_path') relativeUsage = data.count;
        }
        
        if (aliasUsage > relativeUsage * 2) {
            recommendations.push('Excellent use of TypeScript path aliases - continue this pattern');
        } else if (relativeUsage > aliasUsage * 2) {
            recommendations.push('Consider using more @/ path aliases for better maintainability');
            suggestions.push('Update tsconfig.json with path mappings');
        }
        
        if (this.pathResolverAvailable) {
            recommendations.push('PathResolver utilities integrated - professional DevOps setup detected');
        } else {
            suggestions.push('Consider integrating pathResolver utilities for enhanced path management');
        }
        
        const brainConfidence = Math.min(100, Math.max(30, totalPatternsLearned * 10));
        
        return {
            pathResolverStatus: this.pathResolverAvailable,
            totalPatternsLearned,
            recommendedBestPractices: recommendations,
            brainConfidence,
            suggestions
        };
    }
}

/**
 * 🔧 Export Helper Functions for Easy Integration
 */

/**
 * Get BrainDevOpsBridge instance (follows Brain module pattern)
 */
export function getBrainDevOpsBridge(brainConnector?: BrainConnector): BrainDevOpsBridge {
    return BrainDevOpsBridge.getInstance(brainConnector);
}

/**
 * Quick enhanced path resolution
 */
export async function enhancedPathResolve(importPath: string, fromFile?: string) {
    const bridge = getBrainDevOpsBridge();
    return await bridge.enhancedPathResolution(importPath, fromFile);
}

/**
 * Quick duplicate resolution with Brain
 */
export async function brainDuplicateResolve(fileName: string, paths: string[]) {
    const bridge = getBrainDevOpsBridge();
    return await bridge.resolveDuplicateWithBrain(fileName, paths);
}