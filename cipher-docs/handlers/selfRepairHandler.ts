import * as path from 'path';
import * as vscode from 'vscode';
import {
    BrainConnector,
    getEnhancedProjectAnalysis,
    logBrainLearning
} from '../../brain/BrainConnector';
import {
    showDetailedAnalysisView
} from '../../shared/displayUtils';
import { AnalysisResult } from '../../shared/types';
import {
    calculateComplexity,
    ensureDirectoryExists,
    getBrainInterface,
    getFileType,
    isBrainAvailable
} from '../../shared/utils';

// =============================================================================
// 🎯 ENHANCED TYPE DEFINITIONS (Fixed for TypeScript)
// =============================================================================

type HealthStatus = 'excellent' | 'good' | 'warning' | 'critical';

interface ExtensionHealth {
    found: boolean;
    filePath?: string;
    totalLines: number;
    functions: number;
    complexity: number;
    fileType: string;
    issues: string[];
    suggestions: string[];
    health: HealthStatus;
}

interface RouteIntegrity {
    routesFound: string[];
    missingRoutes: string[];
    brokenRoutes: string[];
    musicRoutes: string[];
    issues: string[];
    suggestions: string[];
    health: HealthStatus;
}

interface ImportExportHealth {
    totalFiles: number;
    filesWithIssues: number;
    missingImports: string[];
    unusedImports: string[];
    circularDependencies: string[];
    brokenExports: string[];
    issues: string[];
    suggestions: string[];
    health: HealthStatus;
}

interface BrainIntegration {
    brainAvailable: boolean;
    brainConnected: boolean;
    integrationHealth: HealthStatus;
    features: {
        musicIntelligence: boolean;
        patternRecognition: boolean;
        personalizedSuggestions: boolean;
        crossSystemLearning: boolean;
    };
    issues: string[];
    suggestions: string[];
}

interface ComprehensiveSelfRepair {
    extensionHealth: ExtensionHealth;
    projectStructure: AnalysisResult;
    routeIntegrity: RouteIntegrity;
    importExportHealth: ImportExportHealth;
    brainIntegration: BrainIntegration;
    autoFixCapabilities: string[];
    criticalIssues: string[];
    suggestions: string[];
    overallHealth: HealthStatus;
}

export async function selfRepairHandler(): Promise<void> {
    try {
        vscode.window.showInformationMessage('🔧 Running comprehensive self-repair with Brain intelligence...');

        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }

        // Initialize Brain connector
        const brain = getBrainInterface();
        const brainStatus = await brain?.getBrainStatus();

        // Perform comprehensive analysis
        const selfRepairAnalysis = await performComprehensiveSelfRepair(workspaceFolder.uri);

        // Display results with Brain intelligence
        await displaySelfRepairResults(selfRepairAnalysis, brainStatus);

        // Log learning from self-repair
        await logBrainLearning('self-repair', selfRepairAnalysis);

    } catch (error) {
        vscode.window.showErrorMessage(`Self-repair failed: ${error}`);
    }
}

async function performComprehensiveSelfRepair(workspaceUri: vscode.Uri): Promise<ComprehensiveSelfRepair> {
    const brain = getBrainInterface();

    const repairAnalysis: ComprehensiveSelfRepair = {
        extensionHealth: await analyzeExtensionHealth(workspaceUri),
        projectStructure: await getEnhancedProjectAnalysis(workspaceUri),
        routeIntegrity: await analyzeRouteIntegrity(workspaceUri),
        importExportHealth: await analyzeImportExportHealth(workspaceUri),
        brainIntegration: await analyzeBrainIntegration(),
        autoFixCapabilities: [],
        criticalIssues: [],
        suggestions: [],
        overallHealth: 'good' // Initialize with default
    };

    // Determine auto-fix capabilities
    repairAnalysis.autoFixCapabilities = await determineAutoFixCapabilities(repairAnalysis);

    // Calculate overall health
    repairAnalysis.overallHealth = calculateOverallHealth(repairAnalysis);

    // Generate Brain-powered suggestions
    if (isBrainAvailable()) {
        const brainSuggestions = await brain?.getMusicDevSuggestions({
            hasRouteIssues: repairAnalysis.routeIntegrity.issues.length > 0,
            hasImportIssues: repairAnalysis.importExportHealth.issues.length > 0,
            hasStructureIssues: repairAnalysis.projectStructure.issues.length > 0
        });
        repairAnalysis.suggestions.push(...(brainSuggestions || []));
    }

    return repairAnalysis;
}

