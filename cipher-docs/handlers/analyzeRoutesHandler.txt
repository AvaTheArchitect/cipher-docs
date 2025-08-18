/**
 * 🔍 Get Route Summary for Tree View
 * This provides accurate data for the VS-Code tree view
 */// 🗺️ Analyze Routes Handler - FIXED for Multi-Root Workspace
// Location: .vscode-extensions/cipher-autonomous-dev/src/handlers/analyzeRoutesHandler.ts

import * as vscode from 'vscode';

// ✅ Use established handler pattern (following your other handlers)
import { displayRouteAnalysis } from '../../shared/displayUtils';
import { getBrainInterface, isBrainAvailable, shareAnalysisData } from '../../shared/utils';

// 🎵 Music Route Patterns for Detection
const MUSIC_ROUTE_PATTERNS = [
    'tuner', 'metronome', 'jam', 'vocal', 'guitar', 'practice', 'theory', 'tabs', 'stage'
];

/**
 * 🗺️ FIXED Route Analysis Handler
 * ✅ Multi-root workspace compatible
 * 🧠 Brain integration enabled
 * 🎵 Proper music route detection
 */
export async function analyzeRoutesHandler(): Promise<void> {
    try {
        vscode.window.showInformationMessage('🗺️ Analyzing route structure...');

        // ✅ Use established brain pattern
        const brainInterface = getBrainInterface();
        if (!brainInterface) {
            console.log('⚠️ Brain interface not available - using standard analysis');
        }

        // ✅ FIXED: Find maestro-ai workspace specifically (multi-root compatible)
        const maestroWorkspace = vscode.workspace.workspaceFolders?.find(
            folder => folder.name === 'maestro-ai' || 
                     folder.uri.fsPath.includes('maestro-ai') ||
                     folder.uri.fsPath.endsWith('maestro-ai')
        );

        if (!maestroWorkspace) {
            const errorMsg = '❌ maestro-ai workspace not found in multi-root workspace';
            console.error(errorMsg);
            console.log('🔍 Available workspaces:', 
                vscode.workspace.workspaceFolders?.map(f => `${f.name} (${f.uri.fsPath})`).join(', ') || 'none'
            );
            
            // Show available workspaces to user
            vscode.window.showErrorMessage(
                `${errorMsg}\n\nAvailable: ${vscode.workspace.workspaceFolders?.map(f => f.name).join(', ') || 'none'}`
            );
            
            // 🧠 Brain learning: Record failure
            if (brainInterface && isBrainAvailable()) {
                await shareAnalysisData('route_analysis_workspace_failure', {
                    availableWorkspaces: vscode.workspace.workspaceFolders?.map(f => f.name),
                    error: 'maestro-ai_workspace_not_found'
                });
            }
            
            return;
        }

        console.log('✅ Using maestro-ai workspace for route analysis:', maestroWorkspace.uri.fsPath);
        console.log('📁 Workspace name:', maestroWorkspace.name);

        // 🧠 Brain learning: Record successful workspace detection
        if (brainInterface && isBrainAvailable()) {
            await shareAnalysisData('route_analysis_workspace_success', {
                workspaceName: maestroWorkspace.name,
                workspacePath: maestroWorkspace.uri.fsPath
            });
        }

        // ✅ Analyze routes in the CORRECT workspace
        const routeAnalysis = await analyzeRouteStructureEnhanced(maestroWorkspace.uri, brainInterface);
        
        // 🧹 BONUS: Check for empty directories and orphaned files
        console.log('🧹 === CHECKING FOR EMPTY DIRECTORIES ===');
        const emptyDirAnalysis = await checkForEmptyDirectoriesAndFiles(maestroWorkspace.uri, brainInterface);
        
        // Merge empty directory findings with route analysis
        if (emptyDirAnalysis.emptyDirs.length > 0 || emptyDirAnalysis.emptyFiles.length > 0) {
            routeAnalysis.emptyDirectories = emptyDirAnalysis.emptyDirs;
            routeAnalysis.emptyFiles = emptyDirAnalysis.emptyFiles;
            routeAnalysis.issues = [...(routeAnalysis.issues || []), ...emptyDirAnalysis.issues];
            routeAnalysis.suggestions = [...(routeAnalysis.suggestions || []), ...emptyDirAnalysis.suggestions];
        }
        
        // Display results with proper context
        await displayRouteAnalysis(routeAnalysis);

        // 🧠 Brain learning: Record analysis completion (including empty dirs)
        if (brainInterface && isBrainAvailable()) {
            await shareAnalysisData('route_analysis_complete', {
                routesFound: routeAnalysis.routes?.length || 0,
                musicRoutes: routeAnalysis.musicRoutes || 0,
                workingRoutes: routeAnalysis.workingRoutes || 0,
                issues: routeAnalysis.issues?.length || 0,
                emptyDirectories: routeAnalysis.emptyDirectories?.length || 0,
                emptyFiles: routeAnalysis.emptyFiles?.length || 0
            });
        }

        console.log('🗺️ Route analysis completed successfully');

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('❌ Route analysis failed:', errorMessage);
        
        // 🧠 Brain learning: Record failure
        const brainInterface = getBrainInterface();
        if (brainInterface && isBrainAvailable()) {
            await shareAnalysisData('route_analysis_failure', {
                error: errorMessage
            });
        }
        
        vscode.window.showErrorMessage(`Route analysis failed: ${errorMessage}`);
    }
}