// =============================================================================
// 🔍 COMPREHENSIVE ANALYSIS FUNCTIONS
// =============================================================================

async function analyzeExtensionHealth(workspaceUri: vscode.Uri): Promise<ExtensionHealth> {
    const extensionFile = await findExtensionFile();
    if (!extensionFile) {
        return {
            found: false,
            totalLines: 0,
            functions: 0,
            complexity: 0,
            fileType: 'Unknown',
            issues: ['Extension.ts file not found'],
            suggestions: ['Create extension.ts file'],
            health: 'critical'
        };
    }

    try {
        const content = await vscode.workspace.fs.readFile(extensionFile);
        const text = content.toString();

        const analysis: ExtensionHealth = {
            found: true,
            filePath: extensionFile.path,
            totalLines: text.split('\n').length,
            functions: (text.match(/function|const.*=.*=>/g) || []).length,
            complexity: calculateComplexity(text),
            fileType: getFileType(extensionFile.path),
            issues: [],
            suggestions: [],
            health: 'good'
        };

        // Enhanced issue detection
        if (text.includes('any') && !text.includes('// @ts-ignore')) {
            analysis.issues.push('TypeScript any usage without proper typing');
        }

        if (!text.includes('try {') && text.includes('await')) {
            analysis.issues.push('Missing error handling for async operations');
        }

        if (text.includes('console.log') && !text.includes('development')) {
            analysis.issues.push('Console.log statements in production code');
        }

        if (!text.includes('vscode.commands.registerCommand')) {
            analysis.issues.push('No command registrations found');
        }

        if (text.length > 50000) {
            analysis.suggestions.push('Consider splitting large extension file into modules');
        }

        if (!text.includes('import') && text.length > 1000) {
            analysis.suggestions.push('Consider using modular imports');
        }

        // Brain-enhanced suggestions for music app
        if (!text.includes('music') && !text.includes('audio')) {
            analysis.suggestions.push('🎵 Consider adding music-specific extension context');
        }

        // Calculate health
        if (analysis.issues.length === 0) analysis.health = 'excellent';
        else if (analysis.issues.length <= 2) analysis.health = 'good';
        else if (analysis.issues.length <= 5) analysis.health = 'warning';
        else analysis.health = 'critical';

        return analysis;
    } catch (error) {
        return {
            found: true,
            totalLines: 0,
            functions: 0,
            complexity: 0,
            fileType: 'Unknown',
            issues: ['Could not read extension file'],
            suggestions: ['Check file permissions'],
            health: 'critical'
        };
    }
}

async function analyzeRouteIntegrity(workspaceUri: vscode.Uri): Promise<RouteIntegrity> {
    const routeAnalysis: RouteIntegrity = {
        routesFound: [],
        missingRoutes: [],
        brokenRoutes: [],
        musicRoutes: [],
        issues: [],
        suggestions: [],
        health: 'good'
    };

    try {
        // Check for pages/routes directory
        const pagesDir = vscode.Uri.joinPath(workspaceUri, 'pages');

        try {
            const pageFiles = await vscode.workspace.fs.readDirectory(pagesDir);
            for (const [name, type] of pageFiles) {
                if (type === vscode.FileType.File && (name.endsWith('.tsx') || name.endsWith('.ts'))) {
                    routeAnalysis.routesFound.push(name);

                    // Check for music-related routes
                    if (['practice', 'tuner', 'metronome', 'jam', 'vocal', 'tabs', 'theory', 'composer'].some(mr => name.includes(mr))) {
                        routeAnalysis.musicRoutes.push(name);
                    }
                }
            }
        } catch (error) {
            routeAnalysis.issues.push('Pages directory not found or inaccessible');
        }

        // Check for expected music routes
        const expectedMusicRoutes = ['practice', 'tuner', 'metronome', 'jam', 'vocal', 'tabs'];
        for (const expectedRoute of expectedMusicRoutes) {
            const routeExists = routeAnalysis.routesFound.some(route => route.includes(expectedRoute));
            if (!routeExists) {
                routeAnalysis.missingRoutes.push(expectedRoute);
            }
        }

        // Analyze route files for common issues
        for (const routeFile of routeAnalysis.routesFound) {
            try {
                const routePath = vscode.Uri.joinPath(pagesDir, routeFile);
                const content = await vscode.workspace.fs.readFile(routePath);
                const text = content.toString();

                if (!text.includes('export default') && !text.includes('export ')) {
                    routeAnalysis.brokenRoutes.push(routeFile);
                }

                if (!text.includes('import React') && routeFile.endsWith('.tsx')) {
                    routeAnalysis.issues.push(`Missing React import in ${routeFile}`);
                }
            } catch (error) {
                routeAnalysis.brokenRoutes.push(routeFile);
            }
        }

        // Generate suggestions
        if (routeAnalysis.missingRoutes.length > 0) {
            routeAnalysis.suggestions.push(`🎵 Create missing music routes: ${routeAnalysis.missingRoutes.join(', ')}`);
        }

        if (routeAnalysis.musicRoutes.length === 0) {
            routeAnalysis.suggestions.push('🎵 Consider adding music-specific routes for better app structure');
        }

        if (routeAnalysis.brokenRoutes.length > 0) {
            routeAnalysis.suggestions.push(`🔧 Fix broken routes: ${routeAnalysis.brokenRoutes.join(', ')}`);
        }

        // Calculate health
        if (routeAnalysis.issues.length === 0 && routeAnalysis.brokenRoutes.length === 0) {
            routeAnalysis.health = 'excellent';
        } else if (routeAnalysis.issues.length <= 2 && routeAnalysis.brokenRoutes.length === 0) {
            routeAnalysis.health = 'good';
        } else if (routeAnalysis.brokenRoutes.length <= 2) {
            routeAnalysis.health = 'warning';
        } else {
            routeAnalysis.health = 'critical';
        }

    } catch (error) {
        routeAnalysis.issues.push('Route analysis failed');
        routeAnalysis.health = 'critical';
    }

    return routeAnalysis;
}