/**
 * 📊 Enhanced Route Structure Analysis - Multi-Root Aware & Brain Enhanced
 * ✅ FIXED: Looks in maestro-ai workspace specifically
 * 🧠 Includes Brain learning and pattern recognition
 */
async function analyzeRouteStructureEnhanced(
    maestroWorkspaceUri: vscode.Uri, 
    brainInterface?: any
): Promise<any> {
    console.log('📊 Analyzing route structure in maestro-ai workspace:', maestroWorkspaceUri.fsPath);
    
    const routes: any[] = [];
    const issues: string[] = [];
    let musicRoutes = 0;
    let workingRoutes = 0;
    
    try {
        // ✅ Look for routes in maestro-ai/src/app/ specifically
        const appDir = vscode.Uri.joinPath(maestroWorkspaceUri, 'src', 'app');
        console.log('📁 Looking for routes in:', appDir.fsPath);
        
        // Check if src/app directory exists
        try {
            await vscode.workspace.fs.stat(appDir);
            console.log('✅ Found maestro-ai/src/app directory');
        } catch {
            const error = 'maestro-ai/src/app directory not found';
            console.log('❌', error);
            issues.push(error);
            
            // Return empty but valid analysis
            return {
                routes: [],
                issues,
                suggestions: ['Create src/app directory in maestro-ai'],
                fileCount: 0,
                issueCount: issues.length,
                healthStatus: 'warning',
                timestamp: Date.now(),
                componentCount: 0,
                workingRoutes: 0,
                musicRoutes: 0,
                missingRoutes: 0,
                healthScore: 0
            };
        }

        // Get all directories in src/app (these are our routes)
        const entries = await vscode.workspace.fs.readDirectory(appDir);
        console.log('📂 Found entries in maestro-ai/src/app:', entries.map(([name]) => name));
        
        for (const [name, type] of entries) {
            if (type === vscode.FileType.Directory && !name.startsWith('.') && !name.startsWith('_')) {
                const routePath = `/${name}`;
                const routeDir = vscode.Uri.joinPath(appDir, name);
                
                console.log(`🔍 Analyzing route: ${routePath}`);
                
                // Check for page.tsx in the route directory
                const pageFile = vscode.Uri.joinPath(routeDir, 'page.tsx');
                let exists = false;
                let component = '';
                let fileSize = 0;
                
                try {
                    const stat = await vscode.workspace.fs.stat(pageFile);
                    exists = true;
                    component = `${name}/page.tsx`;
                    fileSize = stat.size;
                    workingRoutes++;
                    console.log(`✅ Found working route: ${routePath} -> ${component} (${fileSize} bytes)`);
                } catch {
                    console.log(`❌ Missing page.tsx for route: ${routePath}`);
                    issues.push(`Missing page.tsx for route ${routePath}`);
                }
                
                // Check if it's a music route
                const isMusicRoute = MUSIC_ROUTE_PATTERNS.includes(name.toLowerCase());
                if (isMusicRoute) {
                    musicRoutes++;
                    console.log(`🎵 Music route detected: ${routePath}`);
                }
                
                routes.push({
                    path: routePath,
                    component,
                    exists,
                    type: 'app-router',
                    isMusicRoute: isMusicRoute,
                    status: exists ? 'working' : 'missing',
                    issues: exists ? [] : [`Missing page.tsx file`],
                    fileSize,
                    lastModified: exists ? new Date() : null,
                    workspace: 'maestro-ai'
                });
            }
        }
        
        console.log(`📊 Route analysis complete: ${routes.length} routes found in maestro-ai`);
        console.log(`✅ Working routes (${workingRoutes}):`, routes.filter(r => r.exists).map(r => r.path));
        console.log(`❌ Missing routes (${routes.length - workingRoutes}):`, routes.filter(r => !r.exists).map(r => r.path));
        console.log(`🎵 Music routes (${musicRoutes}):`, routes.filter(r => r.isMusicRoute).map(r => r.path));
        
        // 🧠 Brain learning: Record route patterns
        if (brainInterface && isBrainAvailable()) {
            await shareAnalysisData('route_patterns_discovered', {
                totalRoutes: routes.length,
                workingRoutes,
                musicRoutes,
                missingRoutes: routes.length - workingRoutes,
                routeNames: routes.map(r => r.path)
            });
        }
        
    } catch (error) {
        const errorMsg = `Route analysis failed: ${error}`;
        console.error('❌', errorMsg);
        issues.push(errorMsg);
    }

    // Calculate metrics
    const missingRoutes = routes.length - workingRoutes;
    const healthScore = routes.length > 0 ? Math.round((workingRoutes / routes.length) * 100) : 100;

    return {
        routes,
        issues,
        suggestions: routes.filter(r => !r.exists).map(r => `Create ${r.path}/page.tsx in maestro-ai`),
        fileCount: routes.length,
        issueCount: issues.length,
        healthStatus: issues.length === 0 ? 'healthy' : (workingRoutes > 0 ? 'warning' : 'critical'),
        timestamp: Date.now(),
        componentCount: routes.length,
        workingRoutes,
        musicRoutes,
        missingRoutes,
        healthScore,
        workspace: 'maestro-ai'
    };
}