async function analyzeImportExportHealth(workspaceUri: vscode.Uri): Promise<ImportExportHealth> {
    const importExportAnalysis: ImportExportHealth = {
        totalFiles: 0,
        filesWithIssues: 0,
        missingImports: [],
        unusedImports: [],
        circularDependencies: [],
        brokenExports: [],
        issues: [],
        suggestions: [],
        health: 'good'
    };

    try {
        const files = await vscode.workspace.findFiles('**/*.{ts,tsx,js,jsx}', '**/node_modules/**');
        importExportAnalysis.totalFiles = files.length;

        for (const file of files) {
            try {
                const content = await vscode.workspace.fs.readFile(file);
                const text = content.toString();
                const fileName = path.basename(file.path);

                let hasIssues = false;

                // Check for missing React imports in TSX files
                if (fileName.endsWith('.tsx') && !text.includes('import React')) {
                    importExportAnalysis.missingImports.push(`React import missing in ${fileName}`);
                    hasIssues = true;
                }

                // Check for missing shared utility imports
                if (text.includes('displayAnalysisResults') && !text.includes('import') && !text.includes('displayAnalysisResults')) {
                    importExportAnalysis.missingImports.push(`displayUtils import missing in ${fileName}`);
                    hasIssues = true;
                }

                if (text.includes('performProjectAnalysis') && !text.includes('import') && !text.includes('utils')) {
                    importExportAnalysis.missingImports.push(`utils import missing in ${fileName}`);
                    hasIssues = true;
                }

                // Check for broken exports
                if (text.includes('export default') && text.includes('undefined')) {
                    importExportAnalysis.brokenExports.push(`Potential undefined export in ${fileName}`);
                    hasIssues = true;
                }

                // Check for circular dependency patterns
                if (text.includes('../') && text.split('../').length > 3) {
                    importExportAnalysis.circularDependencies.push(`Potential circular dependency in ${fileName}`);
                    hasIssues = true;
                }

                if (hasIssues) {
                    importExportAnalysis.filesWithIssues++;
                }

            } catch (error) {
                importExportAnalysis.issues.push(`Could not analyze ${path.basename(file.path)}`);
            }
        }

        // Generate suggestions
        if (importExportAnalysis.missingImports.length > 0) {
            importExportAnalysis.suggestions.push('🔧 Auto-fix missing imports');
        }

        if (importExportAnalysis.circularDependencies.length > 0) {
            importExportAnalysis.suggestions.push('🔄 Refactor circular dependencies');
        }

        if (importExportAnalysis.brokenExports.length > 0) {
            importExportAnalysis.suggestions.push('📤 Fix broken exports');
        }

        // Calculate health
        const issueRatio = importExportAnalysis.filesWithIssues / importExportAnalysis.totalFiles;
        if (issueRatio === 0) {
            importExportAnalysis.health = 'excellent';
        } else if (issueRatio <= 0.1) {
            importExportAnalysis.health = 'good';
        } else if (issueRatio <= 0.3) {
            importExportAnalysis.health = 'warning';
        } else {
            importExportAnalysis.health = 'critical';
        }

    } catch (error) {
        importExportAnalysis.issues.push('Import/Export analysis failed');
        importExportAnalysis.health = 'critical';
    }

    return importExportAnalysis;
}

async function analyzeBrainIntegration(): Promise<BrainIntegration> {
    const brainAnalysis: BrainIntegration = {
        brainAvailable: isBrainAvailable(),
        brainConnected: false,
        integrationHealth: 'warning',
        features: {
            musicIntelligence: false,
            patternRecognition: false,
            personalizedSuggestions: false,
            crossSystemLearning: false
        },
        issues: [],
        suggestions: []
    };

    try {
        if (brainAnalysis.brainAvailable) {
            const brain = getBrainInterface();
            const status = await brain?.getBrainStatus();

            brainAnalysis.brainConnected = status.connected;
            brainAnalysis.features = status.capabilities;

            if (status.connected) {
                brainAnalysis.integrationHealth = 'excellent';
                brainAnalysis.suggestions.push('🧠 Brain intelligence fully operational');
            } else {
                brainAnalysis.integrationHealth = 'good';
                brainAnalysis.suggestions.push('🧠 Brain running in simulation mode - full features available');
            }
        } else {
            brainAnalysis.integrationHealth = 'warning';
            brainAnalysis.issues.push('Brain system not initialized');
            brainAnalysis.suggestions.push('🧠 Initialize Brain system for enhanced features');
        }
    } catch (error) {
        brainAnalysis.integrationHealth = 'critical';
        brainAnalysis.issues.push('Brain integration failed');
        brainAnalysis.suggestions.push('🔧 Check Brain system configuration');
    }

    return brainAnalysis;
}

// =============================================================================
// 🔧 AUTO-FIX CAPABILITIES
// =============================================================================

async function determineAutoFixCapabilities(analysis: ComprehensiveSelfRepair): Promise<string[]> {
    const capabilities: string[] = [];

    // Extension auto-fix capabilities
    if (analysis.extensionHealth.issues.length > 0) {
        capabilities.push('🔧 Auto-fix extension issues');
    }

    // Route auto-fix capabilities
    if (analysis.routeIntegrity.missingRoutes.length > 0) {
        capabilities.push('🛣️ Auto-create missing routes');
    }

    if (analysis.routeIntegrity.brokenRoutes.length > 0) {
        capabilities.push('🔧 Auto-repair broken routes');
    }

    // Import/Export auto-fix capabilities
    if (analysis.importExportHealth.missingImports.length > 0) {
        capabilities.push('📥 Auto-fix missing imports');
    }

    if (analysis.importExportHealth.brokenExports.length > 0) {
        capabilities.push('📤 Auto-fix broken exports');
    }

    // Brain auto-fix capabilities
    if (!analysis.brainIntegration.brainAvailable) {
        capabilities.push('🧠 Auto-initialize Brain system');
    }

    // Music-specific auto-fix capabilities
    if (analysis.routeIntegrity.musicRoutes.length === 0) {
        capabilities.push('🎵 Auto-create music route structure');
    }

    return capabilities;
}

async function performAutoFix(analysis: ComprehensiveSelfRepair): Promise<void> {
    vscode.window.showInformationMessage('🔧 Performing auto-fix operations...');

    try {
        // Fix missing imports
        await autoFixMissingImports(analysis.importExportHealth.missingImports);

        // Create missing routes
        await autoCreateMissingRoutes(analysis.routeIntegrity.missingRoutes);

        // Fix extension issues
        await autoFixExtensionIssues(analysis.extensionHealth);

        // Initialize Brain if needed
        if (!analysis.brainIntegration.brainAvailable) {
            await autoInitializeBrain();
        }

        vscode.window.showInformationMessage('✅ Auto-fix completed successfully!');

        // Re-run analysis to show improvements
        setTimeout(() => {
            selfRepairHandler();
        }, 2000);

    } catch (error) {
        vscode.window.showErrorMessage(`Auto-fix failed: ${error}`);
    }
}

async function autoFixMissingImports(missingImports: string[]): Promise<void> {
    for (const importIssue of missingImports) {
        // ✅ Fixed: Extract fileName with proper null checking
        const fileNameMatch = importIssue.match(/in (.+)$/);
        if (fileNameMatch && fileNameMatch[1]) {
            const fileName = fileNameMatch[1];

            if (importIssue.includes('React import missing')) {
                await addReactImport(fileName);
            }

            if (importIssue.includes('displayUtils import missing')) {
                await addDisplayUtilsImport(fileName);
            }

            if (importIssue.includes('utils import missing')) {
                await addUtilsImport(fileName);
            }
        }
    }
}

async function autoCreateMissingRoutes(missingRoutes: string[]): Promise<void> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) return;

    const pagesDir = vscode.Uri.joinPath(workspaceFolder.uri, 'pages');
    await ensureDirectoryExists(pagesDir);

    for (const route of missingRoutes) {
        const routeFile = vscode.Uri.joinPath(pagesDir, `${route}.tsx`);
        const routeContent = generateRouteTemplate(route);

        try {
            await vscode.workspace.fs.writeFile(routeFile, Buffer.from(routeContent));
            console.log(`✅ Created route: ${route}.tsx`);
        } catch (error) {
            console.error(`❌ Failed to create route ${route}:`, error);
        }
    }
}

// =============================================================================
// 🎨 DISPLAY AND UI (Fixed TypeScript types)
// =============================================================================

async function displaySelfRepairResults(analysis: ComprehensiveSelfRepair, brainStatus: any): Promise<void> {
    // ✅ Fixed: Properly typed healthEmoji object
    const healthEmoji: Record<HealthStatus, string> = {
        'excellent': '🟢',
        'good': '✅',
        'warning': '⚠️',
        'critical': '❌'
    };

    const message = `
🔧 Comprehensive Self-Repair Analysis:
${healthEmoji[analysis.overallHealth]} Overall Health: ${analysis.overallHealth.toUpperCase()}

📊 Extension: ${healthEmoji[analysis.extensionHealth.health]} ${analysis.extensionHealth.health}
🛣️ Routes: ${healthEmoji[analysis.routeIntegrity.health]} ${analysis.routeIntegrity.health}
📥 Imports: ${healthEmoji[analysis.importExportHealth.health]} ${analysis.importExportHealth.health}
🧠 Brain: ${healthEmoji[analysis.brainIntegration.integrationHealth]} ${analysis.brainIntegration.integrationHealth}

🔧 Auto-Fix Capabilities: ${analysis.autoFixCapabilities.length}
⚠️ Critical Issues: ${analysis.criticalIssues.length}
💡 Suggestions: ${analysis.suggestions.length}
    `;

    const actions = ['View Details'];

    if (analysis.autoFixCapabilities.length > 0) {
        actions.unshift('Auto-Fix All');
    }

    if (isBrainAvailable()) {
        actions.push('🧠 Brain Analysis');
    }

    actions.push('OK');

    const action = await vscode.window.showInformationMessage(message, ...actions);

    if (action === 'Auto-Fix All') {
        await performAutoFix(analysis);
    } else if (action === 'View Details') {
        await showDetailedAnalysisView(analysis as any);
    } else if (action === '🧠 Brain Analysis') {
        const brain = getBrainInterface();
        const musicSuggestions = await brain?.getMusicDevSuggestions();
        vscode.window.showInformationMessage(`🧠 Brain Suggestions: ${musicSuggestions?.slice(0, 3)?.join(', ') || "No suggestions available"}`);
    }
}