/**
 * 🧹 Check for Empty Directories and Empty Files
 * Detects phantom folders like cipher/utils/, cipher/shared/ that Cipher might have created
 */
async function checkForEmptyDirectoriesAndFiles(
    workspaceUri: vscode.Uri,
    brainInterface?: any
): Promise<{
    emptyDirs: string[];
    emptyFiles: string[];
    issues: string[];
    suggestions: string[];
}> {
    console.log('🧹 Scanning for empty directories and files...');
    
    const emptyDirs: string[] = [];
    const emptyFiles: string[] = [];
    const issues: string[] = [];
    const suggestions: string[] = [];
    
    try {
        // Check common problematic directories
        const suspiciousDirs = [
            'cipher/utils',
            'cipher/shared', 
            'cipher/components',
            'cipher/hooks',
            'cipher/pages',
            'src/cipher',
            'components/cipher',
            'utils/cipher',
            'shared/cipher'
        ];
        
        for (const dirPath of suspiciousDirs) {
            const fullDirPath = vscode.Uri.joinPath(workspaceUri, dirPath);
            
            try {
                const stat = await vscode.workspace.fs.stat(fullDirPath);
                if (stat.type === vscode.FileType.Directory) {
                    console.log(`📁 Checking directory: ${dirPath}`);
                    
                    // Check if directory is empty or has only empty files
                    const contents = await vscode.workspace.fs.readDirectory(fullDirPath);
                    
                    if (contents.length === 0) {
                        // Completely empty directory
                        emptyDirs.push(dirPath);
                        issues.push(`Empty directory found: ${dirPath}`);
                        suggestions.push(`Remove empty directory: ${dirPath}`);
                        console.log(`📂 Empty directory: ${dirPath}`);
                    } else {
                        // Check if all files in directory are empty or stubs
                        let hasRealContent = false;
                        const emptyFilesInDir: string[] = [];
                        
                        for (const [fileName, fileType] of contents) {
                            if (fileType === vscode.FileType.File) {
                                const filePath = vscode.Uri.joinPath(fullDirPath, fileName);
                                const isEmpty = await isFileEmptyOrStub(filePath);
                                
                                if (isEmpty) {
                                    emptyFilesInDir.push(`${dirPath}/${fileName}`);
                                } else {
                                    hasRealContent = true;
                                }
                            }
                        }
                        
                        if (!hasRealContent && emptyFilesInDir.length > 0) {
                            // Directory only contains empty/stub files
                            emptyDirs.push(dirPath);
                            emptyFiles.push(...emptyFilesInDir);
                            issues.push(`Directory with only empty files: ${dirPath}`);
                            suggestions.push(`Clean up directory: ${dirPath} (contains only stubs/empty files)`);
                            console.log(`📂 Directory with only stubs: ${dirPath}`);
                        }
                    }
                }
            } catch {
                // Directory doesn't exist - that's good!
                console.log(`✅ Directory doesn't exist: ${dirPath}`);
            }
        }
        
        // 🧠 Brain learning: Record empty directory patterns
        if (brainInterface && isBrainAvailable()) {
            await shareAnalysisData('empty_directory_scan', {
                emptyDirsFound: emptyDirs.length,
                emptyFilesFound: emptyFiles.length,
                suspiciousDirsChecked: suspiciousDirs.length,
                cleanupNeeded: emptyDirs.length > 0 || emptyFiles.length > 0
            });
        }
        
        if (emptyDirs.length > 0) {
            console.log(`🧹 Found ${emptyDirs.length} empty directories:`, emptyDirs);
        }
        if (emptyFiles.length > 0) {
            console.log(`📄 Found ${emptyFiles.length} empty files:`, emptyFiles);
        }
        
    } catch (error) {
        console.error('❌ Error scanning for empty directories:', error);
        issues.push(`Failed to scan for empty directories: ${error}`);
    }
    
    return { emptyDirs, emptyFiles, issues, suggestions };
}

/**
 * 🔍 Check if File is Empty or Just a Stub
 */
async function isFileEmptyOrStub(fileUri: vscode.Uri): Promise<boolean> {
    try {
        const content = await vscode.workspace.fs.readFile(fileUri);
        const text = Buffer.from(content).toString('utf8').trim();
        
        // File is completely empty
        if (text.length === 0) {
            return true;
        }
        
        // File has very little content
        if (text.length < 50) {
            return true;
        }
        
        // Check for common stub patterns
        const stubPatterns = [
            /^export\s*\{\s*\};?\s*$/,  // Just "export {};"
            /^\/\/\s*TODO/i,            // Just a TODO comment
            /^\/\*[\s\S]*\*\/\s*$/,     // Just a comment block
            /^export\s+default\s+\{\s*\};?\s*$/,  // Just "export default {};"
            /^const\s+\w+\s*=\s*\{\s*\};\s*export\s+default\s+\w+;?\s*$/,  // Empty object export
        ];
        
        for (const pattern of stubPatterns) {
            if (pattern.test(text)) {
                return true;
            }
        }
        
        // Count meaningful lines
        const lines = text.split('\n').filter(line => {
            const trimmedLine = line.trim();
            return trimmedLine.length > 0 && 
                   !trimmedLine.startsWith('//') && 
                   !trimmedLine.startsWith('/*') &&
                   !trimmedLine.startsWith('*') &&
                   trimmedLine !== '{' &&
                   trimmedLine !== '}' &&
                   trimmedLine !== ';';
        });
        
        // If less than 3 meaningful lines, consider it a stub
        return lines.length < 3;
        
    } catch (error) {
        console.error(`❌ Error checking file ${fileUri.fsPath}:`, error);
        return false;
    }
}
export async function getRoutesSummary(): Promise<{
    total: number;
    working: number;
    missing: number;
    music: number;
    workspace: string;
}> {
    try {
        // Find maestro-ai workspace
        const maestroWorkspace = vscode.workspace.workspaceFolders?.find(
            folder => folder.name === 'maestro-ai' || 
                     folder.uri.fsPath.includes('maestro-ai')
        );

        if (!maestroWorkspace) {
            return {
                total: 0,
                working: 0,
                missing: 0,
                music: 0,
                workspace: 'none'
            };
        }

        // Quick analysis for tree view
        const analysis = await analyzeRouteStructureEnhanced(maestroWorkspace.uri);
        
        return {
            total: analysis.routes?.length || 0,
            working: analysis.workingRoutes || 0,
            missing: analysis.missingRoutes || 0,
            music: analysis.musicRoutes || 0,
            workspace: 'maestro-ai'
        };
        
    } catch (error) {
        console.error('❌ Failed to get routes summary:', error);
        return {
            total: 0,
            working: 0,
            missing: 0,
            music: 0,
            workspace: 'error'
        };
    }
}