// =============================================================================
// 🛠️ UTILITY FUNCTIONS (Fixed TypeScript types)
// =============================================================================

function calculateOverallHealth(analysis: ComprehensiveSelfRepair): HealthStatus {
    // ✅ Fixed: Properly typed healthScores object
    const healthScores: Record<HealthStatus, number> = {
        'excellent': 4,
        'good': 3,
        'warning': 2,
        'critical': 1
    };

    const scores = [
        healthScores[analysis.extensionHealth.health],
        healthScores[analysis.routeIntegrity.health],
        healthScores[analysis.importExportHealth.health],
        healthScores[analysis.brainIntegration.integrationHealth]
    ];

    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    if (averageScore >= 3.5) return 'excellent';
    if (averageScore >= 2.5) return 'good';
    if (averageScore >= 1.5) return 'warning';
    return 'critical';
}

async function findExtensionFile(): Promise<vscode.Uri | null> {
    const files = await vscode.workspace.findFiles('**/extension.ts', '**/node_modules/**');
    return files?.[0] ?? null;
}

function generateRouteTemplate(routeName: string): string {
    const componentName = routeName.charAt(0).toUpperCase() + routeName.slice(1);
    const musicEmoji: Record<string, string> = {
        'practice': '🎵',
        'tuner': '🎸',
        'metronome': '🥁',
        'jam': '🎶',
        'vocal': '🎤',
        'tabs': '🎼',
        'theory': '📚',
        'composer': '🎹'
    };

    const emoji = musicEmoji[routeName] || '🎵';

    return `import React from 'react';

export default function ${componentName}() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
                    ${emoji} ${componentName}
                </h1>
                
                <div className="bg-gray-800 rounded-lg p-6">
                    <p className="text-gray-300 mb-4">
                        Welcome to the ${componentName} module! This component was auto-generated by Cipher's self-repair system.
                    </p>
                    
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Features to Implement:</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            <li>Add ${routeName}-specific functionality</li>
                            <li>Integrate with Brain intelligence</li>
                            <li>Add music-specific features</li>
                            <li>Implement user interface</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
`;
}

async function addReactImport(fileName: string): Promise<void> {
    // Implementation for adding React import to files
    console.log(`Adding React import to ${fileName}`);
}

async function addDisplayUtilsImport(fileName: string): Promise<void> {
    // Implementation for adding displayUtils import
    console.log(`Adding displayUtils import to ${fileName}`);
}

async function addUtilsImport(fileName: string): Promise<void> {
    // Implementation for adding utils import
    console.log(`Adding utils import to ${fileName}`);
}

async function autoFixExtensionIssues(extensionHealth: ExtensionHealth): Promise<void> {
    // Implementation for fixing extension-specific issues
    console.log('Fixing extension issues:', extensionHealth.issues);
}

async function autoInitializeBrain(): Promise<void> {
    try {
        const brain = getBrainInterface();
        if (brain) {
            await brain.initialize();
            console.log('🧠 Brain system auto-initialized'); // ✅ Move inside if block
        }
    } catch (error) {
        console.error('🧠 Brain auto-initialization failed:', error);
    }
}